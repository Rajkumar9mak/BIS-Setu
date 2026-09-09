from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from database.models import DocumentAnalyzeRequest
from services.document_analyzer import document_analyzer
from database.db import db
import json

router = APIRouter(prefix="/api/documents", tags=["Document Compliance Audit"])

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    project_id: Optional[str] = Form(None)
):
    try:
        contents = await file.read()
        res = document_analyzer.save_and_extract_text(
            file_bytes=contents,
            filename=file.filename or "uploaded_spec.pdf",
            project_id=project_id
        )
        return res
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process document: {e}")

@router.post("/analyze")
def analyze_document(req: DocumentAnalyzeRequest):
    try:
        res = document_analyzer.analyze(
            document_id=req.document_id,
            standard_code=req.standard_code
        )
        return res
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {e}")

@router.get("/{document_id}")
def get_document_details(document_id: str):
    doc = db.query_one("SELECT * FROM documents WHERE id = ?", (document_id,))
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    ext = db.query_one("SELECT * FROM document_extractions WHERE document_id = ?", (document_id,))
    res = db.query_one("SELECT * FROM compliance_results WHERE document_id = ?", (document_id,))

    return {
        "document": doc,
        "extraction": json.loads(ext["extracted_json"]) if ext else None,
        "compliance_result": json.loads(res["results_json"]) if res else None
    }
