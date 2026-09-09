import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

interface CitationProps {
  standardNumber: string;
  clauseNumber: string;
  pageNumber: string | number;
  clauseTitle?: string;
  verbatimExcerpt?: string;
  isGrounded?: boolean;
  onViewSource?: () => void;
}

export default function CitationCard({
  standardNumber = 'IS 302 (Part 2/Sec 15):2009',
  clauseNumber = '13.2',
  pageNumber = 9,
  clauseTitle = 'Electric Strength & Leakage Current Under Operating Conditions',
  verbatimExcerpt,
  isGrounded = true,
  onViewSource
}: CitationProps) {
  return (
    <div className="rounded-2xl p-5 bg-[#171713]/90 border border-[#d1a24f]/40 space-y-4 shadow-xl text-[#f4f2ec]">
      {/* Top Header Strip with Gold Citation Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-[#d5c7b2]/15">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#d1a24f]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#d5c7b2]">
            Authoritative BIS Evidence
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#d1a24f] text-[#171713] flex items-center gap-1 shadow-sm">
          <ShieldCheck className="w-3 h-3 text-[#171713]" />
          Source-Backed
        </span>
      </div>

      {/* Primary Coordinates: Standard, Clause, Page */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-xl bg-[#4b4932]/30 border border-[#d5c7b2]/10">
          <span className="text-[10px] uppercase font-bold text-[#d5c7b2]/70 block">Standard</span>
          <span className="font-mono font-bold text-xs text-[#f4f2ec] block truncate" title={standardNumber}>
            {standardNumber}
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#4b4932]/30 border border-[#d5c7b2]/10">
          <span className="text-[10px] uppercase font-bold text-[#d5c7b2]/70 block">Clause</span>
          <span className="font-mono font-bold text-xs text-[#d1a24f] block">
            Clause {clauseNumber}
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#4b4932]/30 border border-[#d5c7b2]/10">
          <span className="text-[10px] uppercase font-bold text-[#d5c7b2]/70 block">Page</span>
          <span className="font-mono font-bold text-xs text-[#f4f2ec] block">
            Page {pageNumber}
          </span>
        </div>
      </div>

      {/* Clause Title & Excerpt */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-[#f4f2ec]">{clauseTitle}</h4>
        {verbatimExcerpt && (
          <p className="text-[11px] text-[#d5c7b2] bg-[#4b4932]/20 p-2.5 rounded-xl border border-[#d5c7b2]/10 italic leading-relaxed">
            &ldquo;{verbatimExcerpt}&rdquo;
          </p>
        )}
      </div>

      {/* Action: View Source */}
      <div className="pt-2 border-t border-[#d5c7b2]/15 flex items-center justify-between text-xs">
        <span className="text-[10px] text-[#d5c7b2]/70">Zero-Hallucination Grounding Guarantee</span>
        {onViewSource ? (
          <button
            onClick={onViewSource}
            className="inline-flex items-center gap-1 font-bold text-[#d1a24f] hover:text-[#f4f2ec] transition-colors"
          >
            <span>View Source</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Link
            href="/copilot"
            className="inline-flex items-center gap-1 font-bold text-[#d1a24f] hover:text-[#f4f2ec] transition-colors"
          >
            <span>View Source</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
