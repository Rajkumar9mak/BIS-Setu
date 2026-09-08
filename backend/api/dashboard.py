from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any
from datetime import datetime, date

router = APIRouter(prefix="/api/dashboard", tags=["Manufacturer Dashboard"])

MANUFACTURER_LICENSES = [
  {
    "id": "lic-1",
    "cml_number": "8400192",
    "product_name": "Electric Kettle & Water Jug",
    "standard_number": "IS 302 (Part 2/Sec 15) : 2009",
    "brand_name": "Havells AquaShield",
    "issue_date": "2019-11-15",
    "expiry_date": "2027-11-30",
    "days_remaining": 448,
    "status": "ACTIVE",
    "alert_level": "NORMAL",
    "surveillance_status": "COMPLIANT",
    "last_audit_date": "2024-08-10",
    "minimum_marking_fee": 47000
  },
  {
    "id": "lic-2",
    "cml_number": "8821945",
    "product_name": "Two-Wheeler Protective Helmet",
    "standard_number": "IS 4151 : 2015",
    "brand_name": "Vega Crux Pro",
    "issue_date": "2021-10-07",
    "expiry_date": "2026-10-06",
    "days_remaining": 28,
    "status": "EXPIRING_SOON",
    "alert_level": "URGENT",
    "surveillance_status": "RENEWAL_DUE",
    "last_audit_date": "2024-05-18",
    "minimum_marking_fee": 68000
  },
  {
    "id": "lic-3",
    "cml_number": "9104423",
    "product_name": "Children Plastic Toys & Blocks",
    "standard_number": "IS 9873 (Part 1) : 2019",
    "brand_name": "Giggles Learning",
    "issue_date": "2021-01-08",
    "expiry_date": "2027-01-07",
    "days_remaining": 121,
    "status": "ACTIVE",
    "alert_level": "WARNING_90_DAYS",
    "surveillance_status": "COMPLIANT",
    "last_audit_date": "2024-02-14",
    "minimum_marking_fee": 52000
  }
]

class RenewalRequest(BaseModel):
    cml_number: str
    production_volume_units: int
    declarations_signed: bool

@router.get("/certifications")
def get_certifications():
    return {
        "manufacturer": "Bharat Appliances & Manufacturing Corp.",
        "gstin": "07AAAAA0000A1Z5",
        "total_active_licences": len(MANUFACTURER_LICENSES),
        "urgent_renewals": sum(1 for lic in MANUFACTURER_LICENSES if lic["alert_level"] == "URGENT"),
        "licences": MANUFACTURER_LICENSES
    }

@router.post("/renew")
def initiate_renewal(req: RenewalRequest):
    return {
        "success": True,
        "cml_number": req.cml_number,
        "status": "RENEWAL_APPLICATION_SUBMITTED",
        "application_reference": f"BIS/REN/2026/{req.cml_number}",
        "message": f"Renewal application for CM/L-{req.cml_number} submitted to Regional Branch Office.",
        "next_steps": [
            "Download Form-VI Renewal Receipt",
            "Remit Annual Minimum Marking Fee via Manakonline",
            "BIS Scrutiny will be completed within 15 working days"
        ]
    }
