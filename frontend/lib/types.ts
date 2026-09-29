export interface StandardRef {
  code: string;
  title: string;
  is_primary: boolean;
}

export interface QcoStatus {
  is_mandatory: boolean;
  order_name: string;
  ministry: string;
  legal_basis: string;
}

export interface KeyTest {
  name: string;
  clause: string;
  type: string;
}

export interface BaseFees {
  application: number;
  processing: number;
  factory_inspection: number;
  lab_testing_estimate: number;
  annual_marking_fee: number;
}

export interface TimelineDays {
  doc_prep: number;
  lab_testing: number;
  factory_audit: number;
  grant_license: number;
  total_estimated: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  applicable_standards: StandardRef[];
  scheme: string;
  scheme_description: string;
  qco_status: QcoStatus;
  key_tests: KeyTest[];
  documents_required: string[];
  timeline_days: TimelineDays;
  base_fees: BaseFees;
}

export interface RoadmapStep {
  step_number: number;
  title: string;
  phase: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  description: string;
  action_items: string[];
  estimated_days: number;
}

export interface FeeBreakdown {
  application_fee: number;
  processing_fee: number;
  factory_inspection_fee: number;
  lab_testing_estimate: number;
  gross_marking_fee: number;
  msme_discount_amount: number;
  net_marking_fee: number;
  subtotal: number;
  gst_18_percent: number;
  grand_total_inr: number;
}

export interface TimelineBreakdown {
  document_preparation: string;
  laboratory_testing: string;
  factory_inspection_audit: string;
  final_scrutiny_grant: string;
  total_estimated_turnaround: string;
}

export interface CostTimeline {
  product_id: string;
  product_name: string;
  enterprise_scale: string;
  concession_applied: string;
  discount_percent: number;
  marking_fee_saved: number;
  fee_breakdown: FeeBreakdown;
  timeline_breakdown: TimelineBreakdown;
}

export interface Laboratory {
  id: string;
  name: string;
  type: string;
  city: string;
  state: string;
  region: string;
  address: string;
  contact: string;
  nabl_accreditation: string;
  testing_scopes: string[];
  sample_turnaround_days: number;
  rating: number;
}

export interface ComplianceAnalysis {
  product: Product;
  applicable_standards: StandardRef[];
  scheme: string;
  qco_status: QcoStatus;
  roadmap: RoadmapStep[];
  cost_timeline: CostTimeline;
  recommended_laboratories: Laboratory[];
}

export interface VerificationRecord {
  cml_number: string;
  cml_formatted: string;
  status: 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'SUSPENDED' | 'COUNTERFEIT' | 'NOT_FOUND';
  verification_badge: 'GENUINE_ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED_INVALID' | 'SUSPENDED_ALERT' | 'FRAUD_COUNTERFEIT' | 'INVALID_FORMAT';
  manufacturer_name: string;
  brand_name: string;
  product_name: string;
  standard_number: string;
  standard_title: string;
  factory_address: string;
  issue_date: string;
  valid_until: string;
  days_remaining?: number;
  operative_scope: string;
  regional_office: string;
  scheme: string;
  official_bis_url: string;
}

export interface VerificationResult {
  is_found: boolean;
  query: string;
  normalized_number: string;
  status: string;
  verification_badge: string;
  record?: VerificationRecord | null;
  advisory?: string;
}

export interface SourceClause {
  id: string;
  standard_number: string;
  standard_title: string;
  category: string;
  clause_number: string;
  clause_title: string;
  page: number;
  text: string;
  mandatory_status: string;
  citation: string;
  _relevance_score?: number;
}

export interface StructuredCitation {
  standard_number: string;
  clause_number: string;
  page: number;
  document: string;
  citation_tag?: string;
}

export interface RagResponse {
  query: string;
  answer: string;
  citations: string[];
  sources: SourceClause[];
  is_grounded: boolean;
  confidence?: number;
  warnings?: string[];
  structured_citations?: StructuredCitation[];
}

export interface ManufacturerLicence {
  id: string;
  cml_number: string;
  product_name: string;
  standard_number: string;
  brand_name: string;
  issue_date: string;
  expiry_date: string;
  days_remaining: number;
  status: string;
  alert_level: 'NORMAL' | 'URGENT' | 'WARNING_90_DAYS';
  surveillance_status: string;
  last_audit_date: string;
  minimum_marking_fee: number;
}

export interface DashboardData {
  manufacturer: string;
  gstin: string;
  total_active_licences: number;
  urgent_renewals: number;
  licences: ManufacturerLicence[];
}

export interface DiscoveredStandard {
  code?: string;
  standard_number: string;
  title: string;
  is_primary?: boolean;
  reason?: string;
  confidence?: number;
  source?: string;
  sources?: Array<{ standard_number: string; title?: string; clause?: string; page?: number; legal_basis?: string }>;
}

export interface StandardsDiscoveryResult {
  product: string;
  product_description: string;
  matched_product_id?: string;
  standards: DiscoveredStandard[];
  applicable_standards?: DiscoveredStandard[];
  qco: {
    applicable: boolean;
    is_mandatory?: boolean;
    order_name: string;
    ministry: string;
    legal_basis: string;
    mandate_summary: string;
    effective_date?: string;
    source?: string;
  };
  qco_mandate?: any;
  certification: {
    required_or_applicable: string;
    scheme: string;
    scheme_description: string;
    source?: string;
  };
  confidence: number;
}

export interface DocumentAnalysisRequirement {
  requirement: string;
  required_value: string;
  document_value: string | null;
  status: 'PASS' | 'WARNING' | 'MISSING' | 'POTENTIAL_NON_COMPLIANCE';
  source_clause: string;
  page?: number;
}

export interface DocumentAnalysisResult {
  document_id: string;
  filename: string;
  product: string;
  product_category?: string;
  applicable_standards: Array<{ standard_number: string; title: string; confidence?: number }>;
  extracted_metadata: Record<string, any>;
  requirements: DocumentAnalysisRequirement[];
  parameters?: DocumentAnalysisRequirement[];
  missing_information: string[];
  potential_non_compliance: string[];
  overall_status: 'PASS' | 'PARTIAL' | 'INSUFFICIENT_INFORMATION' | 'POTENTIAL_NON_COMPLIANCE';
  qco_status?: Record<string, any>;
  disclaimer: string;
}

export interface ComplianceTask {
  id: string;
  project_id: string;
  step_number: number;
  title: string;
  phase: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  estimated_days: number;
  completed_at?: string | null;
  notes?: string | null;
}

export interface ComplianceProject {
  id: string;
  title: string;
  product_id: string;
  product_name: string;
  enterprise_scale: string;
  location: string;
  status: string;
  progress_percent: number;
  target_standard: string;
  created_at: string;
  updated_at: string;
  tasks?: ComplianceTask[];
  documents?: any[];
}

export interface GrievancePayload {
  complaint_type: string;
  cml_number?: string;
  product_name?: string;
  brand_name?: string;
  store_name?: string;
  city?: string;
  state?: string;
  location?: string;
  description: string;
}

export interface GrievanceResult {
  status: string;
  reference_number: string;
  complaint_id: string;
  message: string;
  next_steps: string[];
}
