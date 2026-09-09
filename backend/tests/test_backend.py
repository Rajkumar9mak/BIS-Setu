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
    assert data["status"] == "NOT_FOUND"
    assert data["verification_badge"] == "NOT_FOUND"
    assert "could not be verified" in data["advisory"].lower()

def test_rag_query():
    response = client.post("/api/rag/query", json={"query": "What are the leakage current and voltage limits for electric kettles?"})
    assert response.status_code == 200
    data = response.json()
    assert data["is_grounded"] is True
    assert len(data["citations"]) > 0
    assert "IS 302" in data["citations"][0]

def test_rag_source():
    response = client.get("/api/rag/source/is_1489_p1_c7")
    assert response.status_code == 200
    data = response.json()
    assert "IS 1489" in data["standard_number"]
    assert data["clause_number"] == "7.1"

def test_standards_discovery():
    response = client.post("/api/standards/discover", json={"query": "ceiling fan electric fan for home"})
    assert response.status_code == 200
    data = response.json()
    assert data["matched_product_id"] == "prod_electric_fans"
    assert len(data["applicable_standards"]) > 0
    assert "IS 374" in data["applicable_standards"][0]["code"]
    assert data["qco_mandate"]["is_mandatory"] is True

def test_document_upload_and_analyze():
    # Test upload
    test_content = b"LAB TEST REPORT: Electric Kettle IS 302-2-15. Leakage Current: 0.35 mA. Input Power: 1450 W. Earthing Resistance: 0.05 Ohms."
    files = {"file": ("test_kettle_report.txt", test_content, "text/plain")}
    upload_res = client.post("/api/documents/upload", files=files)
    assert upload_res.status_code == 200
    doc_id = upload_res.json()["document_id"]
    assert doc_id is not None

    # Test analyze
    analyze_res = client.post("/api/documents/analyze", json={
        "document_id": doc_id,
        "standard_code": "IS 302-2-15:2009",
        "product_type": "Electric Kettle"
    })
    assert analyze_res.status_code == 200
    analysis = analyze_res.json()
    assert analysis["overall_status"] in ["COMPLIANT", "NEEDS_REVIEW", "NON_COMPLIANT", "INSUFFICIENT_INFORMATION", "PARTIAL", "PASS"]
    assert len(analysis["parameters"]) >= 1
    assert "disclaimer" in analysis

def test_projects_lifecycle():
    # Create project
    create_res = client.post("/api/projects", json={
        "title": "Ceiling Fan BIS Certification Pilot",
        "product_id": "prod_electric_fans",
        "standard_code": "IS 374:2019",
        "enterprise_scale": "SMALL"
    })
    assert create_res.status_code == 200
    project = create_res.json()
    project_id = project["id"]
    assert project["title"] == "Ceiling Fan BIS Certification Pilot"
    assert len(project["tasks"]) == 10
    assert project["progress_percent"] == 0

    # Complete a task
    task_id = project["tasks"][0]["id"]
    patch_res = client.patch(f"/api/projects/{project_id}/tasks/{task_id}", json={"status": "COMPLETED"})
    assert patch_res.status_code == 200
    updated_project = patch_res.json()
    assert updated_project["progress_percent"] == 10

def test_grievance_submission():
    response = client.post("/api/grievances", json={
        "cml_number": "9999999",
        "brand_name": "FakePower Brand",
        "complaint_type": "COUNTERFEIT_ISI",
        "description": "Counterfeit mark found on electrical appliances sold without valid license.",
        "location": "Lajpat Nagar Market, New Delhi"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "RECEIVED"
    assert data["reference_number"].startswith("BIS-GRV-")

def test_verify_qr():
    response = client.post("/api/verify/qr", json={"qr_text": "https://www.manakonline.in/verify?cml=8400192"})
    assert response.status_code == 200
    data = response.json()
    assert data["is_found"] is True
    assert data["status"] == "ACTIVE"

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
