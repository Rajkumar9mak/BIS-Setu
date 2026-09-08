import re
from typing import List, Dict, Any, Optional
import httpx
from config import GEMINI_API_KEY
from ingestion.indexer import standards_indexer
from retrievers.hybrid_retriever import hybrid_retriever
from retrievers.reranker import reranker
from services.citation_builder import citation_builder
from services.grounding import grounding_validator
from logging_config import logger

# Initialize indexing on first import if empty
if not standards_indexer.clauses:
    try:
        standards_indexer.ingest_and_index_all()
    except Exception as e:
        logger.error(f"Failed to auto-index standards on startup: {e}")

async def synthesize_with_gemini(query: str, context_text: str) -> Optional[str]:
    if not GEMINI_API_KEY:
        return None

    prompt = f"""You are BIS Setu, the official AI compliance advisor for the Bureau of Indian Standards (BIS).
Answer the user's question accurately, strictly grounded in the Indian Standards excerpts provided below.

CRITICAL REGULATORY RULES:
1. Every important technical requirement, voltage, test parameter, or pass/fail threshold MUST cite its exact in-line citation tag: [IS Standard Number, Clause Number, Page N].
2. Do NOT invent, assume, or extrapolate requirements not present in the excerpts.
3. If the excerpts do not contain the answer, state: "The provided Indian Standards excerpts do not contain sufficient information on this specific aspect."
4. Structure your response with clear headings, bullet points, and highlight statutory limits.
5. Gemini must never override or contradict retrieved evidence.

USER QUESTION: {query}

OFFICIAL BIS EXCERPTS:
{context_text}
"""
    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"temperature": 0.1, "maxOutputTokens": 1024}
        }
        async with httpx.AsyncClient(timeout=12.0) as client:
            resp = await client.post(url, json=payload)
            if resp.status_code == 200:
                data = resp.json()
                text = data["candidates"][0]["content"]["parts"][0]["text"]
                return text
            else:
                logger.warning(f"Gemini API returned status {resp.status_code}: {resp.text}")
    except Exception as e:
        logger.warning(f"Gemini API call failed, falling back to deterministic synthesizer: {e}")
    return None

def synthesize_grounded_local(query: str, top_docs: list) -> str:
    """
    Deterministic, high-fidelity synthesizer that guarantees zero-hallucination
    local answers with strict page and clause citations.
    """
    if not top_docs:
        return (
            "I could not find sufficient authoritative evidence in the indexed BIS material "
            "to answer this reliably. Please check the product category or consult the official e-BIS Manakonline portal."
        )

    primary_doc = top_docs[0]
    lines = []
    lines.append(f"### BIS Compliance Analysis for: **{query}**")
    lines.append(
        f"**Primary Governing Standard:** {primary_doc.standard_number} — *{primary_doc.standard_title}*\n"
    )
    lines.append("Based on authoritative clauses retrieved from the Indian Standards knowledge base:\n")

    for i, doc in enumerate(top_docs, 1):
        tag = f"[{doc.standard_number}, Clause {doc.clause_number}, Page {doc.page}]"
        lines.append(f"#### {i}. {doc.clause_title} (Clause {doc.clause_number})")
        lines.append(f"> \"{doc.text.strip()}\"")
        lines.append(f"**Statutory Citation:** `{tag}` | **Provenance:** `{doc.data_status}`\n")

    lines.append("---")
    lines.append("**Key Compliance Takeaways:**")
    lines.append("- All products manufactured or imported must strictly adhere to the technical limits stipulated above before bearing the ISI mark.")
    lines.append("- Conformance must be validated through type test reports from BIS recognized laboratories and routine in-house QC logs.")
    lines.append(f"- Statutory enforcement: Non-compliance violates mandatory Quality Control Orders under the BIS Act, 2016.")

    return "\n".join(lines)

