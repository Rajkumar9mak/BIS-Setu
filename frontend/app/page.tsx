'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Building2,
  Search,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileText,
  AlertTriangle,
  Scale,
  Zap,
  MapPin,
  Clock
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden pt-8 pb-20">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/10 via-blue-500/10 to-emerald-500/10 blur-[130px] -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-400 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-400" />
            <span>AI-Powered Indian Standards & Conformity Assessment</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-slate-400">SIH 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
            Bridging Indian Standards with{' '}
            <span className="text-gradient-saffron">Automated Intelligence</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            A unified national platform empowering manufacturers with an automated compliance roadmap and protecting consumers with real-time counterfeit verification.
          </p>

          {/* Quick Stats Ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 text-left">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 glass-panel">
              <span className="text-2xl font-black text-amber-400 block">21,000+</span>
              <span className="text-xs text-slate-400">Indian Standards (IS)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 glass-panel">
              <span className="text-2xl font-black text-emerald-400 block">100%</span>
              <span className="text-xs text-slate-400">Grounded Citations</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 glass-panel">
              <span className="text-2xl font-black text-blue-400 block">50%</span>
              <span className="text-xs text-slate-400">MSME Fee Subsidies</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 glass-panel">
              <span className="text-2xl font-black text-white block">&lt; 3 Sec</span>
              <span className="text-xs text-slate-400">CM/L QR Verification</span>
            </div>
          </div>
        </section>

        {/* DUAL MODE LAUNCHER SECTION */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Select Operating Mode
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">
              Two Tailored Experiences in One Platform
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* CARD 1: INDUSTRY COMPLIANCE MODE */}
            <div className="relative group rounded-3xl glass-panel p-8 sm:p-10 border border-white/10 hover:border-amber-500/50 transition-all duration-300 glass-card-hover flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    FOR MANUFACTURERS
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    Industry Compliance Wizard
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Convert 200-page technical PDFs into an actionable 7-step roadmap. Map applicable IS codes, check mandatory QCO orders, identify testing requirements, and calculate statutory fees with MSME concessions.
                  </p>
                </div>

                {/* Feature checklist */}
                <ul className="space-y-2.5 text-xs text-slate-300 border-t border-white/10 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Automated IS 302, IS 4151, IS 9873, IS 14543 standard mapping</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Mandatory Quality Control Order (QCO) gazette check</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Complete Form-V document preparation checklist</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Itemized fee calculator with up to 50% MSME concession</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 relative z-10">
                <Link
                  href="/industry"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 transition-all group-hover:gap-3 active:scale-[0.98]"
                >
                  <span>Launch Compliance Wizard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* CARD 2: CONSUMER VERIFICATION MODE */}
            <div className="relative group rounded-3xl glass-panel p-8 sm:p-10 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 glass-card-emerald-hover flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    <Search className="w-8 h-8" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    FOR CONSUMERS & BUYERS
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                    Product & QR Verification
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Verify whether the ISI Mark or CM/L number on electrical items, crash helmets, toys, and bottled water is authentic or a dangerous counterfeit mark.
                  </p>
                </div>

                {/* Feature checklist */}
                <ul className="space-y-2.5 text-xs text-slate-300 border-t border-white/10 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Instant 7/8-digit CM/L & CRS number search</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Camera / Image QR code scanner support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Real-time status: Active, Expired, Suspended, Fake</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>1-click grievance filing to BIS Enforcement & Consumer Forum</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 relative z-10">
                <Link
                  href="/consumer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all group-hover:gap-3 active:scale-[0.98]"
                >
                  <span>Verify Product Authenticity</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK DEMO EVALUATION STRIP */}
        <section className="p-6 sm:p-8 rounded-2xl glass-panel border border-amber-500/20 max-w-5xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Quick Evaluation Demo Chips for Hackathon Jury</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Click any pre-indexed scenario below to test end-to-end workflows in under 2 seconds:
              </p>
            </div>
            <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
              Live Mock Data Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <Link
              href="/industry"
              className="p-3 rounded-xl bg-slate-900/80 border border-white/10 hover:border-amber-400/40 transition-colors text-left group"
            >
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide block">
                Scenario A (Industry)
              </span>
              <p className="text-xs font-semibold text-white group-hover:text-amber-300">
                Electric Kettle (IS 302) → Micro MSME Roadmap
              </p>
            </Link>

            <Link
              href="/consumer"
              className="p-3 rounded-xl bg-slate-900/80 border border-white/10 hover:border-emerald-400/40 transition-colors text-left group"
            >
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide block">
                Scenario B (Consumer)
              </span>
              <p className="text-xs font-semibold text-white group-hover:text-emerald-300">
                Verify Steelbird Helmet (CM/L-7123901)
              </p>
            </Link>

            <Link
              href="/copilot"
              className="p-3 rounded-xl bg-slate-900/80 border border-white/10 hover:border-blue-400/40 transition-colors text-left group"
            >
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wide block">
                Scenario C (AI RAG)
              </span>
              <p className="text-xs font-semibold text-white group-hover:text-blue-300">
                Ask: What are the boil-dry testing limits?
              </p>
            </Link>
          </div>
        </section>

        {/* WORKFLOW PIPELINE ARCHITECTURE */}
        <section className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              System Pipeline
            </h2>
            <p className="text-2xl font-black text-white">
              Workflow Engine over Simple Chatbot
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="text-sm font-bold text-white">Data Ingestion</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Structured technical schemas parsed from e-BIS PDFs with exact clause numbers and page indices.
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="text-sm font-bold text-white">Hybrid Retrieval</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vector semantic + BM25 token relevance search to pinpoint exact regulatory clauses without hallucination.
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-sm font-bold text-white">Compliance Engine</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rules-based engine calculating MSME concessions, statutory testing turnaround, and 7-phase roadmap.
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                4
              </div>
              <h4 className="text-sm font-bold text-white">Real-Time Verification</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                National Register matching checking active operational validity, expiry dates, and fake ISI stamps.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
