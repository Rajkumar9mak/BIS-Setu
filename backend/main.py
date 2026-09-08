from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.compliance import router as compliance_router
from api.verification import router as verification_router
from api.rag import router as rag_router
from api.dashboard import router as dashboard_router

app = FastAPI(
    title="BIS Setu API",
    description="Intelligent Compliance Wizard, Consumer Verification Engine & Grounded RAG Knowledge Base for Indian Standards (BIS)",
    version="1.0.0"
)

# Enable CORS for Next.js development and testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(compliance_router)
app.include_router(verification_router)
app.include_router(rag_router)
app.include_router(dashboard_router)

@app.get("/")
def root():
    return {
        "service": "BIS Setu Core Engine",
        "version": "1.0.0",
        "status": "OPERATIONAL",
        "endpoints": {
            "compliance": "/api/compliance",
            "verification": "/api/verify",
            "rag": "/api/rag",
            "dashboard": "/api/dashboard"
        }
    }

@app.get("/health")
def health():
    return {"status": "healthy", "service": "bis-setu"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
