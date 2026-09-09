import json
import re
from pathlib import Path
from typing import List, Dict, Any, Optional
from config import DATA_DIR
from logging_config import logger

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
                status = record.get("status", "ACTIVE")
                badge = record.get("verification_badge", "GENUINE_ACTIVE")
                is_demo = record.get("data_source_type") == "DEMO_DATA"

                return {
                    "is_found": True,
                    "query": query,
                    "normalized_number": normalized,
                    "record": record,
                    "status": status,
                    "verification_badge": badge,
                    "is_demo": is_demo,
                    "data_source_type": record.get("data_source_type", "OFFICIAL_SOURCE"),
                    "advisory": record.get("operative_scope", "Official registration verified.")
                }

        # 2. Check if query matches 7-8 digit pattern but is absent from database
        is_plausible_format = bool(re.match(r"^\d{7,8}$", normalized))

        if is_plausible_format:
            return {
                "is_found": False,
                "query": query,
                "normalized_number": normalized,
                "status": "NOT_FOUND",
                "verification_badge": "NOT_FOUND",
                "is_demo": False,
                "data_source_type": "VERIFIED_LOOKUP",
                "record": {
                    "cml_number": normalized,
                    "cml_formatted": f"CM/L-{normalized}",
                    "status": "NOT_FOUND",
                    "verification_badge": "NOT_FOUND",
                    "manufacturer_name": "Not Indexed in Verified Register",
                    "brand_name": "Unverified Record",
                    "product_name": "Unverified Product",
                    "standard_number": "Standard not mapped",
                    "factory_address": "No physical factory registered under this number in local snapshot",
                    "operative_scope": "Certification information could not be verified in the national register."
                },
                "advisory": (
                    "Certification information could not be verified in the local BIS register. "
                    "This does not automatically confirm counterfeit status, but warrants verification "
                    "with the manufacturer or directly via the official BIS Care mobile app or Manakonline portal."
                )
            }

        # 3. Invalid format
        return {
            "is_found": False,
            "query": query,
            "normalized_number": normalized,
            "status": "INVALID_FORMAT",
            "verification_badge": "INVALID_FORMAT",
            "is_demo": False,
            "data_source_type": "INPUT_VALIDATION",
            "record": None,
            "advisory": "Please enter a valid 7 or 8-digit BIS CM/L licence number or CRS Registration number (e.g. 8400192 or R-41028392)."
        }

    def verify_qr_payload(self, qr_payload: str) -> Dict[str, Any]:
        """Extracts CM/L or CRS number from QR string or URL and verifies."""
        match = re.search(r"(\d{7,8})", qr_payload)
        extracted_num = match.group(1) if match else qr_payload
        result = self.verify(extracted_num)
        result["qr_payload_raw"] = qr_payload
        result["verification_method"] = "QR_CODE_SCAN"
        return result

    def verify_image_metadata(self, text_content: str, filename: str) -> Dict[str, Any]:
        """
        Parses OCR extracted text from product label image, detects IS standard and CM/L,
        and runs verification.
        """
        cml_match = re.search(r"(?:CM/L|R|LICENCE|LIC\s*NO)?\s*[-:]?\s*(\d{7,8})", text_content, re.IGNORECASE)
        is_match = re.search(r"\bIS\s*(\d{3,5}(?:\s*\([^)]+\))?(?:\s*:\s*\d{4})?)", text_content, re.IGNORECASE)

        code_to_verify = cml_match.group(1) if cml_match else ""

        if code_to_verify:
            result = self.verify(code_to_verify)
        else:
            result = {
                "is_found": False,
                "query": filename,
                "normalized_number": "NOT_DETECTED",
                "status": "NOT_FOUND",
                "verification_badge": "NOT_FOUND",
                "is_demo": False,
                "data_source_type": "IMAGE_OCR",
                "record": None,
                "advisory": "Could not detect a clear 7 or 8-digit CM/L number on the uploaded label. Please enter the number manually."
            }

        result["image_filename"] = filename
        result["detected_standard"] = is_match.group(0) if is_match else None
        result["verification_method"] = "IMAGE_LABEL_OCR"
        return result

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
