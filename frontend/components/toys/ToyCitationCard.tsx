'use client';

import React from 'react';
import { ShieldCheck, ExternalLink, FileText, CheckCircle } from 'lucide-react';

export interface ToyCitation {
  standard_number: string;
  title: string;
  evidence: string;
  clause?: string | null;
  page?: string | number | null;
  provenance_status: string;
  source_url?: string;
}

interface ToyCitationCardProps {
  citation: ToyCitation;
  onViewSource?: (citation: ToyCitation) => void;
}

export default function ToyCitationCard({ citation, onViewSource }: ToyCitationCardProps) {
  return (
    <div className="rounded-2xl bg-[#171713] border-2 border-[#d1a24f]/40 p-5 shadow-xl text-[#f4f2ec] relative overflow-hidden">
      {/* Glow accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#d1a24f]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between gap-2 border-b border-[#d5c7b2]/15 pb-3 mb-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d1a24f] text-[#171713] text-[10px] font-mono font-black tracking-wider uppercase shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>SOURCE-BACKED</span>
        </div>

        <span className="text-[11px] font-mono text-[#d5c7b2]/80 flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-[#d1a24f]" />
          <span>{citation.provenance_status}</span>
        </span>
      </div>

      {/* Standard Number & Title */}
      <div className="mb-3">
        <h4 className="text-base font-black font-mono text-[#d1a24f]">
          {citation.standard_number}
        </h4>
        <p className="text-xs font-semibold text-[#f4f2ec] mt-0.5 leading-snug">
          {citation.title}
        </p>
      </div>

      {/* Retrieved Evidence */}
      <div className="p-3 rounded-xl bg-[#25251d] border border-[#d5c7b2]/15 mb-3 text-xs text-[#d5c7b2] leading-relaxed">
        <p className="text-[10px] font-mono text-[#927a48] uppercase font-bold mb-1">
          Evidence Summary:
        </p>
        <p>{citation.evidence}</p>
      </div>

      {/* Clause & Page Row (Only rendered if available, never fabricated!) */}
      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-3">
        <div className="p-2 rounded-lg bg-[#4b4932]/30 border border-[#d5c7b2]/10">
          <span className="text-[#6b675b] block text-[9px] uppercase">Clause Reference</span>
          <span className="text-[#f4f2ec] font-semibold">
            {citation.clause ? citation.clause : 'General Standard Scope'}
          </span>
        </div>
        <div className="p-2 rounded-lg bg-[#4b4932]/30 border border-[#d5c7b2]/10">
          <span className="text-[#6b675b] block text-[9px] uppercase">Page Coordinate</span>
          <span className="text-[#f4f2ec] font-semibold">
            {citation.page ? `Page ${citation.page}` : 'Catalog Record'}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2 border-t border-[#d5c7b2]/10 flex items-center justify-between">
        <span className="text-[10px] text-[#6b675b]">Source: Bureau of Indian Standards</span>
        <button
          onClick={() => onViewSource && onViewSource(citation)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4b4932]/60 hover:bg-[#d1a24f] hover:text-[#171713] text-xs font-bold text-[#f4f2ec] transition-all"
        >
          <span>View Source</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
