'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, BookOpen, CheckCircle2, FileText, CornerDownRight } from 'lucide-react';
import DecorativeShapes from './DecorativeShapes';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      {/* Decorative 3D Abstract Shapes */}
      <DecorativeShapes variant="loop" className="-top-16 -left-20 opacity-70" />
      <DecorativeShapes variant="rectangles" className="top-1/3 -right-20 opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* National Authority Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4b4932]/50 border border-[#d1a24f]/30 text-[#f4f2ec] text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#d1a24f] animate-pulse" />
              <span className="text-[#d5c7b2]">Bureau of Indian Standards</span>
              <span className="text-[#d5c7b2]/40">•</span>
              <span className="text-[#d1a24f]">Intelligent Assistant</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#171713] dark:text-[#f4f2ec] leading-[1.08]">
              Indian Standards, <br />
              <span className="text-[#d1a24f]">Made Simple.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-xl text-[#6b675b] dark:text-[#d5c7b2] max-w-xl font-normal leading-relaxed">
              Discover standards, understand BIS compliance, and verify products with source-backed AI assistance.
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/copilot"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-sm bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] shadow-lg shadow-[#d1a24f]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>Ask BIS AI</span>
                <ArrowRight className="w-4 h-4 text-[#171713]" />
              </Link>

              <Link
                href="#standards-discovery"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold text-sm text-[#171713] dark:text-[#f4f2ec] bg-transparent hover:bg-[#171713]/5 dark:hover:bg-[#f4f2ec]/5 border border-[#4b4932]/30 dark:border-[#f4f2ec]/40 hover:border-[#171713] dark:hover:border-[#f4f2ec] transition-all duration-200"
              >
                <BookOpen className="w-4 h-4 text-[#927a48] dark:text-[#d5c7b2]" />
                <span>Explore Standards</span>
              </Link>
            </div>

            {/* Micro Feature Proof Points */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-[#6b675b] dark:text-[#d5c7b2]/80 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d1a24f]" />
                <span>Zero-Hallucination Retrieval</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d1a24f]" />
                <span>Statutory Gazette Citations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d1a24f]" />
                <span>e-BIS Manakonline Sync</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium AI Glass Interface Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[28px] glass-charcoal border border-[#d1a24f]/35 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl">
              {/* Top Bar of the Mockup */}
              <div className="flex items-center justify-between pb-4 border-b border-[#d5c7b2]/15">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#927a48]/20 border border-[#d1a24f]/40 text-[#d1a24f]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#f4f2ec]">
                      BIS-Setu Intelligent Engine
                    </h3>
                    <p className="text-[10px] text-[#d5c7b2]/70 font-mono">
                      Query Dispatch • Model Grounded
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#927a48]/30 text-[#d1a24f] border border-[#d1a24f]/30">
                  LIVE RAG
                </span>
              </div>

              {/* Mockup Interaction Conversation */}
              <div className="mt-5 space-y-4">
                {/* User Query Bubble */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#d5c7b2]/60">
                    <span>User Query</span>
                    <span>Just now</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#4b4932]/40 border border-[#d5c7b2]/15 text-xs text-[#f4f2ec] font-medium leading-relaxed">
                    &ldquo;What BIS standard applies to my electric kettle?&rdquo;
                  </div>
                </div>

                {/* AI Retrieval Response */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#d1a24f]">
                    <CornerDownRight className="w-3.5 h-3.5" />
                    <span className="uppercase tracking-wide font-bold">Relevant Indian Standard Identified</span>
                  </div>

                  {/* Primary Identified Standard Card */}
                  <div className="p-4 rounded-2xl bg-[#171713]/80 border border-[#d1a24f]/40 space-y-3 shadow-inner">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-[#d5c7b2]/70 uppercase">Standard Designation</span>
                        <h4 className="text-sm font-black text-[#f4f2ec] font-mono tracking-tight">
                          IS 302 (Part 2/Sec 15):2009
                        </h4>
                        <p className="text-[11px] text-[#d5c7b2] mt-0.5">
                          Safety of Household and Similar Electrical Appliances — Particular Requirements for Kettles
                        </p>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-[#d1a24f] shrink-0" />
                    </div>

                    {/* Metadata Strip: Clause, Page, Source-Backed Badge */}
                    <div className="pt-2 border-t border-[#d5c7b2]/10 flex items-center justify-between flex-wrap gap-2 text-xs">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-[#d5c7b2]">
                        <span className="px-2 py-0.5 rounded bg-[#4b4932]/50 border border-[#d5c7b2]/20">
                          Clause 13.2
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#4b4932]/50 border border-[#d5c7b2]/20">
                          Page 9
                        </span>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#d1a24f]/20 text-[#d1a24f] border border-[#d1a24f]/40 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d1a24f]"></span>
                        Source-Backed
                      </span>
                    </div>
                  </div>

                  {/* Verbatim Excerpt Preview */}
                  <div className="p-3 rounded-xl bg-[#4b4932]/25 border border-[#d5c7b2]/10 text-[11px] text-[#d5c7b2] leading-relaxed italic">
                    &ldquo;Electric kettles must incorporate an automatic boil-dry cut-off that terminates heating before surface temperatures exceed 115°C.&rdquo;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
