import json
import re
from pathlib import Path
from typing import List, Dict, Any, Optional
from config import DATA_DIR

class VerificationEngine:
    def __init__(self):
        self.registry: List[Dict[str, Any]] = []
        self._load_registry()

    def _load_registry(self):
        reg_path = DATA_DIR / "cml_registry.json"
        if reg_path.exists():
            with open(reg_path, "r", encoding="utf-8") as f:
                self.registry = json.load(f)

    def normalize_code(self, raw_input: str) -> str:
        cleaned = raw_input.strip()
        # Handle QR URLs like https://services.bis.gov.in/.../8400192
        url_match = re.search(r"(\d{7,8})", cleaned)
        if url_match:
            return url_match.group(1)
        # Remove common prefixes
        cleaned = re.sub(r"^(CM/L[- ]*|R[- ]*)", "", cleaned, flags=re.IGNORECASE)
        # Remove hyphens and whitespace
        cleaned = re.sub(r"[\s\-_/]", "", cleaned)
        return cleaned

    def verify(self, query: str) -> Dict[str, Any]:
        normalized = self.normalize_code(query)

        # 1. Search in our registry
        for record in self.registry:
            reg_num = record.get("cml_number", "")
            if normalized == reg_num or query.lower() in record.get("cml_formatted", "").lower():
                return {
                    "is_found": True,
                    "query": query,
                    "normalized_number": normalized,
                    "record": record,
                    "status": record.get("status", "ACTIVE"),
                    "verification_badge": record.get("verification_badge", "GENUINE_ACTIVE")
                }

        # 2. Check if query matches 7-8 digit pattern but is absent from official database
        is_plausible_format = bool(re.match(r"^\d{7,8}$", normalized))

        if is_plausible_format:
            return {
                "is_found": False,
                "query": query,
                "normalized_number": normalized,
                "status": "UNREGISTERED_COUNTERFEIT_RISK",
                "verification_badge": "FRAUD_COUNTERFEIT",
                "record": {
                    "cml_number": normalized,
                    "cml_formatted": f"CM/L-{normalized}",
                    "status": "NOT_FOUND",
                    "verification_badge": "FRAUD_COUNTERFEIT",
                    "manufacturer_name": "NOT FOUND IN OFFICIAL BIS REGISTER",
                    "brand_name": "UNKNOWN / UNLICENSED",
                    "product_name": "Unverified Commercial Product",
                    "standard_number": "Unverified Standard Claim",
                    "standard_title": "No valid licence on record",
                    "factory_address": "No physical factory registered with BIS under this number",
                    "issue_date": "N/A",
                    "valid_until": "N/A",
                    "operative_scope": "CRITICAL NOTICE: This licence number does not exist in the National Register of Valid Licences. Any ISI mark bearing this number is illegal and likely counterfeit.",
                    "regional_office": "BIS Central Vigilance & Enforcement",
                    "scheme": "Illegal / Unlicensed Mark",
                    "official_bis_url": "https://bis.gov.in/index.php/consumer-overview/complaints/"
                },
                "advisory": "This product does not hold a valid BIS certification mark. Selling products with spurious ISI marks is punishable under Section 29 of the BIS Act, 2016 with imprisonment up to 2 years and minimum fine of ₹2,00,000."
            }

        return {
            "is_found": False,
            "query": query,
            "normalized_number": normalized,
            "status": "INVALID_FORMAT",
            "verification_badge": "INVALID_FORMAT",
            "record": None,
            "advisory": "Please enter a valid 7 or 8-digit BIS CM/L licence number or CRS Registration number (e.g. 8400192 or R-41028392)."
        }

    def get_all_records(self) -> List[Dict[str, Any]]:
        return self.registry

    def get_stats(self) -> Dict[str, Any]:
        total = len(self.registry)
        active = sum(1 for r in self.registry if r.get("status") == "ACTIVE")
        expiring = sum(1 for r in self.registry if r.get("status") == "EXPIRING_SOON")
        expired = sum(1 for r in self.registry if r.get("status") == "EXPIRED")
        counterfeits = sum(1 for r in self.registry if r.get("status") == "COUNTERFEIT")
        return {
            "total_records_indexed": total,
            "active_licences": active,
            "expiring_licences": expiring,
            "expired_licences": expired,
            "flagged_counterfeits": counterfeits
        }

verification_engine = VerificationEngine()
