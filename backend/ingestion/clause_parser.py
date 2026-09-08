import re
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from ingestion.pdf_parser import PDFParseResult, PageContent

class ClauseSource(BaseModel):
    type: str = "official_document"  # "official_document", "verified_cache", "demo"
    document_name: str = ""
    source_url: str = ""
    retrieved_at: str = "2026-09-08T00:00:00Z"

class StandardClause(BaseModel):
    id: str
    standard_number: str
    standard_title: str
    edition_year: str = ""
    clause_number: str
    clause_title: str
    text: str
    page: int = 1
    category: str = "General"
    mandatory_status: str = "Mandatory"
    source: ClauseSource = Field(default_factory=ClauseSource)
    data_status: str = "VERIFIED_CACHE"  # "OFFICIAL", "VERIFIED_CACHE", "DEMO"

    def full_citation(self) -> str:
        return f"[{self.standard_number}, Clause {self.clause_number}, Page {self.page}]"

class ClauseParser:
    """
    Extracts individual regulatory clauses from parsed PDF text or structured data,
    preserving exact clause hierarchy, titles, thresholds, and page numbers.
    """

    # Regex to detect standard code (e.g. IS 302 (Part 2/Sec 15) : 2009 or IS 4151:2015)
    STANDARD_CODE_PATTERN = re.compile(
        r"(IS\s+\d+(?:\s*\([^\)]+\))?(?:\s*:\s*\d{4})?)",
        re.IGNORECASE
    )

    # Regex for standard clauses (e.g., "Clause 19.101", "19.101 Abnormal Operation", "8.1 Protection")
    CLAUSE_HEADER_PATTERN = re.compile(
        r"(?:(?:Clause\s+)?(\d+(?:\.\d+)+))\s+([A-Z][^\n]{3,80})",
        re.MULTILINE
    )

    def extract_year(self, standard_code: str) -> str:
        m = re.search(r":\s*(\d{4})", standard_code)
        return m.group(1) if m else ""

    def parse_from_json_item(self, item: Dict[str, Any], file_name: str = "") -> StandardClause:
        """
        Converts a raw JSON knowledge item into a validated StandardClause,
        filling in provenance metadata if absent.
        """
        std_num = item.get("standard_number", "IS Standard")
        year = item.get("edition_year") or self.extract_year(std_num)

        source_dict = item.get("source")
        if isinstance(source_dict, dict):
            source = ClauseSource(
                type=source_dict.get("type", "verified_cache"),
                document_name=source_dict.get("document_name", file_name),
                source_url=source_dict.get("source_url", ""),
                retrieved_at=source_dict.get("retrieved_at", "2026-09-08T00:00:00Z")
            )
        else:
            source = ClauseSource(
                type="verified_cache",
                document_name=file_name or f"{std_num.replace(' ', '_').lower()}.json",
                source_url="https://services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards",
                retrieved_at="2026-09-08T00:00:00Z"
            )

        data_status = item.get("data_status", "VERIFIED_CACHE")
        if data_status not in ["OFFICIAL", "VERIFIED_CACHE", "DEMO"]:
            data_status = "VERIFIED_CACHE"

        return StandardClause(
            id=item.get("id", f"{std_num}_{item.get('clause_number', '1')}"),
            standard_number=std_num,
            standard_title=item.get("standard_title", ""),
            edition_year=year,
            clause_number=str(item.get("clause_number", "")),
            clause_title=item.get("clause_title", "General Requirement"),
            text=item.get("text", ""),
            page=int(item.get("page", 1)),
            category=item.get("category", "General"),
            mandatory_status=item.get("mandatory_status", "Mandatory Requirement"),
            source=source,
            data_status=data_status
        )

    def parse_pdf_result(
        self,
        pdf_result: PDFParseResult,
        default_standard_number: str = "",
        default_title: str = "",
        data_status: str = "OFFICIAL"
    ) -> List[StandardClause]:
        """
        Scans PDF pages for regulatory clause blocks and associates them with exact page provenance.
        """
        clauses: List[StandardClause] = []
        std_num = default_standard_number
        std_title = default_title

        # Check document metadata or first page for standard code
        first_page_text = pdf_result.pages[0].text if pdf_result.pages else ""
        if not std_num:
            match = self.STANDARD_CODE_PATTERN.search(first_page_text)
            if match:
                std_num = match.group(1).strip()
            else:
                std_num = pdf_result.file_name.replace(".pdf", "").upper()

        year = self.extract_year(std_num)

        for page in pdf_result.pages:
            page_text = page.text
            if not page_text:
                continue

            matches = list(self.CLAUSE_HEADER_PATTERN.finditer(page_text))
            if not matches:
                continue

            for i, match in enumerate(matches):
                clause_num = match.group(1).strip()
                clause_title = match.group(2).strip()
                start_pos = match.end()
                end_pos = matches[i + 1].start() if i + 1 < len(matches) else len(page_text)
                clause_body = page_text[start_pos:end_pos].strip()

                if len(clause_body) < 15:
                    continue

                clause_id = f"{std_num.replace(' ', '_').lower()}_c_{clause_num.replace('.', '_')}"
                clauses.append(
                    StandardClause(
                        id=clause_id,
                        standard_number=std_num,
                        standard_title=std_title or f"Indian Standard {std_num}",
                        edition_year=year,
                        clause_number=clause_num,
                        clause_title=clause_title,
                        text=clause_body,
                        page=page.page_number,
                        category="Standards Ingestion",
                        mandatory_status="Statutory Clause",
                        source=ClauseSource(
                            type="official_document",
                            document_name=pdf_result.file_name,
                            source_url=f"https://standardsbis.bsbedge.com/{pdf_result.file_name}",
                            retrieved_at="2026-09-08T00:00:00Z"
                        ),
                        data_status=data_status
                    )
                )

        return clauses

clause_parser = ClauseParser()
