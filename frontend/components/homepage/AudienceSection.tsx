'use client';

import React from 'react';
import Link from 'next/link';
import { Factory, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

const industryPoints = [
  'Standards Discovery & Harmonization',
  'Compliance Checkers & Audit Roadmaps',
  'Factory Surveillance & Testing Laboratories',
  'MSME Fee Concessions & Fast-Track Licensing',
  'Statutory Quality Control Order (QCO) Tracking',
];

const consumerPoints = [
  'CM/L & CRS License Verification',
  'Spurious ISI Mark & Fake Hologram Detection',
  'Consumer Safety Mandates & Hallmarking',
  'National Standards Rights & Public Recalls',
  'Direct Grievance Filing to BIS Authorities',
];

export default function AudienceSection() {
  return (
    <section className="relative py-16 sm:py-24 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)] bg-white/50 dark:bg-[#171812] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C49A45] bg-[#FFF8E7] border border-[#C49A45]/30 dark:text-[#D4AF62] dark:bg-[#D4AF62]/10 dark:border-[#D4AF62]/30 px-3 py-1 rounded-full inline-block">
            TAILORED EXPERIENCES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] dark:text-[#F4F1E8] tracking-tight">
            Designed for Every Stakeholder
          </h2>
          <p className="text-base text-[#475569] dark:text-[#D5D0C4]">
            Whether you are manufacturing goods for 1.4 billion citizens or verifying everyday essentials.
          </p>
        </div>

        {/* Two Large Side-by-Side Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card: FOR INDUSTRY */}
          <div className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#1D1E18]/90 border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.22)] hover:border-[#C49A45] dark:hover:border-[#D4AF62]/60 shadow-[0_2px_12px_rgba(15,23,42,0.06)] dark:shadow-none hover:shadow-[0_8px_30px_rgba(196,154,69,0.12)] dark:hover:shadow-[0_20px_50px_-10px_rgba(212,175,98,0.15)] transition-all duration-200 hover:-translate-y-1 backdrop-blur-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF8E7] dark:bg-[#23241C] border border-[#C49A45]/30 dark:border-[rgba(212,175,98,0.25)] flex items-center justify-center text-[#C49A45] dark:text-[#D4AF62] group-hover:border-[#C49A45] dark:group-hover:border-[#D4AF62] transition-all">
                  <Factory className="w-7 h-7 stroke-[1.9]" />
                </div>
                <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#C49A45] bg-[#FFF8E7] border border-[#C49A45]/30 rounded-full dark:text-[#D4AF62] dark:bg-[#D4AF62]/15 dark:border-[#D4AF62]/30">
                  MANUFACTURERS &amp; IMPORTERS
                </span>
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#C49A45] dark:text-[#D4AF62] block">
                  PORTAL FOR INDUSTRY
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-[#F4F1E8] mt-1">
                  Regulatory Compliance &amp; Licensing
                </h3>
                <p className="text-sm text-[#64748B] dark:text-[#969287] mt-2 leading-relaxed">
                  Fast-track your route to the official ISI or CRS mark with automated documentation analyzers and testing lab matchmakers.
                </p>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2.5 pt-2 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.12)]">
                {industryPoints.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-[#475569] dark:text-[#D5D0C4]">
                    <CheckCircle2 className="w-4 h-4 text-[#C49A45] dark:text-[#D4AF62] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href="/industry"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm bg-[#C49A45] hover:bg-[#B58936] text-white shadow-md shadow-[#C49A45]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all dark:bg-gradient-to-r dark:from-[#D4AF62] dark:to-[#C9A55A] dark:hover:from-[#E0BD70] dark:hover:to-[#D4AF62] dark:text-[#171812]"
              >
                <span>Explore for Industry</span>
                <ArrowRight className="w-4 h-4 text-white dark:text-[#171812]" />
              </Link>
            </div>
          </div>

          {/* Right Card: FOR CONSUMERS */}
          <div className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#1D1E18]/90 border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.22)] hover:border-[#4F6EF7] dark:hover:border-[#D4AF62]/60 shadow-[0_2px_12px_rgba(15,23,42,0.06)] dark:shadow-none hover:shadow-[0_8px_30px_rgba(79,110,247,0.12)] dark:hover:shadow-[0_20px_50px_-10px_rgba(212,175,98,0.15)] transition-all duration-200 hover:-translate-y-1 backdrop-blur-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] dark:bg-[#23241C] border border-indigo-200 dark:border-[rgba(212,175,98,0.25)] flex items-center justify-center text-[#4F6EF7] dark:text-[#D4AF62] group-hover:border-[#4F6EF7] dark:group-hover:border-[#D4AF62] transition-all">
                  <ShieldCheck className="w-7 h-7 stroke-[1.9]" />
                </div>
                <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#4F6EF7] bg-[#EEF2FF] border border-indigo-200 rounded-full dark:text-[#D4AF62] dark:bg-[#D4AF62]/15 dark:border-[#D4AF62]/30">
                  PUBLIC &amp; CONSUMER DEFENSE
                </span>
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#4F6EF7] dark:text-[#D4AF62] block">
                  PORTAL FOR CONSUMERS
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-[#F4F1E8] mt-1">
                  Product Verification &amp; Safety
                </h3>
                <p className="text-sm text-[#64748B] dark:text-[#969287] mt-2 leading-relaxed">
                  Verify authentic BIS marks on water bottles, helmets, electronics, and gold jewelry before making purchases.
                </p>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2.5 pt-2 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.12)]">
                {consumerPoints.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-[#475569] dark:text-[#D5D0C4]">
                    <CheckCircle2 className="w-4 h-4 text-[#4F6EF7] dark:text-[#D4AF62] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href="/consumer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm bg-white hover:bg-[#F8FAFC] text-[#1F2937] border border-[#D1D5DB] hover:border-[#4F6EF7] shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all dark:bg-[#23241C] dark:hover:bg-[#2A2B21] dark:text-[#F4F1E8] dark:border-[rgba(212,175,98,0.30)] dark:hover:border-[#D4AF62]"
              >
                <span>Explore for Consumers</span>
                <ArrowRight className="w-4 h-4 text-[#4F6EF7] dark:text-[#D4AF62]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
