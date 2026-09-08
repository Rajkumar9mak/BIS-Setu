from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from retrievers.lexical_retriever import RetrievedDoc

class Citation(BaseModel):
    standard_number: str
    clause_number: str
    clause_title: str
    page: int
    document: str
    edition_year: str = ""
    data_status: str = "VERIFIED_CACHE"
    citation_tag: str

class CitationBuilder:
    """
    Builds authoritative, page-level regulatory citations compliant with BIS Setu specifications:
    [IS Standard Number, Clause Number, Page N]
    """

    def build_citation(self, doc: RetrievedDoc) -> Citation:
        doc_name = doc.metadata.get("document_name") or f"{doc.standard_number.lower().replace(' ', '_')}.pdf"
        tag = f"[{doc.standard_number}, Clause {doc.clause_number}, Page {doc.page}]"
        
        return Citation(
            standard_number=doc.standard_number,
            clause_number=doc.clause_number,
            clause_title=doc.clause_title,
            page=doc.page,
            document=doc_name,
            edition_year=doc.edition_year,
            data_status=doc.data_status,
            citation_tag=tag
        )

    def build_citations(self, docs: List[RetrievedDoc]) -> List[Citation]:
        citations = []
        seen = set()
        for doc in docs:
            cit = self.build_citation(doc)
            key = (cit.standard_number, cit.clause_number, cit.page)
            if key not in seen:
                seen.add(key)
                citations.append(cit)
        return citations

    def format_context_for_prompt(self, docs: List[RetrievedDoc]) -> str:
        """
        Formats retrieved clauses into strict grounded context for Gemini or local synthesis.
        """
        blocks = []
        for i, doc in enumerate(docs, 1):
            tag = f"[{doc.standard_number}, Clause {doc.clause_number}, Page {doc.page}]"
            blocks.append(
                f"--- EVIDENCE ITEM {i} ---\n"
                f"CITATION TAG: {tag}\n"
                f"STANDARD: {doc.standard_number} - {doc.standard_title} (Edition: {doc.edition_year or 'N/A'})\n"
                f"CLAUSE: {doc.clause_number} ({doc.clause_title}) [Page {doc.page}]\n"
                f"PROVENANCE STATUS: {doc.data_status}\n"
                f"STATUTORY TEXT:\n{doc.text.strip()}\n"
            )
        return "\n\n".join(blocks)

citation_builder = CitationBuilder()
