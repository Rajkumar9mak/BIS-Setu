from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from services.compliance_engine import compliance_engine

router = APIRouter(prefix="/api/compliance", tags=["Compliance"])

class ComplianceAnalyzeRequest(BaseModel):
    product_id: str
    enterprise_scale: Optional[str] = "MICRO"
    location: Optional[str] = "DOMESTIC"

@router.get("/products")
def get_products():
    return compliance_engine.get_all_products()

@router.get("/products/{product_id}")
def get_product(product_id: str):
    product = compliance_engine.get_product(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found in catalog")
    return product

@router.post("/analyze")
def analyze_compliance(req: ComplianceAnalyzeRequest):
    product = compliance_engine.get_product(req.product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found in catalog")

    roadmap = compliance_engine.generate_roadmap(product, req.enterprise_scale)
    cost_timeline = compliance_engine.calculate_cost_and_timeline(
        product, req.enterprise_scale, req.location
    )
    labs = compliance_engine.get_matching_labs(product["applicable_standards"][0]["code"])

    return {
        "product": product,
        "applicable_standards": product["applicable_standards"],
        "scheme": product["scheme"],
        "qco_status": product["qco_status"],
        "roadmap": roadmap,
        "cost_timeline": cost_timeline,
        "recommended_laboratories": labs
    }

@router.get("/labs")
def get_labs(standard: Optional[str] = None, state: Optional[str] = None):
    all_labs = compliance_engine.laboratories
    if standard:
        all_labs = [
            lab for lab in all_labs
            if any(standard.lower() in scope.lower() for scope in lab.get("testing_scopes", []))
        ]
    if state:
        all_labs = [lab for lab in all_labs if state.lower() in lab.get("state", "").lower()]
    return all_labs
