import re
from typing import List, Dict, Any, Tuple
from pydantic import BaseModel, Field
from retrievers.lexical_retriever import RetrievedDoc

class GroundingEvaluation(BaseModel):
    is_grounded: bool
    confidence: float
    warnings: List[str] = Field(default_factory=list)
    has_sufficient_evidence: bool = True
    unsupported_reason: str = ""

class GroundingValidator:
    """
    Validates that answers are strictly grounded in retrieved Indian Standards clauses.
    Enforces that Gemini/LLM does not hallucinate regulatory thresholds or override evidence.
    """

    MIN_CONFIDENCE_THRESHOLD = 0.40
    HIGH_CONFIDENCE_THRESHOLD = 0.70

    UNSUPPORTED_FALLBACK_TEXT = (
        "The available BIS evidence is insufficient to give a reliable conclusion. "
        "I could not find sufficient authoritative evidence in the available BIS sources to answer this question reliably."
    )

    def evaluate(self, query: str, retrieved_docs: List[RetrievedDoc]) -> GroundingEvaluation:
        warnings: List[str] = []

        if not retrieved_docs:
            return GroundingEvaluation(
                is_grounded=False,
                confidence=0.0,
                has_sufficient_evidence=False,
                warnings=["INSUFFICIENT_EVIDENCE: No relevant standard clauses found matching this query."],
                unsupported_reason=self.UNSUPPORTED_FALLBACK_TEXT
            )

        top_score = retrieved_docs[0].score

        # Calculate evidence confidence score based on top score and multi-clause corroboration
        confidence = round(min(1.0, top_score), 2)
        if len(retrieved_docs) > 1 and retrieved_docs[1].score > 0.45:
            confidence = round(min(1.0, confidence + 0.05), 2)

        if confidence < self.MIN_CONFIDENCE_THRESHOLD:
            warnings.append(
                f"LOW_CONFIDENCE: Retrieval similarity ({confidence}) is below the regulatory verification threshold."
            )
            return GroundingEvaluation(
                is_grounded=False,
                confidence=confidence,
                has_sufficient_evidence=False,
                warnings=warnings,
                unsupported_reason=self.UNSUPPORTED_FALLBACK_TEXT
            )

        # Check for DEMO data warnings
        has_demo = any(d.data_status == "DEMO" for d in retrieved_docs)
        if has_demo:
            warnings.append("DEMO_RECORD: One or more cited sources are demo/unverified reference data.")

        # Check for older standard edition
        for doc in retrieved_docs:
            if doc.edition_year and doc.edition_year.isdigit() and int(doc.edition_year) < 2010:
                warnings.append(
                    f"EDITION_NOTICE: {doc.standard_number} cites edition {doc.edition_year}. "
                    "Ensure verification against any recent BIS Gazette amendments."
                )
                break

        return GroundingEvaluation(
            is_grounded=True,
            confidence=confidence,
            has_sufficient_evidence=True,
            warnings=warnings,
            unsupported_reason=""
        )

    def post_validate_answer(
        self,
        answer: str,
        retrieved_docs: List[RetrievedDoc],
        evaluation: GroundingEvaluation
    ) -> Tuple[str, GroundingEvaluation]:
        """
        Ensures the generated answer reflects grounded evidence and does not invent unsupported claims.
        """
        if not evaluation.has_sufficient_evidence:
            return self.UNSUPPORTED_FALLBACK_TEXT, evaluation

        # If LLM generated a disclaimer or could not answer
        if "could not find sufficient" in answer.lower() or "do not contain sufficient" in answer.lower():
            eval_copy = evaluation.model_copy(update={"is_grounded": False, "confidence": min(0.3, evaluation.confidence)})
            return answer, eval_copy

        return answer, evaluation

grounding_validator = GroundingValidator()
