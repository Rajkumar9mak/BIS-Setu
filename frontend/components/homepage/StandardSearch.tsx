'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';

const popularSearches = [
  'Electrical',
  'Food',
  'Construction',
  'Electronics',
  'Textiles',
  'Steel',
  'Mechanical',
];

const sampleResults = [
  {
    code: 'IS 302 (Part 2/Sec 15):2009',
    title: 'Electric Kettles & Jugs Safety Specifications',
    scheme: 'Scheme I (ISI Mark)',
    status: 'Mandatory (QCO Active)',
  },
  {
    code: 'IS 14543:2016',
    title: 'Packaged Drinking Water (Other than Natural Mineral Water)',
    scheme: 'Scheme I (ISI Mark)',
    status: 'Mandatory (QCO Active)',
  },
  {
    code: 'IS 13252 (Part 1):2010',
    title: 'Information Technology Equipment — Safety Requirements',
    scheme: 'Scheme II (CRS Mark)',
    status: 'Mandatory (MeitY Order)',
  },
];

export default function StandardSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/standards?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/standards');
    }
  };

  const handlePillClick = (term: string) => {
    setQuery(term);
    router.push(`/standards?q=${encodeURIComponent(term)}`);
  };

  return (
    <section id="standards-search" className="relative py-16 sm:py-24 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)] bg-white/50 dark:bg-[#171812] transition-colors duration-200">
      {/* Subtle radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C49A45]/5 dark:bg-[#D4AF62]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C49A45] bg-[#FFF8E7] border border-[#C49A45]/30 dark:text-[#D4AF62] dark:bg-[#D4AF62]/10 dark:border-[#D4AF62]/30 px-3 py-1 rounded-full inline-block">
            STANDARD DISCOVERY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#111827] dark:text-[#F4F1E8] tracking-tight">
            Find the Right Indian Standard
          </h2>
          <p className="text-base text-[#475569] dark:text-[#D5D0C4] max-w-xl mx-auto leading-relaxed">
            Search by product, industry, standard number or keyword.
          </p>
        </div>

        {/* Large Search Box */}
        <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto">
          <div className="relative flex items-center rounded-2xl bg-white dark:bg-[#1D1E18] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.30)] hover:border-[#C49A45] dark:hover:border-[#D4AF62]/60 focus-within:border-[#C49A45] dark:focus-within:border-[#D4AF62] focus-within:shadow-[0_0_25px_rgba(196,154,69,0.15)] shadow-[0_2px_12px_rgba(15,23,42,0.06)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all p-2 sm:p-2.5">
            <Search className="w-5 h-5 text-[#C49A45] dark:text-[#D4AF62] ml-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search standards, products or keywords (e.g. IS 302, electric kettle, helmet)..."
              className="w-full bg-transparent px-3.5 py-2.5 text-sm sm:text-base text-[#111827] dark:text-[#F4F1E8] placeholder-[#94A3B8] dark:placeholder-[#969287] focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-3 rounded-xl bg-[#C49A45] hover:bg-[#B58936] text-white text-xs sm:text-sm font-bold shadow-sm hover:-translate-y-0.5 transition-all shrink-0 cursor-pointer dark:bg-gradient-to-r dark:from-[#D4AF62] dark:to-[#C9A55A] dark:hover:from-[#E0BD70] dark:hover:to-[#D4AF62] dark:text-[#171812]"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4 text-white dark:text-[#171812]" />
            </button>
          </div>
        </form>

        {/* Popular Searches Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-xs text-[#64748B] dark:text-[#969287] mr-1">Popular searches:</span>
          {popularSearches.map((term, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePillClick(term)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#475569] bg-[#F1F5F9] hover:bg-[#E2E8F0] hover:text-[#C49A45] border border-[#E5E7EB] dark:text-[#D5D0C4] dark:bg-[#23241C] dark:hover:bg-[#2D2E24] dark:hover:text-[#D4AF62] dark:border-[rgba(212,175,98,0.18)] dark:hover:border-[#D4AF62]/50 transition-all cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Quick Highlights / Featured Standards */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {sampleResults.map((std, idx) => (
            <div
              key={idx}
              onClick={() => router.push(`/standards?q=${encodeURIComponent(std.code)}`)}
              className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#1D1E18]/60 border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.14)] hover:border-[#C49A45] dark:hover:border-[#D4AF62]/40 transition-all cursor-pointer group shadow-[0_1px_4px_rgba(15,23,42,0.04)] dark:shadow-none"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#C49A45] dark:text-[#D4AF62]">
                  {std.code}
                </span>
                <span className="text-[9px] font-black uppercase text-[#C49A45] bg-[#FFF8E7] px-2 py-0.5 rounded-md border border-[#C49A45]/30 dark:text-[#D4AF62] dark:bg-[#D4AF62]/10 dark:border-[#D4AF62]/20">
                  {std.status.split(' ')[0]}
                </span>
              </div>
              <p className="text-xs text-[#111827] dark:text-[#F4F1E8] font-medium mt-1.5 line-clamp-1 group-hover:text-[#C49A45] dark:group-hover:text-[#D4AF62] transition-colors">
                {std.title}
              </p>
              <span className="text-[10px] text-[#64748B] dark:text-[#969287] mt-1 block">
                {std.scheme}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
