'use client';

import React from 'react';
import { BookOpen, Package, FlaskConical, Bot, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: BookOpen,
    value: '21,000+',
    label: 'Indian Standards',
    note: 'National Standards Index',
    trend: '+45 updated this month',
    lightBg: 'bg-[#FFF8E7]',
    lightText: 'text-[#C49A45]',
    lightBorder: 'border-[#C49A45]/30',
  },
  {
    icon: Package,
    value: '4,000+',
    label: 'Products Under Mandate',
    note: 'Scheme I & Scheme II Scope',
    trend: 'Statutory QCO Enforced',
    lightBg: 'bg-[#ECFDF5]',
    lightText: 'text-[#22A06B]',
    lightBorder: 'border-emerald-200',
  },
  {
    icon: FlaskConical,
    value: '1,000+',
    label: 'Testing Laboratories',
    note: 'BIS Owned & NABL Accredited',
    trend: 'Across 28 Indian States',
    lightBg: 'bg-[#EEF2FF]',
    lightText: 'text-[#4F6EF7]',
    lightBorder: 'border-indigo-200',
  },
  {
    icon: Bot,
    value: '24/7',
    label: 'Source-Grounded AI',
    note: 'Clause-Level RAG Citations',
    trend: 'Live Statutory Sync',
    lightBg: 'bg-[#F5F3FF]',
    lightText: 'text-[#7C3AED]',
    lightBorder: 'border-purple-200',
  },
];

export default function TrustStats() {
  return (
    <section className="relative py-10 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)] bg-white/60 dark:bg-[#1D1E18]/60 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-[#23241C] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.14)] hover:border-[#C49A45] dark:hover:border-[#D4AF62]/50 shadow-[0_2px_8px_rgba(15,23,42,0.06)] dark:shadow-none hover:shadow-[0_4px_16px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5"
              >
                {/* Top: Icon chip + Trend */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${stat.lightBg} ${stat.lightText} ${stat.lightBorder} dark:bg-[#171812] dark:text-[#D4AF62] dark:border-[rgba(212,175,98,0.20)]`}
                  >
                    <Icon className="w-5 h-5 stroke-[1.9]" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{stat.trend}</span>
                  </div>
                </div>

                {/* Number & Labels */}
                <div>
                  <span className="font-mono text-3xl font-black text-[#111827] dark:text-[#F4F1E8] tracking-tight">
                    {stat.value}
                  </span>
                  <h4 className="text-sm font-bold text-[#111827] dark:text-[#D5D0C4] mt-1">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-[#64748B] dark:text-[#969287] mt-0.5">
                    {stat.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsible Registry Note */}
        <p className="text-[10px] text-center text-[#94A3B8] dark:text-[#969287]/80 pt-1">
          * Figures reflect catalogued benchmark registry scopes and index capacities across Bureau of Indian Standards published divisions.
        </p>
      </div>
    </section>
  );
}
