import sqlite3
import json
from pathlib import Path
from typing import List, Dict, Any, Optional
from config import BASE_DIR
from logging_config import logger

DB_PATH = BASE_DIR / "bis_setu.db"

def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(str(DB_PATH), check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    conn.execute("PRAGMA journal_mode = WAL;")
    return conn

def init_db():
    """Initializes SQLite database tables and schema."""
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.executescript("""
        CREATE TABLE IF NOT EXISTS projects (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            product_id TEXT NOT NULL,
            product_name TEXT NOT NULL,
            enterprise_scale TEXT DEFAULT 'MICRO',
            location TEXT DEFAULT 'DOMESTIC',
            status TEXT DEFAULT 'IN_PROGRESS',
            progress_percent INTEGER DEFAULT 0,
            target_standard TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS tasks (
            id TEXT PRIMARY KEY,
            project_id TEXT NOT NULL,
            step_number INTEGER NOT NULL,
            title TEXT NOT NULL,
            phase TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'PENDING',
            estimated_days INTEGER DEFAULT 0,
            action_items TEXT,
            completed_at TIMESTAMP,
            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS documents (
            id TEXT PRIMARY KEY,
            project_id TEXT,
            filename TEXT NOT NULL,
            stored_path TEXT NOT NULL,
            file_size INTEGER NOT NULL,
            mime_type TEXT NOT NULL,
            sha256_hash TEXT NOT NULL,
            uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS document_extractions (
            id TEXT PRIMARY KEY,
            document_id TEXT NOT NULL,
            extracted_json TEXT NOT NULL,
            product_identified TEXT,
            detected_standards TEXT,
            confidence REAL DEFAULT 0.0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS compliance_results (
            id TEXT PRIMARY KEY,
            document_id TEXT NOT NULL,
            overall_status TEXT NOT NULL,
            results_json TEXT NOT NULL,
            missing_fields TEXT,
            potential_non_compliance TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS grievances (
            id TEXT PRIMARY KEY,
            reference_number TEXT UNIQUE NOT NULL,
            complaint_type TEXT NOT NULL,
            cml_number TEXT,
            product_name TEXT NOT NULL,
            brand_name TEXT,
            store_name TEXT,
            city TEXT,
            state TEXT,
            description TEXT NOT NULL,
            status TEXT DEFAULT 'SUBMITTED',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        conn.commit()
        logger.info(f"SQLite database initialized successfully at {DB_PATH}")
    except Exception as e:
        logger.error(f"Error initializing SQLite database: {e}")
        conn.rollback()
        raise
    finally:
        conn.close()

class DatabaseManager:
    @staticmethod
    def query(query: str, args: tuple = ()) -> List[Dict[str, Any]]:
        conn = get_connection()
        try:
            cur = conn.cursor()
            cur.execute(query, args)
            rows = cur.fetchall()
            return [dict(row) for row in rows]
        finally:
            conn.close()

    @staticmethod
    def query_one(query: str, args: tuple = ()) -> Optional[Dict[str, Any]]:
        conn = get_connection()
        try:
            cur = conn.cursor()
            cur.execute(query, args)
            row = cur.fetchone()
            return dict(row) if row else None
        finally:
            conn.close()

    @staticmethod
    def execute(query: str, args: tuple = ()) -> int:
        conn = get_connection()
        try:
            cur = conn.cursor()
            cur.execute(query, args)
            conn.commit()
            return cur.rowcount
        finally:
            conn.close()

db = DatabaseManager()
