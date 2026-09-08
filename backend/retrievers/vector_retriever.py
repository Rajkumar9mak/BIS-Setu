import re
import hashlib
from pathlib import Path
from typing import List, Dict, Any, Optional
import numpy as np

try:
    import chromadb
    from chromadb.config import Settings
    from chromadb.api.types import EmbeddingFunction, Documents, Embeddings
    CHROMA_AVAILABLE = True
except ImportError:
    chromadb = None
    Settings = None
    CHROMA_AVAILABLE = False
    
    class EmbeddingFunction:
        def __call__(self, input: Any) -> Any:
            return []
    Documents = List[str]
    Embeddings = List[List[float]]

from config import VECTOR_DB_PATH
from ingestion.chunker import ClauseChunk
from retrievers.lexical_retriever import RetrievedDoc
from logging_config import logger

class LocalRegulatoryEmbeddingFunction(EmbeddingFunction):
    """
    High-performance, 100% offline dense embedding function for Indian Standards.
    Produces deterministic L2-normalized 256-dimensional semantic representations
    using subword character n-grams and vocabulary token projection.
    Requires 0 network downloads and works seamlessly in offline environments.
    """

    def __init__(self, dimension: int = 256):
        self.dimension = dimension

    @staticmethod
    def name() -> str:
        return "local_regulatory_embedding"

    def get_config(self) -> Dict[str, Any]:
        return {"dimension": self.dimension}

    @staticmethod
    def build_from_config(config: Dict[str, Any]) -> "LocalRegulatoryEmbeddingFunction":
        return LocalRegulatoryEmbeddingFunction(dimension=config.get("dimension", 256))

    def _embed_single(self, text: str) -> List[float]:
        cleaned = text.lower().strip()
        vec = np.zeros(self.dimension, dtype=np.float32)

        # 1. Word tokens
        words = re.findall(r"[a-z0-9\.]+", cleaned)
        for w in words:
            h = int(hashlib.md5(w.encode("utf-8")).hexdigest(), 16)
            bucket = h % self.dimension
            sign = 1.0 if (h >> 8) % 2 == 0 else -1.0
            vec[bucket] += sign * (1.5 if len(w) > 4 else 1.0)

            # 2. Character 3-grams & 4-grams for subword morphology (e.g. 'insul', 'leak')
            for n in (3, 4):
                if len(w) >= n:
                    for i in range(len(w) - n + 1):
                        sub = w[i:i + n]
                        h_sub = int(hashlib.sha256(sub.encode("utf-8")).hexdigest(), 16)
                        sub_bucket = h_sub % self.dimension
                        sub_sign = 1.0 if (h_sub >> 8) % 2 == 0 else -1.0
                        vec[sub_bucket] += sub_sign * 0.4

        # L2 Normalization
        norm = np.linalg.norm(vec)
        if norm > 1e-6:
            vec = vec / norm
        else:
            vec[0] = 1.0

        return vec.tolist()

    def __call__(self, input: Documents) -> Embeddings:
        return [self._embed_single(doc) for doc in input]

