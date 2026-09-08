import re
import math
from typing import List, Dict, Any, Optional, Set
from pydantic import BaseModel, Field
from ingestion.chunker import ClauseChunk

class RetrievedDoc(BaseModel):
    chunk_id: str
    clause_id: str
    standard_number: str
    standard_title: str
    clause_number: str
    clause_title: str
    page: int
    text: str
    edition_year: str = ""
    score: float = 0.0
    retrieval_source: str = "lexical"  # "lexical", "vector", "hybrid"
    data_status: str = "VERIFIED_CACHE"
    metadata: Dict[str, Any] = Field(default_factory=dict)

class LexicalBM25Retriever:
    """
    Production-grade BM25 lexical retriever tailored for regulatory Indian Standards,
    with query expansion for BIS codes and clause citations.
    """

    def __init__(self, k1: float = 1.5, b: float = 0.75):
        self.k1 = k1
        self.b = b
        self.chunks: List[ClauseChunk] = []
        self.doc_lengths: List[int] = []
        self.avg_doc_len: float = 0.0
        self.doc_freqs: Dict[str, int] = {}
        self.inverted_index: Dict[str, List[int]] = {}  # token -> list of chunk indices
        self.tf_index: Dict[int, Dict[str, int]] = {}   # chunk_idx -> {token: count}
        self.stopwords: Set[str] = {
            "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
            "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
            "below", "between", "both", "but", "by", "can't", "cannot", "could", "did", "do",
            "does", "doing", "don't", "down", "during", "each", "few", "for", "from", "further",
            "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him",
            "himself", "his", "how", "i", "if", "in", "into", "is", "it", "its", "itself",
            "let's", "me", "more", "most", "my", "myself", "no", "nor", "not", "of", "off",
            "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out",
            "over", "own", "same", "she", "should", "so", "some", "such", "than", "that",
            "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they",
            "this", "those", "through", "to", "too", "under", "until", "up", "very", "was",
            "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why",
            "with", "would", "you", "your", "yours", "yourself", "yourselves"
        }

    def tokenize(self, text: str) -> List[str]:
        # Preserve specific patterns like "IS 302", "19.101", numbers, units
        normalized = text.lower()
        # Extract clause numbers (e.g. 19.101, 7.1)
        clause_matches = re.findall(r"\b\d+\.\d+(?:\.\d+)?\b", normalized)
        # Extract alphanumeric words
        clean_words = re.findall(r"[a-z0-9]+", normalized)
        tokens = [w for w in clean_words if len(w) > 1 and w not in self.stopwords]
        tokens.extend(clause_matches)
        return tokens

    def fit(self, chunks: List[ClauseChunk]) -> None:
        self.chunks = chunks
        self.doc_lengths = []
        self.doc_freqs = {}
        self.inverted_index = {}
        self.tf_index = {}

        total_words = 0
        for idx, chunk in enumerate(chunks):
            # Include standard code and title in indexed text
            full_text = f"{chunk.standard_number} {chunk.clause_number} {chunk.clause_title} {chunk.text}"
            tokens = self.tokenize(full_text)
            self.doc_lengths.append(len(tokens))
            total_words += len(tokens)

            tf_map: Dict[str, int] = {}
            for t in tokens:
                tf_map[t] = tf_map.get(t, 0) + 1
            self.tf_index[idx] = tf_map

            for unique_token in tf_map.keys():
                self.doc_freqs[unique_token] = self.doc_freqs.get(unique_token, 0) + 1
                if unique_token not in self.inverted_index:
                    self.inverted_index[unique_token] = []
                self.inverted_index[unique_token].append(idx)

        num_docs = len(chunks)
        self.avg_doc_len = total_words / max(1, num_docs)

    def search(self, query: str, top_k: int = 10) -> List[RetrievedDoc]:
        if not self.chunks:
            return []

        query_tokens = self.tokenize(query)
        if not query_tokens:
            return []

        num_docs = len(self.chunks)
        scores: Dict[int, float] = {}

        for token in query_tokens:
            if token not in self.doc_freqs:
                continue

            # Lucene / Robertson BM25 IDF
            df = self.doc_freqs[token]
            idf = math.log(1.0 + (num_docs - df + 0.5) / (df + 0.5))

            for doc_idx in self.inverted_index.get(token, []):
                tf = self.tf_index[doc_idx].get(token, 0)
                doc_len = self.doc_lengths[doc_idx]

                # BM25 term weight
                numerator = tf * (self.k1 + 1)
                denominator = tf + self.k1 * (1 - self.b + self.b * (doc_len / self.avg_doc_len))
                term_score = idf * (numerator / max(1e-6, denominator))

                # Boost exact clause or standard code match in metadata
                chunk = self.chunks[doc_idx]
                if token == chunk.clause_number.lower():
                    term_score *= 2.5
                elif token in chunk.standard_number.lower():
                    term_score *= 2.0

                scores[doc_idx] = scores.get(doc_idx, 0.0) + term_score

        if not scores:
            return []

        # Sort docs by score descending
        sorted_indices = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:top_k]
        max_score = max((s for _, s in sorted_indices), default=1.0)
        norm_factor = max_score if max_score > 0 else 1.0

        results: List[RetrievedDoc] = []
        for doc_idx, raw_score in sorted_indices:
            chunk = self.chunks[doc_idx]
            norm_score = round(raw_score / norm_factor, 4)
            results.append(
                RetrievedDoc(
                    chunk_id=chunk.chunk_id,
                    clause_id=chunk.clause_id,
                    standard_number=chunk.standard_number,
                    standard_title=chunk.standard_title,
                    clause_number=chunk.clause_number,
                    clause_title=chunk.clause_title,
                    page=chunk.page,
                    text=chunk.text,
                    edition_year=chunk.edition_year,
                    score=norm_score,
                    retrieval_source="lexical",
                    data_status=chunk.data_status,
                    metadata={
                        **chunk.metadata,
                        "raw_bm25_score": round(raw_score, 4),
                        "norm_score": norm_score
                    }
                )
            )

        return results

lexical_retriever = LexicalBM25Retriever()
