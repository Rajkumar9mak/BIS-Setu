'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Bot, Shield } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden transition-colors duration-200">
      {/* Subtle Gold/Blue Radial Glow Behind the Panel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-[#C49A45]/10 via-[#4F6EF7]/5 to-transparent dark:from-[#D4AF62]/15 dark:via-[#C9A55A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] bg-gradient-to-b from-white via-[#FFFDF9] to-[#F8FAFC] dark:from-[#23241C] dark:to-[#1D1E18] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.30)] p-8 sm:p-14 text-center shadow-[0_4px_24px_rgba(15,23,42,0.06)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.7)] backdrop-blur-2xl space-y-7 transition-all">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8E7] dark:bg-[#171812] border border-[#C49A45]/30 dark:border-[#D4AF62]/40 text-xs font-semibold text-[#C49A45] dark:text-[#D4AF62] shadow-sm">
            <Shield className="w-3.5 h-3.5 text-[#C49A45] dark:text-[#D4AF62]" />
            <span>Official Bridge for 1.4 Billion Citizens &amp; Indian Enterprises</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111827] dark:text-[#F4F1E8] tracking-tight max-w-3xl mx-auto leading-[1.12]">
            Make Indian Standards <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C49A45] via-[#D4AF62] to-[#B58936] dark:from-[#D4AF62] dark:via-[#E5C37A] dark:to-[#B9954A]">
              Easier to Understand.
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#475569] dark:text-[#D5D0C4] max-w-2xl mx-auto leading-relaxed">
            Explore standards, check compliance and get source-backed answers with BIS-Setu.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              href="/standards"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm bg-[#C49A45] hover:bg-[#B58936] text-white shadow-md shadow-[#C49A45]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer dark:bg-gradient-to-r dark:from-[#D4AF62] dark:to-[#C9A55A] dark:hover:from-[#E0BD70] dark:hover:to-[#D4AF62] dark:text-[#171812]"
            >
              <BookOpen className="w-4 h-4 text-white dark:text-[#171812]" />
              <span>Explore Standards</span>
            </Link>

            <Link
              href="/ai"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm bg-white hover:bg-[#F8FAFC] text-[#1F2937] border border-[#D1D5DB] hover:border-[#C49A45] shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer dark:bg-[#171812] dark:hover:bg-[#23241C] dark:text-[#F4F1E8] dark:border-[rgba(212,175,98,0.35)] dark:hover:border-[#D4AF62]"
            >
              <Bot className="w-4 h-4 text-[#C49A45] dark:text-[#D4AF62]" />
              <span>Ask BIS AI</span>
              <ArrowRight className="w-4 h-4 text-[#C49A45] dark:text-[#D4AF62]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
