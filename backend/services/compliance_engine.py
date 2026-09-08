import json
from pathlib import Path
from typing import List, Dict, Any, Optional
from config import DATA_DIR

class ComplianceEngine:
    def __init__(self):
        self.products: List[Dict[str, Any]] = []
        self.laboratories: List[Dict[str, Any]] = []
        self.fee_structures: Dict[str, Any] = {}
        self._load_data()

    def _load_data(self):
        prod_path = DATA_DIR / "products_catalog.json"
        if prod_path.exists():
            with open(prod_path, "r", encoding="utf-8") as f:
                self.products = json.load(f)

        lab_path = DATA_DIR / "laboratories.json"
        if lab_path.exists():
            with open(lab_path, "r", encoding="utf-8") as f:
                self.laboratories = json.load(f)

        fee_path = DATA_DIR / "fee_structures.json"
        if fee_path.exists():
            with open(fee_path, "r", encoding="utf-8") as f:
                self.fee_structures = json.load(f)

    def get_all_products(self) -> List[Dict[str, Any]]:
        return self.products

    def get_product(self, product_id: str) -> Optional[Dict[str, Any]]:
        for p in self.products:
            if p["id"] == product_id:
                return p
        return None

    def get_matching_labs(self, standard_code_or_title: str) -> List[Dict[str, Any]]:
        matched = []
        query = standard_code_or_title.lower()
        for lab in self.laboratories:
            for scope in lab.get("testing_scopes", []):
                if any(term in scope.lower() for term in query.split() if len(term) > 3):
                    matched.append(lab)
                    break
        return matched if matched else self.laboratories[:4]

    def generate_roadmap(self, product: Dict[str, Any], enterprise_scale: str) -> List[Dict[str, Any]]:
        is_crs = "Scheme-II" in product.get("scheme", "")
        
        steps = [
            {
                "step_number": 1,
                "title": "Standards & Regulatory Alignment",
                "phase": "Phase 1: Regulatory Discovery",
                "status": "COMPLETED",
                "description": f"Confirm product categorization under {product['applicable_standards'][0]['code']} and verify statutory Quality Control Order (QCO) applicability.",
                "action_items": [
                    f"Procure official Indian Standard text for {product['applicable_standards'][0]['code']}",
                    "Review specific mandatory clauses (electrical, mechanical, toxicity)",
                    f"Verify Gazette notification under {product['qco_status']['order_name']}"
                ],
                "estimated_days": 2
            },
            {
                "step_number": 2,
                "title": "In-House Testing Setup & Calibration",
                "phase": "Phase 2: Factory Readiness",
                "status": "PENDING",
                "description": "Establish in-house testing facility equipped with calibrated test equipment for routine batch testing.",
                "action_items": [
                    "Procure required testing equipment per Scheme of Inspection & Testing (SIT)",
                    "Obtain NABL accredited calibration certificates for gauges and meters",
                    "Designate qualified in-house Quality Control in-charge / chemist / engineer"
                ],
                "estimated_days": product["timeline_days"]["doc_prep"]
            },
            {
                "step_number": 3,
                "title": "BIS-Recognized Lab Pre-Testing",
                "phase": "Phase 2: Factory Readiness",
                "status": "PENDING",
                "description": "Send pre-production prototype samples to a BIS recognized laboratory to verify type-test conformity.",
                "action_items": [
                    "Select nearest BIS accredited laboratory",
                    "Submit sample for full type-testing per applicable IS clauses",
                    "Obtain comprehensive test report with zero critical non-conformances"
                ],
                "estimated_days": product["timeline_days"]["lab_testing"]
            },
            {
                "step_number": 4,
                "title": "Online Form-V Filing via Manakonline",
                "phase": "Phase 3: Formal Application",
                "status": "PENDING",
                "description": "Submit complete documentation and statutory application fee via the official BIS e-portal.",
                "action_items": [
                    "Register manufacturing unit on Manakonline (e-BIS) portal",
                    "Upload manufacturing flow chart, machinery list, and calibrated equipment logs",
                    f"Attach Udyam Registration for {enterprise_scale} MSME fee concession",
                    "Pay ₹1,000 application fee + ₹7,000 processing fee"
                ],
                "estimated_days": 2
            }
        ]

        if not is_crs:
            steps.append({
                "step_number": 5,
                "title": "Preliminary Factory Audit & Sample Drawing",
                "phase": "Phase 4: Verification & Inspection",
                "status": "PENDING",
                "description": "BIS Inspecting Officer visits manufacturing premises for physical audit and counter-sample drawing.",
                "action_items": [
                    "Host BIS Technical Officer for factory inspection",
                    "Demonstrate in-house test capabilities and manufacturing process controls",
                    "Witness official drawing and sealing of production samples for BIS lab testing"
                ],
                "estimated_days": product["timeline_days"]["factory_audit"]
            })
            steps.append({
                "step_number": 6,
                "title": "BIS Independent Laboratory Conformance",
                "phase": "Phase 4: Verification & Inspection",
                "status": "PENDING",
                "description": "Sealed factory samples are independently tested at BIS Central or Regional Laboratory.",
                "action_items": [
                    "Track sample consignment arrival at designated BIS laboratory",
                    "Review independent test reports against statutory limits",
                    "Resolve any technical clarifications requested by the Scrutinizing Officer"
                ],
                "estimated_days": 8
            })

        steps.append({
            "step_number": len(steps) + 1,
            "title": "Grant of Licence (CM/L) & ISI Mark Affixation",
            "phase": "Phase 5: Certification & Commercialization",
            "status": "PENDING",
            "description": "Upon satisfactory reports, BIS issues the official Certification Marks Licence (CM/L Number).",
            "action_items": [
                "Remit Minimum Annual Marking Fee to BIS",
                "Receive formal Grant Letter with unique 7 or 8-digit CM/L number",
                "Affix ISI mark with IS code and CM/L number on rating plate and packaging artwork",
                "Maintain daily Scheme of Inspection & Testing (SIT) production logs"
            ],
            "estimated_days": product["timeline_days"]["grant_license"]
        })

        return steps

    def calculate_cost_and_timeline(
        self,
        product: Dict[str, Any],
        enterprise_scale: str = "MICRO",
        location: str = "DOMESTIC"
    ) -> Dict[str, Any]:
        base_fees = product.get("base_fees", {
            "application": 1000,
            "processing": 7000,
            "factory_inspection": 7000,
            "lab_testing_estimate": 25000,
            "annual_marking_fee": 50000
        })

        scale_key = enterprise_scale.upper()
        concession_info = self.fee_structures.get("msme_concessions", {}).get(scale_key, {
            "name": enterprise_scale,
            "marking_fee_discount_percent": 0,
            "description": "Standard Scale"
        })

        discount_percent = concession_info.get("marking_fee_discount_percent", 0)
        base_marking_fee = base_fees.get("annual_marking_fee", 50000)
        marking_fee_discount = int(base_marking_fee * (discount_percent / 100))
        net_marking_fee = base_marking_fee - marking_fee_discount

        is_crs = "Scheme-II" in product.get("scheme", "")
        inspection_fee = 0 if is_crs else base_fees.get("factory_inspection", 7000)
        processing_fee = 5000 if is_crs else base_fees.get("processing", 7000)

        subtotal = (
            base_fees.get("application", 1000)
            + processing_fee
            + inspection_fee
            + base_fees.get("lab_testing_estimate", 25000)
            + net_marking_fee
        )

        gst_amount = int(subtotal * 0.18)
        grand_total = subtotal + gst_amount

        timeline = product.get("timeline_days", {
            "doc_prep": 4,
            "lab_testing": 12,
            "factory_audit": 5,
            "grant_license": 7,
            "total_estimated": 28
        })

        return {
            "product_id": product["id"],
            "product_name": product["name"],
            "enterprise_scale": enterprise_scale,
            "concession_applied": concession_info["name"],
            "discount_percent": discount_percent,
            "marking_fee_saved": marking_fee_discount,
            "fee_breakdown": {
                "application_fee": base_fees.get("application", 1000),
                "processing_fee": processing_fee,
                "factory_inspection_fee": inspection_fee,
                "lab_testing_estimate": base_fees.get("lab_testing_estimate", 25000),
                "gross_marking_fee": base_marking_fee,
                "msme_discount_amount": marking_fee_discount,
                "net_marking_fee": net_marking_fee,
                "subtotal": subtotal,
                "gst_18_percent": gst_amount,
                "grand_total_inr": grand_total
            },
            "timeline_breakdown": {
                "document_preparation": f"{timeline['doc_prep']} Days",
                "laboratory_testing": f"{timeline['lab_testing']} Days",
                "factory_inspection_audit": f"{timeline['factory_audit']} Days" if not is_crs else "Exempted (CRS)",
                "final_scrutiny_grant": f"{timeline['grant_license']} Days",
                "total_estimated_turnaround": f"{timeline['total_estimated']} Days"
            }
        }

compliance_engine = ComplianceEngine()
