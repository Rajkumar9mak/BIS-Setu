'use client';

import React, { useState } from 'react';
import { History, ArrowDown, ShieldAlert, CheckCircle2, Info } from 'lucide-react';
import { TOY_EVOLUTION_GROUPS, ToyEvolutionGroup, ToyStandard } from '@/data/toy_standards';

export default function ToyVersionTimeline() {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const currentGroup = TOY_EVOLUTION_GROUPS[selectedGroupIndex];

  return (
    <section className="w-full py-16 bg-[#171713] text-[#f4f2ec] border-b border-[#d5c7b2]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4b4932]/60 border border-[#d1a24f]/30 text-[#d1a24f] text-xs font-bold uppercase tracking-wider mb-3">
            <History className="w-3.5 h-3.5 text-[#d1a24f]" />
            <span>Standards Evolution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#f4f2ec]">
            Version & Revision Progression
          </h2>
          <p className="text-sm sm:text-base text-[#d5c7b2] mt-2 leading-relaxed">
            Trace how multi-edition Indian Toy Standards evolved across successive publication years.
            Historical revisions are recorded strictly as cataloged by the Bureau of Indian Standards.
          </p>
        </div>

        {/* Series Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {TOY_EVOLUTION_GROUPS.map((group, idx) => (
            <button
              key={group.series}
              onClick={() => setSelectedGroupIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                selectedGroupIndex === idx
                  ? 'bg-[#d1a24f] text-[#171713] shadow-lg scale-[1.02]'
                  : 'bg-[#25251d] text-[#d5c7b2] border border-[#4b4932] hover:border-[#927a48]'
              }`}
            >
              <span>{group.series}</span>
              <span className="ml-2 opacity-60 text-[10px]">({group.versions.length} ed.)</span>
            </button>
          ))}
        </div>

        {/* Selected Series Evolution Card */}
        <div className="rounded-3xl glass-charcoal border border-[#d5c7b2]/25 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d5c7b2]/15 mb-8">
            <div>
              <span className="text-xs font-mono text-[#d1a24f] font-semibold uppercase tracking-wider">
                {currentGroup.category}
              </span>
              <h3 className="text-2xl font-black font-mono text-[#f4f2ec] mt-1">
                {currentGroup.series}
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#4b4932]/40 border border-[#d5c7b2]/20 text-xs text-[#d5c7b2]">
              <Info className="w-3.5 h-3.5 text-[#d1a24f]" />
              <span>Evolution timeline based on dataset records</span>
            </div>
          </div>

          {/* Vertical Stepper Timeline */}
          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#4b4932]">
            {currentGroup.versions.map((ver: ToyStandard, vIdx: number) => {
              const isWithdrawn = ver.status === 'Withdrawn';
              const isLast = vIdx === currentGroup.versions.length - 1;

              return (
                <div key={ver.id} className="relative group">
                  {/* Stepper Dot */}
                  <div
                    className={`absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isWithdrawn
                        ? 'bg-[#171713] border-[#b84a3a] text-[#b84a3a]'
                        : 'bg-[#d1a24f] border-[#f4f2ec] text-[#171713]'
                    }`}
                  >
                    {isWithdrawn ? (
                      <span className="w-2 h-2 rounded-full bg-[#b84a3a]" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>

                  {/* Card content */}
                  <div
                    className={`rounded-2xl p-5 border transition-all ${
                      isWithdrawn
                        ? 'bg-[#171713]/70 border-[#b84a3a]/30'
                        : 'bg-[#25251d] border-[#d1a24f]/60 shadow-lg'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-base sm:text-lg font-mono font-bold text-[#f4f2ec]">
                          {ver.standard_number}
                        </span>
                        {ver.revision && (
                          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#4b4932] text-[#d1a24f] border border-[#d1a24f]/20">
                            {ver.revision}
                          </span>
                        )}
                      </div>

                      {isWithdrawn ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#b84a3a]/20 text-[#b84a3a] border border-[#b84a3a]/40">
                          <ShieldAlert className="w-3 h-3" />
                          WITHDRAWN
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#927a48]/30 text-[#d1a24f] border border-[#d1a24f]/50">
                          <CheckCircle2 className="w-3 h-3 text-[#d1a24f]" />
                          CURRENT REVISION
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-[#d5c7b2] leading-relaxed">
                      {ver.title}
                    </p>

                    <div className="mt-3 pt-3 border-t border-[#d5c7b2]/10 flex items-center justify-between text-[11px] text-[#d5c7b2]/70 font-mono">
                      <span>Publication Year: {ver.year}</span>
                      <span>Source: BIS Standards Catalog</span>
                    </div>
                  </div>

                  {/* Down Arrow indicator between items */}
                  {!isLast && (
                    <div className="pl-4 pt-3 flex items-center text-[#927a48]">
                      <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
