'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';

export default function ProductVerification() {
  const router = useRouter();
  const [licenseInput, setLicenseInput] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (licenseInput.trim()) {
      router.push(`/verify?query=${encodeURIComponent(licenseInput.trim())}`);
    } else {
      router.push('/verify');
    }
  };

  return (
    <section className="relative py-16 sm:py-24 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)] bg-white/50 dark:bg-[#171812] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Form & Explanations */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C49A45] bg-[#FFF8E7] border border-[#C49A45]/30 dark:text-[#D4AF62] dark:bg-[#D4AF62]/10 dark:border-[#D4AF62]/30 px-3 py-1 rounded-full inline-block">
              ANTI-COUNTERFEIT ENGINE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#111827] dark:text-[#F4F1E8] tracking-tight">
              Verify a BIS Product
            </h2>
            <p className="text-base text-[#475569] dark:text-[#D5D0C4] leading-relaxed">
              Quickly check BIS certification and product information using a license number or product details.
            </p>

            {/* Input Form */}
            <form onSubmit={handleVerify} className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-2xl bg-white dark:bg-[#1D1E18] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.30)] p-2 focus-within:border-[#C49A45] dark:focus-within:border-[#D4AF62] shadow-[0_2px_10px_rgba(15,23,42,0.06)] dark:shadow-none transition-all">
                <div className="flex items-center flex-1 px-3 py-1">
                  <Search className="w-4 h-4 text-[#C49A45] dark:text-[#D4AF62] mr-2 shrink-0" />
                  <input
                    type="text"
                    value={licenseInput}
                    onChange={(e) => setLicenseInput(e.target.value)}
                    placeholder="Enter BIS license or product number (e.g. CM/L-8400152488)..."
                    className="w-full bg-transparent text-sm text-[#111827] dark:text-[#F4F1E8] placeholder-[#94A3B8] dark:placeholder-[#969287] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-[#C49A45] hover:bg-[#B58936] text-white text-xs sm:text-sm font-bold shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer dark:bg-gradient-to-r dark:from-[#D4AF62] dark:to-[#C9A55A] dark:hover:from-[#E0BD70] dark:hover:to-[#D4AF62] dark:text-[#171812]"
                >
                  <span>Verify</span>
                  <ArrowRight className="w-4 h-4 text-white dark:text-[#171812]" />
                </button>
              </div>
              <p className="text-xs text-[#64748B] dark:text-[#969287]">
                Supported formats: 7 to 10-digit CM/L numbers, R-numbers (CRS), or brand names.
              </p>
            </form>

            {/* Feature Proofs */}
            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.12)]">
              <div>
                <span className="text-xs font-bold text-[#111827] dark:text-[#F4F1E8]">Real-time Database</span>
                <p className="text-[11px] text-[#64748B] dark:text-[#969287] mt-0.5">Cross-referenced with central BIS e-portal registers.</p>
              </div>
              <div>
                <span className="text-xs font-bold text-[#111827] dark:text-[#F4F1E8]">Consumer Protection</span>
                <p className="text-[11px] text-[#64748B] dark:text-[#969287] mt-0.5">Instant detection of forged or expired ISI markings.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Verification Result Preview Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-white dark:bg-[#1D1E18]/90 border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.25)] shadow-[0_4px_20px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] p-6 sm:p-8 backdrop-blur-xl space-y-6">
              {/* Card Header & Status */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)]">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C49A45] dark:text-[#D4AF62]">
                    BIS CERTIFICATION
                  </span>
                  <h3 className="text-lg font-black text-[#111827] dark:text-[#F4F1E8]">
                    Official License Record
                  </h3>
                </div>
                {/* Light green status badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold dark:bg-emerald-950/70 dark:border-emerald-500/40 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>&check; VERIFIED</span>
                </div>
              </div>

              {/* Data Rows */}
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#23241C] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.12)] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#969287] block">
                      License No.
                    </span>
                    <span className="font-mono text-sm font-bold text-[#C49A45] dark:text-[#D4AF62]">
                      CM/L-8400152488
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-400 dark:border-emerald-500/30">
                    STATUS: VALID
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#23241C] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.12)]">
                    <span className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#969287] block">
                      Product
                    </span>
                    <span className="text-xs font-bold text-[#111827] dark:text-[#F4F1E8] line-clamp-2 mt-0.5">
                      Packaged Drinking Water (20L Containers)
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#23241C] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.12)]">
                    <span className="text-[10px] uppercase font-bold text-[#64748B] dark:text-[#969287] block">
                      Standard
                    </span>
                    <span className="font-mono text-xs font-bold text-[#C49A45] dark:text-[#D4AF62] mt-0.5 block">
                      IS 14543:2016
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F1F5F9] dark:bg-[#23241C]/60 text-left">
                    <span className="text-[10px] text-[#64748B] dark:text-[#969287] block">Licensee</span>
                    <span className="text-xs font-medium text-[#111827] dark:text-[#D5D0C4]">Himalayan Aquatech Pvt Ltd</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F1F5F9] dark:bg-[#23241C]/60 text-left">
                    <span className="text-[10px] text-[#64748B] dark:text-[#969287] block">Validity</span>
                    <span className="text-xs font-medium text-[#111827] dark:text-[#D5D0C4]">Valid until 31 Dec 2027</span>
                  </div>
                </div>
              </div>

              {/* Card Footer action */}
              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={() => router.push('/verify?cml=8400152488')}
                  className="text-xs font-bold text-[#C49A45] dark:text-[#D4AF62] hover:text-[#111827] dark:hover:text-[#F4F1E8] inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Inspect Full Registry Record</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
