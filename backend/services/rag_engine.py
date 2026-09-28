import re
from typing import List, Dict, Any, Optional
import httpx
from config import GEMINI_API_KEY
from ingestion.indexer import standards_indexer
from retrievers.hybrid_retriever import hybrid_retriever
from retrievers.reranker import reranker
from retrievers.relevance_filter import relevance_filter, StandardDetector
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

    prompt = f"""You are BIS-Setu, an AI-powered Indian Standards and BIS Compliance Assistant.

Convert retrieved BIS evidence into a SHORT, STRUCTURED, EASY-TO-READ answer.

USER QUERY:
{query}

RETRIEVED EVIDENCE:
{context_text}

━━━ GROUNDING RULES ━━━
1. Use ONLY information from the retrieved evidence. Do NOT invent limits, clauses, standards, fees, or legal conclusions.
2. Every technical claim must cite its source using compact format: [IS XXX, Cl. X.X, p. Y]
3. Do NOT combine information from unrelated standards or products.
4. If evidence conflicts, state the conflict explicitly — do not choose one silently.
5. If evidence is insufficient, say: "The available BIS evidence is insufficient to give a reliable conclusion."
6. Preserve exact standard numbers, years, clause numbers, and page numbers.

━━━ RELEVANCE FILTER ━━━
Only include evidence relevant to the user's product/question. Exclude unrelated standards even if retrieved. If relevance is uncertain, label as "Potentially relevant" not "Applicable".

━━━ RESPONSE FORMAT ━━━
Give the answer FIRST. No introductory paragraphs. No question repetition.

### 🔎 Applicable Standard
**[Standard Number]** — [Short title]
One sentence on why it is relevant.

### 📌 Key Requirements
Use concise bullet points with bold values:
- **[Parameter]:** [value] `[IS XXX, Cl. X.X, p. Y]`
  - Condition: [if applicable]

OR use a compact table for numerical limits:
| Parameter | Requirement | Reference |
|---|---|---|
| [name] | **[value]** | `[IS XXX, Cl. X.X, p. Y]` |

### ⚠️ Important
2-4 short bullets maximum. Only include if supported by evidence.
- Do NOT auto-generate: "Manufacturers must comply", "Testing in BIS labs required", "ISI mark mandatory", "Non-compliance violates law" — unless the evidence explicitly says so.
- If certification/QCO is not established by evidence, say so.

### 📚 Sources
- **[Standard]** — Cl. X.X, p. Y
Combine multiple clauses from the same standard. Do not repeat standards.

━━━ WHAT TO AVOID ━━━
- Long paragraphs, legal language, PDF quotations
- Repeating the same fact in multiple sections
- Generic compliance claims not in the evidence
- Confidence scores unless meaningful
- "BIS Compliance Analysis" report headers
- Sections like "Compliance Interpretation", "Related Requirements" (fold into Key Requirements)

━━━ WITHDRAWN STANDARDS ━━━
If a standard is withdrawn, display: ⚠️ **WITHDRAWN** — do not present as current.

The answer should fit on one screen. Make BIS-Setu feel like a smart compliance assistant, not a PDF summarizer.
"""
    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"temperature": 0.1, "maxOutputTokens": 1500}
        }
        async with httpx.AsyncClient(timeout=14.0) as client:
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

def extract_key_requirement_summary(doc) -> str:
    """
    Extracts the key technical requirement sentence or structured thresholds
    from a standard clause without simplistic or destructive regex truncation.
    """
    text = doc.text.strip()

    # 1. Check for structured sub-items like a) ... b) ... c) ...
    # e.g. "a) 72 ± 1 hour (3 days) not less than 16.0 MPa; b) 168 ± 2 hours (7 days) not less than 22.0 MPa..."
    sub_items = re.findall(r"([a-z]\)\s*[^;\n]+(?:;|\.|$))", text)
    if len(sub_items) >= 2:
        return "; ".join(item.strip().rstrip(";") for item in sub_items)

    # 2. Extract requirement sentences containing technical requirement verbs/keywords
    raw_sentences = [s.strip() for s in re.split(r"(?<=[.;])\s+", text) if len(s.strip()) > 10]
    req_keywords = [
        "shall not exceed", "shall be not less than", "shall be", "shall conform",
        "shall not", "must not", "shall have", "shall", "must", "not exceed",
        "not less than", "not more than", "mandatory", "maximum", "minimum",
        "peak acceleration", "penetration", "drop height", "tolerance", "mass of"
    ]

    for sent in raw_sentences:
        sent_lower = sent.lower()
        if any(kw in sent_lower for kw in req_keywords):
            cleaned_sent = sent.rstrip(";")
            if len(cleaned_sent) > 220:
                cleaned_sent = cleaned_sent[:217] + "..."
            return cleaned_sent

    # 3. Fallback to first substantive sentence of the clause
    if raw_sentences:
        first_sent = raw_sentences[0].rstrip(";")
        if len(first_sent) > 220:
            first_sent = first_sent[:217] + "..."
        return first_sent

    return text[:150]

