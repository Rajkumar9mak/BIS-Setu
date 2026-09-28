import re
from typing import List, Dict, Any, Optional, Set, Tuple
from config import RAG_RELEVANCE_THRESHOLD, RAG_MAX_CONTEXT_DOCS, RAG_STANDARD_FILTER_ENABLED
from retrievers.lexical_retriever import RetrievedDoc
from logging_config import logger

class StandardDetector:
    """
    Detects Indian Standard numbers and domain/product categories from queries.
    """

    # Keyword mappings for product categories and standards
    PRODUCT_MAPPINGS: Dict[str, Dict[str, Any]] = {
        "helmet": {
            "keywords": ["helmet", "helmets", "two-wheeler", "headform", "visor", "chin strap", "retention system"],
            "standard_digits": "4151",
            "category": "Automotive Safety & Protective Gear"
        },
        "cement": {
            "keywords": ["cement", "pozzolana", "fly ash", "portland", "compressive strength", "mortar cubes", "soundness", "setting time", "fineness", "ppc"],
            "standard_digits": "1489",
            "category": "Construction Materials & Cement"
        },
        "kettle": {
            "keywords": ["kettle", "kettles", "electric kettle", "jugs", "water heating", "boil-dry", "thermal cut-out", "boil dry"],
            "standard_digits": "302",
            "category": "Electrical Appliances"
        },
        "fan": {
            "keywords": ["fan", "fans", "ceiling fan", "blade sweep", "fan regulator", "air delivery"],
            "standard_digits": "374",
            "category": "Electrical Appliances"
        },
        "water": {
            "keywords": ["packaged drinking water", "drinking water", "mineral water", "packaged water", "coliform", "tds", "water bottle"],
            "standard_digits": "14543",
            "category": "Food Safety & Drinking Water"
        },
        "toy": {
            "keywords": ["toy", "toys", "children", "child safety", "phthalate", "choking hazard", "mechanical hazards"],
            "standard_digits": "9873",
            "category": "Toys & Child Safety"
        },
        "it_equipment": {
            "keywords": ["information technology", "it equipment", "computer", "adapter", "power supply", "telecommunication"],
            "standard_digits": "13252",
            "category": "Electronics & IT"
        }
    }

    @classmethod
    def extract_standard_digits(cls, text: str) -> List[str]:
        """
        Extracts numeric standard identifiers, e.g. '4151' from 'IS 4151:2015' or 'IS 4151'.
        """
        matches = re.findall(r"\bis\s*[:\-\s]?\s*(\d+)", text, re.IGNORECASE)
        if not matches:
            # Check for bare 'standard XXXX' or 'ISXXXX'
            matches = re.findall(r"\bstandard\s*[:\-\s]?\s*(\d+)", text, re.IGNORECASE)
        # Deduplicate preserving order
        seen = set()
        res = []
        for m in matches:
            if m not in seen:
                seen.add(m)
                res.append(m)
        return res

    @classmethod
    def detect_product_category(cls, query: str) -> Tuple[Optional[str], Optional[str]]:
        """
        Detects product keywords in the query and returns (matched_standard_digits, category).
        """
        q_lower = query.lower()
        for prod_key, info in cls.PRODUCT_MAPPINGS.items():
            for kw in info["keywords"]:
                pattern = r"\b" + re.escape(kw) + r"\b"
                if re.search(pattern, q_lower):
                    return info["standard_digits"], info["category"]
        return None, None


