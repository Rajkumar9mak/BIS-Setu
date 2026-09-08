import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_rag_exact_standard_number():
    response = client.post("/api/rag/query", json={"query": "IS 302 requirements"})
    assert response.status_code == 200
    data = response.json()
    assert data["is_grounded"] is True
    assert len(data["citations"]) > 0
    assert any("IS 302" in cit for cit in data["citations"])
    assert data["confidence"] >= 0.50

def test_rag_exact_clause_number():
    response = client.post("/api/rag/query", json={"query": "Clause 19.101 abnormal operation boil dry"})
    assert response.status_code == 200
    data = response.json()
    assert data["is_grounded"] is True
    assert any("19.101" in cit for cit in data["citations"])
    assert "boil-dry" in data["answer"].lower() or "abnormal" in data["answer"].lower()

def test_rag_natural_language_question():
    response = client.post("/api/rag/query", json={"query": "What are the leakage current and voltage limits for electric kettles?"})
    assert response.status_code == 200
    data = response.json()
    assert data["is_grounded"] is True
    assert len(data["citations"]) > 0
    assert "structured_citations" in data
    assert len(data["structured_citations"]) > 0

def test_rag_product_terminology_variation():
    # Using 'jug' instead of 'kettle'
    response = client.post("/api/rag/query", json={"query": "What are the safety requirements for electric water heating jugs?"})
    assert response.status_code == 200
    data = response.json()
    assert data["is_grounded"] is True
    assert len(data["sources"]) > 0

def test_rag_irrelevant_question():
    response = client.post("/api/rag/query", json={"query": "How to cook chicken biryani with basmati rice?"})
    assert response.status_code == 200
    data = response.json()
    assert data["is_grounded"] is False
    assert data["confidence"] < 0.40
    assert "could not find sufficient" in data["answer"].lower()

def test_rag_unsupported_question():
    response = client.post("/api/rag/query", json={"query": "What is the interplanetary warp drive regulation for spaceships?"})
    assert response.status_code == 200
    data = response.json()
    assert data["is_grounded"] is False
    assert "could not find sufficient" in data["answer"].lower()

def test_rag_multi_clause_question():
    response = client.post("/api/rag/query", json={"query": "What are the helmet drop impact and penetration test requirements under IS 4151?"})
    assert response.status_code == 200
    data = response.json()
    assert data["is_grounded"] is True
    assert any("IS 4151" in cit for cit in data["citations"])
    assert len(data["citations"]) >= 2

def test_rag_empty_query():
    response = client.post("/api/rag/query", json={"query": "   "})
    assert response.status_code == 200
    data = response.json()
    assert data["is_grounded"] is False
    assert data["confidence"] == 0.0

def test_rag_stats_and_clauses():
    stats_res = client.get("/api/rag/stats")
    assert stats_res.status_code == 200
    stats = stats_res.json()
    assert stats["total_clauses"] >= 30
    assert stats["vector_records"] >= 30

    clauses_res = client.get("/api/rag/clauses")
    assert clauses_res.status_code == 200
    clauses_data = clauses_res.json()
    assert len(clauses_data["clauses"]) >= 30
