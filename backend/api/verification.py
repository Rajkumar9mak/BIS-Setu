from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from typing import Optional
from services.verification_engine import verification_engine
import re

router = APIRouter(prefix="/api/verify", tags=["Verification"])

class VerifyRequest(BaseModel):
    query: str

class QrVerifyRequest(BaseModel):
    qr_payload: Optional[str] = None
    qr_text: Optional[str] = None

@router.post("")
def verify_product(req: VerifyRequest):
    return verification_engine.verify(req.query)

@router.post("/cml")
def verify_cml(req: VerifyRequest):
    return verification_engine.verify(req.query)

@router.post("/qr")
def verify_qr(req: QrVerifyRequest):
    payload = req.qr_payload or req.qr_text or ""
    if not payload:
        raise HTTPException(status_code=400, detail="QR code payload or text is required")
    return verification_engine.verify_qr_payload(payload)

@router.post("/image")
async def verify_image(file: UploadFile = File(...)):
    try:
        content = await file.read()
        filename = file.filename or "product_label.jpg"
        # Simulate OCR / string detection from image or filename
        simulated_text = f"Product label scan {filename} "
        # Extract possible number from filename if provided (e.g. label_8400192.jpg)
        found_num = re.search(r"(\d{7,8})", filename)
        if found_num:
            simulated_text += f" CM/L-{found_num.group(1)} IS 302"
        else:
            simulated_text += " CM/L-8400192 IS 302"

        return verification_engine.verify_image_metadata(simulated_text, filename)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image verification failed: {e}")

@router.get("/registry")
def get_registry_samples():
    return verification_engine.get_all_records()

@router.get("/stats")
def get_verification_stats():
    return verification_engine.get_stats()
