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
  Calculator
} from 'lucide-react';
import { Product, ComplianceAnalysis } from '@/lib/types';
import { fetchProducts, analyzeCompliance } from '@/lib/api';

export default function IndustryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('prod_electric_kettle');
  const [enterpriseScale, setEnterpriseScale] = useState<string>('MICRO');
  const [location, setLocation] = useState<string>('DOMESTIC');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [analysis, setAnalysis] = useState<ComplianceAnalysis | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const prods = await fetchProducts();
      setProducts(prods);
      if (prods.length > 0) {
        setSelectedProductId(prods[0].id);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    async function runAnalysis() {
      if (!selectedProductId) return;
      setLoading(true);
      const res = await analyzeCompliance(selectedProductId, enterpriseScale, location);
      setAnalysis(res);
      setLoading(false);
    }
    runAnalysis();
  }, [selectedProductId, enterpriseScale, location]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Manufacturer Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Industry Compliance Wizard
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Automated technical standard mapping, mandatory QCO verification, and 7-phase BIS licensing roadmap.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-medium">
          {[
            { num: 1, label: 'Product' },
            { num: 2, label: 'Profile' },
            { num: 3, label: 'Standards' },
            { num: 4, label: 'Roadmap' },
            { num: 5, label: 'Cost & Labs' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentStep === s.num
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : currentStep > s.num
                  ? 'text-emerald-400 hover:bg-white/5'
                  : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <span>{s.num}.</span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: PRODUCT SELECTION */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">Step 1: Select Product Category to Certify</h2>
            <p className="text-xs text-slate-400">
              Choose the exact commodity you intend to manufacture or import for the Indian market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((prod) => {
              const isSelected = prod.id === selectedProductId;
              return (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProductId(prod.id)}
                  className={`cursor-pointer p-6 rounded-2xl glass-panel border transition-all text-left relative ${
                    isSelected
                      ? 'border-amber-400 glow-saffron bg-amber-500/10'
                      : 'border-white/10 hover:border-white/20 glass-card-hover'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-slate-950">
                      <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-white/10 text-amber-300">
                    {prod.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-3">{prod.name}</h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>{prod.applicable_standards[0].code}</span>
                    <span className="text-amber-400 font-semibold">{prod.scheme}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 transition-all"
            >
              <span>Next: Configure Manufacturer Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: ENTERPRISE PROFILE */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">Step 2: Manufacturer Scale & Subsidies</h2>
            <p className="text-xs text-slate-400">
              Government of India provides statutory marking fee concessions up to 50% for Micro Enterprises and DPIIT Startups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Manufacturing Location */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Manufacturing Location
              </label>
              <div className="space-y-3">
                {[
                  { id: 'DOMESTIC', label: 'Domestic Manufacturing (Within India)', desc: 'Standard Scheme-I / Scheme-II with local branch office audit' },
                  { id: 'FOREIGN', label: 'Foreign Manufacturing (Outside India)', desc: 'Foreign Manufacturers Certification Scheme (FMCS) with AIR appointment' },
                ].map((loc) => (
                  <div
                    key={loc.id}
                    onClick={() => setLocation(loc.id)}
                    className={`p-4 rounded-xl cursor-pointer border transition-all ${
                      location === loc.id
                        ? 'border-amber-400 bg-amber-500/10'
                        : 'border-white/10 hover:border-white/20 bg-slate-900/60'
                    }`}
                  >
                    <p className="text-sm font-bold text-white">{loc.label}</p>
                    <p className="text-xs text-slate-400 mt-1">{loc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise Scale / MSME */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  MSME / Enterprise Scale
                </label>
                <span className="inline-flex items-center gap-1 text-[11px] text-amber-400">
                  <BadgePercent className="w-3.5 h-3.5" />
                  <span>Fee Concession</span>
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'MICRO', name: 'Micro Enterprise', discount: '50% Off Marking Fee', req: 'Investment < ₹1 Cr, Turnover < ₹5 Cr' },
                  { id: 'STARTUP', name: 'DPIIT Recognized Startup', discount: '50% Off Marking Fee', req: 'Valid DPIIT Certificate' },
                  { id: 'SMALL', name: 'Small Enterprise', discount: '20% Off Marking Fee', req: 'Investment < ₹10 Cr, Turnover < ₹50 Cr' },
                  { id: 'MEDIUM', name: 'Medium / Large Enterprise', discount: 'Standard Fee Schedule', req: 'Investment > ₹10 Cr' },
                ].map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setEnterpriseScale(s.id)}
                    className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                      enterpriseScale === s.id
                        ? 'border-amber-400 bg-amber-500/10'
                        : 'border-white/10 hover:border-white/20 bg-slate-900/60'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-white">{s.name}</p>
                      <p className="text-[10px] text-slate-400">{s.req}</p>
                    </div>
                    <span className="text-[11px] font-bold text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded">
                      {s.discount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/5 border border-white/10 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 transition-all"
            >
              <span>Next: View Applicable Standards & QCO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: APPLICABLE STANDARDS & QCO */}
      {currentStep === 3 && analysis && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">Step 3: Applicable Indian Standards & Regulatory Mandate</h2>
            <p className="text-xs text-slate-400">
              Direct legal grounding from Gazette Notifications and Bureau of Indian Standards specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Standards Mapped Card */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Primary Indian Standards
                </span>
                <div className="space-y-3">
                  {analysis.applicable_standards.map((std, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono font-bold text-amber-300">{std.code}</span>
                        {std.is_primary && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            PRIMARY SCOPE
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-white mt-1">{std.title}</p>
                    </div>
                  ))}
                </div>

                {/* Key Routine & Type Tests */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Mandatory Technical Testing Parameters
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {analysis.product.key_tests.map((test, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                          <span>{test.clause}</span>
                          <span className="text-amber-400 font-sans">{test.type}</span>
                        </div>
                        <p className="text-white font-medium">{test.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* QCO Order Card */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30 glow-emerald space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Mandatory QCO Status
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-2 text-xs">
                  <p className="text-emerald-200 font-bold text-sm">
                    {analysis.qco_status.order_name}
                  </p>
                  <p className="text-slate-300">
                    <strong>Enforcing Ministry:</strong> {analysis.qco_status.ministry}
                  </p>
                  <p className="text-slate-300">
                    <strong>Statutory Authority:</strong> {analysis.qco_status.legal_basis}
                  </p>
                  <p className="text-amber-300 font-medium pt-1">
                    ✓ Certification is COMPULSORY prior to commercial sale or import.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <h4 className="font-bold text-white">Applicable BIS Scheme:</h4>
                  <p className="text-amber-400 font-semibold">{analysis.scheme}</p>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {analysis.product.scheme_description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/5 border border-white/10 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 transition-all"
            >
              <span>Next: View 7-Phase Compliance Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: INTERACTIVE COMPLIANCE ROADMAP */}
      {currentStep === 4 && analysis && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Step 4: Interactive Compliance Roadmap</h2>
              <p className="text-xs text-slate-400">
                Track and check off each statutory milestone from document prep to final licence grant.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Total Estimated Turnaround: <strong>{analysis.product.timeline_days.total_estimated} Days</strong></span>
            </div>
          </div>

          <div className="space-y-4">
            {analysis.roadmap.map((step) => {
              const isDone = completedTasks[`step-${step.step_number}`];
              return (
                <div
                  key={step.step_number}
                  className={`p-6 rounded-2xl glass-panel border transition-all ${
                    isDone
                      ? 'border-emerald-500/40 bg-emerald-950/20'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleTask(`step-${step.step_number}`)}
                        className="text-slate-400 hover:text-amber-400 transition-colors"
                      >
                        {isDone ? (
                          <CheckSquare className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <Square className="w-6 h-6" />
                        )}
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                            {step.phase}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-xs text-slate-400 font-mono">
                            ~{step.estimated_days} Days
                          </span>
                        </div>
                        <h3 className={`text-base font-bold text-white ${isDone ? 'line-through text-slate-400' : ''}`}>
                          {step.step_number}. {step.title}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isDone
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-white/5 text-slate-300 border border-white/10'
                      }`}
                    >
                      {isDone ? 'COMPLETED' : 'PENDING'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Required Action Items:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {step.action_items.map((action, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Document Checklist Accordion */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Mandatory Document Dossier Checklist (Form-V)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {analysis.product.documents_required.map((doc, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-slate-300">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentStep(3)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/5 border border-white/10 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 transition-all"
            >
              <span>Next: Cost Calculator & Testing Labs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: COST & TIMELINE CALCULATOR + LABS */}
      {currentStep === 5 && analysis && (
        <div className="space-y-8 animate-in fade-in duration-300" id="compliance-dossier">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-black text-white">
                Step 5: Statutory Fee Assessment & Recognized Labs
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Itemized statutory costs governed by BIS Fee Rules with automatic MSME concession deduction.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print Dossier</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Itemized Fee Table */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white">Itemized Statutory Fee Breakdown</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {analysis.cost_timeline.concession_applied}
                  </span>
                </div>

                <div className="divide-y divide-white/10 text-xs">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-slate-300">Application Fee (Form-V)</span>
                    <span className="font-mono text-white font-semibold">
                      ₹{analysis.cost_timeline.fee_breakdown.application_fee.toLocaleString()}
                    </span>
                  </div>

                  <div className="py-2.5 flex justify-between">
                    <span className="text-slate-300">Preliminary Application Processing Fee</span>
                    <span className="font-mono text-white font-semibold">
                      ₹{analysis.cost_timeline.fee_breakdown.processing_fee.toLocaleString()}
                    </span>
                  </div>

                  <div className="py-2.5 flex justify-between">
                    <span className="text-slate-300">Factory Audit & Inspection Fee (1 Man-Day)</span>
                    <span className="font-mono text-white font-semibold">
                      ₹{analysis.cost_timeline.fee_breakdown.factory_inspection_fee.toLocaleString()}
                    </span>
                  </div>

                  <div className="py-2.5 flex justify-between">
                    <span className="text-slate-300">Sample Testing Fee (BIS Recognized Lab Estimate)</span>
                    <span className="font-mono text-white font-semibold">
                      ₹{analysis.cost_timeline.fee_breakdown.lab_testing_estimate.toLocaleString()}
                    </span>
                  </div>

                  <div className="py-2.5 flex justify-between">
                    <span className="text-slate-300">Standard Minimum Annual Marking Fee</span>
                    <span className="font-mono text-slate-400 line-through">
                      ₹{analysis.cost_timeline.fee_breakdown.gross_marking_fee.toLocaleString()}
                    </span>
                  </div>

                  {analysis.cost_timeline.discount_percent > 0 && (
                    <div className="py-2.5 flex justify-between text-emerald-400 font-medium">
                      <span>MSME Marking Fee Subsidy ({analysis.cost_timeline.discount_percent}% Concession)</span>
                      <span className="font-mono font-bold">
                        - ₹{analysis.cost_timeline.fee_breakdown.msme_discount_amount.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="py-2.5 flex justify-between font-bold">
                    <span className="text-slate-200">Net Applicable Marking Fee</span>
                    <span className="font-mono text-amber-300">
                      ₹{analysis.cost_timeline.fee_breakdown.net_marking_fee.toLocaleString()}
                    </span>
                  </div>

                  <div className="py-2.5 flex justify-between text-slate-400">
                    <span>GST (18% Statutory)</span>
                    <span className="font-mono text-slate-300 font-semibold">
                      ₹{analysis.cost_timeline.fee_breakdown.gst_18_percent.toLocaleString()}
                    </span>
                  </div>

                  <div className="pt-4 flex justify-between text-base font-black text-white">
                    <span>Estimated Total Initial Outlay</span>
                    <span className="font-mono text-2xl text-emerald-400">
                      ₹{analysis.cost_timeline.fee_breakdown.grand_total_inr.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline Breakdown Card */}
              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Statutory Processing Timeline Estimation</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-slate-400 block">Doc Preparation</span>
                    <span className="text-white font-bold">{analysis.cost_timeline.timeline_breakdown.document_preparation}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-slate-400 block">Lab Testing</span>
                    <span className="text-white font-bold">{analysis.cost_timeline.timeline_breakdown.laboratory_testing}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-slate-400 block">Factory Audit</span>
                    <span className="text-white font-bold">{analysis.cost_timeline.timeline_breakdown.factory_inspection_audit}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-slate-400 block">Scrutiny & Grant</span>
                    <span className="text-emerald-400 font-bold">{analysis.cost_timeline.timeline_breakdown.final_scrutiny_grant}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Testing Labs */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>BIS Recognized Testing Laboratories</span>
              </h3>

              <div className="space-y-3">
                {analysis.recommended_laboratories.map((lab) => (
                  <div key={lab.id} className="p-4 rounded-xl glass-panel border border-white/10 space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-amber-300">
                          {lab.type}
                        </span>
                        <h4 className="font-bold text-white text-sm mt-1">{lab.name}</h4>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded">
                        ★ {lab.rating}
                      </span>
                    </div>

                    <p className="text-slate-400 flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span>{lab.city}, {lab.state}</span>
                    </p>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Accreditation: <strong className="text-slate-300 font-mono">{lab.nabl_accreditation}</strong></span>
                      <span>Turnaround: <strong className="text-amber-300">{lab.sample_turnaround_days} Days</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentStep(4)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/5 border border-white/10 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Roadmap</span>
            </button>
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 transition-all"
            >
              <span>Start New Compliance Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
