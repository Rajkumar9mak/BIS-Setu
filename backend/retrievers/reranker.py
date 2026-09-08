import re
from typing import List, Dict, Any, Optional
from retrievers.lexical_retriever import RetrievedDoc

class RegulatoryReranker:
    """
    Second-stage reranker that evaluates regulatory relevance, technical term overlap,
    and exact clause/standard matching to produce a high-precision evidence set.
    """

    def __init__(self, min_relevance_threshold: float = 0.30):
        self.min_relevance_threshold = min_relevance_threshold
        self.common_words = {
            "what", "how", "why", "which", "where", "when", "does", "have", "with",
            "from", "into", "that", "this", "under", "over", "some", "more", "most",
            "give", "tell", "explain", "about"
        }

    def calculate_rerank_score(self, query: str, doc: RetrievedDoc) -> float:
        q_lower = query.lower()
        doc_text_lower = f"{doc.standard_number} {doc.clause_number} {doc.clause_title} {doc.text}".lower()

        # Check content word overlap
        query_words = [
            w for w in re.findall(r"[a-z0-9]+", q_lower)
            if len(w) > 2 and w not in self.common_words
        ]
        doc_words = set(re.findall(r"[a-z0-9]+", doc_text_lower))

        matched_words = [w for w in query_words if w in doc_words]
        
        # If zero substantive content words match the document, penalize heavily
        if query_words and not matched_words:
            return 0.05

        overlap_ratio = len(matched_words) / max(1, len(query_words))
        base_score = doc.score * 0.4 + (overlap_ratio * 0.3)
        boost = 0.0

        # 1. Exact clause number match (e.g., "19.101" in query and doc.clause_number is "19.101")
        clause_clean = doc.clause_number.strip().lower()
        if clause_clean and re.search(r"\b" + re.escape(clause_clean) + r"\b", q_lower):
            boost += 0.30

        # 2. Exact standard number match (e.g., "IS 302", "IS 4151")
        std_clean = doc.standard_number.lower()
        std_num_match = re.search(r"\bis\s*(\d+)", std_clean)
        if std_num_match:
            std_digits = std_num_match.group(1)
            if re.search(r"\bis\s*" + std_digits + r"\b", q_lower) or std_digits in q_lower:
                boost += 0.20

        # 3. Technical limits & threshold terms
        technical_keywords = [
            "leakage", "voltage", "insulation", "temperature", "overheating", "boil-dry",
            "impact", "drop", "penetration", "heavy metal", "migration", "bacteria", "coliform",
            "test", "limits", "marking", "earthing", "protective", "safety"
        ]
        q_tech_terms = [k for k in technical_keywords if k in q_lower]
        if q_tech_terms:
            doc_matched_tech = sum(1 for k in q_tech_terms if k in doc_text_lower)
            boost += 0.10 * (doc_matched_tech / len(q_tech_terms))

        final_score = min(1.0, round(base_score + boost, 4))
        return final_score

    def rerank(self, query: str, candidates: List[RetrievedDoc], top_k: int = 4) -> List[RetrievedDoc]:
        if not candidates:
            return []

        scored_candidates: List[RetrievedDoc] = []
        for doc in candidates:
            rerank_score = self.calculate_rerank_score(query, doc)
            if rerank_score >= self.min_relevance_threshold:
                updated_doc = doc.model_copy(
                    update={
                        "score": rerank_score,
                        "metadata": {
                            **doc.metadata,
                            "original_retrieval_score": doc.score,
                            "rerank_score": rerank_score
                        }
                    }
                )
                scored_candidates.append(updated_doc)

        scored_candidates.sort(key=lambda d: d.score, reverse=True)
        return scored_candidates[:top_k]

reranker = RegulatoryReranker()
