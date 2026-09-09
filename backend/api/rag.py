from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from services.rag_engine import query_rag_engine, clause_index
from ingestion.indexer import standards_indexer

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

@router.get("/source/{clause_id}")
def get_source_clause(clause_id: str):
    from services.rag_engine import get_clause_by_id
    from fastapi import HTTPException
    clause = get_clause_by_id(clause_id)
    if not clause:
        raise HTTPException(status_code=404, detail="Source clause not found in knowledge base")
    return clause

@router.get("/stats")
def get_rag_stats():
    return standards_indexer.get_stats()

@router.post("/reindex")
def reindex_standards():
    stats = standards_indexer.ingest_and_index_all()
    return {
        "status": "success",
        "message": "Standards successfully ingested and reindexed",
        "stats": stats
    }
