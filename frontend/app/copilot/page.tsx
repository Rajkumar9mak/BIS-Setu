'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Send,
  Sparkles,
  BookOpen,
  FileCheck,
  ShieldAlert,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Info,
  AlertTriangle
} from 'lucide-react';
import { queryRag } from '@/lib/api';
import { RagResponse, SourceClause } from '@/lib/types';

export default function CopilotPage() {
  const [inputQuery, setInputQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentResponse, setCurrentResponse] = useState<RagResponse | null>(null);
  const [selectedClause, setSelectedClause] = useState<SourceClause | null>(null);

  const sampleQuestions = [
    "What are the high-voltage electric strength and leakage current limits for electric kettles?",
    "What are the drop-impact deceleration limits for two-wheeler helmets under IS 4151?",
    "What are the maximum allowable heavy metal migration limits in toys under IS 9873?",
    "What are the microbiological parameters for packaged drinking water under IS 14543?",
    "What are the boil-dry and overheating protection requirements in IS 302?"
  ];

  const handleAsk = async (queryText?: string) => {
    const q = (queryText ?? inputQuery).trim();
    if (!q) return;
    setLoading(true);
    const res = await queryRag(q);
    setCurrentResponse(res);
    if (res?.sources && res.sources.length > 0) {
      setSelectedClause(res.sources[0]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Zero-Hallucination Retrieval Augmented Generation (RAG)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Setu AI Compliance Copilot
        </h1>
        <p className="text-sm text-slate-300">
          Ask technical compliance queries grounded exclusively in authoritative clauses from Indian Standards. Every assertion is cited with standard, clause, and page number.
        </p>
      </div>

      {/* Query Input Box */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask about testing limits, safety clauses, or BIS requirements..."
            className="flex-1 px-5 py-4 rounded-2xl bg-slate-900/80 border border-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-white placeholder:text-slate-500 text-sm font-medium outline-none transition-all"
          />
          <button
            onClick={() => handleAsk()}
            disabled={loading || !inputQuery.trim()}
            className="px-6 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Retrieving...' : 'Ask Copilot'}</span>
          </button>
        </div>

        {/* Preset Prompt Pills */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Suggested Statutory Inquiries:
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            {sampleQuestions.map((sq, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputQuery(sq);
                  handleAsk(sq);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 hover:border-blue-400/40 transition-colors text-left"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Response Display Grid */}
      {currentResponse && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto animate-in fade-in duration-300">
          {/* Main Answer Panel */}
          <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Grounded Technical Analysis</h3>
                  <p className="text-xs text-slate-400">Retrieved from authoritative Indian Standards</p>
                </div>
              </div>
              {currentResponse.is_grounded ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {Math.round((currentResponse.confidence ?? 0.85) * 100)}% Evidence-Grounded
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Insufficient Evidence
                </span>
              )}
            </div>

            {/* Warnings notice if any */}
            {currentResponse.warnings && currentResponse.warnings.length > 0 && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1 text-xs text-amber-300">
                <div className="font-bold flex items-center gap-1.5 text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                  Regulatory Advisory / Scope Notes:
                </div>
                {currentResponse.warnings.map((warn, wIdx) => (
                  <div key={wIdx} className="text-amber-200/90 pl-5">
                    • {warn}
                  </div>
                ))}
              </div>
            )}

            {/* Answer Content */}
            <div className="text-sm text-slate-200 leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
              {currentResponse.answer}
            </div>

            {/* In-line Citations Bar */}
            {currentResponse.citations && currentResponse.citations.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Statutory Citations:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentResponse.citations.map((cit, idx) => {
                    const citText = typeof cit === 'string'
                      ? cit
                      : ((cit as any)?.citation_tag || `[${(cit as any)?.standard_number}, Clause ${(cit as any)?.clause_number}, Page ${(cit as any)?.page}]`);
                    return (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30"
                      >
                        {citText}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Source Clauses Inspector Drawer */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-base pb-3 border-b border-white/10">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>Source Clauses Inspector</span>
            </div>

            <p className="text-xs text-slate-400">
              Click any retrieved clause below to inspect the verbatim excerpt from the official Indian Standard:
            </p>

            <div className="space-y-2">
              {currentResponse.sources.map((clause) => {
                const isSelected = selectedClause?.id === clause.id;
                return (
                  <div
                    key={clause.id}
                    onClick={() => setSelectedClause(clause)}
                    className={`p-3 rounded-xl cursor-pointer border text-xs transition-all ${
                      isSelected
                        ? 'border-blue-400 bg-blue-500/15'
                        : 'border-white/10 hover:border-white/20 bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono font-bold text-amber-300">
                      <span>Clause {clause.clause_number}</span>
                      <span className="text-[10px] text-slate-400">Page {clause.page}</span>
                    </div>
                    <p className="font-semibold text-white mt-1 line-clamp-1">{clause.clause_title}</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{clause.standard_number}</p>
                  </div>
                );
              })}
            </div>

            {/* Expanded Clause View */}
            {selectedClause && (
              <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-blue-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 font-mono">
                    Clause {selectedClause.clause_number} (Page {selectedClause.page})
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/15 px-2 py-0.5 rounded">
                    VERBATIM
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm">{selectedClause.clause_title}</h4>
                <p className="text-slate-300 italic bg-black/30 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                  &ldquo;{selectedClause.text}&rdquo;
                </p>
                <div className="text-[11px] text-slate-400 pt-1">
                  <strong>Mandate:</strong> {selectedClause.mandatory_status}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
