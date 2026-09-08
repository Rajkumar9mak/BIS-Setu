import json
import re
import math
from typing import List, Dict, Any, Optional
import httpx
from config import STANDARDS_DIR, GEMINI_API_KEY

class ClauseIndex:
    def __init__(self):
        self.clauses: List[Dict[str, Any]] = []
        self._load_knowledge()

    def _load_knowledge(self):
        self.clauses = []
        if not STANDARDS_DIR.exists():
            return
        for json_file in STANDARDS_DIR.glob("*.json"):
            try:
                with open(json_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if isinstance(data, list):
                        self.clauses.extend(data)
            except Exception as e:
                print(f"Error loading {json_file}: {e}")

    def tokenize(self, text: str) -> List[str]:
        cleaned = re.sub(r"[^a-zA-Z0-9\s]", " ", text.lower())
        stopwords = {
            "a", "an", "the", "and", "or", "in", "on", "at", "to", "for", "with",
            "is", "are", "was", "were", "of", "from", "by", "that", "this", "it",
            "what", "how", "why", "which", "shall", "be", "as", "all", "under", "test",
            "requirements", "standard"
        }
        tokens = [t for t in cleaned.split() if len(t) > 1 and t not in stopwords]
        return tokens

    def search(self, query: str, top_k: int = 4, category: Optional[str] = None) -> List[Dict[str, Any]]:
        query_tokens = self.tokenize(query)
        if not query_tokens:
            query_tokens = [t.lower() for t in query.split() if len(t) > 1]
            if not query_tokens:
                return []

        scored_results = []

        for item in self.clauses:
            if category and category.lower() not in item.get("category", "").lower():
                continue

            doc_text = f"{item.get('standard_number', '')} {item.get('standard_title', '')} {item.get('clause_number', '')} {item.get('clause_title', '')} {item.get('text', '')}"
            doc_tokens = self.tokenize(doc_text)
            doc_token_counts = {}
            for t in doc_tokens:
                doc_token_counts[t] = doc_token_counts.get(t, 0) + 1

            score = 0.0
            matched_terms = 0

            for q_tok in query_tokens:
                # Exact token match
                if q_tok in doc_token_counts:
                    tf = doc_token_counts[q_tok] / (len(doc_tokens) + 1)
                    score += 2.0 + math.log(1 + tf * 10)
                    matched_terms += 1
                else:
                    # Substring match (e.g. 'kettle' in 'kettles')
                    for d_tok in doc_token_counts:
                        if (len(q_tok) >= 4 and q_tok in d_tok) or (len(d_tok) >= 4 and d_tok in q_tok):
                            score += 1.0
                            matched_terms += 1
                            break

            # Boost if query matches clause title or standard number directly
            clause_title_lower = item.get("clause_title", "").lower()
            std_num_lower = item.get("standard_number", "").lower()
            for q_tok in query_tokens:
                if q_tok in clause_title_lower:
                    score += 1.5
                if q_tok in std_num_lower:
                    score += 2.5

            if score > 0:
                result = dict(item)
                result["_relevance_score"] = round(score, 3)
                result["_matched_terms"] = matched_terms
                result["citation"] = f"[{item.get('standard_number', 'IS')}, Clause {item.get('clause_number', '')}, Page {item.get('page', '1')}]"
                scored_results.append(result)

        scored_results.sort(key=lambda x: x["_relevance_score"], reverse=True)
        return scored_results[:top_k]

clause_index = ClauseIndex()

async def synthesize_with_gemini(query: str, retrieved_clauses: List[Dict[str, Any]]) -> str:
    if not GEMINI_API_KEY:
        return ""
    
    context_text = "\n\n".join([
        f"SOURCE CLAUSE {i+1}: {c.get('standard_number')} Clause {c.get('clause_number')} ({c.get('clause_title')}, Page {c.get('page')}):\n{c.get('text')}"
        for i, c in enumerate(retrieved_clauses)
    ])

    prompt = f"""You are BIS Setu, the official AI compliance advisor for the Bureau of Indian Standards (BIS).
Answer the user's question accurately, strictly grounded in the Indian Standards excerpts provided below.

RULES:
1. Every major fact, threshold, or requirement MUST include an exact in-line citation tag in the format: [IS Number, Clause Number, Page N].
2. Do NOT invent, assume, or hallucinate standards or numbers not present in the excerpts.
3. If the excerpts do not contain the answer, state clearly: "The provided Indian Standards excerpts do not contain sufficient information on this specific aspect."
4. Structure your response with clear headings, bullet points, and highlight statutory limits or pass/fail criteria.

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
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(url, json=payload)
            if resp.status_code == 200:
                data = resp.json()
                text = data["candidates"][0]["content"]["parts"][0]["text"]
                return text
    except Exception as e:
        print(f"Gemini API call failed, falling back to local synthesizer: {e}")
    return ""

def synthesize_grounded_local(query: str, retrieved_clauses: List[Dict[str, Any]]) -> str:
    if not retrieved_clauses:
        return "I could not find sufficient authoritative information in the indexed Indian Standards for your query. Please verify the standard number on the e-BIS Manakonline portal or consult an authorized BIS officer."

    top_clause = retrieved_clauses[0]
    std_num = top_clause.get("standard_number")
    std_title = top_clause.get("standard_title")
    category = top_clause.get("category")

    lines = []
    lines.append(f"### BIS Compliance Analysis for: **{query}**")
    lines.append(f"**Primary Standard:** {std_num} — *{std_title}* ({category})\n")
    lines.append("Based on the authoritative clauses retrieved from the Indian Standards knowledge base:\n")

    for i, c in enumerate(retrieved_clauses, 1):
        lines.append(f"#### {i}. {c.get('clause_title')} (Clause {c.get('clause_number')})")
        lines.append(f"> \"{c.get('text')}\"")
        lines.append(f"**Source:** `{c.get('citation')}` | **Mandate:** `{c.get('mandatory_status')}`\n")

    lines.append("---")
    lines.append("**Key Compliance Takeaways:**")
    lines.append(f"- All products manufactured or imported must strictly adhere to the technical limits stipulated above before bearing the ISI mark.")
    lines.append(f"- Conformance must be validated through test reports from BIS recognized laboratories and verified in-house testing equipment.")
    lines.append(f"- Statutory requirement: Manufacturing without valid licence under this standard violates the BIS Act, 2016.")

    return "\n".join(lines)

async def query_rag_engine(query: str, category: Optional[str] = None) -> Dict[str, Any]:
    retrieved = clause_index.search(query, top_k=3, category=category)

    if not retrieved or retrieved[0]["_relevance_score"] < 1.2:
        return {
            "query": query,
            "answer": "I could not find authoritative clauses matching this specific query in the current BIS knowledge base. Please check the product category or consult the official e-BIS Manakonline portal.",
            "citations": [],
            "sources": [],
            "is_grounded": False
        }

    gemini_answer = await synthesize_with_gemini(query, retrieved)
    if gemini_answer:
        answer = gemini_answer
    else:
        answer = synthesize_grounded_local(query, retrieved)

    citations = [c["citation"] for c in retrieved]

    return {
        "query": query,
        "answer": answer,
        "citations": citations,
        "sources": retrieved,
        "is_grounded": True
    }
