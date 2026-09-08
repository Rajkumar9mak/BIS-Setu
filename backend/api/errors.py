from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from typing import Any, Dict, Optional
from logging_config import logger

class AppException(Exception):
    def __init__(
        self,
        code: str,
        message: str,
        status_code: int = 400,
        details: Optional[Dict[str, Any]] = None
    ):
        super().__init__(message)
        self.code = code
        self.message = message
        self.status_code = status_code
        self.details = details or {}

def format_error_response(code: str, message: str, details: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    return {
        "error": {
            "code": code,
            "message": message,
            "details": details or {}
        }
    }

async def app_exception_handler(request: Request, exc: AppException) -> JSONResponse:
    logger.warning(f"AppException on {request.method} {request.url.path}: [{exc.code}] {exc.message}")
    return JSONResponse(
        status_code=exc.status_code,
        content=format_error_response(exc.code, exc.message, exc.details)
    )

async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    # Map common status codes to standard error codes
    code_map = {
        400: "INVALID_INPUT",
        401: "UNAUTHORIZED",
        403: "FORBIDDEN",
        404: "NOT_FOUND",
        409: "CONFLICT",
        422: "INVALID_INPUT",
        500: "INTERNAL_ERROR",
        503: "SERVICE_UNAVAILABLE"
    }
    code = code_map.get(exc.status_code, "ERROR")
    message = str(exc.detail) if exc.detail else "An HTTP error occurred."
    
    # Custom check if detail is a dict or string
    details: Dict[str, Any] = {}
    if isinstance(exc.detail, dict):
        code = exc.detail.get("code", code)
        message = exc.detail.get("message", message)
        details = exc.detail.get("details", {})

    return JSONResponse(
        status_code=exc.status_code,
        content=format_error_response(code, message, details)
    )

async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    details = {
        "validation_errors": [
            {
                "field": ".".join(str(loc) for loc in err.get("loc", [])),
                "message": err.get("msg", ""),
                "type": err.get("type", "")
            }
            for err in exc.errors()
        ]
    }
    return JSONResponse(
        status_code=422,
        content=format_error_response(
            code="INVALID_INPUT",
            message="Request input validation failed.",
            details=details
        )
    )

async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.error(
        f"Internal server error on {request.method} {request.url.path}: {exc}",
        exc_info=True
    )
    return JSONResponse(
        status_code=500,
        content=format_error_response(
            code="INTERNAL_ERROR",
            message="An unexpected internal error occurred. Please try again later.",
            details={}
        )
    )

def register_error_handlers(app: FastAPI) -> None:
    app.add_exception_handler(AppException, app_exception_handler)
    app.add_exception_handler(HTTPException, http_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(Exception, unhandled_exception_handler)
