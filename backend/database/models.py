from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class ProjectCreate(BaseModel):
    title: Optional[str] = "BIS Certification Project"
    product_id: str
    product_name: Optional[str] = None
    enterprise_scale: Optional[str] = "MICRO"
    location: Optional[str] = "DOMESTIC"
    target_standard: Optional[str] = None
    standard_code: Optional[str] = None

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    status: Optional[str] = None
    progress_percent: Optional[int] = None

class TaskUpdate(BaseModel):
    status: str  # "COMPLETED" | "PENDING"

class DocumentAnalyzeRequest(BaseModel):
    document_id: str
    standard_code: Optional[str] = None
    product_type: Optional[str] = None

class GrievanceCreate(BaseModel):
    complaint_type: str = "COUNTERFEIT_ISI_MARK"
    cml_number: Optional[str] = None
    product_name: Optional[str] = "Unspecified Product"
    brand_name: Optional[str] = None
    store_name: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    location: Optional[str] = None
    description: str

class StandardsDiscoveryRequest(BaseModel):
    product_description: Optional[str] = None
    query: Optional[str] = None
