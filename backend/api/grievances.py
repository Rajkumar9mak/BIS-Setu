from fastapi import APIRouter, HTTPException
from database.models import GrievanceCreate
from database.db import db
import uuid
import random

router = APIRouter(prefix="/api/grievances", tags=["Consumer Grievances"])

@router.post("")
def report_grievance(req: GrievanceCreate):
    grv_id = f"grv_{uuid.uuid4().hex[:8]}"
    ref_num = f"BIS-GRV-2026-{random.randint(10000, 99999)}"

    city = req.city or req.location or "Not Specified"
    state = req.state or "All India"

    db.execute(
        """
        INSERT INTO grievances (
            id, reference_number, complaint_type, cml_number, product_name,
            brand_name, store_name, city, state, description, status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'SUBMITTED')
        """,
        (
            grv_id,
            ref_num,
            req.complaint_type,
            req.cml_number,
            req.product_name or "Unspecified Product",
            req.brand_name,
            req.store_name,
            city,
            state,
            req.description
        )
    )

    return {
        "status": "RECEIVED",
        "reference_number": ref_num,
        "complaint_id": grv_id,
        "message": (
            "Your non-compliance report has been registered with the BIS Enforcement Cell. "
            "Our statutory vigilance branch will investigate the product registration and retail distribution."
        ),
        "next_steps": [
            "Keep the product packaging and purchase invoice safe for physical inspection.",
            f"Quote reference number '{ref_num}' in any follow-up communications.",
            "You may also log this on the official National Consumer Helpline (NCH - 1915)."
        ]
    }

@router.get("")
def list_grievances():
    return db.query("SELECT * FROM grievances ORDER BY created_at DESC")

@router.get("/{reference_number}")
def get_grievance(reference_number: str):
    grv = db.query_one("SELECT * FROM grievances WHERE reference_number = ?", (reference_number,))
    if not grv:
        raise HTTPException(status_code=404, detail="Grievance reference not found")
    return grv
