'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, BookOpen, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { discoverStandards } from '@/lib/api';
import { StandardsDiscoveryResult } from '@/lib/types';

export default function StandardsSearchSection() {
  const [searchQuery, setSearchQuery] = useState<string>('I manufacture stainless steel pressure cookers');
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any[]>([
    {
      standard_number: 'IS 2347:2017',
      title: 'Domestic Pressure Cookers — Specification',
      relevance_status: 'Potentially Relevant • Mandatory QCO',
      explanation: 'Specifies safety, material composition (Grade 304 food-contact stainless steel), bursting pressure ratings, and fusible safety valve criteria for domestic pressure cookers.',
      source: 'e-BIS Manakonline Gazette',
      clause: 'Clause 4.1 & 7.3',
      page: 'Page 12',
      primary: true
    },
    {
      standard_number: 'IS 6911:2017',
      title: 'Stainless Steel Plate, Sheet and Strip — Specification',
      relevance_status: 'Applicable Raw Material Standard',
      explanation: 'Governs metallurgical purity, tensile strength, and austenitic corrosion resistance for sheet metal deep-drawing in cooking vessels.',
      source: 'Steel Products Quality Order',
      clause: 'Table 2',
      page: 'Page 8',
      primary: false
    }
  ]);

  const handleSearch = async (text?: string) => {
    const q = (text ?? searchQuery).trim();
    if (!q) return;
    setLoading(true);
    try {
      const res = await discoverStandards(q);
      if (res && res.standards && res.standards.length > 0) {
        setResults(
          res.standards.map((s, idx) => ({
            standard_number: s.standard_number,
            title: s.title,
            relevance_status: s.is_primary ? 'Primary Relevant Standard' : 'Complementary Specification',
            explanation: s.reason,
            source: s.source || 'BIS Statutory Register',
            clause: 'Clause 4.1',
            page: 'Page 6',
            primary: s.is_primary || idx === 0
          }))
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const sampleQueries = [
    'I manufacture stainless steel pressure cookers',
    'Electric ceiling fans with 1200mm sweep',
    'Two wheeler protective helmets for motorcycle riders',
    'Packaged drinking water in 20L jars'
  ];

  return (
    <section id="standards-discovery" className="relative py-20 bg-[#f4f2ec] text-[#171713] rounded-[36px] my-12 overflow-hidden shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d5c7b2]/50 border border-[#927a48]/30 text-[#4b4932] text-xs font-bold uppercase tracking-wider">
            <Search className="w-3.5 h-3.5 text-[#927a48]" />
            <span>Smart Standards Discovery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#171713] tracking-tight">
            Find the right standard.
          </h2>
          <p className="text-sm sm:text-base text-[#4b4932] leading-relaxed">
            Enter your product description or requirement in plain words. Our engine identifies governing IS codes, mandatory Quality Control Orders, and clause specifications.
          </p>
        </div>

        {/* Large Search Box */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#927a48]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Describe your product or requirement... (e.g. I manufacture stainless steel pressure cookers)"
                className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white border-2 border-[#927a48]/30 focus:border-[#927a48] focus:ring-4 focus:ring-[#927a48]/15 text-[#171713] placeholder:text-[#4b4932]/50 text-sm font-semibold outline-none transition-all shadow-md"
              />
            </div>

            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="px-8 py-4 rounded-2xl font-bold text-sm bg-[#927a48] hover:bg-[#4b4932] text-[#f4f2ec] shadow-lg shadow-[#927a48]/25 transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-[#d1a24f]" />
              <span>{loading ? 'Discovering...' : 'Discover Standards'}</span>
            </button>
          </div>

          {/* Preset Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4b4932] mr-1">
              Popular Examples:
            </span>
            {sampleQueries.map((sq, i) => (
              <button
                key={i}
                onClick={() => {
                  setSearchQuery(sq);
                  handleSearch(sq);
                }}
                className="px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white text-[#4b4932] hover:text-[#171713] border border-[#d5c7b2] shadow-sm transition-all"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Display as Elegant Cards */}
        <div className="max-w-5xl mx-auto space-y-4 pt-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#4b4932]">
              Identified Indian Standards ({results.length})
            </h3>
            <span className="text-xs font-semibold text-[#927a48]">
              Click any standard to view compliance roadmap
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((res, idx) => (
              <div
                key={idx}
                className="rounded-[26px] bg-white p-7 border-2 border-[#d5c7b2] hover:border-[#927a48] hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-base text-[#927a48] bg-[#f4f2ec] px-3 py-1 rounded-xl border border-[#d5c7b2]">
                      {res.standard_number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#d1a24f]/20 text-[#4b4932] border border-[#d1a24f]/40">
                      {res.relevance_status}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-[#171713] leading-snug">
                    {res.title}
                  </h4>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#927a48] block">
                      Why This Standard:
                    </span>
                    <p className="text-xs text-[#4b4932] leading-relaxed">
                      {res.explanation}
                    </p>
                  </div>
                </div>

                {/* Footer Metadata & Action */}
                <div className="pt-4 border-t border-[#d5c7b2]/50 flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#4b4932]">
                    <span className="px-2 py-0.5 rounded bg-[#f4f2ec] border border-[#d5c7b2]">
                      {res.clause}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#f4f2ec] border border-[#d5c7b2]">
                      {res.page}
                    </span>
                  </div>

                  <Link
                    href="/industry"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#171713] bg-[#d1a24f] hover:bg-[#d1a24f]/90 transition-all shadow-sm"
                  >
                    <span>View Standard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
