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
  AlertTriangle,
  ShieldCheck
} from 'lucide-react';
import { queryRag } from '@/lib/api';
import { RagResponse, SourceClause } from '@/lib/types';
import DecorativeShapes from '@/components/DecorativeShapes';

export default function CopilotPage() {
  const [inputQuery, setInputQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentResponse, setCurrentResponse] = useState<RagResponse | null>(null);
  const [selectedClause, setSelectedClause] = useState<SourceClause | null>(null);

  const sampleQuestions = [
    'What are the high-voltage electric strength and leakage current limits for electric kettles?',
    'What are the drop-impact deceleration limits for two-wheeler helmets under IS 4151?',
    'What are the maximum allowable heavy metal migration limits in toys under IS 9873?',
    'What are the microbiological parameters for packaged drinking water under IS 14543?',
    'What are the boil-dry and overheating protection requirements in IS 302?'
  ];

  const handleAsk = async (queryText?: string) => {
    const q = (queryText ?? inputQuery).trim();
    if (!q) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await queryRag(q);
      if (!res) {
        setErrorMessage('Unable to retrieve an answer from the compliance server. Please verify the backend is running on port 8001.');
      } else {
        setCurrentResponse(res);
        if (res.sources && res.sources.length > 0) {
          setSelectedClause(res.sources[0]);
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to communicate with RAG engine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <DecorativeShapes variant="ribbon" className="-top-10 -right-20 opacity-50" />

      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4b4932]/50 border border-[#d1a24f]/30 text-[#d1a24f] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#d1a24f]" />
          <span>Zero-Hallucination Retrieval Augmented Generation (RAG)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#f4f2ec] tracking-tight">
          Setu AI Compliance Copilot
        </h1>
        <p className="text-sm text-[#d5c7b2] leading-relaxed">
          Ask technical compliance queries grounded exclusively in authoritative clauses from Indian Standards. Every assertion is cited with standard, clause, and page number.
        </p>
      </div>

      {/* Query Input Box */}
      <div className="rounded-[30px] glass-charcoal p-6 sm:p-8 border border-[#d1a24f]/30 space-y-4 max-w-4xl mx-auto shadow-2xl backdrop-blur-2xl">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask about testing limits, safety clauses, or BIS requirements..."
            className="flex-1 px-5 py-4 rounded-2xl bg-[#171713]/90 border border-[#d5c7b2]/20 focus:border-[#d1a24f] focus:ring-2 focus:ring-[#d1a24f]/20 text-[#f4f2ec] placeholder:text-[#d5c7b2]/40 text-sm font-medium outline-none transition-all"
          />
          <button
            onClick={() => handleAsk()}
            disabled={loading || !inputQuery.trim()}
            className="px-7 py-4 rounded-2xl font-bold text-sm bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] shadow-lg shadow-[#d1a24f]/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
          >
            <Send className="w-4 h-4 text-[#171713]" />
            <span>{loading ? 'Retrieving...' : 'Ask Copilot'}</span>
          </button>
        </div>

        {/* Preset Prompt Pills */}
        <div className="space-y-2 pt-3 border-t border-[#d5c7b2]/15">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#d5c7b2]/70 block">
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
                className="px-3 py-1.5 rounded-xl bg-[#4b4932]/35 hover:bg-[#4b4932]/70 text-[#d5c7b2] hover:text-[#f4f2ec] border border-[#d5c7b2]/15 transition-colors text-left"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/40 text-center space-y-1 max-w-4xl mx-auto">
          <p className="text-xs text-red-300 font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Response Display Grid */}
      {currentResponse && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto animate-in fade-in duration-300">
          {/* Main Answer Panel */}
          <div className="lg:col-span-2 rounded-[28px] glass-charcoal p-6 sm:p-8 border border-[#d1a24f]/30 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#d5c7b2]/15">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#927a48]/25 border border-[#d1a24f]/40 text-[#d1a24f]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#f4f2ec] text-base">Grounded Technical Analysis</h3>
                  <p className="text-xs text-[#d5c7b2]">Retrieved from authoritative Indian Standards</p>
                </div>
              </div>

              {currentResponse.is_grounded ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#927a48]/30 text-[#d1a24f] border border-[#d1a24f]/40 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {Math.round((currentResponse.confidence ?? 0.85) * 100)}% Grounded
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#4b4932] text-[#d1a24f] border border-[#d1a24f]/30 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Insufficient Evidence
                </span>
              )}
            </div>

            {/* Warnings notice if any */}
            {currentResponse.warnings && currentResponse.warnings.length > 0 && (
              <div className="p-3.5 rounded-xl bg-[#4b4932]/40 border border-[#d1a24f]/30 space-y-1 text-xs text-[#f4f2ec]">
                <div className="font-bold flex items-center gap-1.5 text-[#d1a24f]">
                  <AlertTriangle className="w-4 h-4" />
                  Regulatory Advisory / Scope Notes:
                </div>
                {currentResponse.warnings.map((warn, wIdx) => (
                  <div key={wIdx} className="text-[#d5c7b2] pl-5">
                    • {warn}
                  </div>
                ))}
              </div>
            )}

            {/* Answer Content */}
            <div className="text-sm text-[#f4f2ec] leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
              {currentResponse.answer}
            </div>

            {/* In-line Citations Bar */}
            {currentResponse.citations && currentResponse.citations.length > 0 && (
              <div className="pt-4 border-t border-[#d5c7b2]/15 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d1a24f] block">
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
                        className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[#4b4932]/50 text-[#d1a24f] border border-[#d1a24f]/30"
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
          <div className="rounded-[28px] glass-charcoal p-6 border border-[#d5c7b2]/20 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[#f4f2ec] font-bold text-base pb-3 border-b border-[#d5c7b2]/15">
              <BookOpen className="w-5 h-5 text-[#d1a24f]" />
              <span>Source Clauses Inspector</span>
            </div>

            <p className="text-xs text-[#d5c7b2]">
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
                        ? 'border-[#d1a24f] bg-[#4b4932]/60 shadow-md'
                        : 'border-[#d5c7b2]/15 hover:border-[#d5c7b2]/30 bg-[#171713]/80'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono font-bold text-[#d1a24f]">
                      <span>Clause {clause.clause_number}</span>
                      <span className="text-[10px] text-[#d5c7b2]/70">Page {clause.page}</span>
                    </div>
                    <p className="font-semibold text-[#f4f2ec] mt-1 line-clamp-1">{clause.clause_title}</p>
                    <p className="text-[11px] text-[#d5c7b2] font-mono mt-0.5">{clause.standard_number}</p>
                  </div>
                );
              })}
            </div>

            {/* Expanded Clause View */}
            {selectedClause && (
              <div className="mt-4 p-4 rounded-xl bg-[#171713] border border-[#d1a24f]/40 space-y-2 text-xs shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#d1a24f] font-mono">
                    Clause {selectedClause.clause_number} (Page {selectedClause.page})
                  </span>
                  <span className="text-[10px] text-[#171713] font-bold bg-[#d1a24f] px-2 py-0.5 rounded">
                    VERBATIM
                  </span>
                </div>
                <h4 className="font-bold text-[#f4f2ec] text-sm">{selectedClause.clause_title}</h4>
                <p className="text-[#d5c7b2] italic bg-[#4b4932]/25 p-2.5 rounded-lg border border-[#d5c7b2]/10 leading-relaxed">
                  &ldquo;{selectedClause.text}&rdquo;
                </p>
                <div className="text-[11px] text-[#d5c7b2] pt-1">
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
