'use client';

import React, { useState, useMemo } from 'react';
import { Compass, Sparkles, AlertCircle, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { TOY_STANDARDS_DATA, ToyStandard } from '@/data/toy_standards';

interface ToySafetyExplorerProps {
  onAskAi: (query: string) => void;
}

type ToyTypeOption =
  | 'Electric Toy'
  | 'Activity Toy'
  | 'Finger Paint'
  | 'Chemistry Set'
  | 'Toy Piston'
  | 'General Toy';

type InquiryOption =
  | 'Applicable standards'
  | 'Mechanical safety'
  | 'Flammability'
  | 'Chemical requirements'
  | 'Age determination'
  | 'Electrical safety'
  | 'Related standards';

export default function ToySafetyExplorer({ onAskAi }: ToySafetyExplorerProps) {
  const [selectedToyType, setSelectedToyType] = useState<ToyTypeOption>('Electric Toy');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryOption>('Applicable standards');

  const toyTypes: { id: ToyTypeOption; icon: string; desc: string }[] = [
    { id: 'Electric Toy', icon: '⚡', desc: 'Battery, adapter, or mains operated toys' },
    { id: 'Activity Toy', icon: '🎠', desc: 'Swings, slides, climbing frames for domestic play' },
    { id: 'Finger Paint', icon: '🎨', desc: 'Aqueous pastes for finger painting by young children' },
    { id: 'Chemistry Set', icon: '⚗️', desc: 'Experimental sets and chemical toys' },
    { id: 'Toy Piston', icon: '💥', desc: 'Toy pistols and amorces (paper caps)' },
    { id: 'General Toy', icon: '🧸', desc: 'Plush, plastic, wooden, or composite toys' },
  ];

  const inquiryTopics: { id: InquiryOption; label: string }[] = [
    { id: 'Applicable standards', label: 'All Potentially Relevant Standards' },
    { id: 'Mechanical safety', label: 'Mechanical & Physical Safety' },
    { id: 'Flammability', label: 'Flammability & Fire Resistance' },
    { id: 'Chemical requirements', label: 'Chemical Elements & Phthalates' },
    { id: 'Age determination', label: 'Age Grading & Age Determination' },
    { id: 'Electrical safety', label: 'Electrical & Power Supply Requirements' },
    { id: 'Related standards', label: 'Related Normative / Terminology Standards' },
  ];

  // Matched standards with explicit "Potentially relevant standard" guidance
  const matchedStandards = useMemo(() => {
    return TOY_STANDARDS_DATA.filter((std) => {
      // If user asks about specific safety property:
      if (selectedInquiry === 'Mechanical safety') {
        return std.safety_scope === 'Mechanical';
      }
      if (selectedInquiry === 'Flammability') {
        return std.category.toLowerCase().includes('flammability');
      }
      if (selectedInquiry === 'Chemical requirements') {
        return (
          std.safety_scope === 'Chemical' ||
          std.category.toLowerCase().includes('phthalate') ||
          std.category.toLowerCase().includes('migration') ||
          std.category.toLowerCase().includes('element')
        );
      }
      if (selectedInquiry === 'Age determination') {
        return std.safety_scope === 'Age';
      }
      if (selectedInquiry === 'Electrical safety') {
        return std.safety_scope === 'Electrical';
      }
      if (selectedInquiry === 'Related standards') {
        return std.category === 'Related Standards';
      }

      // If "Applicable standards" selected, match by Toy Type:
      if (selectedToyType === 'Electric Toy') {
        return (
          std.safety_scope === 'Electrical' ||
          std.standard_number.includes('15644') ||
          std.standard_number.includes('61558') ||
          (std.safety_scope === 'Mechanical' && std.status === 'Current')
        );
      }
      if (selectedToyType === 'Activity Toy') {
        return std.category === 'Activity Toys' || (std.safety_scope === 'Mechanical' && std.status === 'Current');
      }
      if (selectedToyType === 'Finger Paint') {
        return (
          std.category === 'Finger Paints' ||
          std.category === 'Migration of Certain Elements' ||
          (std.safety_scope === 'Mechanical' && std.status === 'Current')
        );
      }
      if (selectedToyType === 'Chemistry Set') {
        return std.category === 'Chemistry & Chemical Toy Sets';
      }
      if (selectedToyType === 'Toy Piston') {
        return std.standard_number.includes('11483') || (std.safety_scope === 'Mechanical' && std.status === 'Current');
      }
      if (selectedToyType === 'General Toy') {
        return (
          std.safety_scope === 'Mechanical' ||
          std.category === 'Flammability' ||
          std.category === 'Migration of Certain Elements'
        );
      }

      return true;
    });
  }, [selectedToyType, selectedInquiry]);

  return (
    <section className="w-full py-16 bg-[#F4F2EC] dark:bg-[#1d1d18] transition-colors border-b border-[#d5c7b2]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4b4932]/10 dark:bg-[#4b4932]/40 border border-[#927a48]/30 text-[#927a48] dark:text-[#d1a24f] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#d1a24f]" />
            <span>Interactive Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#171713] dark:text-[#f4f2ec] tracking-tight">
            Toy Safety Explorer
          </h2>
          <p className="text-sm sm:text-base text-[#6b675b] dark:text-[#d5c7b2] mt-2">
            Select your toy category and safety question to identify potentially relevant Indian Standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls: Step 1 & Step 2 */}
          <div className="lg:col-span-5 space-y-6">
            {/* Step 1: Toy Type */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#25251d] border border-[#d5c7b2]/40 dark:border-[#4b4932] shadow-sm">
              <span className="text-[11px] font-mono font-bold text-[#927a48] dark:text-[#d1a24f] uppercase tracking-wider">
                Step 01
              </span>
              <h3 className="text-base font-bold text-[#171713] dark:text-[#f4f2ec] mt-0.5 mb-3">
                Select Toy Classification
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {toyTypes.map((toy) => (
                  <button
                    key={toy.id}
                    onClick={() => setSelectedToyType(toy.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      selectedToyType === toy.id
                        ? 'bg-[#4b4932] text-[#f4f2ec] border-[#d1a24f] shadow-md ring-1 ring-[#d1a24f]'
                        : 'bg-[#F4F2EC] dark:bg-[#171713] border-[#d5c7b2]/40 dark:border-[#4b4932] text-[#171713] dark:text-[#d5c7b2] hover:border-[#927a48]'
                    }`}
                  >
                    <div className="text-xl mb-1">{toy.icon}</div>
                    <div className="text-xs font-bold leading-tight">{toy.id}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Inquiry Topic */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#25251d] border border-[#d5c7b2]/40 dark:border-[#4b4932] shadow-sm">
              <span className="text-[11px] font-mono font-bold text-[#927a48] dark:text-[#d1a24f] uppercase tracking-wider">
                Step 02
              </span>
              <h3 className="text-base font-bold text-[#171713] dark:text-[#f4f2ec] mt-0.5 mb-3">
                What do you want to know?
              </h3>
              <div className="space-y-2">
                {inquiryTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedInquiry(topic.id)}
                    className={`w-full p-3 rounded-xl text-left text-xs font-semibold border flex items-center justify-between transition-all ${
                      selectedInquiry === topic.id
                        ? 'bg-[#d1a24f] text-[#171713] border-[#d1a24f] font-bold shadow-md'
                        : 'bg-[#F4F2EC] dark:bg-[#171713] border-[#d5c7b2]/40 dark:border-[#4b4932] text-[#4b4932] dark:text-[#d5c7b2] hover:border-[#927a48]'
                    }`}
                  >
                    <span>{topic.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-70" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results: Potentially Relevant Standards */}
          <div className="lg:col-span-7 space-y-4">
            {/* Header / Notice Box */}
            <div className="p-4 rounded-2xl bg-[#4b4932]/20 dark:bg-[#4b4932]/40 border border-[#d1a24f]/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#d1a24f] flex-shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-[#171713] dark:text-[#f4f2ec]">
                <span className="font-bold text-[#927a48] dark:text-[#d1a24f]">
                  Potentially Relevant Standards Guidance:
                </span>{' '}
                The standards below represent potential reference documents for{' '}
                <span className="font-semibold underline decoration-[#d1a24f]">{selectedToyType}</span> covering{' '}
                <span className="font-semibold underline decoration-[#d1a24f]">{selectedInquiry}</span>. Formal legal applicability depends on official Quality Control Orders (QCOs) and product construction.
              </div>
            </div>

            {/* Matched Standards List */}
            <div className="space-y-3">
              {matchedStandards.length > 0 ? (
                matchedStandards.map((std) => {
                  const isWithdrawn = std.status === 'Withdrawn';
                  return (
                    <div
                      key={std.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isWithdrawn
                          ? 'bg-[#171713]/30 dark:bg-[#171713]/50 border-[#b84a3a]/40'
                          : 'bg-white dark:bg-[#25251d] border-[#d5c7b2]/40 dark:border-[#4b4932] hover:border-[#d1a24f]'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-[#171713] dark:text-[#f4f2ec]">
                            {std.standard_number}
                          </span>
                          {std.revision && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4b4932]/20 text-[#927a48] dark:text-[#d1a24f]">
                              {std.revision}
                            </span>
                          )}
                        </div>

                        {isWithdrawn ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#b84a3a]/15 text-[#b84a3a] border border-[#b84a3a]/30">
                            <ShieldAlert className="w-3 h-3" />
                            WITHDRAWN
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#927a48]/20 text-[#927a48] dark:text-[#d1a24f] border border-[#d1a24f]/30">
                            <CheckCircle2 className="w-3 h-3 text-[#d1a24f]" />
                            CURRENT
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#4b4932] dark:text-[#d5c7b2] leading-relaxed mb-3">
                        {std.title}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-[#d5c7b2]/20 text-[11px]">
                        <span className="text-[#6b675b] dark:text-[#d5c7b2]/60">
                          Classification: <strong className="text-[#4b4932] dark:text-[#d5c7b2]">{std.category}</strong>
                        </span>
                        <button
                          onClick={() =>
                            onAskAi(
                              `Explain how ${std.standard_number} applies to a ${selectedToyType} regarding ${selectedInquiry}.`
                            )
                          }
                          className="inline-flex items-center gap-1 font-bold text-[#927a48] dark:text-[#d1a24f] hover:underline"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Ask BIS AI →</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center bg-white dark:bg-[#25251d] rounded-2xl border border-[#d5c7b2]/30">
                  <p className="text-xs text-[#6b675b] dark:text-[#d5c7b2]">
                    No specific standard matches this combination in the current dataset.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
