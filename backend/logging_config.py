import logging
import sys
import time
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

def setup_logging(log_level: str = "INFO"):
    numeric_level = getattr(logging, log_level.upper(), logging.INFO)
    log_format = "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"
    date_format = "%Y-%m-%d %H:%M:%S"

    logging.basicConfig(
        level=numeric_level,
        format=log_format,
        datefmt=date_format,
        handlers=[logging.StreamHandler(sys.stdout)]
    )

def get_logger(name: str) -> logging.Logger:
    return logging.getLogger(name)

logger = get_logger("bis_setu")

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        start_time = time.perf_counter()
        client_host = request.client.host if request.client else "unknown"
        method = request.method
        url_path = request.url.path

        try:
            response = await call_next(request)
            process_time_ms = (time.perf_counter() - start_time) * 1000
            status_code = response.status_code
            
            # Skip verbose health logging in prod if desired, but log standard requests
            if url_path != "/health":
                logger.info(
                    f"{method} {url_path} - {status_code} ({process_time_ms:.2f}ms) [{client_host}]"
                )
            return response
        except Exception as exc:
            process_time_ms = (time.perf_counter() - start_time) * 1000
            logger.error(
                f"Unhandled Exception on {method} {url_path} ({process_time_ms:.2f}ms): {exc}",
                exc_info=True
            )
            raise exc
