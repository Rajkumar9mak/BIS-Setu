'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, User, ArrowRight, FileText } from 'lucide-react';

export default function BISAI() {
  return (
    <section className="relative py-16 sm:py-24 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)] bg-white/40 dark:bg-[#171812]/50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with Badges */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#4F6EF7] bg-[#EEF2FF] border border-indigo-200 rounded-full dark:text-[#D4AF62] dark:bg-[#D4AF62]/15 dark:border-[#D4AF62]/35">
              LIVE RAG
            </span>
            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#C49A45] bg-[#FFF8E7] border border-[#C49A45]/35 rounded-full dark:text-[#D4AF62] dark:bg-[#D4AF62]/15 dark:border-[#D4AF62]/35">
              SOURCE-GROUNDED
            </span>
            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#22A06B] bg-[#ECFDF5] border border-emerald-200 rounded-full dark:text-[#D4AF62] dark:bg-[#D4AF62]/15 dark:border-[#D4AF62]/35">
              CITATION-READY
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] dark:text-[#F4F1E8] tracking-tight">
            Meet BIS AI
          </h2>
          <p className="text-base text-[#475569] dark:text-[#D5D0C4] leading-relaxed">
            Your source-grounded assistant for Indian Standards.
          </p>
        </div>

        {/* Realistic AI Conversation Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white dark:bg-[#1D1E18]/90 border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.25)] shadow-[0_4px_24px_rgba(15,23,42,0.06)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.65)] p-6 sm:p-9 backdrop-blur-xl space-y-6">
          {/* User Query Bubble */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] dark:bg-[#23241C] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.20)] flex items-center justify-center text-[#475569] dark:text-[#D5D0C4] shrink-0 mt-0.5">
              <User className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#23241C] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)] text-sm font-medium text-[#111827] dark:text-[#F4F1E8] max-w-xl shadow-sm">
              &ldquo;What BIS standard applies to my electric kettle?&rdquo;
            </div>
          </div>

          {/* AI Response Card */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C49A45] to-[#B58936] dark:from-[#D4AF62] dark:to-[#B9954A] flex items-center justify-center text-white dark:text-[#171812] shrink-0 mt-0.5 shadow-md">
              <Bot className="w-5 h-5 stroke-[2.2]" />
            </div>

            <div className="flex-1 space-y-4">
              {/* Highlight Banner */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#23241C] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.25)] shadow-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E7EB] dark:border-[rgba(212,175,98,0.12)] pb-2.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C49A45] dark:text-[#D4AF62]">
                    RELEVANT INDIAN STANDARD IDENTIFIED
                  </span>
                  {/* Metadata Chips */}
                  <div className="flex items-center gap-1.5 font-mono text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-white dark:bg-[#171812] text-[#475569] dark:text-[#D5D0C4] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)]">
                      Clause 13.2
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white dark:bg-[#171812] text-[#475569] dark:text-[#D5D0C4] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)]">
                      Page 9
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#FFF8E7] text-[#C49A45] font-bold border border-[#C49A45]/30 dark:bg-[#D4AF62]/20 dark:text-[#D4AF62] dark:border-[#D4AF62]/30">
                      SOURCE-BACKED
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-base sm:text-lg font-black text-[#C49A45] dark:text-[#D4AF62]">
                    IS 302 (Part 2/Sec 15):2009
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-[#111827] dark:text-[#F4F1E8] mt-0.5">
                    Safety of Household and Similar Electrical Appliances — Particular Requirements for Kettles
                  </p>
                </div>

                {/* Grounded text explanation */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#171812]/80 border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.10)] text-xs text-[#475569] dark:text-[#D5D0C4] leading-relaxed shadow-sm">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#C49A45] dark:text-[#D4AF62] mb-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Statutory Gazette Excerpt (Quality Control Order Mandate)</span>
                  </div>
                  Electric kettles and liquid heaters are covered under the Electrical Appliances (Quality Control) Order. Conformity to <strong className="text-[#111827] dark:text-[#F4F1E8]">IS 302-2-15</strong> is compulsory under <strong className="text-[#C49A45] dark:text-[#D4AF62]">Scheme-I (ISI Mark)</strong>. The product must pass electrical insulation resistance, leakage current testing (Clause 13.2), and abnormal operation tests prior to market sale in India.
                </div>
              </div>

              {/* Action row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <span className="text-xs text-[#64748B] dark:text-[#969287]">
                  All answers link directly to authenticated BIS clauses and gazette notifications.
                </span>
                <Link
                  href="/ai"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-[#C49A45] hover:bg-[#B58936] text-white shadow-sm hover:-translate-y-0.5 transition-all dark:bg-gradient-to-r dark:from-[#D4AF62] dark:to-[#C9A55A] dark:hover:from-[#E0BD70] dark:hover:to-[#D4AF62] dark:text-[#171812]"
                >
                  <span>Ask BIS AI</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white dark:text-[#171812]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
