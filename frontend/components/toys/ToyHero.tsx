'use client';

import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, BookOpen, Layers } from 'lucide-react';

interface ToyHeroProps {
  onExploreClick?: () => void;
  onAskAiClick?: () => void;
}

export default function ToyHero({ onExploreClick, onAskAiClick }: ToyHeroProps) {
  return (
    <section className="relative w-full py-16 lg:py-24 overflow-hidden border-b border-[#d5c7b2]/20">
      {/* Subtle Warm Earthy Atmospheric Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d1a24f]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#927a48]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* National Standards Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4b4932]/40 border border-[#d1a24f]/30 text-[#d1a24f] text-xs font-semibold tracking-wide backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-[#d1a24f]" />
              <span>BUREAU OF INDIAN STANDARDS • TOY SAFETY KNOWLEDGE BASE</span>
            </div>

            {/* Oversized Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#f4f2ec] leading-[1.12]">
              Toy Safety, <br />
              <span className="text-gradient-gold">Made Understandable.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#d5c7b2] max-w-2xl font-normal leading-relaxed">
              Explore Indian Standards related to toy safety, physical properties, flammability,
              chemical requirements, electric toys, and age determination.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] font-bold text-sm transition-all duration-200 shadow-lg shadow-[#d1a24f]/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Toy Standards</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onAskAiClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#4b4932]/40 hover:bg-[#4b4932]/70 text-[#f4f2ec] border border-[#d5c7b2]/30 font-semibold text-sm transition-all duration-200 backdrop-blur-sm hover:border-[#d1a24f]/60"
              >
                <Sparkles className="w-4 h-4 text-[#d1a24f]" />
                <span>Ask BIS AI</span>
              </button>
            </div>

            {/* Micro Metadata Row */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#d5c7b2]/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d1a24f]" />
                <span>IS 9873 Series Grounded</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#927a48]" />
                <span>IS 15644 Electric Safety</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d5c7b2]" />
                <span>Withdrawn vs Current Tracking</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Architectural Abstract Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Geometric Composition Card */}
              <div className="rounded-2xl glass-charcoal border border-[#d5c7b2]/25 p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#d1a24f]/15 rounded-full blur-2xl" />

                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-[#d5c7b2]/15 pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#4b4932] border border-[#d1a24f]/30 flex items-center justify-center text-[#d1a24f]">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-xs font-bold text-[#f4f2ec] uppercase tracking-wider">
                        BIS Toy Safety Framework
                      </h2>
                      <p className="text-[10px] text-[#d5c7b2]/80">Standardized Verification System</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#927a48]/30 border border-[#d1a24f]/40 text-[10px] font-mono text-[#d1a24f]">
                    OFFICIAL SPEC
                  </span>
                </div>

                {/* Abstract Interactive Geometry Mockup */}
                <div className="space-y-3.5">
                  {/* Item 1: Mechanical Safety */}
                  <div className="p-3 rounded-xl bg-[#171713]/60 border border-[#d5c7b2]/15 flex items-center justify-between hover:border-[#d1a24f]/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#4b4932]/60 flex items-center justify-center text-sm">
                        🧸
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#f4f2ec] font-mono">IS 9873 (Part 1)</p>
                        <p className="text-[11px] text-[#d5c7b2]">Mechanical & Physical Safety</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#927a48]/30 text-[#d1a24f] border border-[#d1a24f]/20">
                      Fifth Revision
                    </span>
                  </div>

                  {/* Item 2: Flammability */}
                  <div className="p-3 rounded-xl bg-[#171713]/60 border border-[#d5c7b2]/15 flex items-center justify-between hover:border-[#d1a24f]/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#4b4932]/60 flex items-center justify-center text-sm">
                        🔥
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#f4f2ec] font-mono">IS 9873 (Part 2)</p>
                        <p className="text-[11px] text-[#d5c7b2]">Flammability Protection</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#927a48]/30 text-[#d1a24f] border border-[#d1a24f]/20">
                      Fourth Revision
                    </span>
                  </div>

                  {/* Item 3: Electric Toys */}
                  <div className="p-3 rounded-xl bg-[#171713]/60 border border-[#d5c7b2]/15 flex items-center justify-between hover:border-[#d1a24f]/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#4b4932]/60 flex items-center justify-center text-sm">
                        ⚡
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#f4f2ec] font-mono">IS 15644:2006</p>
                        <p className="text-[11px] text-[#d5c7b2]">Safety of Electric Toys</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#4b4932]/80 text-[#f4f2ec] border border-[#d5c7b2]/30">
                      Current
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-4 pt-3 border-t border-[#d5c7b2]/15 flex items-center justify-between text-[11px] text-[#d5c7b2]/80">
                  <span>Structured BIS Dataset</span>
                  <span className="font-mono text-[#d1a24f] font-semibold">27 Active Records</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
