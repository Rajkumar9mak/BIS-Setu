from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from services.verification_engine import verification_engine

router = APIRouter(prefix="/api/verify", tags=["Verification"])

class VerifyRequest(BaseModel):
    query: str

@router.post("")
def verify_product(req: VerifyRequest):
    return verification_engine.verify(req.query)

@router.get("/registry")
def get_registry_samples():
    return verification_engine.get_all_records()

@router.get("/stats")
def get_verification_stats():
    return verification_engine.get_stats()
