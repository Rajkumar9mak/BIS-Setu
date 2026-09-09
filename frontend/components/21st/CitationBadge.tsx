'use client';

import React, { useState } from 'react';
import { BookOpen, ShieldCheck, ArrowRight, Check } from 'lucide-react';

export interface CitationBadgeProps {
  standardNumber?: string;
  clauseNumber?: string;
  pageNumber?: string | number;
  clauseTitle?: string;
  verbatimExcerpt?: string;
  onViewSource?: () => void;
  className?: string;
}

export function CitationBadge({
  standardNumber = 'IS 302 (Part 2/Sec 15):2009',
  clauseNumber = '13.2',
  pageNumber = 9,
  clauseTitle = 'Electric Strength & Leakage Current Under Operating Conditions',
  verbatimExcerpt = 'The insulation of the appliance shall not break down when subjected for 1 min to a voltage of essentially sinusoidal wave form having a frequency of 50 Hz. The test voltage shall be 1500 V.',
  onViewSource,
  className = ''
}: CitationBadgeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${standardNumber}, Clause ${clauseNumber}, Page ${pageNumber}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-[24px] p-6 bg-[#171713] text-[#f4f2ec] border border-[#d1a24f]/40 shadow-2xl backdrop-blur-xl transition-all duration-300 space-y-4 max-w-md ${className}`}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#d5c7b2]/15">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#d1a24f]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#d5c7b2]">
            Statutory Citation
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#d1a24f] text-[#171713] flex items-center gap-1 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-[#171713]" />
          Source-Backed
        </span>
      </div>

      {/* Coordinate Chips */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2.5 rounded-xl bg-[#4b4932]/40 border border-[#d5c7b2]/10">
          <span className="text-[10px] uppercase font-bold text-[#d5c7b2]/70 block">Standard</span>
          <span className="font-mono font-bold text-[#f4f2ec] block truncate" title={standardNumber}>
            {standardNumber}
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#4b4932]/40 border border-[#d5c7b2]/10">
          <span className="text-[10px] uppercase font-bold text-[#d5c7b2]/70 block">Clause</span>
          <span className="font-mono font-bold text-[#d1a24f] block">
            {clauseNumber}
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#4b4932]/40 border border-[#d5c7b2]/10">
          <span className="text-[10px] uppercase font-bold text-[#d5c7b2]/70 block">Page</span>
          <span className="font-mono font-bold text-[#f4f2ec] block">
            {pageNumber}
          </span>
        </div>
      </div>

      {/* Title & Verbatim Quote */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-[#f4f2ec]">{clauseTitle}</h4>
        {verbatimExcerpt && (
          <p className="text-[11px] text-[#d5c7b2] bg-[#4b4932]/25 p-3 rounded-xl border border-[#d5c7b2]/10 italic leading-relaxed">
            &ldquo;{verbatimExcerpt}&rdquo;
          </p>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-[#d5c7b2]/15 flex items-center justify-between text-xs">
        <button
          onClick={handleCopy}
          className="text-[11px] font-mono text-[#d5c7b2] hover:text-[#f4f2ec] flex items-center gap-1 transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-[#d1a24f]" /> : null}
          <span>{copied ? 'Copied' : 'Copy Ref'}</span>
        </button>

        <button
          onClick={onViewSource}
          className="inline-flex items-center gap-1 font-bold text-[#d1a24f] hover:text-[#f4f2ec] transition-colors"
        >
          <span>View Source</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// 21st.dev Demo export
export default function CitationBadgeDemo() {
  return (
    <div className="min-h-[380px] w-full flex items-center justify-center p-6 bg-[#171713]">
      <CitationBadge
        standardNumber="IS 302 (Part 2/Sec 15):2009"
        clauseNumber="13.2"
        pageNumber={9}
        clauseTitle="Electric Strength & Leakage Current"
        verbatimExcerpt="The insulation of the appliance shall not break down when subjected for 1 min to a voltage of essentially sinusoidal wave form having a frequency of 50 Hz. The test voltage shall be 1500 V for Class I appliances."
      />
    </div>
  );
}
