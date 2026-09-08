from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import CORS_ORIGINS, LOG_LEVEL, HOST, PORT
from logging_config import setup_logging, RequestLoggingMiddleware, logger
from api.errors import register_error_handlers
from api.compliance import router as compliance_router
from api.verification import router as verification_router
from api.rag import router as rag_router
from api.dashboard import router as dashboard_router

# Initialize structured logging
setup_logging(LOG_LEVEL)

app = FastAPI(
    title="BIS Setu API",
    description="Intelligent Compliance Wizard, Consumer Verification Engine & Grounded RAG Knowledge Base for Indian Standards (BIS)",
    version="1.0.0"
)

# Register request logging middleware
app.add_middleware(RequestLoggingMiddleware)

# Enable CORS for Next.js frontend and configured origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS if CORS_ORIGINS else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register centralized exception handlers
register_error_handlers(app)

# Register application routers
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
    return {
        "status": "ok",
        "service": "bis-setu"
    }

if __name__ == "__main__":
    import uvicorn
    logger.info(f"Starting BIS Setu backend server on {HOST}:{PORT}")
    uvicorn.run("main:app", host=HOST, port=PORT, reload=True)
