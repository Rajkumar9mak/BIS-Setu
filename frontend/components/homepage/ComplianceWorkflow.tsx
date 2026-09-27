'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Describe Product',
    desc: 'Enter product name, category & enterprise scale (Micro/SME/Large).',
  },
  {
    step: '02',
    title: 'Identify Standard',
    desc: 'Automated lookup against gazette QCOs & Indian Standards index.',
  },
  {
    step: '03',
    title: 'Extract Requirements',
    desc: 'Deconstruct testing clauses, factory inspection norms & STI guidelines.',
  },
  {
    step: '04',
    title: 'Check Compliance',
    desc: 'Audit internal controls against statutory Scheme I or Scheme II rules.',
  },
  {
    step: '05',
    title: 'Generate Guidance',
    desc: 'Receive a personalized application roadmap, fee estimate & lab routing.',
  },
];

export default function ComplianceWorkflow() {
  return (
    <section className="relative py-16 sm:py-24 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)] bg-white/40 dark:bg-[#171812]/70 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C49A45] bg-[#FFF8E7] border border-[#C49A45]/30 dark:text-[#D4AF62] dark:bg-[#D4AF62]/10 dark:border-[#D4AF62]/30 px-3 py-1 rounded-full inline-block">
            STEP-BY-STEP CONFORMITY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] dark:text-[#F4F1E8] tracking-tight">
            From Product to Compliance
          </h2>
          <p className="text-base text-[#475569] dark:text-[#D5D0C4] leading-relaxed">
            Understand which standards apply to your product and what requirements need to be satisfied.
          </p>
        </div>

        {/* Horizontal Workflow with Subtle Blue/Gold Connectors */}
        <div className="relative pt-4">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-[68px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#4F6EF7]/20 via-[#C49A45]/50 to-[#4F6EF7]/20 dark:from-transparent dark:via-[#D4AF62]/40 dark:to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-3">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col items-center text-center p-6 rounded-3xl bg-white dark:bg-[#1D1E18] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.18)] hover:border-[#C49A45] dark:hover:border-[#D4AF62]/60 shadow-[0_2px_8px_rgba(15,23,42,0.06)] dark:shadow-none hover:shadow-[0_8px_24px_rgba(196,154,69,0.10)] dark:hover:shadow-[0_10px_30px_rgba(212,175,98,0.12)] transition-all duration-200 hover:-translate-y-1"
              >
                {/* Step Circle Badge */}
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#F8FAFC] dark:bg-[#23241C] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.30)] group-hover:border-[#C49A45] dark:group-hover:border-[#D4AF62] group-hover:bg-[#FFF8E7] dark:group-hover:bg-[#2A2B21] flex items-center justify-center shadow-sm transition-all duration-200 mb-4">
                  <span className="font-mono text-base font-black text-[#C49A45] dark:text-[#D4AF62]">
                    {item.step}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-[#111827] dark:text-[#F4F1E8] group-hover:text-[#C49A45] dark:group-hover:text-[#D4AF62] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#64748B] dark:text-[#969287] mt-2 leading-relaxed">
                  {item.desc}
                </p>

                {/* Mobile / Tablet Connector indicator */}
                {idx < steps.length - 1 && (
                  <div className="lg:hidden mt-4 text-[#C49A45]/50 dark:text-[#D4AF62]/50">
                    <ChevronRight className="w-5 h-5 mx-auto rotate-90 md:rotate-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center pt-4">
          <Link
            href="/compliance"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm bg-[#C49A45] hover:bg-[#B58936] text-white shadow-md shadow-[#C49A45]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer dark:bg-gradient-to-r dark:from-[#D4AF62] dark:to-[#C9A55A] dark:hover:from-[#E0BD70] dark:hover:to-[#D4AF62] dark:text-[#171812]"
          >
            <span>Start Compliance Check</span>
            <ArrowRight className="w-4 h-4 text-white dark:text-[#171812]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