def validate_citation_integrity(answer: str, filtered_docs: list) -> str:
    """
    Enforces that the generated answer cites and references ONLY standards present in filtered_docs.
    Any line citing or referencing an unauthorized standard is sanitized.
    """
    if not filtered_docs:
        return answer

    allowed_digits = set()
    for d in filtered_docs:
        for digit in StandardDetector.extract_standard_digits(d.standard_number):
            allowed_digits.add(digit)

    cleaned_lines = []
    for line in answer.split("\n"):
        line_std_digits = StandardDetector.extract_standard_digits(line)
        if line_std_digits:
            unauthorized = [d for d in line_std_digits if d not in allowed_digits]
            if unauthorized:
                logger.warning(
                    f"[CitationIntegrity] Stripped line citing unapproved standard: '{line.strip()}' "
                    f"(unauthorized: {unauthorized}, allowed: {allowed_digits})"
                )
                continue
        cleaned_lines.append(line)

    return "\n".join(cleaned_lines)

def synthesize_grounded_local(query: str, top_docs: list) -> str:
    """
    Deterministic synthesizer producing the compact BIS-Setu response format:
    🔎 Applicable Standard → 📌 Key Requirements → ⚠️ Important → 📚 Sources
    """
    if not top_docs:
        return (
            "### ℹ️ Evidence Limitation\n\n"
            "The available BIS evidence is not sufficient to give a reliable answer to this question."
        )

    primary_doc = top_docs[0]
    lines = []

    # 1. Applicable Standard
    lines.append("### 🔎 Applicable Standard\n")
    lines.append(f"**{primary_doc.standard_number}** — {primary_doc.standard_title}\n")
    lines.append(f"Covers requirements related to *{primary_doc.clause_title}*.\n")

    # 2. Key Requirements
    lines.append("### 📌 Key Requirements\n")

    for doc in top_docs:
        req_title = doc.clause_title or f"Clause {doc.clause_number}"
        req_summary = extract_key_requirement_summary(doc)
        ref_str = f"`[{doc.standard_number}, Cl. {doc.clause_number}, p. {doc.page}]`"
        lines.append(f"- **{req_title}:** {req_summary} {ref_str}")

    # 3. Important
    lines.append("\n### ⚠️ Important\n")
    lines.append("- Check the latest applicable edition of this standard.")
    lines.append("- Certification/QCO applicability is not established by the retrieved evidence — verify separately.")

    # Add withdrawn warning if applicable
    for doc in top_docs:
        status = doc.metadata.get("status", "").upper()
        if "WITHDRAWN" in status:
            lines.append(f"- ⚠️ **{doc.standard_number}** is marked **WITHDRAWN** — do not treat as current.")
            break

    # 4. Sources (compact, deduplicated)
    lines.append("\n### 📚 Sources\n")
    seen_standards = {}
    for doc in top_docs:
        std = doc.standard_number
        clause_ref = f"Cl. {doc.clause_number}, p. {doc.page}"
        if std not in seen_standards:
            seen_standards[std] = []
        if clause_ref not in seen_standards[std]:
            seen_standards[std].append(clause_ref)

    for std, refs in seen_standards.items():
        lines.append(f"- **{std}** — {'; '.join(refs)}")

    return "\n".join(lines)

