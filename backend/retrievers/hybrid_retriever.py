from typing import List, Dict, Any, Optional
from retrievers.lexical_retriever import LexicalBM25Retriever, RetrievedDoc, lexical_retriever
from retrievers.vector_retriever import VectorRetriever, vector_retriever
from logging_config import logger

class HybridRetriever:
    """
    Hybrid retriever combining Lexical (BM25) and Dense Vector (ChromaDB)
    using Reciprocal Rank Fusion (RRF). Ensures high precision on exact clause numbers
    as well as strong semantic recall on natural-language regulatory questions.
    """

    def __init__(
        self,
        lexical: Optional[LexicalBM25Retriever] = None,
        vector: Optional[VectorRetriever] = None,
        rrf_k: int = 60
    ):
        self.lexical = lexical or lexical_retriever
        self.vector = vector or vector_retriever
        self.rrf_k = rrf_k

    def retrieve(
        self,
        query: str,
        top_k: int = 6,
        lexical_weight: float = 0.5,
        vector_weight: float = 0.5
    ) -> List[RetrievedDoc]:
        fetch_k = max(top_k * 2, 10)

        # 1. Fetch lexical BM25 results
        lexical_docs = self.lexical.search(query, top_k=fetch_k)
        
        # 2. Fetch vector ChromaDB results
        vector_docs = self.vector.search(query, top_k=fetch_k)

        # If one channel is unavailable or empty, fall back gracefully
        if not vector_docs and lexical_docs:
            logger.info(f"Hybrid retrieval: using lexical results only ({len(lexical_docs)} found)")
            return lexical_docs[:top_k]
        if not lexical_docs and vector_docs:
            logger.info(f"Hybrid retrieval: using vector results only ({len(vector_docs)} found)")
            return vector_docs[:top_k]
        if not lexical_docs and not vector_docs:
            return []

        # 3. Reciprocal Rank Fusion (RRF)
        rrf_scores: Dict[str, float] = {}
        merged_docs: Dict[str, RetrievedDoc] = {}
        lexical_ranks: Dict[str, int] = {}
        vector_ranks: Dict[str, int] = {}

        for rank, doc in enumerate(lexical_docs, 1):
            key = doc.chunk_id
            merged_docs[key] = doc
            lexical_ranks[key] = rank
            rrf_scores[key] = rrf_scores.get(key, 0.0) + (lexical_weight / (self.rrf_k + rank))

        for rank, doc in enumerate(vector_docs, 1):
            key = doc.chunk_id
            if key not in merged_docs:
                merged_docs[key] = doc
            vector_ranks[key] = rank
            rrf_scores[key] = rrf_scores.get(key, 0.0) + (vector_weight / (self.rrf_k + rank))

        # Sort by RRF score descending
        sorted_keys = sorted(rrf_scores.keys(), key=lambda k: rrf_scores[k], reverse=True)[:top_k]
        max_rrf = max((rrf_scores[k] for k in sorted_keys), default=1.0)

        fused_results: List[RetrievedDoc] = []
        for key in sorted_keys:
            doc = merged_docs[key]
            raw_rrf = rrf_scores[key]
            norm_score = round(raw_rrf / max_rrf, 4) if max_rrf > 0 else 0.0

            # Clone doc with updated score and provenance metadata
            fused_results.append(
                RetrievedDoc(
                    chunk_id=doc.chunk_id,
                    clause_id=doc.clause_id,
                    standard_number=doc.standard_number,
                    standard_title=doc.standard_title,
                    clause_number=doc.clause_number,
                    clause_title=doc.clause_title,
                    page=doc.page,
                    text=doc.text,
                    edition_year=doc.edition_year,
                    score=norm_score,
                    retrieval_source="hybrid",
                    data_status=doc.data_status,
                    metadata={
                        **doc.metadata,
                        "rrf_score": round(raw_rrf, 6),
                        "lexical_rank": lexical_ranks.get(key, None),
                        "vector_rank": vector_ranks.get(key, None)
                    }
                )
            )

        return fused_results

hybrid_retriever = HybridRetriever()
