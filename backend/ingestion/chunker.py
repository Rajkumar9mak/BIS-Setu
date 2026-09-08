import re
from typing import List, Dict, Any
from pydantic import BaseModel, Field
from ingestion.clause_parser import StandardClause

class ClauseChunk(BaseModel):
    chunk_id: str
    clause_id: str
    standard_number: str
    standard_title: str
    clause_number: str
    clause_title: str
    edition_year: str
    page: int
    text: str
    content_for_embedding: str
    chunk_index: int
    total_chunks: int
    data_status: str
    metadata: Dict[str, Any] = Field(default_factory=dict)

class ClauseChunker:
    """
    Page and clause-aware chunker that preserves regulatory provenance,
    clause boundaries, and exact technical thresholds.
    """

    def __init__(self, max_words_per_chunk: int = 250, word_overlap: int = 40):
        self.max_words_per_chunk = max_words_per_chunk
        self.word_overlap = word_overlap

    def chunk_clause(self, clause: StandardClause) -> List[ClauseChunk]:
        raw_text = clause.text.strip()
        words = raw_text.split()

        # Context header added to ensure dense/lexical search retains standard and clause context
        header = f"[{clause.standard_number} Clause {clause.clause_number}: {clause.clause_title}]"

        # If text is concise enough, return single chunk
        if len(words) <= self.max_words_per_chunk:
            content_for_embedding = f"{header}\n{raw_text}"
            return [
                ClauseChunk(
                    chunk_id=f"{clause.id}_chk_0",
                    clause_id=clause.id,
                    standard_number=clause.standard_number,
                    standard_title=clause.standard_title,
                    clause_number=clause.clause_number,
                    clause_title=clause.clause_title,
                    edition_year=clause.edition_year,
                    page=clause.page,
                    text=raw_text,
                    content_for_embedding=content_for_embedding,
                    chunk_index=0,
                    total_chunks=1,
                    data_status=clause.data_status,
                    metadata={
                        "standard_number": clause.standard_number,
                        "clause_number": clause.clause_number,
                        "clause_title": clause.clause_title,
                        "page": clause.page,
                        "edition_year": clause.edition_year,
                        "category": clause.category,
                        "mandatory_status": clause.mandatory_status,
                        "document_name": clause.source.document_name,
                        "data_status": clause.data_status
                    }
                )
            ]

        # Multi-chunk splitting with overlap
        chunks: List[ClauseChunk] = []
        start = 0
        chunk_idx = 0

        while start < len(words):
            end = min(start + self.max_words_per_chunk, len(words))
            chunk_words = words[start:end]
            chunk_text = " ".join(chunk_words)

            chunks.append(
                ClauseChunk(
                    chunk_id=f"{clause.id}_chk_{chunk_idx}",
                    clause_id=clause.id,
                    standard_number=clause.standard_number,
                    standard_title=clause.standard_title,
                    clause_number=clause.clause_number,
                    clause_title=clause.clause_title,
                    edition_year=clause.edition_year,
                    page=clause.page,
                    text=chunk_text,
                    content_for_embedding=f"{header}\n{chunk_text}",
                    chunk_index=chunk_idx,
                    total_chunks=0,  # Will update after loop
                    data_status=clause.data_status,
                    metadata={
                        "standard_number": clause.standard_number,
                        "clause_number": clause.clause_number,
                        "clause_title": clause.clause_title,
                        "page": clause.page,
                        "edition_year": clause.edition_year,
                        "category": clause.category,
                        "mandatory_status": clause.mandatory_status,
                        "document_name": clause.source.document_name,
                        "data_status": clause.data_status
                    }
                )
            )

            if end == len(words):
                break
            start += self.max_words_per_chunk - self.word_overlap
            chunk_idx += 1

        total = len(chunks)
        for c in chunks:
            c.total_chunks = total

        return chunks

    def chunk_clauses(self, clauses: List[StandardClause]) -> List[ClauseChunk]:
        all_chunks: List[ClauseChunk] = []
        for clause in clauses:
            all_chunks.extend(self.chunk_clause(clause))
        return all_chunks

clause_chunker = ClauseChunker()
