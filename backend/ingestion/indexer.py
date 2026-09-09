import json
from pathlib import Path
from typing import List, Dict, Any, Optional
from config import STANDARDS_DIR, DATA_DIR
from ingestion.pdf_parser import pdf_parser
from ingestion.clause_parser import clause_parser, StandardClause
from ingestion.chunker import clause_chunker, ClauseChunk
from retrievers.lexical_retriever import lexical_retriever
from retrievers.vector_retriever import vector_retriever
from logging_config import logger

class StandardsIndexer:
    """
    Central document indexer that digests PDF standard specifications and structured
    standards datasets into unified BM25 and ChromaDB vector search indexes.
    """

    def __init__(self, standards_dir: Optional[Path] = None, docs_dir: Optional[Path] = None):
        self.standards_dir = standards_dir or STANDARDS_DIR
        self.docs_dir = docs_dir or (DATA_DIR / "standards_docs")
        self.docs_dir.mkdir(parents=True, exist_ok=True)
        self.clauses: List[StandardClause] = []
        self.chunks: List[ClauseChunk] = []

    def load_json_standards(self) -> List[StandardClause]:
        loaded_clauses: List[StandardClause] = []
        if not self.standards_dir.exists():
            return loaded_clauses

        for json_path in self.standards_dir.glob("*.json"):
            try:
                with open(json_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if isinstance(data, list):
                        for item in data:
                            clause = clause_parser.parse_from_json_item(item, file_name=json_path.name)
                            loaded_clauses.append(clause)
                    elif isinstance(data, dict) and "clauses" in data:
                        for item in data["clauses"]:
                            clause = clause_parser.parse_from_json_item(item, file_name=json_path.name)
                            loaded_clauses.append(clause)
            except Exception as e:
                logger.error(f"Error loading standards JSON {json_path.name}: {e}")

        logger.info(f"Loaded {len(loaded_clauses)} clauses from JSON standards knowledge")
        return loaded_clauses

    def load_pdf_standards(self) -> List[StandardClause]:
        loaded_clauses: List[StandardClause] = []
        if not self.docs_dir.exists():
            return loaded_clauses

        for pdf_path in self.docs_dir.glob("*.pdf"):
            try:
                parse_res = pdf_parser.parse_pdf(pdf_path)
                clauses = clause_parser.parse_pdf_result(parse_res, data_status="OFFICIAL")
                loaded_clauses.extend(clauses)
                logger.info(f"Parsed {len(clauses)} clauses from PDF: {pdf_path.name}")
            except Exception as e:
                logger.error(f"Error ingesting PDF standard {pdf_path.name}: {e}")

        return loaded_clauses

    def ingest_and_index_all(self) -> Dict[str, Any]:
        logger.info("Initiating full standards ingestion and indexing pipeline...")

        # 1. Collect clauses from JSON and PDFs
        json_clauses = self.load_json_standards()
        pdf_clauses = self.load_pdf_standards()
        self.clauses = json_clauses + pdf_clauses

        # 2. Chunk clauses while preserving metadata and provenance
        self.chunks = clause_chunker.chunk_clauses(self.clauses)
        logger.info(f"Generated {len(self.chunks)} chunks from {len(self.clauses)} standard clauses")

        # 3. Fit Lexical BM25 index
        lexical_retriever.fit(self.chunks)

        # 4. Upsert into ChromaDB vector store
        vector_count = vector_retriever.add_chunks(self.chunks)

        stats = {
            "total_clauses": len(self.clauses),
            "total_chunks": len(self.chunks),
            "lexical_index_size": len(self.chunks),
            "vector_index_size": vector_retriever.count(),
            "indexed_standards": list(set(c.standard_number for c in self.clauses))
        }
        logger.info(f"Indexing complete: {stats}")
        return stats

    def get_stats(self) -> Dict[str, Any]:
        return {
            "total_clauses": len(self.clauses),
            "total_chunks": len(self.chunks),
            "vector_records": vector_retriever.count(),
            "standards_indexed": list(set(c.standard_number for c in self.clauses))
        }

standards_indexer = StandardsIndexer()
