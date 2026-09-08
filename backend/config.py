import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
STANDARDS_DIR = DATA_DIR / "standards_knowledge"

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
PORT = int(os.environ.get("PORT", 8000))
HOST = os.environ.get("HOST", "0.0.0.0")
