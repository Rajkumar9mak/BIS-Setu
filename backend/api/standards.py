from fastapi import APIRouter, HTTPException
from database.models import StandardsDiscoveryRequest
from services.standards_discovery import standards_discovery_engine

router = APIRouter(prefix="/api/standards", tags=["Standards Discovery"])

@router.post("/discover")
def discover_standards(req: StandardsDiscoveryRequest):
    desc = (req.product_description or req.query or "").strip()
    if not desc:
        raise HTTPException(status_code=400, detail="Product description or query cannot be empty")
    return standards_discovery_engine.discover(desc)
