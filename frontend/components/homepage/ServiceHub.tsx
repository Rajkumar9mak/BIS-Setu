'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle, ShieldCheck, Bot, FlaskConical, FileText, ArrowRight } from 'lucide-react';

interface ServiceItem {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  badge?: string;
  lightBg: string;
  lightText: string;
  lightBorder: string;
}

const services: ServiceItem[] = [
  {
    icon: BookOpen,
    title: 'Explore Standards',
    description: 'Search and understand Indian Standards',
    href: '/standards',
    lightBg: 'bg-[#FFF8E7]',
    lightText: 'text-[#C49A45]',
    lightBorder: 'border-[#C49A45]/30',
  },
  {
    icon: CheckCircle,
    title: 'Compliance Checker',
    description: 'Check product requirements & QCO status',
    href: '/compliance',
    lightBg: 'bg-[#ECFDF5]',
    lightText: 'text-[#22A06B]',
    lightBorder: 'border-emerald-200',
  },
  {
    icon: ShieldCheck,
    title: 'Verify Product',
    description: 'Verify BIS certification & CM/L mark',
    href: '/verify',
    lightBg: 'bg-[#EEF2FF]',
    lightText: 'text-[#4F6EF7]',
    lightBorder: 'border-indigo-200',
  },
  {
    icon: Bot,
    title: 'BIS AI',
    description: 'Ask grounded regulatory questions',
    href: '/ai',
    badge: 'LIVE RAG',
    lightBg: 'bg-[#F5F3FF]',
    lightText: 'text-[#7C3AED]',
    lightBorder: 'border-purple-200',
  },
  {
    icon: FlaskConical,
    title: 'Find Laboratories',
    description: 'Discover BIS-recognized labs',
    href: '/labs',
    lightBg: 'bg-[#FFF7ED]',
    lightText: 'text-[#D99020]',
    lightBorder: 'border-amber-200',
  },
  {
    icon: FileText,
    title: 'Documents',
    description: 'Explore standards documentation',
    href: '/standards',
    lightBg: 'bg-[#F1F5F9]',
    lightText: 'text-[#64748B]',
    lightBorder: 'border-slate-200',
  },
];

export default function ServiceHub() {
  return (
    <div className="relative rounded-3xl bg-white dark:bg-[#1D1E18]/90 border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.22)] shadow-[0_2px_12px_rgba(15,23,42,0.06)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl p-6 sm:p-7 transition-colors duration-200">
      {/* Ambient background glow inside card */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C49A45]/5 dark:bg-[#D4AF62]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative flex items-center justify-between pb-5 border-b border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)]">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C49A45] dark:text-[#D4AF62]">
            BIS-SETU
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#111827] dark:text-[#F4F1E8] tracking-tight">
            DIGITAL SERVICE HUB
          </h3>
        </div>
        <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#C49A45] bg-[#FFF8E7] border border-[#C49A45]/30 rounded-full dark:text-[#D4AF62] dark:bg-[#D4AF62]/15 dark:border-[#D4AF62]/35">
          6 SERVICES
        </span>
      </div>

      {/* 6 Compact Feature Rows */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5">
        {services.map((svc, idx) => {
          const Icon = svc.icon;
          return (
            <Link
              key={idx}
              href={svc.href}
              className="group relative flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#23241C]/80 hover:bg-white dark:hover:bg-[#2A2B21] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.14)] hover:border-[#C49A45] dark:hover:border-[#D4AF62]/50 hover:shadow-[0_4px_16px_rgba(196,154,69,0.12)] dark:hover:shadow-[0_8px_25px_-5px_rgba(212,175,98,0.15)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-200 ${svc.lightBg} ${svc.lightText} ${svc.lightBorder} dark:bg-[#171812] dark:text-[#D4AF62] dark:border-[rgba(212,175,98,0.20)] dark:group-hover:border-[#D4AF62]`}
                >
                  <Icon className="w-5 h-5 stroke-[1.9]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-[#111827] dark:text-[#F4F1E8] group-hover:text-[#C49A45] dark:group-hover:text-[#D4AF62] transition-colors">
                      {svc.title}
                    </span>
                    {svc.badge && (
                      <span className="text-[8px] font-black uppercase tracking-wider text-[#C49A45] bg-[#FFF8E7] dark:text-[#D4AF62] dark:bg-[#D4AF62]/20 px-1.5 py-0.2 rounded-full border border-[#C49A45]/30 dark:border-[#D4AF62]/30">
                        {svc.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#64748B] dark:text-[#969287] line-clamp-1">
                    {svc.description}
                  </p>
                </div>
              </div>

              <div className="w-6 h-6 rounded-lg bg-[#E2E8F0]/60 dark:bg-[#171812]/60 group-hover:bg-[#C49A45] dark:group-hover:bg-[#D4AF62] flex items-center justify-center text-[#64748B] dark:text-[#969287] group-hover:text-white dark:group-hover:text-[#171812] transition-colors ml-2 shrink-0">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
