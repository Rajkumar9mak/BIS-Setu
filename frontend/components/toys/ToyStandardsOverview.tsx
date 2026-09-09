'use client';

import React from 'react';
import { BookOpen, CheckCircle, AlertTriangle, Layers, Info } from 'lucide-react';
import { TOY_STANDARDS_DATA, TOY_CATEGORIES } from '@/data/toy_standards';

export default function ToyStandardsOverview() {
  const totalStandards = TOY_STANDARDS_DATA.length;
  const currentStandards = TOY_STANDARDS_DATA.filter((s) => s.status === 'Current').length;
  const withdrawnStandards = TOY_STANDARDS_DATA.filter((s) => s.status === 'Withdrawn').length;
  const totalCategories = TOY_CATEGORIES.length;

  const stats = [
    {
      label: 'Total Toy Standards',
      value: totalStandards,
      detail: 'Indexed in Knowledge Base',
      icon: BookOpen,
      accentColor: 'text-[#d1a24f]',
      borderColor: 'border-[#d1a24f]/30',
      bgColor: 'bg-[#4b4932]/30',
    },
    {
      label: 'Current Standards',
      value: currentStandards,
      detail: 'Active / Published Editions',
      icon: CheckCircle,
      accentColor: 'text-[#927a48]',
      borderColor: 'border-[#927a48]/40',
      bgColor: 'bg-[#927a48]/20',
    },
    {
      label: 'Withdrawn Standards',
      value: withdrawnStandards,
      detail: 'Retained for Historical Reference',
      icon: AlertTriangle,
      accentColor: 'text-[#b84a3a]',
      borderColor: 'border-[#b84a3a]/30',
      bgColor: 'bg-[#b84a3a]/10',
    },
    {
      label: 'Toy Safety Categories',
      value: totalCategories,
      detail: 'Mechanical to Chemical Scopes',
      icon: Layers,
      accentColor: 'text-[#f4f2ec]',
      borderColor: 'border-[#d5c7b2]/30',
      bgColor: 'bg-[#4b4932]/40',
    },
  ];

  return (
    <section className="w-full py-10 bg-[#171713]/80 border-b border-[#d5c7b2]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#f4f2ec] tracking-tight">
              Standards in BIS-Setu Toy Knowledge Base
            </h2>
            <p className="text-xs text-[#d5c7b2] mt-1">
              Curated benchmark records from the Bureau of Indian Standards dataset
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4b4932]/40 border border-[#d5c7b2]/20 text-[11px] text-[#d5c7b2] self-start sm:self-auto">
            <Info className="w-3.5 h-3.5 text-[#d1a24f]" />
            <span>Dataset Verified Scope: 27 Standards</span>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`rounded-xl p-5 border ${stat.borderColor} ${stat.bgColor} backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#d5c7b2] uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <Icon className={`w-4 h-4 ${stat.accentColor}`} />
                </div>
                <div className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${stat.accentColor} mb-1`}>
                  {stat.value}
                </div>
                <p className="text-[11px] text-[#d5c7b2]/80">{stat.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