class RelevanceFilter:
    """
    Multi-signal relevance filter applied after reranking.
    Eliminates cross-standard contamination, enforces product/category boundaries,
    and applies a configurable relevance threshold.
    """

    def __init__(
        self,
        min_threshold: float = RAG_RELEVANCE_THRESHOLD,
        max_context_docs: int = RAG_MAX_CONTEXT_DOCS,
        standard_filter_enabled: bool = RAG_STANDARD_FILTER_ENABLED
    ):
        self.min_threshold = min_threshold
        self.max_context_docs = max_context_docs
        self.standard_filter_enabled = standard_filter_enabled

    def _matches_standard_digits(self, doc_standard: str, target_digits: str) -> bool:
        doc_digits = StandardDetector.extract_standard_digits(doc_standard)
        return target_digits in doc_digits

    def resolve_primary_standard(
        self,
        query: str,
        reranked_docs: List[RetrievedDoc],
        detected_digits: Optional[str] = None
    ) -> Optional[str]:
        """
        Identifies the primary applicable standard for ambiguous or generic queries.
        """
        if detected_digits:
            # Find matching standard string from docs
            for doc in reranked_docs:
                if self._matches_standard_digits(doc.standard_number, detected_digits):
                    return doc.standard_number
            return f"IS {detected_digits}"

        if not reranked_docs:
            return None

        # Check top reranked document
        top_doc = reranked_docs[0]
        if top_doc.score >= self.min_threshold:
            return top_doc.standard_number

        return None

    def filter(
        self,
        query: str,
        reranked_docs: List[RetrievedDoc],
        detected_standard: Optional[str] = None,
        detected_category: Optional[str] = None
    ) -> List[RetrievedDoc]:
        """
        Filters candidates using multiple relevance signals:
        1. Standard number match (explicit or primary)
        2. Category / product alignment
        3. Configurable score threshold
        4. Query-content compatibility
        """
        if not reranked_docs:
            logger.info("[RelevanceFilter] No reranked documents provided to filter.")
            return []

        q_lower = query.lower()

        # 1. Detect explicit standards in query
        explicit_digits = StandardDetector.extract_standard_digits(query)
        if detected_standard:
            explicit_digits = list(set(explicit_digits + StandardDetector.extract_standard_digits(detected_standard)))

        # 2. Detect product/category keywords from query
        prod_digits, prod_category = StandardDetector.detect_product_category(query)
        active_category = detected_category or prod_category

        # Check if the query is an explicit out-of-scope / absent knowledge question
        is_absent_intent = bool(
            re.search(r"\bnot\s+present\b", q_lower) or
            re.search(r"\bnot\s+(?:in|available\s+in)\s+(?:the\s+)?(?:bis|knowledge|database|dataset|standards)\b", q_lower) or
            re.search(r"\boutside\s+(?:the\s+)?(?:bis|scope|knowledge|database)\b", q_lower)
        )
        if is_absent_intent:
            logger.info(f"[RelevanceFilter] Query flagged as requesting absent/out-of-scope knowledge: '{query}'")
            return []

        # Check if the query is an explicit multi-standard comparison
        is_multi_standard_query = bool(
            len(explicit_digits) > 1 or
            re.search(r"\b(compare|comparison|between|differ|differences|all standards|list standards)\b", q_lower)
        )

        # 3. Determine target standard constraints
        primary_std_str: Optional[str] = None
        primary_digits: Optional[str] = None

        if explicit_digits:
            # Query explicitly named standard(s)
            primary_digits = explicit_digits[0]
            logger.info(f"[RelevanceFilter] Query explicitly targeted standard digits: {explicit_digits}")
        elif prod_digits:
            # Product terms directly mapped to standard digits
            primary_digits = prod_digits
            logger.info(f"[RelevanceFilter] Query product terms mapped to standard digits: {prod_digits} ({active_category})")
        elif self.standard_filter_enabled and not is_multi_standard_query:
            # Ambiguous/generic query (e.g. "What are the requirements in this standard?")
            primary_std_str = self.resolve_primary_standard(query, reranked_docs)
            if primary_std_str:
                p_digits = StandardDetector.extract_standard_digits(primary_std_str)
                if p_digits:
                    primary_digits = p_digits[0]
                logger.info(f"[RelevanceFilter] Ambiguous query: resolved primary standard '{primary_std_str}' (digits: {primary_digits})")

        filtered_docs: List[RetrievedDoc] = []

        for doc in reranked_docs:
            doc_id = doc.clause_id
            doc_std = doc.standard_number
            doc_cat = doc.metadata.get("category", "")
            doc_score = doc.score
            doc_digits = StandardDetector.extract_standard_digits(doc_std)

            # Signal A: Standard Number Matching
            if explicit_digits:
                # Must match one of the explicitly queried standards
                if not any(d in doc_digits for d in explicit_digits):
                    logger.info(
                        f"[RelevanceFilter] REJECTED {doc_id} ({doc_std}): "
                        f"Standard mismatch (explicit query requested {explicit_digits}, doc is {doc_digits})"
                    )
                    continue

            elif primary_digits and self.standard_filter_enabled and not is_multi_standard_query:
                # Reject cross-standard contamination
                if primary_digits not in doc_digits:
                    logger.info(
                        f"[RelevanceFilter] REJECTED {doc_id} ({doc_std}): "
                        f"Cross-standard contamination (primary standard is {primary_digits}, doc is {doc_digits})"
                    )
                    continue

            # Signal B: Category / Product Compatibility
            if active_category and doc_cat and not is_multi_standard_query:
                # If categories are distinctly incompatible (e.g. Construction Materials vs Automotive Safety)
                if doc_cat.lower() != active_category.lower() and primary_digits and primary_digits not in doc_digits:
                    logger.info(
                        f"[RelevanceFilter] REJECTED {doc_id} ({doc_std}): "
                        f"Category mismatch (query expected '{active_category}', doc is '{doc_cat}')"
                    )
                    continue

            # Signal C: Relevance Threshold
            if doc_score < self.min_threshold:
                logger.info(
                    f"[RelevanceFilter] REJECTED {doc_id} ({doc_std}): "
                    f"Score {doc_score:.3f} below minimum threshold {self.min_threshold:.3f}"
                )
                continue

            # Document passed all relevance filters
            logger.info(
                f"[RelevanceFilter] ACCEPTED {doc_id} ({doc_std} Cl. {doc.clause_number}) "
                f"| score={doc_score:.3f} | category='{doc_cat}'"
            )
            filtered_docs.append(doc)

        logger.info(
            f"[RelevanceFilter] Result: {len(filtered_docs)}/{len(reranked_docs)} documents accepted "
            f"(max allowed: {self.max_context_docs})"
        )
        return filtered_docs[:self.max_context_docs]

relevance_filter = RelevanceFilter()
