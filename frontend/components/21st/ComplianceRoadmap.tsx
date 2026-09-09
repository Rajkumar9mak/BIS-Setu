'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface StepItem {
  num: string;
  title: string;
  description: string;
}

export interface ComplianceRoadmapProps {
  headline?: string;
  subheadline?: string;
  steps?: StepItem[];
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

const DEFAULT_STEPS: StepItem[] = [
  { num: '01', title: 'Product Identification', description: 'Define technical specs and HSN categorization.' },
  { num: '02', title: 'Applicable Standard', description: 'Map governing IS code and mandatory QCO gazettes.' },
  { num: '03', title: 'BIS Scheme', description: 'Select Scheme-I (ISI Mark), CRS, or FMCS.' },
  { num: '04', title: 'Testing Scope', description: 'Review Scheme of Inspection and Testing (SIT).' },
  { num: '05', title: 'Laboratory', description: 'Select NABL accredited and BIS recognized lab.' },
  { num: '06', title: 'Documentation', description: 'Prepare factory layout, Form-V, and calibration logs.' },
  { num: '07', title: 'Certification', description: 'BIS factory inspection and grant of CM/L licence.' }
];

export function ComplianceRoadmap({
  headline = 'From product idea to compliance.',
  subheadline = 'Navigate the complete Bureau of Indian Standards certification lifecycle through a transparent 7-step connected roadmap.',
  steps = DEFAULT_STEPS,
  ctaText = 'Start Compliance Assessment',
  onCtaClick,
  className = ''
}: ComplianceRoadmapProps) {
  return (
    <div className={`rounded-[36px] bg-[#4b4932] text-[#f4f2ec] p-8 sm:p-12 shadow-2xl relative overflow-hidden ${className}`}>
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171713]/50 border border-[#d1a24f]/30 text-[#d1a24f] text-xs font-bold uppercase tracking-wider">
          <span>Regulatory Pathway</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#f4f2ec] tracking-tight">{headline}</h2>
        <p className="text-xs sm:text-sm text-[#d5c7b2] leading-relaxed">{subheadline}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 relative z-10">
        {steps.map((step) => (
          <div
            key={step.num}
            className="rounded-[22px] bg-[#f4f2ec] text-[#171713] p-5 border-2 border-[#d1a24f]/40 hover:border-[#d1a24f] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-3 shadow-md"
          >
            <div className="space-y-1.5">
              <span className="font-mono font-black text-xs px-2 py-0.5 rounded-md bg-[#4b4932] text-[#d1a24f] inline-block">
                {step.num}
              </span>
              <h3 className="font-extrabold text-xs text-[#171713] leading-snug">{step.title}</h3>
            </div>
            <p className="text-[11px] text-[#4b4932] leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center pt-8">
        <button
          onClick={onCtaClick}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] shadow-lg transition-all"
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-4 h-4 text-[#171713]" />
        </button>
      </div>
    </div>
  );
}

// 21st.dev Demo export
export default function ComplianceRoadmapDemo() {
  return (
    <div className="min-h-[480px] w-full p-4 sm:p-8 bg-[#171713] flex items-center justify-center">
      <ComplianceRoadmap />
    </div>
  );
}
