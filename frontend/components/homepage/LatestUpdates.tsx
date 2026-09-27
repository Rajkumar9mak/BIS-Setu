'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

interface UpdateItem {
  category: 'New Standards' | 'Revised Standards' | 'Notifications' | 'Announcements';
  title: string;
  date: string;
  standardCode?: string;
  href: string;
}

const updates: UpdateItem[] = [
  {
    category: 'Notifications',
    title: 'Mandatory Quality Control Order (QCO) published for Electric Vehicle DC Fast Charging Infrastructure',
    date: '24 Sep 2026',
    standardCode: 'IS 17017:2024',
    href: '/standards',
  },
  {
    category: 'Revised Standards',
    title: 'Revision 3 adopted: IS 9873 (Part 1) Safety Requirements for Children’s Toys (Mechanical & Physical Properties)',
    date: '18 Sep 2026',
    standardCode: 'IS 9873 (Part 1):2026',
    href: '/standards',
  },
  {
    category: 'New Standards',
    title: 'Formulation and Gazette Notification of AI System Transparency and Robustness Guidelines',
    date: '10 Sep 2026',
    standardCode: 'IS/ISO/IEC 42001',
    href: '/standards',
  },
  {
    category: 'Announcements',
    title: '50% Fee Concession for Micro & Small Enterprises (MSMEs) under Self-Declaration Conformity Assessment Scheme',
    date: '02 Sep 2026',
    href: '/compliance',
  },
];

export default function LatestUpdates() {
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'New Standards':
        return 'text-[#C49A45] bg-[#FFF8E7] border-[#C49A45]/30 dark:text-[#D4AF62] dark:bg-[#D4AF62]/15 dark:border-[#D4AF62]/30';
      case 'Revised Standards':
        return 'text-amber-800 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-950/40 dark:border-amber-500/30';
      case 'Notifications':
        return 'text-blue-700 bg-blue-50 border-blue-200 dark:text-sky-300 dark:bg-sky-950/40 dark:border-sky-500/30';
      case 'Announcements':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-500/30';
      default:
        return 'text-[#C49A45] bg-[#FFF8E7] border-[#C49A45]/30 dark:text-[#D4AF62] dark:bg-[#D4AF62]/15 dark:border-[#D4AF62]/30';
    }
  };

  return (
    <section className="relative py-16 sm:py-24 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)] bg-white/40 dark:bg-[#171812]/50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C49A45] bg-[#FFF8E7] border border-[#C49A45]/30 dark:text-[#D4AF62] dark:bg-[#D4AF62]/10 dark:border-[#D4AF62]/30 px-3 py-1 rounded-full inline-block">
              GAZETTE &amp; REGULATORY NOTICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#111827] dark:text-[#F4F1E8] tracking-tight">
              Latest BIS Updates
            </h2>
            <p className="text-sm text-[#475569] dark:text-[#D5D0C4]">
              Statutory notifications, newly notified standards, and national quality orders.
            </p>
          </div>

          <Link
            href="/standards"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C49A45] dark:text-[#D4AF62] hover:text-[#111827] dark:hover:text-[#F4F1E8] transition-colors"
          >
            <span>View All Gazette Publications</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Clean Portal List Layout (Recent Activity style) */}
        <div className="rounded-3xl bg-white dark:bg-[#1D1E18]/90 border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.20)] overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.06)] dark:shadow-xl divide-y divide-[#E5E7EB] dark:divide-[rgba(212,175,98,0.12)]">
          {updates.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group flex flex-col md:flex-row md:items-center justify-between p-5 sm:p-6 hover:bg-[#F8FAFC] dark:hover:bg-[#23241C] transition-all duration-200 gap-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-1">
                {/* Category Badge */}
                <span
                  className={`inline-block px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full border shrink-0 w-fit ${getCategoryBadgeClass(
                    item.category
                  )}`}
                >
                  {item.category}
                </span>

                {/* Title */}
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-[#111827] dark:text-[#F4F1E8] group-hover:text-[#C49A45] dark:group-hover:text-[#D4AF62] transition-colors">
                    {item.title}
                  </h3>
                  {item.standardCode && (
                    <span className="font-mono text-xs text-[#C49A45] dark:text-[#D4AF62] mt-0.5 inline-block">
                      {item.standardCode}
                    </span>
                  )}
                </div>
              </div>

              {/* Date & Arrow */}
              <div className="flex items-center justify-between sm:justify-end gap-5 text-xs text-[#64748B] dark:text-[#969287] shrink-0">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#94A3B8] dark:text-[#969287]" />
                  <span>{item.date}</span>
                </div>
                <div className="w-7 h-7 rounded-xl bg-[#F1F5F9] dark:bg-[#23241C] group-hover:bg-[#C49A45] dark:group-hover:bg-[#D4AF62] flex items-center justify-center text-[#64748B] dark:text-[#969287] group-hover:text-white dark:group-hover:text-[#171812] transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
