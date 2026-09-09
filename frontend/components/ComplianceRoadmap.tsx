import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import DecorativeShapes from './DecorativeShapes';

export default function ComplianceRoadmap() {
  const steps = [
    {
      num: '01',
      title: 'Product Identification',
      description: 'Define technical specs, intended use, and Harmonized Tariff (HSN) categorization.'
    },
    {
      num: '02',
      title: 'Applicable Standard',
      description: 'Map to primary Indian Standard code and verify mandatory Quality Control Orders (QCO).'
    },
    {
      num: '03',
      title: 'BIS Scheme Selection',
      description: 'Select ISI Mark (Scheme-I), Compulsory Registration Scheme (CRS), or Foreign Scheme (FMCS).'
    },
    {
      num: '04',
      title: 'Testing Requirements',
      description: 'Review Scheme of Inspection and Testing (SIT) and required in-house test equipment.'
    },
    {
      num: '05',
      title: 'Laboratory Verification',
      description: 'Select NABL accredited and BIS recognized laboratory for official type-testing.'
    },
    {
      num: '06',
      title: 'Documentation Preparation',
      description: 'Prepare factory layout, Form-V declaration, manufacturing machinery records, and test plans.'
    },
    {
      num: '07',
      title: 'Certification & CM/L',
      description: 'BIS factory inspection, sample verification, and statutory grant of CM/L licence number.'
    }
  ];

  return (
    <section id="compliance-roadmap" className="relative py-20 bg-[#4b4932] text-[#f4f2ec] rounded-[36px] my-12 overflow-hidden shadow-2xl">
      {/* Decorative 3D elements */}
      <DecorativeShapes variant="tubular" className="-top-12 -left-20 opacity-50" />
      <DecorativeShapes variant="loop" className="-bottom-16 -right-16 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171713]/40 border border-[#d1a24f]/30 text-[#d1a24f] text-xs font-bold uppercase tracking-wider">
            <span>End-to-End Regulatory Pathway</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#f4f2ec] tracking-tight">
            From product idea to compliance.
          </h2>
          <p className="text-sm sm:text-base text-[#d5c7b2] leading-relaxed">
            Navigate the complete Bureau of Indian Standards certification lifecycle through a transparent 7-step connected roadmap.
          </p>
        </div>

        {/* Connected 7-Step Roadmap: Ivory cards with Gold connection lines */}
        <div className="relative">
          {/* Desktop Horizontal Gold Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-[#d1a24f]/20 via-[#d1a24f] to-[#d1a24f]/20 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="rounded-[24px] bg-[#f4f2ec] text-[#171713] p-5 border-2 border-[#d1a24f]/40 hover:border-[#d1a24f] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-3 shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-xs px-2 py-0.5 rounded-lg bg-[#4b4932] text-[#d1a24f]">
                      {step.num}
                    </span>
                    {idx < steps.length - 1 && (
                      <span className="text-[#927a48] lg:hidden">
                        ↓
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-sm text-[#171713] leading-snug">
                    {step.title}
                  </h3>
                </div>

                <p className="text-[11px] text-[#4b4932] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center pt-4">
          <Link
            href="/industry"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] shadow-lg shadow-[#171713]/30 hover:-translate-y-0.5 transition-all"
          >
            <span>Start Compliance Assessment</span>
            <ArrowRight className="w-4 h-4 text-[#171713]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
