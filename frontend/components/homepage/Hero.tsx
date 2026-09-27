'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, BookOpen, Bot } from 'lucide-react';
import ServiceHub from './ServiceHub';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Subtle gold/blue abstract decorative shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] pointer-events-none opacity-30 dark:opacity-40">
        <div className="absolute inset-0 rounded-full border border-[#C49A45]/10 dark:border-[rgba(212,175,98,0.08)]" />
        <div className="absolute inset-20 rounded-full border border-dashed border-[#4F6EF7]/15 dark:border-[rgba(212,175,98,0.12)]" />
        <div className="absolute inset-40 rounded-full bg-gradient-to-tr from-[#C49A45]/5 via-[#4F6EF7]/5 to-transparent dark:from-[#D4AF62]/5 dark:to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy & Trust Indicators */}
          <div className="lg:col-span-6 space-y-7 text-left">
            {/* National Gateway Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#23241C] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.25)] text-xs font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C49A45] dark:bg-[#D4AF62] animate-pulse" />
              <span className="text-[#64748B] dark:text-[#D5D0C4]">Bureau of Indian Standards</span>
              <span className="text-[#94A3B8] dark:text-[#969287]">&bull;</span>
              <span className="text-[#C49A45] dark:text-[#D4AF62] font-bold">Digital Gateway</span>
            </div>

            {/* Editorial Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#111827] dark:text-[#F4F1E8] leading-[1.08]">
              Indian Standards, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C49A45] via-[#D4AF62] to-[#B58936] dark:from-[#D4AF62] dark:via-[#E5C37A] dark:to-[#B9954A]">
                Made Simple.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#475569] dark:text-[#D5D0C4] max-w-xl font-normal leading-relaxed">
              Discover standards, understand BIS compliance, verify products, find laboratories and get source-backed AI assistance.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/standards"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-[#C49A45] hover:bg-[#B58936] text-white shadow-md shadow-[#C49A45]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 dark:bg-gradient-to-r dark:from-[#D4AF62] dark:to-[#C9A55A] dark:hover:from-[#E0BD70] dark:hover:to-[#D4AF62] dark:text-[#171812]"
              >
                <BookOpen className="w-4 h-4 text-white dark:text-[#171812]" />
                <span>Explore Standards</span>
                <ArrowRight className="w-4 h-4 text-white dark:text-[#171812]" />
              </Link>

              <Link
                href="/ai"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-white hover:bg-[#F8FAFC] text-[#1F2937] border border-[#D1D5DB] hover:border-[#C49A45] shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 dark:bg-[#23241C] dark:hover:bg-[#2A2B21] dark:text-[#F4F1E8] dark:border-[rgba(212,175,98,0.30)] dark:hover:border-[#D4AF62]"
              >
                <Bot className="w-4 h-4 text-[#C49A45] dark:text-[#D4AF62]" />
                <span>Ask BIS AI</span>
                <ArrowRight className="w-4 h-4 text-[#C49A45] dark:text-[#D4AF62]" />
              </Link>
            </div>

            {/* Three Trust Indicators */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)] text-xs text-[#475569] dark:text-[#D5D0C4] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C49A45] dark:text-[#D4AF62] shrink-0" />
                <span>Source-backed information</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C49A45] dark:text-[#D4AF62] shrink-0" />
                <span>Official BIS standards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C49A45] dark:text-[#D4AF62] shrink-0" />
                <span>Grounded AI assistance</span>
              </div>
            </div>
          </div>

          {/* Right Column: BIS-Setu Service Hub */}
          <div className="lg:col-span-6">
            <ServiceHub />
          </div>
        </div>
      </div>
    </section>
  );
}
