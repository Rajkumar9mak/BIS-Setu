import React from 'react';
import { BookOpen, FileCheck, Users, Cpu } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      figure: '21,000+',
      label: 'Indian Standards',
      subtext: 'Catalogued and parsed with clause-level granularity',
      icon: BookOpen,
    },
    {
      figure: 'Clause-Level',
      label: 'Citations',
      subtext: 'Verifiable standard, clause, and page references',
      icon: FileCheck,
    },
    {
      figure: 'Industry +',
      label: 'Consumer Support',
      subtext: 'Unified platform for manufacturers and buyers',
      icon: Users,
    },
    {
      figure: 'AI-Powered',
      label: 'Knowledge Assistant',
      subtext: 'Zero-hallucination semantic RAG engine',
      icon: Cpu,
    },
  ];

  return (
    <section className="relative py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="rounded-[22px] glass-olive p-6 border border-[#d1a24f]/25 card-hover-olive transition-all"
              >
                <div className="flex items-center justify-between pb-3">
                  <span className="text-2xl sm:text-3xl font-black text-[#d1a24f] font-mono tracking-tight">
                    {item.figure}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#927a48]/30 flex items-center justify-center text-[#d1a24f]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-[#f4f2ec]">
                  {item.label}
                </h3>
                <p className="text-xs text-[#d5c7b2]/80 mt-1 leading-relaxed">
                  {item.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
