'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle, ShieldCheck, Bot, FlaskConical, FileText, ArrowRight } from 'lucide-react';

interface FeatureCardData {
  icon: React.ElementType;
  category: string;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  lightBg: string;
  lightText: string;
  lightBorder: string;
}

const featureCards: FeatureCardData[] = [
  {
    icon: BookOpen,
    category: 'DISCOVERY',
    title: 'Explore Standards',
    description: 'Search, discover and understand Indian Standards across 21,000+ national publications.',
    buttonText: 'Explore Standards →',
    href: '/standards',
    lightBg: 'bg-[#FFF8E7]',
    lightText: 'text-[#C49A45]',
    lightBorder: 'border-[#C49A45]/30',
  },
  {
    icon: CheckCircle,
    category: 'CERTIFICATION',
    title: 'Compliance Checker',
    description: 'Identify applicable standards and evaluate product requirements with interactive roadmaps.',
    buttonText: 'Check Compliance →',
    href: '/compliance',
    lightBg: 'bg-[#ECFDF5]',
    lightText: 'text-[#22A06B]',
    lightBorder: 'border-emerald-200',
  },
  {
    icon: ShieldCheck,
    category: 'INTEGRITY',
    title: 'Product Verification',
    description: 'Verify BIS certification, license and product information instantly to prevent counterfeit sales.',
    buttonText: 'Verify Product →',
    href: '/verify',
    lightBg: 'bg-[#EEF2FF]',
    lightText: 'text-[#4F6EF7]',
    lightBorder: 'border-indigo-200',
  },
  {
    icon: Bot,
    category: 'INTELLIGENCE',
    title: 'BIS AI',
    description: 'Ask questions and receive answers grounded in official BIS documents without hallucinations.',
    buttonText: 'Ask BIS AI →',
    href: '/ai',
    lightBg: 'bg-[#F5F3FF]',
    lightText: 'text-[#7C3AED]',
    lightBorder: 'border-purple-200',
  },
  {
    icon: FlaskConical,
    category: 'TESTING & AUDIT',
    title: 'Laboratories',
    description: 'Find relevant BIS-recognized testing laboratories across Indian states with verified test scopes.',
    buttonText: 'Find Labs →',
    href: '/labs',
    lightBg: 'bg-[#FFF7ED]',
    lightText: 'text-[#D99020]',
    lightBorder: 'border-amber-200',
  },
  {
    icon: FileText,
    category: 'REGULATORY SPECS',
    title: 'Standards Documents',
    description: 'Explore and understand standards documentation, QCO notification mandates and gazette orders.',
    buttonText: 'Browse Documents →',
    href: '/standards',
    lightBg: 'bg-[#F1F5F9]',
    lightText: 'text-[#64748B]',
    lightBorder: 'border-slate-200',
  },
];

export default function FeatureGrid() {
  return (
    <section className="relative py-16 sm:py-24 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)] bg-white/40 dark:bg-[#171812]/50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C49A45] bg-[#FFF8E7] border border-[#C49A45]/30 dark:text-[#D4AF62] dark:bg-[#D4AF62]/10 dark:border-[#D4AF62]/30 px-3 py-1 rounded-full inline-block">
            COMPREHENSIVE CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] dark:text-[#F4F1E8] tracking-tight">
            Everything you need from BIS-Setu
          </h2>
          <p className="text-base text-[#475569] dark:text-[#D5D0C4] leading-relaxed">
            One platform for standards discovery, compliance, verification and trusted BIS intelligence.
          </p>
        </div>

        {/* 2x3 Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-7 rounded-3xl bg-white dark:bg-[#1D1E18]/85 border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.18)] hover:border-[#C49A45] dark:hover:border-[#D4AF62]/60 shadow-[0_2px_8px_rgba(15,23,42,0.06)] dark:shadow-none hover:shadow-[0_8px_24px_rgba(196,154,69,0.12)] dark:hover:shadow-[0_12px_40px_-10px_rgba(212,175,98,0.15)] transition-all duration-200 hover:-translate-y-1 backdrop-blur-md"
              >
                {/* Top content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-200 ${card.lightBg} ${card.lightText} ${card.lightBorder} dark:bg-[#23241C] dark:text-[#D4AF62] dark:border-[rgba(212,175,98,0.25)] dark:group-hover:border-[#D4AF62]`}
                    >
                      <Icon className="w-6 h-6 stroke-[1.9]" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C49A45] bg-[#FFF8E7] border border-[#C49A45]/30 dark:text-[#D4AF62] dark:bg-[#D4AF62]/15 px-2.5 py-1 rounded-full dark:border-[#D4AF62]/30">
                      {card.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#111827] dark:text-[#F4F1E8] group-hover:text-[#C49A45] dark:group-hover:text-[#D4AF62] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#64748B] dark:text-[#969287] mt-2 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Bottom link button */}
                <div className="pt-6 mt-4 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.12)] flex items-center justify-between">
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C49A45] dark:text-[#D4AF62] group-hover:text-[#111827] dark:group-hover:text-[#F4F1E8] transition-colors"
                  >
                    <span>{card.buttonText}</span>
                  </Link>
                  <div className="w-7 h-7 rounded-xl bg-[#F1F5F9] dark:bg-[#23241C] group-hover:bg-[#C49A45] dark:group-hover:bg-[#D4AF62] flex items-center justify-center text-[#64748B] dark:text-[#969287] group-hover:text-white dark:group-hover:text-[#171812] transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
