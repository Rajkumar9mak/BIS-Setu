'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FlaskConical, MapPin, Search, ArrowRight, Award } from 'lucide-react';

const exampleLabs = [
  {
    name: 'BIS Central Laboratory (CL)',
    type: 'BIS Owned & Operated',
    location: 'Ghaziabad / Sahibabad, Uttar Pradesh',
    capabilities: 'IS 302 (Electrical Safety), IS 9873 (Toys), IS 14543 (Packaged Water), IS 13252 (IT)',
    recognition: 'NABL TC-5001 & Central BIS Apex',
    turnaround: '10 Days',
  },
  {
    name: 'Electrical Research & Development Association (ERDA)',
    type: 'BIS Recognized Partner',
    location: 'Vadodara, Gujarat',
    capabilities: 'IS 302 (Kettles & Appliances), IS 302 (Part 1), IS 13252 (IT Equipment & Batteries)',
    recognition: 'NABL TC-5100',
    turnaround: '9 Days',
  },
  {
    name: 'Automotive Research Association of India (ARAI)',
    type: 'BIS Recognized Autonomous',
    location: 'Pune, Maharashtra',
    capabilities: 'IS 4151 (Two Wheeler Protective Helmets), Drop Tower Impact, EV Powertrains',
    recognition: 'NABL TC-5220',
    turnaround: '10 Days',
  },
];

export default function LaboratorySearch() {
  const router = useRouter();
  const [labSearch, setLabSearch] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (labSearch) params.append('q', labSearch);
    if (location) params.append('state', location);
    if (category) params.append('category', category);
    router.push(`/labs?${params.toString()}`);
  };

  return (
    <section className="relative py-16 sm:py-24 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)] bg-white/50 dark:bg-[#171812] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C49A45] bg-[#FFF8E7] border border-[#C49A45]/30 dark:text-[#D4AF62] dark:bg-[#D4AF62]/10 dark:border-[#D4AF62]/30 px-3 py-1 rounded-full inline-block">
            TESTING INFRASTRUCTURE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] dark:text-[#F4F1E8] tracking-tight">
            Find a BIS Laboratory
          </h2>
          <p className="text-base text-[#475569] dark:text-[#D5D0C4] leading-relaxed">
            Discover laboratories based on testing capability, location and product requirements.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto rounded-2xl bg-white dark:bg-[#1D1E18] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.25)] p-3 sm:p-4 shadow-[0_2px_12px_rgba(15,23,42,0.06)] dark:shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center px-3 py-2 rounded-xl bg-[#F8FAFC] dark:bg-[#23241C] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)]">
              <Search className="w-4 h-4 text-[#C49A45] dark:text-[#D4AF62] mr-2 shrink-0" />
              <input
                type="text"
                value={labSearch}
                onChange={(e) => setLabSearch(e.target.value)}
                placeholder="Search Laboratory or Standard..."
                className="w-full bg-transparent text-xs text-[#111827] dark:text-[#F4F1E8] placeholder-[#94A3B8] dark:placeholder-[#969287] focus:outline-none"
              />
            </div>

            <div className="flex items-center px-3 py-2 rounded-xl bg-[#F8FAFC] dark:bg-[#23241C] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)]">
              <MapPin className="w-4 h-4 text-[#C49A45] dark:text-[#D4AF62] mr-2 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location (State / City)..."
                className="w-full bg-transparent text-xs text-[#111827] dark:text-[#F4F1E8] placeholder-[#94A3B8] dark:placeholder-[#969287] focus:outline-none"
              />
            </div>

            <div className="flex items-center px-3 py-2 rounded-xl bg-[#F8FAFC] dark:bg-[#23241C] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)]">
              <FlaskConical className="w-4 h-4 text-[#C49A45] dark:text-[#D4AF62] mr-2 shrink-0" />
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Testing Category (e.g. Electrical)..."
                className="w-full bg-transparent text-xs text-[#111827] dark:text-[#F4F1E8] placeholder-[#94A3B8] dark:placeholder-[#969287] focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-3 text-right">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#C49A45] hover:bg-[#B58936] text-white shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer dark:bg-gradient-to-r dark:from-[#D4AF62] dark:to-[#C9A55A] dark:hover:from-[#E0BD70] dark:hover:to-[#D4AF62] dark:text-[#171812]"
            >
              <span>Find Laboratories</span>
              <ArrowRight className="w-4 h-4 text-white dark:text-[#171812]" />
            </button>
          </div>
        </form>

        {/* 3 Example Laboratory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exampleLabs.map((lab, idx) => (
            <div
              key={idx}
              onClick={() => router.push('/labs')}
              className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-[#1D1E18]/85 border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.18)] hover:border-[#C49A45] dark:hover:border-[#D4AF62]/60 shadow-[0_2px_8px_rgba(15,23,42,0.06)] dark:shadow-none hover:shadow-[0_8px_24px_rgba(196,154,69,0.12)] dark:hover:shadow-[0_12px_40px_-10px_rgba(212,175,98,0.15)] transition-all duration-200 hover:-translate-y-1 cursor-pointer backdrop-blur-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C49A45] bg-[#FFF8E7] px-2.5 py-1 rounded-full border border-[#C49A45]/30 dark:text-[#D4AF62] dark:bg-[#D4AF62]/15 dark:border-[#D4AF62]/30">
                    {lab.type}
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B] dark:text-[#969287]">
                    TAT ~ {lab.turnaround}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#111827] dark:text-[#F4F1E8] group-hover:text-[#C49A45] dark:group-hover:text-[#D4AF62] transition-colors">
                    {lab.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#969287] mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C49A45] dark:text-[#D4AF62] shrink-0" />
                    <span>{lab.location}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#23241C] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.10)] space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#969287] block">
                    Testing Capabilities
                  </span>
                  <p className="text-xs text-[#475569] dark:text-[#D5D0C4] line-clamp-2">
                    {lab.capabilities}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.12)] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-[#C49A45] dark:text-[#D4AF62] font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  <span>{lab.recognition}</span>
                </div>
                <div className="w-7 h-7 rounded-xl bg-[#F1F5F9] dark:bg-[#23241C] group-hover:bg-[#C49A45] dark:group-hover:bg-[#D4AF62] flex items-center justify-center text-[#64748B] dark:text-[#969287] group-hover:text-white dark:group-hover:text-[#171812] transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