class VectorRetriever:
    """
    ChromaDB-backed dense vector retriever for Indian Standards clauses.
    Persists embeddings locally without requiring external cloud vector services.
    """

    COLLECTION_NAME = "indian_standards_clauses"

    def __init__(self, persist_directory: Optional[Path] = None):
        self.persist_dir = persist_directory or VECTOR_DB_PATH
        self.persist_dir.mkdir(parents=True, exist_ok=True)
        self.client: Optional[Any] = None
        self.embedding_fn = LocalRegulatoryEmbeddingFunction(dimension=256)
        self.collection = None
        self._fallback_records: List[Dict[str, Any]] = []
        self._init_client()

    def _init_client(self):
        if not CHROMA_AVAILABLE or chromadb is None:
            logger.info("ChromaDB library not available, using in-memory vector storage")
            return
        try:
            self.client = chromadb.PersistentClient(
                path=str(self.persist_dir),
                settings=Settings(anonymized_telemetry=False)
            )
            # Try to get or create; if conflict, recreate collection cleanly
            try:
                self.collection = self.client.get_or_create_collection(
                    name=self.COLLECTION_NAME,
                    embedding_function=self.embedding_fn,
                    metadata={"hnsw:space": "cosine"}
                )
            except Exception as conf_err:
                logger.warning(f"Re-initializing Chroma collection due to configuration mismatch: {conf_err}")
                try:
                    self.client.delete_collection(name=self.COLLECTION_NAME)
                except Exception:
                    pass
                self.collection = self.client.create_collection(
                    name=self.COLLECTION_NAME,
                    embedding_function=self.embedding_fn,
                    metadata={"hnsw:space": "cosine"}
                )
            logger.info(f"Initialized ChromaDB vector store at: {self.persist_dir}")
        except Exception as e:
            logger.error(f"Failed to initialize ChromaDB: {e}", exc_info=True)
            self.client = None
            self.collection = None

    def add_chunks(self, chunks: List[ClauseChunk]) -> int:
        if not self.collection:
            self._init_client()
        if not chunks:
            return 0

        if not self.collection:
            # In-memory fallback
            for c in chunks:
                vec = np.array(self.embedding_fn._embed_single(c.content_for_embedding), dtype=np.float32)
                self._fallback_records.append({"chunk": c, "vec": vec})
            logger.info(f"In-memory vector store indexed {len(chunks)} clause chunks")
            return len(chunks)

        # Batch upsert chunks
        ids = [c.chunk_id for c in chunks]
        documents = [c.content_for_embedding for c in chunks]
        metadatas = [
            {
                "clause_id": c.clause_id,
                "standard_number": c.standard_number,
                "standard_title": c.standard_title,
                "clause_number": c.clause_number,
                "clause_title": c.clause_title,
                "page": c.page,
                "edition_year": c.edition_year,
                "data_status": c.data_status,
                "text": c.text[:1000]
            }
            for c in chunks
        ]

        batch_size = 100
        total_added = 0
        for i in range(0, len(ids), batch_size):
            end_idx = min(i + batch_size, len(ids))
            self.collection.upsert(
                ids=ids[i:end_idx],
                documents=documents[i:end_idx],
                metadatas=metadatas[i:end_idx]
            )
            total_added += (end_idx - i)

        logger.info(f"Vector store indexed {total_added} clause chunks in collection '{self.COLLECTION_NAME}'")
        return total_added

    def search(self, query: str, top_k: int = 10, category_filter: Optional[str] = None) -> List[RetrievedDoc]:
        if not self.collection:
            if not self._fallback_records:
                return []
            q_vec = np.array(self.embedding_fn._embed_single(query), dtype=np.float32)
            scored = []
            for item in self._fallback_records:
                sim = float(np.dot(q_vec, item["vec"]))
                scored.append((sim, item["chunk"]))
            scored.sort(key=lambda x: x[0], reverse=True)

            retrieved: List[RetrievedDoc] = []
            for sim, chunk in scored[:top_k]:
                norm_sim = max(0.0, min(1.0, (sim + 1.0) / 2.0))
                retrieved.append(
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
                        score=round(norm_sim, 4),
                        retrieval_source="vector",
                        data_status=chunk.data_status,
                        metadata=chunk.metadata
                    )
                )
            return retrieved

        try:
            where_filter = None
            count = self.collection.count()
            if count == 0:
                return []

            results = self.collection.query(
                query_texts=[query],
                n_results=min(top_k, count),
                where=where_filter
            )

            retrieved: List[RetrievedDoc] = []
            if not results or not results["ids"] or not results["ids"][0]:
                return []

            ids = results["ids"][0]
            distances = results["distances"][0] if results.get("distances") else [0.5] * len(ids)
            metadatas = results["metadatas"][0] if results.get("metadatas") else [{}] * len(ids)
            docs = results["documents"][0] if results.get("documents") else [""] * len(ids)

            for i in range(len(ids)):
                meta = metadatas[i] or {}
                dist = distances[i]
                sim_score = max(0.0, min(1.0, 1.0 - (dist / 2.0)))

                retrieved.append(
                    RetrievedDoc(
                        chunk_id=ids[i],
                        clause_id=meta.get("clause_id", ids[i]),
                        standard_number=meta.get("standard_number", "IS Standard"),
                        standard_title=meta.get("standard_title", ""),
                        clause_number=str(meta.get("clause_number", "")),
                        clause_title=meta.get("clause_title", ""),
                        page=int(meta.get("page", 1)),
                        text=meta.get("text", docs[i]),
                        edition_year=meta.get("edition_year", ""),
                        score=round(sim_score, 4),
                        retrieval_source="vector",
                        data_status=meta.get("data_status", "VERIFIED_CACHE"),
                        metadata={
                            **meta,
                            "cosine_distance": round(dist, 4),
                            "similarity_score": round(sim_score, 4)
                        }
                    )
                )

            return retrieved

        except Exception as e:
            logger.warning(f"Vector search failed with query '{query}': {e}")
            return []

    def count(self) -> int:
        if self.collection:
            try:
                return self.collection.count()
            except Exception:
                return 0
        return len(self._fallback_records)

vector_retriever = VectorRetriever()
