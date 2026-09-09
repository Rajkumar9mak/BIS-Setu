import React from 'react';
import { ArrowDown, ShieldCheck, CheckCircle2, BookOpen, Layers, Search, Cpu, FileText } from 'lucide-react';
import DecorativeShapes from './DecorativeShapes';

export default function TraceabilitySection() {
  const steps = [
    { label: 'USER QUESTION', desc: 'Natural language query', icon: Search },
    { label: 'AI RETRIEVAL', desc: 'Dense + sparse semantic search', icon: Cpu },
    { label: 'BIS KNOWLEDGE SOURCE', desc: 'Official e-BIS gazettes & PDFs', icon: Layers },
    { label: 'STANDARD', desc: 'IS 302 (Part 2/Sec 15):2009', icon: BookOpen, highlight: true },
    { label: 'CLAUSE', desc: 'Clause 13.2 (Electric Strength)', icon: FileText, highlight: true },
    { label: 'PAGE', desc: 'Page 9, Section 4', icon: FileText, highlight: true },
    { label: 'ANSWER', desc: 'Evidence-grounded response', icon: CheckCircle2 }
  ];

  return (
    <section className="relative py-24 bg-[#171713] text-[#f4f2ec] overflow-hidden border-y border-[#d5c7b2]/10">
      {/* 3D Decorative Shape in Background */}
      <DecorativeShapes variant="loop" className="top-1/4 -right-16 opacity-50" />
      <DecorativeShapes variant="connected" className="-bottom-10 -left-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4b4932]/50 border border-[#d1a24f]/40 text-[#d1a24f] text-xs font-bold uppercase tracking-wider shadow-inner">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero-Hallucination Regulatory Grounding</span>
          </div>
          <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-[#f4f2ec]">
            Every answer should be traceable.
          </h2>
          <p className="text-base sm:text-lg text-[#d5c7b2] font-normal leading-relaxed">
            In statutory compliance, an unverified assertion is a liability. BIS-Setu anchors every AI statement to the exact Indian Standard, clause, and page number.
          </p>
        </div>

        {/* Visual Flow Pipeline */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop Horizontal Connected Sequence */}
          <div className="hidden lg:grid grid-cols-7 gap-2 items-center relative">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center text-center space-y-2 relative">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                        s.highlight
                          ? 'bg-[#d1a24f] text-[#171713] shadow-lg shadow-[#d1a24f]/25 ring-4 ring-[#d1a24f]/20 font-bold'
                          : 'bg-[#4b4932]/60 border border-[#d5c7b2]/20 text-[#f4f2ec]'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#f4f2ec] block">
                        {s.label}
                      </span>
                      <span className="text-[10px] text-[#d5c7b2]/70 block leading-tight font-mono">
                        {s.desc}
                      </span>
                    </div>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="flex items-center justify-center text-[#d1a24f]/70 font-bold text-lg -mt-6">
                      →
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Mobile Vertical Flow */}
          <div className="lg:hidden flex flex-col items-center space-y-3">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <React.Fragment key={idx}>
                  <div
                    className={`w-full max-w-sm p-4 rounded-2xl flex items-center gap-3 border ${
                      s.highlight
                        ? 'bg-[#4b4932]/70 border-[#d1a24f] shadow-lg'
                        : 'bg-[#171713] border-[#d5c7b2]/20'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        s.highlight
                          ? 'bg-[#d1a24f] text-[#171713] font-bold'
                          : 'bg-[#4b4932]/40 text-[#f4f2ec]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-[#f4f2ec] block">
                        {s.label}
                      </span>
                      <span className="text-[11px] text-[#d5c7b2] block font-mono">
                        {s.desc}
                      </span>
                    </div>
                  </div>

                  {idx < steps.length - 1 && (
                    <ArrowDown className="w-4 h-4 text-[#d1a24f]" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Feature Citation Card Hero Display */}
        <div className="max-w-2xl mx-auto rounded-[28px] glass-olive p-7 border-2 border-[#d1a24f]/50 shadow-2xl text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#d1a24f] text-[#171713] flex items-center gap-1.5 shadow-md">
              <ShieldCheck className="w-4 h-4" />
              SOURCE-BACKED
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-[#f4f2ec] font-mono">
              IS 302 (Part 2/Sec 15):2009
            </h3>
            <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-mono text-[#d1a24f] pt-1">
              <span>Clause 13.2</span>
              <span>•</span>
              <span>Page 9</span>
              <span>•</span>
              <span>Gazette Order 2024</span>
            </div>
          </div>

          <p className="text-xs text-[#f4f2ec]/90 max-w-lg mx-auto italic leading-relaxed pt-2">
            &ldquo;Every claim generated by BIS-Setu provides an immediate hyperlink to the exact Gazette clause, eradicating LLM hallucination in regulatory environments.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
