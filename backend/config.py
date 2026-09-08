import os
from pathlib import Path
from typing import List

try:
    from dotenv import load_dotenv
    # Attempt to load from backend/.env or root .env
    base_path = Path(__file__).resolve().parent
    if (base_path / ".env").exists():
        load_dotenv(base_path / ".env")
    elif (base_path.parent / ".env").exists():
        load_dotenv(base_path.parent / ".env")
    else:
        load_dotenv()
except ImportError:
    pass

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
STANDARDS_DIR = DATA_DIR / "standards_knowledge"
DATABASE_DIR = BASE_DIR / "database"

APP_ENV: str = os.environ.get("APP_ENV", "development").lower()
PORT: int = int(os.environ.get("PORT", 8000))
HOST: str = os.environ.get("HOST", "0.0.0.0")
LOG_LEVEL: str = os.environ.get("LOG_LEVEL", "INFO").upper()

GEMINI_API_KEY: str = os.environ.get("GEMINI_API_KEY", "")
DATABASE_URL: str = os.environ.get(
    "DATABASE_URL",
    f"sqlite:///{DATABASE_DIR / 'bis_setu.db'}"
)
VECTOR_DB_PATH: Path = Path(os.environ.get("VECTOR_DB_PATH", str(DATA_DIR / "chroma")))

def get_cors_origins() -> List[str]:
    raw = os.environ.get("CORS_ORIGINS", "")
    if raw.strip():
        return [origin.strip() for origin in raw.split(",") if origin.strip()]
    # Default permissive local development origins
    return [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "*"
    ]

CORS_ORIGINS: List[str] = get_cors_origins()
