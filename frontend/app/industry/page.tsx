'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileText,
  Clock,
  ShieldCheck,
  AlertCircle,
  Download,
  Printer,
  Sparkles,
  MapPin,
  CheckSquare,
  Square,
  BadgePercent,
  Calculator,
  Search,
  Upload,
  FileCheck,
  AlertTriangle,
  Plus,
  RefreshCw,
  FolderGit2,
  Check,
  ExternalLink,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import {
  Product,
  ComplianceAnalysis,
  StandardsDiscoveryResult,
  DocumentAnalysisResult,
  ComplianceProject,
  ComplianceTask
} from '@/lib/types';
import {
  fetchProducts,
  analyzeCompliance,
  discoverStandards,
  uploadDocument,
  analyzeDocument,
  fetchProjects,
  fetchProject,
  createProject,
  updateProjectTask
} from '@/lib/api';
import DecorativeShapes from '@/components/DecorativeShapes';
import ProductComplianceExplorer from '@/components/compliance/ProductComplianceExplorer';

export default function IndustryPage() {
  // Main Top-level Tab
  const [activeTab, setActiveTab] = useState<'products' | 'discovery' | 'audit' | 'projects' | 'wizard'>('products');
  const [explorerInitialProduct, setExplorerInitialProduct] = useState<string>('toys');

  // Products & Compliance Wizard State
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('prod_electric_kettle');
  const [enterpriseScale, setEnterpriseScale] = useState<string>('MICRO');
  const [location, setLocation] = useState<string>('DOMESTIC');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [analysisLoading, setAnalysisLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<ComplianceAnalysis | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  // Standards Discovery State
  const [discoveryQuery, setDiscoveryQuery] = useState<string>('');
  const [discoveryLoading, setDiscoveryLoading] = useState<boolean>(false);
  const [discoveryResult, setDiscoveryResult] = useState<StandardsDiscoveryResult | null>(null);

  // Document Audit State
  const [auditFile, setAuditFile] = useState<File | null>(null);
  const [auditLoading, setAuditLoading] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<DocumentAnalysisResult | null>(null);
  const [auditStandardInput, setAuditStandardInput] = useState<string>('');

  // Compliance Projects State
  const [projects, setProjects] = useState<ComplianceProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<ComplianceProject | null>(null);
  const [projectsLoading, setProjectsLoading] = useState<boolean>(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState<boolean>(false);
  const [newProjectForm, setNewProjectForm] = useState({
    title: '',
    product_id: 'prod_electric_fans',
    enterprise_scale: 'MICRO',
    target_standard: 'IS 374:2019'
  });

  // Initial Data Load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && ['products', 'discovery', 'audit', 'projects', 'wizard'].includes(tabParam)) {
        setActiveTab(tabParam as any);
      }
      const prodParam = params.get('product');
      if (prodParam) {
        setExplorerInitialProduct(prodParam);
      }
    }

    async function loadData() {
      setLoading(true);
      try {
        const prods = await fetchProducts();
        if (prods && prods.length > 0) {
          setProducts(prods);
          if (!selectedProductId) setSelectedProductId(prods[0].id);
        }
        const projList = await fetchProjects();
        if (projList && projList.length > 0) {
          setProjects(projList);
          const activeProj = await fetchProject(projList[0].id);
          if (activeProj) setSelectedProject(activeProj);
        }
      } catch (err: any) {
        console.error('Failed to load initial data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Wizard Analysis Load
  useEffect(() => {
    async function runAnalysis() {
      if (!selectedProductId) return;
      setAnalysisLoading(true);
      setErrorMessage(null);
      try {
        const res = await analyzeCompliance(selectedProductId, enterpriseScale, location);
        if (res) {
          setAnalysis(res);
        } else {
          setErrorMessage('Could not load statutory analysis. Please check backend connection.');
        }
      } catch (err: any) {
        setErrorMessage(err?.message || 'Error executing compliance analysis');
      } finally {
        setAnalysisLoading(false);
      }
    }
    runAnalysis();
  }, [selectedProductId, enterpriseScale, location]);

  // Handle Standards Discovery Search
  const handleDiscover = async (textToSearch?: string) => {
    const q = (textToSearch ?? discoveryQuery).trim();
    if (!q) return;
    setDiscoveryLoading(true);
    try {
      const res = await discoverStandards(q);
      if (res) {
        setDiscoveryResult(res);
      } else {
        alert('Could not discover standards for this query.');
      }
    } catch (err: any) {
      alert('Error during standards discovery: ' + err.message);
    } finally {
      setDiscoveryLoading(false);
    }
  };

  // Handle Document Upload & Audit
  const handleDocumentAudit = async (fileToAudit?: File) => {
    const targetFile = fileToAudit || auditFile;
    if (!targetFile) return;
    setAuditLoading(true);
    try {
      const uploadRes = await uploadDocument(targetFile);
      if (!uploadRes || !uploadRes.document_id) {
        throw new Error('File upload failed.');
      }
      const auditRes = await analyzeDocument(uploadRes.document_id, auditStandardInput || undefined);
      if (auditRes) {
        setAuditResult(auditRes);
      } else {
        throw new Error('Audit engine could not parse parameters.');
      }
    } catch (err: any) {
      alert('Document audit error: ' + (err?.message || 'Check server connection.'));
    } finally {
      setAuditLoading(false);
    }
  };

  // Create Project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createProject({
        title: newProjectForm.title || `${newProjectForm.product_id} Compliance`,
        product_id: newProjectForm.product_id,
        enterprise_scale: newProjectForm.enterprise_scale,
        target_standard: newProjectForm.target_standard
      });
      if (created) {
        setShowNewProjectModal(false);
        const updatedList = await fetchProjects();
        setProjects(updatedList);
        setSelectedProject(created);
        setActiveTab('projects');
      }
    } catch (err: any) {
      alert('Error creating project: ' + err.message);
    }
  };

  // Toggle Task Status
  const handleToggleProjectTask = async (taskId: string, currentStatus: string) => {
    if (!selectedProject) return;
    const newStatus = currentStatus === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    try {
      const updated = await updateProjectTask(selectedProject.id, taskId, newStatus);
      if (updated) {
        setSelectedProject(updated);
        const updatedList = await fetchProjects();
        setProjects(updatedList);
      }
    } catch (err: any) {
      console.error('Failed to toggle task status:', err);
    }
  };

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <DecorativeShapes variant="loop" className="-top-16 -right-20 opacity-50" />

      {/* Header & Primary Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#d5c7b2]/15">
        <div>
          <div className="flex items-center gap-2 text-[#d1a24f] text-xs font-semibold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>BIS Industry & Manufacturer Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#f4f2ec] tracking-tight">
            Manufacturing Compliance Platform
          </h1>
          <p className="text-sm text-[#d5c7b2] mt-1">
            Intelligent standards discovery, lab report audits, statutory project milestones, and MSME fee concessions.
          </p>
        </div>

        {/* Main Industry Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#171713]/90 border border-[#d5c7b2]/15 text-xs font-semibold overflow-x-auto shadow-md">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'products'
                ? 'bg-[#d1a24f] text-[#171713] font-bold shadow-md shadow-[#d1a24f]/20'
                : 'text-[#d5c7b2] hover:text-[#f4f2ec] hover:bg-[#4b4932]/40'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Product Safety & Standards</span>
          </button>

          <button
            onClick={() => setActiveTab('discovery')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'discovery'
                ? 'bg-[#d1a24f] text-[#171713] font-bold shadow-md shadow-[#d1a24f]/20'
                : 'text-[#d5c7b2] hover:text-[#f4f2ec] hover:bg-[#4b4932]/40'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Standards Discovery</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'audit'
                ? 'bg-[#d1a24f] text-[#171713] font-bold shadow-md shadow-[#d1a24f]/20'
                : 'text-[#d5c7b2] hover:text-[#f4f2ec] hover:bg-[#4b4932]/40'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Document Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'projects'
                ? 'bg-[#d1a24f] text-[#171713] font-bold shadow-md shadow-[#d1a24f]/20'
                : 'text-[#d5c7b2] hover:text-[#f4f2ec] hover:bg-[#4b4932]/40'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Compliance Projects</span>
          </button>

          <button
            onClick={() => setActiveTab('wizard')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'wizard'
                ? 'bg-[#d1a24f] text-[#171713] font-bold shadow-md shadow-[#d1a24f]/20'
                : 'text-[#d5c7b2] hover:text-[#f4f2ec] hover:bg-[#4b4932]/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>5-Step Wizard</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 0: UNIFIED PRODUCT SAFETY & STANDARDS EXPLORER (TOYS, KETTLES, FANS)   */}
      {/* ========================================================================= */}
      {activeTab === 'products' && (
        <ProductComplianceExplorer initialProductId={explorerInitialProduct} />
      )}

      {/* ========================================================================= */}
      {/* TAB 1: INTELLIGENT STANDARDS DISCOVERY                                    */}
      {/* ========================================================================= */}
      {activeTab === 'discovery' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="rounded-[30px] glass-charcoal p-6 sm:p-8 border border-[#d1a24f]/30 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d1a24f]">
                Natural Language Regulatory Scope Discovery
              </span>
              <h2 className="text-2xl font-bold text-[#f4f2ec]">Find Applicable Indian Standards & QCO Mandates</h2>
              <p className="text-xs text-[#d5c7b2]">
                Describe the product, commodity, or intended application. The engine identifies governing Indian Standards, Quality Control Orders (QCO), and Certification Schemes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#d5c7b2]/60" />
                <input
                  type="text"
                  value={discoveryQuery}
                  onChange={(e) => setDiscoveryQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDiscover()}
                  placeholder="e.g. Electric ceiling fans with 1200mm sweep or Portland pozzolana cement for residential RCC"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#171713]/90 border border-[#d5c7b2]/20 focus:border-[#d1a24f] focus:ring-2 focus:ring-[#d1a24f]/20 text-[#f4f2ec] placeholder:text-[#d5c7b2]/40 text-sm font-medium outline-none transition-all"
                />
              </div>

              <button
                onClick={() => handleDiscover()}
                disabled={discoveryLoading || !discoveryQuery.trim()}
                className="px-8 py-4 rounded-2xl font-bold text-sm bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] shadow-lg shadow-[#d1a24f]/25 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-[#171713]" />
                <span>{discoveryLoading ? 'Discovering...' : 'Discover Standards'}</span>
              </button>
            </div>

            {/* Quick Demo Search Chips */}
            <div className="pt-2 border-t border-[#d5c7b2]/15 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#d5c7b2]/70 block">
                Sample Industry Queries:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => {
                    setDiscoveryQuery('electric ceiling fan for home residential use');
                    handleDiscover('electric ceiling fan for home residential use');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#4b4932]/35 hover:bg-[#4b4932]/70 text-[#d5c7b2] hover:text-[#f4f2ec] border border-[#d5c7b2]/15"
                >
                  Ceiling Fans (IS 374)
                </button>
                <button
                  onClick={() => {
                    setDiscoveryQuery('portland pozzolana cement for construction and plastering');
                    handleDiscover('portland pozzolana cement for construction and plastering');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#4b4932]/35 hover:bg-[#4b4932]/70 text-[#d5c7b2] hover:text-[#f4f2ec] border border-[#d5c7b2]/15"
                >
                  PPC Cement (IS 1489)
                </button>
                <button
                  onClick={() => {
                    setDiscoveryQuery('electric kettle with automatic boil dry cut off');
                    handleDiscover('electric kettle with automatic boil dry cut off');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#4b4932]/35 hover:bg-[#4b4932]/70 text-[#d5c7b2] hover:text-[#f4f2ec] border border-[#d5c7b2]/15"
                >
                  Electric Kettles (IS 302)
                </button>
                <button
                  onClick={() => {
                    setDiscoveryQuery('two wheeler protective helmets for motorcycle riders');
                    handleDiscover('two wheeler protective helmets for motorcycle riders');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#4b4932]/35 hover:bg-[#4b4932]/70 text-[#d5c7b2] hover:text-[#f4f2ec] border border-[#d5c7b2]/15"
                >
                  Motorcycle Helmets (IS 4151)
                </button>
                <button
                  onClick={() => {
                    setDiscoveryQuery('children toys mechanical safety and toxic heavy metal migration');
                    handleDiscover('children toys mechanical safety and toxic heavy metal migration');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#4b4932]/35 hover:bg-[#4b4932]/70 text-[#d5c7b2] hover:text-[#f4f2ec] border border-[#d5c7b2]/15"
                >
                  Children Toys (IS 9873)
                </button>
              </div>
            </div>
          </div>

          {/* Discovery Results Cards */}
          {discoveryResult && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Applicable Standards Card */}
                <div className="md:col-span-2 rounded-[28px] glass-charcoal p-6 sm:p-8 border border-[#d5c7b2]/20 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#d5c7b2]/15">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#d1a24f]">
                        Applicable Standards
                      </span>
                      <h3 className="text-xl font-bold text-[#f4f2ec] mt-0.5">
                        {discoveryResult.product}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#927a48]/20 text-[#d1a24f] border border-[#d1a24f]/30">
                      Match Confidence: {Math.round(discoveryResult.confidence * 100)}%
                    </span>
                  </div>

                  <div className="space-y-3">
                    {discoveryResult.standards.map((std, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#4b4932]/25 border border-[#d5c7b2]/10 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[#d1a24f] text-sm">
                            {std.standard_number}
                          </span>
                          {std.is_primary && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d1a24f]/20 text-[#d1a24f] border border-[#d1a24f]/40">
                              PRIMARY SPECIFICATION
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-[#f4f2ec] text-sm">{std.title}</h4>
                        <p className="text-[#d5c7b2] text-xs leading-relaxed">{std.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Mandatory Scheme & QCO Cards */}
                <div className="space-y-6">
                  {/* QCO Card */}
                  <div className="rounded-[28px] glass-charcoal p-6 border border-[#d1a24f]/40 space-y-3">
                    <div className="flex items-center gap-2 text-[#d1a24f] text-xs font-bold uppercase">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Quality Control Order (QCO)</span>
                    </div>
                    <div className="space-y-1">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        discoveryResult.qco.applicable ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-[#4b4932] text-[#d5c7b2]'
                      }`}>
                        {discoveryResult.qco.applicable ? 'MANDATORY STATUTORY ORDER' : 'VOLUNTARY / UNINDEXED'}
                      </span>
                      <h4 className="text-base font-bold text-[#f4f2ec]">{discoveryResult.qco.order_name}</h4>
                    </div>
                    <p className="text-xs text-[#d5c7b2] leading-relaxed">
                      {discoveryResult.qco.mandate_summary}
                    </p>
                  </div>

                  {/* Certification Scheme Card */}
                  <div className="rounded-[28px] glass-charcoal p-6 border border-[#d5c7b2]/20 space-y-3">
                    <div className="flex items-center gap-2 text-[#d1a24f] text-xs font-bold uppercase">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Conformity Scheme</span>
                    </div>
                    <h4 className="text-base font-bold text-[#f4f2ec]">{discoveryResult.certification.scheme}</h4>
                    <p className="text-xs text-[#d5c7b2] leading-relaxed">
                      {discoveryResult.certification.scheme_description}
                    </p>
                    <div className="pt-3">
                      <button
                        onClick={() => {
                          setNewProjectForm({
                            title: `${discoveryResult.product} Certification Pilot`,
                            product_id: discoveryResult.matched_product_id || 'prod_electric_fans',
                            enterprise_scale: 'MICRO',
                            target_standard: discoveryResult.standards[0]?.standard_number || 'IS Standard'
                          });
                          setShowNewProjectModal(true);
                        }}
                        className="w-full py-3 rounded-xl bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] font-bold text-xs shadow-lg shadow-[#d1a24f]/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Start Compliance Project</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: DOCUMENT COMPLIANCE AUDIT                                         */}
      {/* ========================================================================= */}
      {activeTab === 'audit' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="rounded-[30px] glass-charcoal p-6 sm:p-8 border border-[#d1a24f]/30 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d1a24f]">
                Automated Regulatory Verification
              </span>
              <h2 className="text-2xl font-bold text-[#f4f2ec]">Upload Test Report or Specification Sheet</h2>
              <p className="text-xs text-[#d5c7b2]">
                Upload a laboratory test report or manufacturer technical data sheet (.pdf or .txt). The audit engine extracts technical parameters and compares them against statutory Indian Standards clauses.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#171713]/70 border-2 border-dashed border-[#d5c7b2]/20 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#927a48]/20 border border-[#d1a24f]/30 text-[#d1a24f] flex items-center justify-center mx-auto">
                <FileSpreadsheet className="w-7 h-7" />
              </div>

              <div>
                <p className="text-sm font-bold text-[#f4f2ec]">
                  {auditFile ? auditFile.name : 'Select or Drop Test Report / Data Sheet'}
                </p>
                <p className="text-xs text-[#d5c7b2] mt-1">
                  Supported formats: PDF, TXT (Maximum file size: 15MB)
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <label className="px-5 py-2.5 rounded-xl bg-[#4b4932]/50 hover:bg-[#4b4932]/80 text-[#f4f2ec] font-bold text-xs cursor-pointer border border-[#d5c7b2]/20 transition-all">
                  <span>Browse Document</span>
                  <input
                    type="file"
                    accept=".pdf,.txt"
                    onChange={(e) => {
                      if (e.target.files?.[0]) setAuditFile(e.target.files[0]);
                    }}
                    className="hidden"
                  />
                </label>

                {auditFile && (
                  <button
                    onClick={() => handleDocumentAudit()}
                    disabled={auditLoading}
                    className="px-6 py-2.5 rounded-xl bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] font-bold text-xs shadow-lg transition-all flex items-center gap-2"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${auditLoading ? 'animate-spin' : ''}`} />
                    <span>{auditLoading ? 'Auditing Parameters...' : 'Run Audit'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Demo Report Buttons */}
            <div className="pt-2 border-t border-[#d5c7b2]/15 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#d5c7b2]/70 block">
                Or Load Demo Test Reports:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => {
                    const demoBlob = new Blob([
                      "LAB TEST REPORT: Electric Kettle Model EK-200. Conforms to IS 302-2-15:2009. Rated Voltage: 230 V AC. Input Power: 1500 W. Leakage Current: 0.32 mA (Clause 13.2 pass). Earthing Resistance: 0.04 Ohms (Clause 27.5 pass). Electric Strength: 1500 V withstand (Clause 13.3 pass). Boil-dry auto shut off functional."
                    ], { type: "text/plain" });
                    const file = new File([demoBlob], "kettle_compliant_test_report.txt", { type: "text/plain" });
                    setAuditFile(file);
                    handleDocumentAudit(file);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#4b4932]/40 hover:bg-[#4b4932]/70 text-[#d1a24f] border border-[#d1a24f]/30"
                >
                  ✓ Demo Report 1: Fully Compliant Kettle (IS 302)
                </button>
                <button
                  onClick={() => {
                    const demoBlob = new Blob([
                      "TEST REPORT: Ceiling Fan 1200mm sweep. IS 374:2019. Air delivery measured: 195 m3/min. Service value: 3.4 m3/min/W. Input power: 75 W. High voltage test pass 1500 V."
                    ], { type: "text/plain" });
                    const file = new File([demoBlob], "fan_non_compliant_report.txt", { type: "text/plain" });
                    setAuditFile(file);
                    handleDocumentAudit(file);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30"
                >
                  ✕ Demo Report 2: Substandard Air Delivery Fan (IS 374)
                </button>
              </div>
            </div>
          </div>

          {/* Audit Results Table */}
          {auditResult && (
            <div className="rounded-[30px] glass-charcoal p-6 sm:p-8 border border-[#d5c7b2]/20 space-y-6 shadow-2xl">
              <div className="flex items-start justify-between flex-wrap gap-4 pb-4 border-b border-[#d5c7b2]/15">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d5c7b2]">
                    Audit Inspection Report
                  </span>
                  <h3 className="text-2xl font-black text-[#f4f2ec] mt-1">
                    {auditResult.product}
                  </h3>
                  <p className="text-xs text-[#d5c7b2] font-mono mt-0.5">
                    File: {auditResult.filename} • Primary Standard: {auditResult.applicable_standards[0]?.standard_number}
                  </p>
                </div>

                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    auditResult.overall_status === 'PASS'
                      ? 'bg-[#927a48]/30 text-[#d1a24f] border border-[#d1a24f]/40'
                      : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  }`}>
                    STATUS: {auditResult.overall_status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Itemized Requirements Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#d5c7b2]">
                  <thead className="bg-[#4b4932]/30 uppercase font-bold text-[#f4f2ec] text-[11px] border-b border-[#d5c7b2]/15">
                    <tr>
                      <th className="p-3.5">Statutory Parameter</th>
                      <th className="p-3.5">Governing Clause</th>
                      <th className="p-3.5">Required Limit</th>
                      <th className="p-3.5">Document Value</th>
                      <th className="p-3.5 text-right">Conformance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d5c7b2]/10">
                    {auditResult.requirements.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#4b4932]/20 transition-colors">
                        <td className="p-3.5 font-semibold text-[#f4f2ec]">{row.requirement}</td>
                        <td className="p-3.5 font-mono text-[#d1a24f]">{row.source_clause}</td>
                        <td className="p-3.5 text-[#d5c7b2]">{row.required_value}</td>
                        <td className="p-3.5 font-mono font-bold text-[#f4f2ec]">
                          {row.document_value || 'Not Declared'}
                        </td>
                        <td className="p-3.5 text-right">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            row.status === 'PASS'
                              ? 'bg-[#927a48]/30 text-[#d1a24f] border border-[#d1a24f]/40'
                              : 'bg-red-500/20 text-red-300 border border-red-500/40'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: COMPLIANCE PROJECTS & 10-STEP MILESTONES                            */}
      {/* ========================================================================= */}
      {activeTab === 'projects' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#d1a24f]">
                Persistent Lifecycle Management
              </span>
              <h2 className="text-2xl font-bold text-[#f4f2ec]">BIS Certification Projects</h2>
              <p className="text-xs text-[#d5c7b2]">
                Track real-time statutory milestones from factory setup to Manakonline grant of Certification Marks Licence (CM/L).
              </p>
            </div>

            <button
              onClick={() => setShowNewProjectModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#d1a24f]/20 transition-all"
            >
              <Plus className="w-4 h-4 text-[#171713]" />
              <span>Create New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project List Sidebar */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d5c7b2] block px-1">
                Active Licensing Files ({projects.length})
              </span>
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={async () => {
                    const full = await fetchProject(proj.id);
                    if (full) setSelectedProject(full);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedProject?.id === proj.id
                      ? 'bg-[#4b4932]/70 border-[#d1a24f] shadow-md'
                      : 'rounded-2xl glass-charcoal border-[#d5c7b2]/15 hover:bg-[#4b4932]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#d1a24f] font-mono">
                      {proj.target_standard}
                    </span>
                    <span className="text-xs font-black text-[#d1a24f] font-mono">
                      {proj.progress_percent}%
                    </span>
                  </div>
                  <h4 className="font-bold text-[#f4f2ec] text-sm mt-1">{proj.title}</h4>
                  <p className="text-xs text-[#d5c7b2] mt-0.5">{proj.product_name} • {proj.enterprise_scale}</p>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-[#171713] mt-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#927a48] to-[#d1a24f] rounded-full transition-all duration-300"
                      style={{ width: `${proj.progress_percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Project Milestone Checklist */}
            <div className="lg:col-span-2 rounded-[28px] glass-charcoal p-6 sm:p-8 border border-[#d5c7b2]/20 space-y-6 shadow-2xl">
              {selectedProject ? (
                <>
                  <div className="flex items-start justify-between flex-wrap gap-4 pb-4 border-b border-[#d5c7b2]/15">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#d1a24f]/20 text-[#d1a24f] border border-[#d1a24f]/40">
                          {selectedProject.enterprise_scale} MSME
                        </span>
                        <span className="text-xs font-mono text-[#d5c7b2]">
                          ID: {selectedProject.id}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-[#f4f2ec] mt-1">
                        {selectedProject.title}
                      </h3>
                      <p className="text-xs text-[#d5c7b2] font-medium">
                        Standard: <strong className="text-[#d1a24f] font-mono">{selectedProject.target_standard}</strong> • Scheme-I (ISI Mark)
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-3xl font-black text-[#d1a24f] font-mono">
                        {selectedProject.progress_percent}%
                      </span>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#d5c7b2]">
                        Milestone Progress
                      </p>
                    </div>
                  </div>

                  {/* 10 Milestone Tasks */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#d5c7b2] block">
                      Mandatory BIS 10-Step Licensing Roadmap:
                    </span>

                    {(selectedProject.tasks || []).map((task) => (
                      <div
                        key={task.id}
                        onClick={() => handleToggleProjectTask(task.id, task.status)}
                        className={`p-4 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                          task.status === 'COMPLETED'
                            ? 'bg-[#4b4932]/40 border-[#d1a24f]/50 text-[#f4f2ec]'
                            : 'bg-[#171713]/60 border-[#d5c7b2]/15 hover:bg-[#4b4932]/20 text-[#d5c7b2]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                            task.status === 'COMPLETED'
                              ? 'bg-[#d1a24f] text-[#171713]'
                              : 'border border-[#d5c7b2]/30 text-[#d5c7b2]'
                          }`}>
                            {task.status === 'COMPLETED' ? '✓' : task.step_number}
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#d5c7b2]/70 block">
                              {task.phase}
                            </span>
                            <h5 className={`text-xs font-bold ${task.status === 'COMPLETED' ? 'line-through text-[#d5c7b2]/60' : 'text-[#f4f2ec]'}`}>
                              {task.title}
                            </h5>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 text-xs">
                          <span className="text-[#d5c7b2] font-mono text-[11px]">
                            ~{task.estimated_days}d
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            task.status === 'COMPLETED'
                              ? 'bg-[#d1a24f]/20 text-[#d1a24f]'
                              : 'bg-[#171713] text-[#d5c7b2]'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-12 text-center text-[#d5c7b2] text-sm">
                  Select a compliance project from the left or create a new project.
                </div>
              )}
            </div>
          </div>

          {/* Create Project Modal */}
          {showNewProjectModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171713]/85 backdrop-blur-md animate-in fade-in duration-200">
              <div className="w-full max-w-md glass-charcoal p-6 rounded-3xl border border-[#d1a24f]/40 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#d5c7b2]/15">
                  <h3 className="font-bold text-[#f4f2ec] text-base">New BIS Certification Project</h3>
                  <button onClick={() => setShowNewProjectModal(false)} className="text-[#d5c7b2] hover:text-[#f4f2ec] text-sm font-bold">✕</button>
                </div>

                <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#d5c7b2] font-semibold mb-1">Project Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Electric Fan Certification"
                      value={newProjectForm.title}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#171713] border border-[#d5c7b2]/20 text-[#f4f2ec] outline-none focus:border-[#d1a24f]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#d5c7b2] font-semibold mb-1">Product Category</label>
                    <select
                      value={newProjectForm.product_id}
                      onChange={(e) => {
                        const pid = e.target.value;
                        const prod = products.find((p) => p.id === pid);
                        setNewProjectForm({
                          ...newProjectForm,
                          product_id: pid,
                          target_standard: prod?.applicable_standards[0]?.code || 'IS Standard'
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#171713] border border-[#d5c7b2]/20 text-[#f4f2ec] outline-none focus:border-[#d1a24f]"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.applicable_standards[0]?.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#d5c7b2] font-semibold mb-1">Enterprise Scale</label>
                    <select
                      value={newProjectForm.enterprise_scale}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, enterprise_scale: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#171713] border border-[#d5c7b2]/20 text-[#f4f2ec] outline-none focus:border-[#d1a24f]"
                    >
                      <option value="MICRO">Micro Enterprise (50% Marking Fee Concession)</option>
                      <option value="SMALL">Small Enterprise (20% Marking Fee Concession)</option>
                      <option value="MEDIUM">Medium Enterprise (Full Rate)</option>
                      <option value="LARGE">Large Enterprise (Full Rate)</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowNewProjectModal(false)}
                      className="px-4 py-2 rounded-xl border border-[#d5c7b2]/20 text-[#d5c7b2]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] font-bold"
                    >
                      Initialize Project
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: 5-STEP COMPLIANCE WIZARD & COST CALCULATOR                         */}
      {/* ========================================================================= */}
      {activeTab === 'wizard' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Step Indicator */}
          <div className="flex items-center justify-between p-2 rounded-2xl bg-[#171713]/90 border border-[#d5c7b2]/15 text-xs font-semibold overflow-x-auto">
            {[
              { num: 1, label: 'Product Selection' },
              { num: 2, label: 'Enterprise Profile' },
              { num: 3, label: 'Standards & QCO' },
              { num: 4, label: 'Factory Roadmap' },
              { num: 5, label: 'MSME Fees & Labs' }
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                  currentStep === s.num
                    ? 'bg-[#d1a24f] text-[#171713] font-bold shadow-md shadow-[#d1a24f]/20'
                    : currentStep > s.num
                    ? 'text-[#d1a24f] hover:bg-[#4b4932]/40'
                    : 'text-[#d5c7b2] hover:bg-[#4b4932]/40'
                }`}
              >
                <span>{s.num}.</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          {/* STEP 1: PRODUCT SELECTION */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#f4f2ec]">Select Product Category to Certify</h2>
                <p className="text-xs text-[#d5c7b2]">
                  Choose the commodity you intend to manufacture or import for the Indian market.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((prod) => {
                  const isSelected = selectedProductId === prod.id;
                  return (
                    <div
                      key={prod.id}
                      onClick={() => setSelectedProductId(prod.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 relative ${
                        isSelected
                          ? 'bg-[#4b4932]/50 border-[#d1a24f] ring-2 ring-[#d1a24f]/30'
                          : 'glass-charcoal border-[#d5c7b2]/15 hover:border-[#d5c7b2]/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#171713] text-[#d1a24f] uppercase">
                          {prod.category}
                        </span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#d1a24f] text-[#171713] flex items-center justify-center text-xs font-black">
                            ✓
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-[#f4f2ec] text-base">{prod.name}</h3>
                      <p className="text-xs text-[#d5c7b2] line-clamp-2 leading-relaxed">{prod.description}</p>

                      <div className="pt-2 border-t border-[#d5c7b2]/10 flex items-center justify-between text-[11px] text-[#d5c7b2]">
                        <span>Standard:</span>
                        <span className="font-mono font-bold text-[#d1a24f]">
                          {prod.applicable_standards[0]?.code}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] shadow-lg shadow-[#d1a24f]/25 transition-all"
                >
                  <span>Proceed to Enterprise Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ENTERPRISE PROFILE */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#f4f2ec]">Enterprise Scale & Manufacturing Origin</h2>
                <p className="text-xs text-[#d5c7b2]">
                  Select your enterprise scale according to Udyam Registration to calculate statutory fee concessions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl glass-charcoal p-6 border border-[#d5c7b2]/15 space-y-4">
                  <h3 className="text-sm font-bold text-[#f4f2ec] uppercase tracking-wider">Enterprise Scale</h3>
                  {[
                    { id: 'MICRO', title: 'Micro Enterprise', desc: 'Investment < ₹1 Cr, Turnover < ₹5 Cr', discount: '50% Marking Fee Concession' },
                    { id: 'SMALL', title: 'Small Enterprise', desc: 'Investment < ₹10 Cr, Turnover < ₹50 Cr', discount: '20% Marking Fee Concession' },
                    { id: 'MEDIUM', title: 'Medium Enterprise', desc: 'Investment < ₹50 Cr, Turnover < ₹250 Cr', discount: 'Standard Fee Schedule' },
                    { id: 'LARGE', title: 'Large Enterprise', desc: 'Investment > ₹50 Cr, Turnover > ₹250 Cr', discount: 'Standard Fee Schedule' }
                  ].map((scale) => (
                    <div
                      key={scale.id}
                      onClick={() => setEnterpriseScale(scale.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        enterpriseScale === scale.id
                          ? 'border-[#d1a24f] bg-[#4b4932]/50'
                          : 'border-[#d5c7b2]/15 hover:bg-[#4b4932]/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-[#f4f2ec] text-sm">{scale.title}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#927a48]/30 text-[#d1a24f]">
                          {scale.discount}
                        </span>
                      </div>
                      <p className="text-xs text-[#d5c7b2] mt-1">{scale.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl glass-charcoal p-6 border border-[#d5c7b2]/15 space-y-4">
                  <h3 className="text-sm font-bold text-[#f4f2ec] uppercase tracking-wider">Manufacturing Location</h3>
                  {[
                    { id: 'DOMESTIC', title: 'Domestic Manufacturer (Make in India)', desc: 'Standard ISI Scheme-I application pathway' },
                    { id: 'FOREIGN', title: 'Foreign Manufacturer (FMCS)', desc: 'Certification under Foreign Manufacturers Certification Scheme' }
                  ].map((loc) => (
                    <div
                      key={loc.id}
                      onClick={() => setLocation(loc.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        location === loc.id
                          ? 'border-[#d1a24f] bg-[#4b4932]/50'
                          : 'border-[#d5c7b2]/15 hover:bg-[#4b4932]/20'
                      }`}
                    >
                      <h4 className="font-bold text-[#f4f2ec] text-sm">{loc.title}</h4>
                      <p className="text-xs text-[#d5c7b2] mt-1">{loc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#d5c7b2] hover:bg-[#4b4932]/30 border border-[#d5c7b2]/20"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] shadow-lg shadow-[#d1a24f]/25 transition-all"
                >
                  <span>View Governing Standards</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: STANDARDS & QCO VERIFICATION */}
          {currentStep === 3 && analysis && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#f4f2ec]">Step 3: Statutory Standards & QCO Mandate</h2>
                <p className="text-xs text-[#d5c7b2]">
                  Indian Standards applicable to {analysis.product.name} under Section 16 of the BIS Act, 2016.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl glass-charcoal p-6 border border-[#d5c7b2]/15 space-y-4">
                  <h3 className="text-sm font-bold text-[#f4f2ec] uppercase tracking-wider">Applicable Indian Standards</h3>
                  {analysis.applicable_standards.map((std, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#4b4932]/30 border border-[#d5c7b2]/10 space-y-1 text-xs">
                      <span className="font-mono font-bold text-[#d1a24f] text-sm">{std.code}</span>
                      <h4 className="font-bold text-[#f4f2ec]">{std.title}</h4>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl glass-charcoal p-6 border border-[#d1a24f]/40 space-y-3">
                  <h3 className="text-sm font-bold text-[#d1a24f] uppercase tracking-wider">Quality Control Order (QCO)</h3>
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300">
                      MANDATORY CERTIFICATION
                    </span>
                    <h4 className="text-base font-bold text-[#f4f2ec]">{analysis.qco_status.order_name}</h4>
                  </div>
                  <p className="text-xs text-[#d5c7b2] leading-relaxed">
                    Ministry: {analysis.qco_status.ministry} • Legal Basis: {analysis.qco_status.legal_basis}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#d5c7b2] hover:bg-[#4b4932]/30 border border-[#d5c7b2]/20"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] shadow-lg shadow-[#d1a24f]/25 transition-all"
                >
                  <span>View Factory Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: FACTORY ROADMAP */}
          {currentStep === 4 && analysis && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#f4f2ec]">Step 4: Factory Conformance Roadmap</h2>
                <p className="text-xs text-[#d5c7b2]">
                  Sequential action items required prior to BIS on-site inspection and sample drawing.
                </p>
              </div>

              <div className="space-y-4">
                {analysis.roadmap.map((step) => (
                  <div key={step.step_number} className="p-5 rounded-2xl glass-charcoal border border-[#d5c7b2]/15 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#d1a24f]">
                        {step.phase} • Step {step.step_number}
                      </span>
                      <span className="font-mono text-[#d5c7b2] font-semibold">
                        Estimated: ~{step.estimated_days} Days
                      </span>
                    </div>
                    <h3 className="font-bold text-[#f4f2ec] text-base">{step.title}</h3>
                    <p className="text-[#d5c7b2] leading-relaxed">{step.description}</p>
                    <div className="space-y-1.5 pt-2 border-t border-[#d5c7b2]/10">
                      {step.action_items.map((action, i) => (
                        <div key={i} className="flex items-center gap-2 text-[#d5c7b2]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d1a24f] shrink-0" />
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#d5c7b2] hover:bg-[#4b4932]/30 border border-[#d5c7b2]/20"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setCurrentStep(5)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] shadow-lg shadow-[#d1a24f]/25 transition-all"
                >
                  <span>Calculate Fees & View Labs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: MSME FEES & LABS */}
          {currentStep === 5 && analysis && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#f4f2ec]">Step 5: MSME Fee Calculator & Testing Labs</h2>
                <p className="text-xs text-[#d5c7b2]">
                  Itemized statutory fee breakdown under Bureau of Indian Standards (Conformity Assessment) Regulations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fee Card */}
                <div className="glass-charcoal p-6 rounded-2xl border border-[#d5c7b2]/20 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#d5c7b2]/15">
                    <h3 className="font-bold text-[#f4f2ec] text-base">Fee Breakdown ({analysis.cost_timeline.enterprise_scale})</h3>
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#927a48]/30 text-[#d1a24f]">
                      {analysis.cost_timeline.discount_percent}% Concession
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-[#d5c7b2]">
                    <div className="flex justify-between">
                      <span>Application Fee:</span>
                      <span className="font-mono font-bold">₹{analysis.cost_timeline.fee_breakdown.application_fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Fee:</span>
                      <span className="font-mono font-bold">₹{analysis.cost_timeline.fee_breakdown.processing_fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Factory Audit:</span>
                      <span className="font-mono font-bold">₹{analysis.cost_timeline.fee_breakdown.factory_inspection_fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lab Testing Estimate:</span>
                      <span className="font-mono font-bold">₹{analysis.cost_timeline.fee_breakdown.lab_testing_estimate}</span>
                    </div>
                    <div className="flex justify-between text-[#d1a24f]">
                      <span>Annual Marking Fee (Discounted):</span>
                      <span className="font-mono font-bold">₹{analysis.cost_timeline.fee_breakdown.net_marking_fee}</span>
                    </div>
                    <div className="pt-2 border-t border-[#d5c7b2]/15 flex justify-between text-sm font-black text-[#f4f2ec]">
                      <span>Grand Total (incl. GST):</span>
                      <span className="font-mono text-[#d1a24f]">₹{analysis.cost_timeline.fee_breakdown.grand_total_inr}</span>
                    </div>
                  </div>
                </div>

                {/* Labs Card */}
                <div className="glass-charcoal p-6 rounded-2xl border border-[#d5c7b2]/20 space-y-4">
                  <h3 className="font-bold text-[#f4f2ec] text-base">Recognized Testing Laboratories</h3>
                  <div className="space-y-3">
                    {analysis.recommended_laboratories.map((lab) => (
                      <div key={lab.id} className="p-3.5 rounded-xl bg-[#4b4932]/30 border border-[#d5c7b2]/10 space-y-1 text-xs">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-[#f4f2ec]">{lab.name}</h4>
                          <span className="text-[10px] font-bold text-[#d1a24f]">★ {lab.rating}</span>
                        </div>
                        <p className="text-[#d5c7b2] text-[11px]">{lab.city}, {lab.state} • Turnaround: {lab.sample_turnaround_days} Days</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#d5c7b2] hover:bg-[#4b4932]/30 border border-[#d5c7b2]/20"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] shadow-lg shadow-[#d1a24f]/25 transition-all"
                >
                  <span>Start New Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
