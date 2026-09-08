from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "OPERATIONAL"

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "bis-setu"

def test_compliance_products():
    response = client.get("/api/compliance/products")
    assert response.status_code == 200
    products = response.json()
    assert len(products) >= 3
    kettle = next((p for p in products if p["id"] == "prod_electric_kettle"), None)
    assert kettle is not None
    assert "IS 302" in kettle["applicable_standards"][0]["code"]

def test_compliance_analyze():
    response = client.post("/api/compliance/analyze", json={
        "product_id": "prod_electric_kettle",
        "enterprise_scale": "MICRO",
        "location": "DOMESTIC"
    })
    assert response.status_code == 200
    data = response.json()
    assert "roadmap" in data
    assert len(data["roadmap"]) >= 5
    assert "cost_timeline" in data
    assert data["cost_timeline"]["discount_percent"] == 50

def test_verification_valid():
    response = client.post("/api/verify", json={"query": "8400192"})
    assert response.status_code == 200
    data = response.json()
    assert data["is_found"] is True
    assert data["status"] == "ACTIVE"
    assert "Havells" in data["record"]["manufacturer_name"]

def test_verification_counterfeit():
    response = client.post("/api/verify", json={"query": "9999999"})
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "COUNTERFEIT"
    assert data["verification_badge"] == "FRAUD_COUNTERFEIT"

def test_verification_unregistered():
    response = client.post("/api/verify", json={"query": "1234567"})
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "UNREGISTERED_COUNTERFEIT_RISK"

def test_rag_query():
    response = client.post("/api/rag/query", json={"query": "What are the leakage current and voltage limits for electric kettles?"})
    assert response.status_code == 200
    data = response.json()
    assert data["is_grounded"] is True
    assert len(data["citations"]) > 0
    assert "IS 302" in data["citations"][0]

def test_dashboard_certifications():
    response = client.get("/api/dashboard/certifications")
    assert response.status_code == 200
    data = response.json()
    assert len(data["licences"]) >= 2

def test_error_handling_not_found():
    response = client.get("/api/compliance/products/non_existent_product_999")
    assert response.status_code == 404
    data = response.json()
    assert "error" in data
    assert data["error"]["code"] == "NOT_FOUND"
    assert "Product not found" in data["error"]["message"]

def test_error_handling_validation_error():
    # Sending invalid data type for query in verify
    response = client.post("/api/verify", json={"wrong_key": 1234})
    assert response.status_code == 422
    data = response.json()
    assert "error" in data
    assert data["error"]["code"] == "INVALID_INPUT"
    assert "validation_errors" in data["error"]["details"]
