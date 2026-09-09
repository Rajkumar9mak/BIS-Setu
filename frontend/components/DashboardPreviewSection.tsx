import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShieldCheck,
  Clock,
  FileText,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export default function DashboardPreviewSection() {
  const projects = [
    { name: 'Electric Kettle Line-A', standard: 'IS 302-2-15', status: 'In Testing', progress: 75 },
    { name: 'Ceiling Fan EcoSeries', standard: 'IS 374:2019', status: 'Audit Ready', progress: 90 },
    { name: 'Industrial Helmet M-4', standard: 'IS 4151:2015', status: 'Form-V Review', progress: 40 }
  ];

  return (
    <section className="relative py-20 bg-[#171713] text-[#f4f2ec] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#d5c7b2]/15 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4b4932]/50 border border-[#d1a24f]/30 text-[#d1a24f] text-xs font-semibold uppercase tracking-wider mb-2">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Manufacturer Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#f4f2ec] tracking-tight">
              Compliance Dashboard
            </h2>
            <p className="text-sm sm:text-base text-[#d5c7b2] mt-1 max-w-xl">
              Real-time monitoring of certification projects, surveillance audits, laboratory testing turnaround, and renewal deadlines.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] transition-all shadow-md shrink-0 self-start md:self-auto"
          >
            <span>Open Full Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Compliance Score */}
          <div className="rounded-[28px] glass-charcoal border border-[#d1a24f]/30 p-7 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d5c7b2]">
                Enterprise Compliance Score
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#d1a24f]"></span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black text-[#d1a24f] font-mono tracking-tight">
                94%
              </span>
              <span className="text-xs font-semibold text-[#f4f2ec] bg-[#4b4932]/50 px-2.5 py-1 rounded-lg border border-[#d5c7b2]/20">
                Grade A • Audit Ready
              </span>
            </div>

            <p className="text-xs text-[#d5c7b2] leading-relaxed">
              Factory testing protocols, SIT calibration records, and Quality Control Order compliance validated with zero non-conformances.
            </p>

            {/* Minimal Progress Arc / Bar */}
            <div className="w-full bg-[#4b4932]/60 h-2.5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#927a48] to-[#d1a24f] rounded-full" style={{ width: '94%' }} />
            </div>
          </div>

          {/* Card 2: Certification Status & Active Licences */}
          <div className="rounded-[28px] glass-charcoal border border-[#d5c7b2]/20 p-7 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d5c7b2]">
                Certification Status
              </span>
              <ShieldCheck className="w-4 h-4 text-[#927a48]" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-[#4b4932]/30 border border-[#d5c7b2]/10">
                <span className="text-2xl font-black text-[#f4f2ec] font-mono">3</span>
                <span className="text-[11px] text-[#d5c7b2] block mt-0.5">Active Licences</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#4b4932]/30 border border-[#d5c7b2]/10">
                <span className="text-2xl font-black text-[#d1a24f] font-mono">1</span>
                <span className="text-[11px] text-[#d5c7b2] block mt-0.5">Renewal Due (28d)</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex justify-between text-[#d5c7b2]">
                <span>Last BIS Surveillance:</span>
                <span className="font-mono text-[#f4f2ec] font-bold">14 Jan 2026</span>
              </div>
              <div className="flex justify-between text-[#d5c7b2]">
                <span>Required Documents:</span>
                <span className="font-mono text-[#d1a24f] font-bold">100% Filed</span>
              </div>
            </div>
          </div>

          {/* Card 3: Active Compliance Projects & Testing Progress */}
          <div className="rounded-[28px] glass-charcoal border border-[#d5c7b2]/20 p-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d5c7b2]">
                Active Projects & Milestones
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#927a48]/30 text-[#d1a24f]">
                3 In Pipeline
              </span>
            </div>

            <div className="space-y-3">
              {projects.map((proj, idx) => (
                <div key={idx} className="space-y-1.5 p-2.5 rounded-xl bg-[#4b4932]/20 border border-[#d5c7b2]/10">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-[#f4f2ec]">{proj.name}</span>
                    <span className="font-mono text-[#d1a24f] font-bold">{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-[#171713] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#d1a24f] rounded-full"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