async def query_rag_engine(query: str, category: Optional[str] = None) -> Dict[str, Any]:
    """
    Complete 5-stage hybrid RAG pipeline:
    Hybrid Retrieval (top 15) -> Reranking (top 10) -> Relevance Filter (top 5) -> Grounding Validation -> Synthesis -> Verified Output
    """
    clean_query = query.strip()
    if not clean_query:
        return {
            "query": "",
            "answer": "Please provide a query regarding Indian Standards or BIS certification.",
            "applicable_standard": "Not Determined",
            "standard_title": "",
            "relevant_requirement": "",
            "evidence": "",
            "source": "N/A",
            "is_grounded": False,
            "grounded": False,
            "confidence": 0.0,
            "confidence_level": "Low",
            "citations": [],
            "structured_citations": [],
            "sources": [],
            "warnings": ["EMPTY_QUERY: Query string was empty."]
        }

    # Stage 1: Candidate Retrieval (BM25 + Vector)
    retrieved_candidates = hybrid_retriever.retrieve(clean_query, top_k=15)

    # Stage 2: Re-ranking
    reranked_docs = reranker.rerank(clean_query, retrieved_candidates, top_k=10)

    # Stage 3: Relevance Threshold Filtering & Cross-Standard Contamination Prevention
    filtered_docs = relevance_filter.filter(
        clean_query,
        reranked_docs,
        detected_standard=None,
        detected_category=category
    )

    # Stage 4: Grounding Check & Confidence Evaluation
    grounding_eval = grounding_validator.evaluate(clean_query, filtered_docs)

    # If evidence is insufficient, return safe refusal without leaking irrelevant sources
    if not grounding_eval.has_sufficient_evidence:
        return {
            "query": clean_query,
            "answer": grounding_eval.unsupported_reason,
            "applicable_standard": "Not Determined",
            "standard_title": "",
            "relevant_requirement": "",
            "evidence": "",
            "source": "N/A",
            "is_grounded": False,
            "grounded": False,
            "confidence": grounding_eval.confidence,
            "confidence_level": "Low",
            "citations": [],
            "structured_citations": [],
            "sources": [],
            "warnings": grounding_eval.warnings
        }

    # Stage 5: Build structured citations & formatted context strictly from filtered_docs
    citations = citation_builder.build_citations(filtered_docs)
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
    context_text = citation_builder.format_context_for_prompt(filtered_docs)

    # Synthesis (Gemini with deterministic fallback)
    gemini_answer = await synthesize_with_gemini(clean_query, context_text)
    if gemini_answer and len(gemini_answer.strip()) > 30:
        raw_answer = gemini_answer
    else:
        raw_answer = synthesize_grounded_local(clean_query, filtered_docs)

    # Post-validation check
    final_answer, final_eval = grounding_validator.post_validate_answer(
        raw_answer, filtered_docs, grounding_eval
    )

    # Citation Integrity Validation: strip any unauthorized citations or phantom standards
    final_answer = validate_citation_integrity(final_answer, filtered_docs)

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
            "citation": f"[{d.standard_number}, Cl. {d.clause_number}, p. {d.page}]",
            "_relevance_score": d.score
        }
        for d in filtered_docs
    ]

    primary_doc = filtered_docs[0] if filtered_docs else None
    conf_score = final_eval.confidence
    conf_level = "High" if conf_score >= 0.70 else ("Medium" if conf_score >= 0.40 else "Low")

    return {
        "query": clean_query,
        "answer": final_answer,
        "applicable_standard": primary_doc.standard_number if primary_doc else "Not Determined",
        "standard_title": primary_doc.standard_title if primary_doc else "",
        "relevant_requirement": primary_doc.clause_title if primary_doc else "",
        "evidence": primary_doc.text if primary_doc else "",
        "source": f"{primary_doc.standard_number}, Cl. {primary_doc.clause_number}, p. {primary_doc.page}" if primary_doc else "N/A",
        "is_grounded": final_eval.is_grounded,
        "grounded": final_eval.is_grounded,
        "confidence": conf_score,
        "confidence_level": conf_level,
        "citations": citation_tags,
        "structured_citations": structured_citations,
        "sources": sources,
        "warnings": final_eval.warnings
    }

def get_clause_by_id(clause_id: str) -> Optional[Dict[str, Any]]:
    cid_norm = clause_id.lower().replace("-", "_").strip()
    for c in standards_indexer.clauses:
        c_norm = c.id.lower().replace("-", "_").strip()
        if c.id == clause_id or c_norm == cid_norm:
            return {
                "id": c.id,
                "standard_code": c.standard_number,
                "standard_number": c.standard_number,
                "standard_title": c.standard_title,
                "clause_number": c.clause_number,
                "clause_title": c.clause_title,
                "page": c.page,
                "text": c.text,
                "citation": c.full_citation(),
                "mandatory_status": getattr(c, "mandatory_status", "Statutory")
            }
    # Fallback fuzzy match by standard number and clause number
    for c in standards_indexer.clauses:
        if c.clause_number.lower() in cid_norm:
            return {
                "id": c.id,
                "standard_code": c.standard_number,
                "standard_number": c.standard_number,
                "standard_title": c.standard_title,
                "clause_number": c.clause_number,
                "clause_title": c.clause_title,
                "page": c.page,
                "text": c.text,
                "citation": c.full_citation(),
                "mandatory_status": getattr(c, "mandatory_status", "Statutory")
            }
    return None

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
