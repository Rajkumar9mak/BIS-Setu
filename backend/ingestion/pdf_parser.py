import re
from pathlib import Path
from typing import List, Dict, Any, Union, Optional
from pydantic import BaseModel, Field
import pypdf
from logging_config import logger

class PageContent(BaseModel):
    page_number: int = Field(..., description="1-indexed page number from the PDF")
    text: str = Field(..., description="Cleaned text extracted from the page")
    char_count: int = 0
    metadata: Dict[str, Any] = Field(default_factory=dict)

class PDFParseResult(BaseModel):
    file_name: str
    total_pages: int
    pages: List[PageContent]
    document_metadata: Dict[str, Any] = Field(default_factory=dict)
    is_scanned: bool = False

class PDFParser:
    """
    Page-aware PDF text extractor preserving page numbers, document metadata,
    and cleaning headers/footers.
    """

    def __init__(self, min_chars_per_page: int = 20):
        self.min_chars_per_page = min_chars_per_page

    def clean_text(self, text: str) -> str:
        if not text:
            return ""
        # Normalize carriage returns and non-breaking spaces
        text = text.replace("\r\n", "\n").replace("\r", "\n").replace("\xa0", " ")
        # Fix hyphenated line breaks (e.g. "certifi-\ncation" -> "certification")
        text = re.sub(r"(\w+)-\n(\w+)", r"\1\2", text)
        # Collapse excessive blank lines
        text = re.sub(r"\n{3,}", "\n\n", text)
        # Strip trailing/leading spaces on lines
        lines = [line.strip() for line in text.split("\n")]
        return "\n".join(lines).strip()

    def parse_pdf(self, file_path: Union[str, Path]) -> PDFParseResult:
        path = Path(file_path)
        if not path.exists():
            raise FileNotFoundError(f"PDF file not found at: {path}")

        logger.info(f"Parsing PDF document: {path.name}")
        with open(path, "rb") as f:
            reader = pypdf.PdfReader(f)
            total_pages = len(reader.pages)
            
            # Extract doc metadata
            doc_meta = {}
            if reader.metadata:
                for k, v in reader.metadata.items():
                    key = k.lstrip("/")
                    doc_meta[key] = str(v) if v is not None else ""

            pages: List[PageContent] = []
            empty_pages_count = 0

            for idx, page in enumerate(reader.pages):
                page_num = idx + 1
                try:
                    raw_text = page.extract_text() or ""
                    cleaned = self.clean_text(raw_text)
                    if len(cleaned) < self.min_chars_per_page:
                        empty_pages_count += 1

                    pages.append(
                        PageContent(
                            page_number=page_num,
                            text=cleaned,
                            char_count=len(cleaned),
                            metadata={"file_name": path.name, "page": page_num}
                        )
                    )
                except Exception as e:
                    logger.warning(f"Error extracting text from {path.name} page {page_num}: {e}")
                    pages.append(
                        PageContent(
                            page_number=page_num,
                            text="",
                            char_count=0,
                            metadata={"file_name": path.name, "page": page_num, "error": str(e)}
                        )
                    )

            is_scanned = (empty_pages_count / max(1, total_pages)) > 0.8

            return PDFParseResult(
                file_name=path.name,
                total_pages=total_pages,
                pages=pages,
                document_metadata=doc_meta,
                is_scanned=is_scanned
            )

    def parse_bytes(self, file_bytes: bytes, file_name: str = "document.pdf") -> PDFParseResult:
        import io
        stream = io.BytesIO(file_bytes)
        reader = pypdf.PdfReader(stream)
        total_pages = len(reader.pages)

        doc_meta = {}
        if reader.metadata:
            for k, v in reader.metadata.items():
                key = k.lstrip("/")
                doc_meta[key] = str(v) if v is not None else ""

        pages: List[PageContent] = []
        empty_pages = 0

        for idx, page in enumerate(reader.pages):
            page_num = idx + 1
            raw_text = page.extract_text() or ""
            cleaned = self.clean_text(raw_text)
            if len(cleaned) < self.min_chars_per_page:
                empty_pages += 1
            pages.append(
                PageContent(
                    page_number=page_num,
                    text=cleaned,
                    char_count=len(cleaned),
                    metadata={"file_name": file_name, "page": page_num}
                )
            )

        return PDFParseResult(
            file_name=file_name,
            total_pages=total_pages,
            pages=pages,
            document_metadata=doc_meta,
            is_scanned=(empty_pages / max(1, total_pages)) > 0.8
        )

pdf_parser = PDFParser()
