import {
  Product,
  ComplianceAnalysis,
  VerificationResult,
  RagResponse,
  DashboardData,
  Laboratory,
  StandardsDiscoveryResult,
  DocumentAnalysisResult,
  ComplianceProject,
  GrievancePayload,
  GrievanceResult
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/api/compliance/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (err) {
    console.error('Error fetching products:', err);
    return [];
  }
}

export async function analyzeCompliance(
  productId: string,
  enterpriseScale: string = 'MICRO',
  location: string = 'DOMESTIC'
): Promise<ComplianceAnalysis | null> {
  try {
    const res = await fetch(`${API_BASE}/api/compliance/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: productId,
        enterprise_scale: enterpriseScale,
        location: location
      })
    });
    if (!res.ok) throw new Error('Failed to analyze compliance');
    return await res.json();
  } catch (err) {
    console.error('Error analyzing compliance:', err);
    return null;
  }
}

export async function verifyProduct(query: string): Promise<VerificationResult | null> {
  try {
    const res = await fetch(`${API_BASE}/api/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    if (!res.ok) throw new Error('Failed to verify product');
    return await res.json();
  } catch (err) {
    console.error('Error verifying product:', err);
    return null;
  }
}

export async function verifyQr(payload: string): Promise<VerificationResult | null> {
  try {
    const res = await fetch(`${API_BASE}/api/verify/qr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qr_payload: payload, qr_text: payload })
    });
    if (!res.ok) throw new Error('Failed to verify QR code');
    return await res.json();
  } catch (err) {
    console.error('Error verifying QR code:', err);
    return null;
  }
}

export async function verifyImage(file: File): Promise<VerificationResult | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/api/verify/image`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Failed to verify image');
    return await res.json();
  } catch (err) {
    console.error('Error verifying image:', err);
    return null;
  }
}

export async function queryRag(query: string, category?: string): Promise<RagResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/api/rag/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, category })
    });
    if (!res.ok) throw new Error('Failed to query RAG');
    return await res.json();
  } catch (err) {
    console.error('Error querying RAG:', err);
    return null;
  }
}

export async function discoverStandards(query: string): Promise<StandardsDiscoveryResult | null> {
  try {
    const res = await fetch(`${API_BASE}/api/standards/discover`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, product_description: query })
    });
    if (!res.ok) throw new Error('Failed to discover standards');
    return await res.json();
  } catch (err) {
    console.error('Error discovering standards:', err);
    return null;
  }
}

export async function uploadDocument(file: File, projectId?: string): Promise<{ document_id: string; filename: string; file_size_kb: number } | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (projectId) formData.append('project_id', projectId);
    const res = await fetch(`${API_BASE}/api/documents/upload`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Failed to upload document');
    return await res.json();
  } catch (err) {
    console.error('Error uploading document:', err);
    return null;
  }
}

export async function analyzeDocument(documentId: string, standardCode?: string): Promise<DocumentAnalysisResult | null> {
  try {
    const res = await fetch(`${API_BASE}/api/documents/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document_id: documentId, standard_code: standardCode })
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`Failed to analyze document (${res.status}): ${errText}`);
    }
    return await res.json();
  } catch (err) {
    console.error('Error analyzing document:', err);
    return null;
  }
}

export async function fetchProjects(): Promise<ComplianceProject[]> {
  try {
    const res = await fetch(`${API_BASE}/api/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return await res.json();
  } catch (err) {
    console.error('Error fetching projects:', err);
    return [];
  }
}

export async function fetchProject(id: string): Promise<ComplianceProject | null> {
  try {
    const res = await fetch(`${API_BASE}/api/projects/${id}`);
    if (!res.ok) throw new Error('Failed to fetch project');
    return await res.json();
  } catch (err) {
    console.error('Error fetching project:', err);
    return null;
  }
}

export async function createProject(data: {
  title?: string;
  product_id: string;
  product_name?: string;
  enterprise_scale?: string;
  location?: string;
  target_standard?: string;
}): Promise<ComplianceProject | null> {
  try {
    const res = await fetch(`${API_BASE}/api/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create project');
    return await res.json();
  } catch (err) {
    console.error('Error creating project:', err);
    return null;
  }
}

export async function updateProjectTask(
  projectId: string,
  taskId: string,
  status: 'COMPLETED' | 'PENDING'
): Promise<ComplianceProject | null> {
  try {
    const res = await fetch(`${API_BASE}/api/projects/${projectId}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update task');
    return await res.json();
  } catch (err) {
    console.error('Error updating project task:', err);
    return null;
  }
}

export async function submitGrievance(payload: GrievancePayload): Promise<GrievanceResult | null> {
  try {
    const res = await fetch(`${API_BASE}/api/grievances`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to submit grievance');
    return await res.json();
  } catch (err) {
    console.error('Error submitting grievance:', err);
    return null;
  }
}

export async function fetchLaboratories(standard?: string, state?: string): Promise<Laboratory[]> {
  try {
    const params = new URLSearchParams();
    if (standard) params.append('standard', standard);
    if (state) params.append('state', state);
    const res = await fetch(`${API_BASE}/api/compliance/labs?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch labs');
    return await res.json();
  } catch (err) {
    console.error('Error fetching labs:', err);
    return [];
  }
}

export async function fetchDashboardData(): Promise<DashboardData | null> {
  try {
    const res = await fetch(`${API_BASE}/api/dashboard/certifications`);
    if (!res.ok) throw new Error('Failed to fetch dashboard data');
    return await res.json();
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    return null;
  }
}

export async function initiateRenewal(cmlNumber: string, volume: number): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/api/dashboard/renew`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cml_number: cmlNumber,
        production_volume_units: volume,
        declarations_signed: true
      })
    });
    return await res.json();
  } catch (err) {
    console.error('Error renewing license:', err);
    return null;
  }
}
