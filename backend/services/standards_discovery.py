import json
import re
from typing import List, Dict, Any, Optional
from config import DATA_DIR
from ingestion.indexer import standards_indexer
from retrievers.hybrid_retriever import hybrid_retriever
from logging_config import logger

class StandardsDiscoveryEngine:
    """
    Intelligent engine that translates natural language product descriptions
    into candidate Indian Standards, QCO orders, and certification scheme mandates.
    """

    def __init__(self):
        self.catalog: List[Dict[str, Any]] = []
        self._load_catalog()

    def _load_catalog(self):
        cat_file = DATA_DIR / "products_catalog.json"
        if cat_file.exists():
            with open(cat_file, "r", encoding="utf-8") as f:
                self.catalog = json.load(f)

    def discover(self, product_description: str) -> Dict[str, Any]:
        cleaned_desc = product_description.strip().lower()
        if not cleaned_desc:
            return {
                "product": "Unspecified Product",
                "standards": [],
                "qco": {"applicable": False, "source": "No product description provided"},
                "certification": {"required_or_applicable": "Not Determined", "source": "N/A"},
                "confidence": 0.0
            }

        # 1. Product Catalog Matching
        best_catalog_match: Optional[Dict[str, Any]] = None
        best_catalog_score = 0

        keywords_in_desc = set(re.findall(r"\b[a-z0-9]+\b", cleaned_desc))

        for prod in self.catalog:
            score = 0
            prod_tokens = set(re.findall(r"\b[a-z0-9]+\b", (prod["name"] + " " + prod["description"] + " " + prod["category"]).lower()))
            common = keywords_in_desc.intersection(prod_tokens)
            score += len(common) * 3

            # Special domain synonyms
            if any(w in cleaned_desc for w in ["fan", "fans", "ceiling", "bldc"]) and "fan" in prod["name"].lower():
                score += 15
            if any(w in cleaned_desc for w in ["cement", "concrete", "mortar", "ppc", "opc"]) and "cement" in prod["name"].lower():
                score += 15
            if any(w in cleaned_desc for w in ["kettle", "jug", "water heater", "geyser"]) and "kettle" in prod["name"].lower():
                score += 15
            if any(w in cleaned_desc for w in ["helmet", "headgear", "two-wheeler", "rider"]) and "helmet" in prod["name"].lower():
                score += 15
            if any(w in cleaned_desc for w in ["toy", "toys", "doll", "game"]) and "toy" in prod["name"].lower():
                score += 15
            if any(w in cleaned_desc for w in ["water", "bottled", "mineral", "jar"]) and "water" in prod["name"].lower():
                score += 15
            if any(w in cleaned_desc for w in ["laptop", "adapter", "tablet", "computer", "it"]) and "laptop" in prod["name"].lower():
                score += 15

            if score > best_catalog_score:
                best_catalog_score = score
                best_catalog_match = prod

        # 2. Hybrid Retrieval over Standards Corpus
        retrieval_results = hybrid_retriever.retrieve(product_description, top_k=5)

        standards_list: List[Dict[str, Any]] = []
        seen_standards = set()

        # If we have a strong catalog match, include its standards first
        if best_catalog_match and best_catalog_score >= 6:
            for std in best_catalog_match.get("applicable_standards", []):
                code = std["code"]
                if code not in seen_standards:
                    seen_standards.add(code)
                    standards_list.append({
                        "code": code,
                        "standard_number": code,
                        "title": std["title"],
                        "is_primary": std.get("is_primary", True),
                        "reason": f"Primary Indian Standard specified under the national product directory for {best_catalog_match['name']}.",
                        "confidence": 0.95 if std.get("is_primary") else 0.88,
                        "source": "BIS National Product Specification Directory",
                        "sources": [
                            {
                                "standard_number": code,
                                "title": std["title"],
                                "legal_basis": best_catalog_match.get("qco_status", {}).get("legal_basis", "BIS Act, 2016")
                            }
                        ]
                    })

        # Augment with clauses from RAG retrieval
        for doc in retrieval_results:
            std_num = doc.metadata.get("standard_number")
            if std_num and std_num not in seen_standards:
                seen_standards.add(std_num)
                standards_list.append({
                    "code": std_num,
                    "standard_number": std_num,
                    "title": doc.metadata.get("title") or doc.metadata.get("standard_title") or f"Standard {std_num}",
                    "is_primary": len(standards_list) == 0,
                    "reason": f"Retrieved via regulatory semantic matching on clause: {doc.metadata.get('clause', '')}",
                    "confidence": round(min(0.92, max(0.65, doc.score if doc.score < 1.0 else 0.85)), 2),
                    "source": f"{std_num} Clause {doc.metadata.get('clause', '')}",
                    "sources": [
                        {
                            "standard_number": std_num,
                            "clause": doc.metadata.get("clause", ""),
                            "page": doc.metadata.get("page", 1),
                            "excerpt": doc.text[:180] + "..." if len(doc.text) > 180 else doc.text
                        }
                    ]
                })

        # 3. Formulate QCO and Certification Rules
        if best_catalog_match and best_catalog_match.get("qco_status", {}).get("is_mandatory"):
            qco_meta = best_catalog_match["qco_status"]
            qco_info = {
                "applicable": True,
                "is_mandatory": True,
                "order_name": qco_meta.get("order_name", "Quality Control Order"),
                "ministry": qco_meta.get("ministry", "Ministry of Commerce and Industry"),
                "legal_basis": qco_meta.get("legal_basis", "Section 16 of BIS Act, 2016"),
                "mandate_summary": qco_meta.get("mandate_summary", "Mandatory BIS certification prior to manufacturing or sale."),
                "effective_date": qco_meta.get("effective_date", "Currently in Force"),
                "source": "Gazette of India"
            }
            cert_info = {
                "required_or_applicable": "MANDATORY STATUTORY CERTIFICATION",
                "scheme": best_catalog_match.get("scheme", "Scheme-I (ISI Mark)"),
                "scheme_description": best_catalog_match.get("scheme_description", "Requires factory audit and independent lab testing"),
                "source": "Bureau of Indian Standards (Conformity Assessment) Regulations"
            }
            product_title = best_catalog_match["name"]
            overall_confidence = 0.94
        elif standards_list:
            qco_info = {
                "applicable": True,
                "is_mandatory": True,
                "order_name": "Regulatory Mandate under Review",
                "ministry": "Line Ministry / Department of Consumer Affairs",
                "legal_basis": "Section 16 of BIS Act, 2016",
                "mandate_summary": "Conformity to Indian Standard required for domestic commerce and import clearance.",
                "source": "Gazette Notifications of India"
            }
            cert_info = {
                "required_or_applicable": "APPLICABLE SCHEME CONFORMITY",
                "scheme": "Scheme-I (ISI Mark)",
                "scheme_description": "Factory audit and third-party laboratory verification",
                "source": "BIS Conformity Assessment Directory"
            }
            product_title = product_description.title()
            overall_confidence = 0.82
        else:
            qco_info = {
                "applicable": False,
                "is_mandatory": False,
                "order_name": "No Quality Control Order Found",
                "ministry": "N/A",
                "legal_basis": "N/A",
                "mandate_summary": "No mandatory QCO found in indexed database for this specific description.",
                "source": "BIS Active QCO Schedule"
            }
            cert_info = {
                "required_or_applicable": "VOLUNTARY OR UNINDEXED",
                "scheme": "Voluntary Certification Scheme",
                "scheme_description": "Manufacturers may voluntarily apply for BIS licence.",
                "source": "BIS Guidelines"
            }
            product_title = product_description.title()
            overall_confidence = 0.40

        return {
            "product": product_title,
            "product_description": product_description,
            "matched_product_id": best_catalog_match["id"] if best_catalog_match else None,
            "standards": standards_list,
            "applicable_standards": standards_list,
            "qco": qco_info,
            "qco_mandate": qco_info,
            "certification": cert_info,
            "confidence": overall_confidence
        }

standards_discovery_engine = StandardsDiscoveryEngine()