async def query_rag_engine(query: str, category: Optional[str] = None) -> Dict[str, Any]:
    """
    Complete hybrid RAG pipeline:
    BM25 + ChromaDB -> RRF Fusion -> Reranking -> Grounding Validation -> Synthesis -> Verified Output
    """
    clean_query = query.strip()
    if not clean_query:
        return {
            "query": "",
            "answer": "Please provide a query regarding Indian Standards or BIS certification.",
            "is_grounded": False,
            "confidence": 0.0,
            "citations": [],
            "structured_citations": [],
            "sources": [],
            "warnings": ["EMPTY_QUERY: Query string was empty."]
        }

    # 1. Hybrid Retrieval (BM25 + Vector)
    retrieved_candidates = hybrid_retriever.retrieve(clean_query, top_k=8)

    # 2. Re-ranking
    reranked_docs = reranker.rerank(clean_query, retrieved_candidates, top_k=4)

    # 3. Grounding Check & Confidence Evaluation
    grounding_eval = grounding_validator.evaluate(clean_query, reranked_docs)

    # 4. If evidence is insufficient, return safe refusal
    if not grounding_eval.has_sufficient_evidence:
        citations = citation_builder.build_citations(reranked_docs)
        citation_tags = [c.citation_tag for c in citations]
        structured_citations = [
            {
                "standard_number": c.standard_number,
                "clause_number": c.clause_number,
                "page": c.page,
                "document": c.document,
                "citation_tag": c.citation_tag
            }
            for c in citations
        ]
        return {
            "query": clean_query,
            "answer": grounding_eval.unsupported_reason,
            "is_grounded": False,
            "confidence": grounding_eval.confidence,
            "citations": citation_tags,
            "structured_citations": structured_citations,
            "sources": [
                {
                    "id": d.clause_id,
                    "standard_number": d.standard_number,
                    "standard_title": d.standard_title,
                    "category": d.metadata.get("category", "General"),
                    "clause_number": d.clause_number,
                    "clause_title": d.clause_title,
                    "page": d.page,
                    "text": d.text,
                    "mandatory_status": d.metadata.get("mandatory_status", "Statutory"),
                    "citation": f"[{d.standard_number}, Clause {d.clause_number}, Page {d.page}]",
                    "_relevance_score": d.score
                }
                for d in reranked_docs
            ],
            "warnings": grounding_eval.warnings
        }

    # 5. Build structured citations & formatted context
    citations = citation_builder.build_citations(reranked_docs)
    citation_tags = [c.citation_tag for c in citations]
    structured_citations = [
        {
            "standard_number": c.standard_number,
            "clause_number": c.clause_number,
            "page": c.page,
            "document": c.document,
            "citation_tag": c.citation_tag
        }
        for c in citations
    ]
    context_text = citation_builder.format_context_for_prompt(reranked_docs)

    # 6. Synthesis (Gemini with deterministic fallback)
    gemini_answer = await synthesize_with_gemini(clean_query, context_text)
    if gemini_answer and len(gemini_answer.strip()) > 30:
        raw_answer = gemini_answer
    else:
        raw_answer = synthesize_grounded_local(clean_query, reranked_docs)

    # 7. Post-validation check
    final_answer, final_eval = grounding_validator.post_validate_answer(
        raw_answer, reranked_docs, grounding_eval
    )

    # 8. Assemble sources for frontend
    sources = [
        {
            "id": d.clause_id,
            "standard_number": d.standard_number,
            "standard_title": d.standard_title,
            "category": d.metadata.get("category", "General"),
            "clause_number": d.clause_number,
            "clause_title": d.clause_title,
            "page": d.page,
            "text": d.text,
            "mandatory_status": d.metadata.get("mandatory_status", "Statutory"),
            "citation": f"[{d.standard_number}, Clause {d.clause_number}, Page {d.page}]",
            "_relevance_score": d.score
        }
        for d in reranked_docs
    ]

    return {
        "query": clean_query,
        "answer": final_answer,
        "is_grounded": final_eval.is_grounded,
        "confidence": final_eval.confidence,
        "citations": citation_tags,
        "structured_citations": structured_citations,
        "sources": sources,
        "warnings": final_eval.warnings
    }

# Backward compatibility alias for existing router imports
class LegacyClauseIndex:
    @property
    def clauses(self):
        return [
            {
                "id": c.id,
                "standard_number": c.standard_number,
                "standard_title": c.standard_title,
                "clause_number": c.clause_number,
                "clause_title": c.clause_title,
                "page": c.page,
                "text": c.text,
                "citation": c.full_citation()
            }
            for c in standards_indexer.clauses
        ]

clause_index = LegacyClauseIndex()
