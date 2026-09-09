'use client';

import React from 'react';
import { ShieldAlert, CheckCircle2, Sparkles, Eye } from 'lucide-react';
import { ToyStandard } from '@/data/toy_standards';

interface ToyStandardCardProps {
  standard: ToyStandard;
  onViewDetails: (standard: ToyStandard) => void;
  onAskAi: (standard: ToyStandard) => void;
}

export default function ToyStandardCard({
  standard,
  onViewDetails,
  onAskAi,
}: ToyStandardCardProps) {
  const isWithdrawn = standard.status === 'Withdrawn';

  return (
    <div
      className={`rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between ${
        isWithdrawn
          ? 'bg-[#171713]/40 dark:bg-[#171713]/60 border-[#b84a3a]/40 hover:border-[#b84a3a]/70 shadow-sm'
          : 'bg-white dark:bg-[#25251d] border-[#d5c7b2]/40 dark:border-[#4b4932] hover:border-[#d1a24f] shadow-sm hover:shadow-lg'
      }`}
    >
      <div>
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#4b4932]/15 dark:bg-[#4b4932]/60 text-[#4b4932] dark:text-[#d5c7b2] border border-[#d5c7b2]/20">
            {standard.category}
          </span>

          {isWithdrawn ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#b84a3a]/15 text-[#b84a3a] border border-[#b84a3a]/40">
              <ShieldAlert className="w-3 h-3" />
              WITHDRAWN
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#927a48]/15 dark:bg-[#927a48]/30 text-[#927a48] dark:text-[#d1a24f] border border-[#d1a24f]/30">
              <CheckCircle2 className="w-3 h-3 text-[#d1a24f]" />
              CURRENT
            </span>
          )}
        </div>

        {/* Standard Number & Year */}
        <div className="mb-2">
          <h3 className="text-base sm:text-lg font-black font-mono tracking-tight text-[#171713] dark:text-[#f4f2ec]">
            {standard.standard_number}
          </h3>
          {standard.revision && (
            <p className="text-[11px] font-semibold text-[#927a48] dark:text-[#d1a24f] font-mono mt-0.5">
              {standard.revision}
            </p>
          )}
        </div>

        {/* Title */}
        <p
          className={`text-xs sm:text-sm font-medium leading-snug mb-4 ${
            isWithdrawn
              ? 'text-[#6b675b] dark:text-[#d5c7b2]/70 italic'
              : 'text-[#4b4932] dark:text-[#d5c7b2]'
          }`}
        >
          {standard.title}
        </p>

        {/* Status explanation */}
        {isWithdrawn && (
          <div className="mb-4 p-2.5 rounded-lg bg-[#b84a3a]/10 border border-[#b84a3a]/25 text-[11px] text-[#b84a3a] flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Historical standard superseded or withdrawn. Retained for provenance.</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-[#d5c7b2]/20 dark:border-[#4b4932]/40 flex items-center justify-between gap-3">
        <button
          onClick={() => onViewDetails(standard)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4b4932] dark:text-[#d5c7b2] hover:text-[#d1a24f] transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Details →</span>
        </button>

        <button
          onClick={() => onAskAi(standard)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4b4932]/10 dark:bg-[#4b4932]/50 hover:bg-[#d1a24f] dark:hover:bg-[#d1a24f] text-[#4b4932] dark:text-[#f4f2ec] hover:text-[#171713] dark:hover:text-[#171713] border border-[#d5c7b2]/30 dark:border-[#d5c7b2]/20 text-xs font-semibold transition-all duration-200"
        >
          <Sparkles className="w-3 h-3 text-[#d1a24f]" />
          <span>Ask BIS AI</span>
        </button>
      </div>
    </div>
  );
}
