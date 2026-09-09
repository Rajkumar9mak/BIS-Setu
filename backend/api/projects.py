from fastapi import APIRouter, HTTPException
from typing import List, Optional
import uuid
import json
from datetime import datetime
from database.db import db
from database.models import ProjectCreate, ProjectUpdate, TaskUpdate
from services.compliance_engine import compliance_engine

router = APIRouter(prefix="/api/projects", tags=["Compliance Projects"])

STANDARD_10_STEPS = [
    {"step": 1, "title": "Product Classification & Applicable IS Code Discovery", "phase": "Phase 1: Regulatory Scope", "days": 2},
    {"step": 2, "title": "Mandatory Quality Control Order (QCO) Verification", "phase": "Phase 1: Regulatory Scope", "days": 1},
    {"step": 3, "title": "In-House Testing Facility Setup & Calibrated Equipment Audit", "phase": "Phase 2: Factory Readiness", "days": 10},
    {"step": 4, "title": "Scheme of Inspection and Testing (SIT) Standard Operating Procedures", "phase": "Phase 2: Factory Readiness", "days": 4},
    {"step": 5, "title": "Prototype Pre-Testing at BIS-Recognized Testing Laboratory", "phase": "Phase 3: Laboratory Conformance", "days": 14},
    {"step": 6, "title": "Form-V Online Application & Dossier Submission on Manakonline", "phase": "Phase 4: Formal Application", "days": 3},
    {"step": 7, "title": "On-Site BIS Inspecting Officer Factory Audit & Sample Drawing", "phase": "Phase 5: Inspection & Verification", "days": 7},
    {"step": 8, "title": "Independent Central / Regional BIS Lab Sample Testing", "phase": "Phase 5: Inspection & Verification", "days": 12},
    {"step": 9, "title": "Grant of Certification Marks Licence (CM/L) & Number Allocation", "phase": "Phase 6: Licence Grant", "days": 5},
    {"step": 10, "title": "Standard Mark (ISI Logo) Artwork Affixation & Annual Surveillance", "phase": "Phase 7: Ongoing Compliance", "days": 2},
]

@router.post("")
def create_project(req: ProjectCreate):
    proj_id = f"proj_{uuid.uuid4().hex[:8]}"

    # Fetch product and standard if not provided
    product = compliance_engine.get_product(req.product_id)
    target_std = req.target_standard or req.standard_code
    product_name = req.product_name
    if product:
        if not target_std and product.get("applicable_standards"):
            target_std = product["applicable_standards"][0]["code"]
        if not product_name:
            product_name = product.get("name", req.product_id)
    if not product_name:
        product_name = req.product_id

    db.execute(
        """
        INSERT INTO projects (id, title, product_id, product_name, enterprise_scale, location, status, progress_percent, target_standard)
        VALUES (?, ?, ?, ?, ?, ?, 'IN_PROGRESS', 0, ?)
        """,
        (proj_id, req.title or "BIS Certification Project", req.product_id, product_name, req.enterprise_scale, req.location, target_std or "IS Standard")
    )

    # Seed 10-step milestones
    for item in STANDARD_10_STEPS:
        task_id = f"task_{proj_id}_{item['step']}"
        db.execute(
            """
            INSERT INTO tasks (id, project_id, step_number, title, phase, status, estimated_days)
            VALUES (?, ?, ?, ?, ?, 'PENDING', ?)
            """,
            (task_id, proj_id, item["step"], item["title"], item["phase"], item["days"])
        )

    return get_project(proj_id)

@router.get("")
def list_projects():
    projects = db.query("SELECT * FROM projects ORDER BY created_at DESC")
    return projects

@router.get("/{project_id}")
def get_project(project_id: str):
    proj = db.query_one("SELECT * FROM projects WHERE id = ?", (project_id,))
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")

    tasks = db.query("SELECT * FROM tasks WHERE project_id = ? ORDER BY step_number ASC", (project_id,))
    docs = db.query("SELECT * FROM documents WHERE project_id = ? ORDER BY uploaded_at DESC", (project_id,))

    return {
        **proj,
        "project": proj,
        "tasks": tasks,
        "documents": docs
    }

@router.patch("/{project_id}")
def update_project(project_id: str, req: ProjectUpdate):
    proj = db.query_one("SELECT * FROM projects WHERE id = ?", (project_id,))
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")

    updates = []
    args = []
    if req.title is not None:
        updates.append("title = ?")
        args.append(req.title)
    if req.status is not None:
        updates.append("status = ?")
        args.append(req.status)
    if req.progress_percent is not None:
        updates.append("progress_percent = ?")
        args.append(req.progress_percent)

    if updates:
        updates.append("updated_at = CURRENT_TIMESTAMP")
        args.append(project_id)
        db.execute(f"UPDATE projects SET {', '.join(updates)} WHERE id = ?", tuple(args))

    return get_project(project_id)

@router.get("/{project_id}/tasks")
def list_project_tasks(project_id: str):
    tasks = db.query("SELECT * FROM tasks WHERE project_id = ? ORDER BY step_number ASC", (project_id,))
    return tasks

@router.patch("/{project_id}/tasks/{task_id}")
def update_task_status(project_id: str, task_id: str, req: TaskUpdate):
    task = db.query_one("SELECT * FROM tasks WHERE id = ? AND project_id = ?", (task_id, project_id))
    if not task:
        raise HTTPException(status_code=404, detail="Task not found in this project")

    completed_at = datetime.utcnow().isoformat() if req.status == "COMPLETED" else None
    db.execute(
        "UPDATE tasks SET status = ?, completed_at = ? WHERE id = ?",
        (req.status, completed_at, task_id)
    )

    # Recalculate project progress percent
    all_tasks = db.query("SELECT status FROM tasks WHERE project_id = ?", (project_id,))
    total = len(all_tasks)
    completed = sum(1 for t in all_tasks if t["status"] == "COMPLETED")
    progress = int((completed / total) * 100) if total > 0 else 0

    new_status = "COMPLETED" if progress == 100 else ("IN_PROGRESS" if progress > 0 else "NOT_STARTED")
    db.execute(
        "UPDATE projects SET progress_percent = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        (progress, new_status, project_id)
    )

    return {
        "task_id": task_id,
        "status": req.status,
        "progress_percent": progress,
        "project_status": new_status
    }
