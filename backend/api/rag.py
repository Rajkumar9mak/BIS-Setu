from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from services.rag_engine import query_rag_engine, clause_index

router = APIRouter(prefix="/api/rag", tags=["RAG & Copilot"])

class RagQueryRequest(BaseModel):
    query: str
    category: Optional[str] = None

@router.post("/query")
async def ask_rag(req: RagQueryRequest):
    result = await query_rag_engine(req.query, req.category)
    return result

@router.get("/clauses")
def get_all_clauses():
    return {
        "total_clauses": len(clause_index.clauses),
        "clauses": clause_index.clauses
    }
