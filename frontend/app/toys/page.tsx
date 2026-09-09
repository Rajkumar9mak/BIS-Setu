'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductComplianceExplorer from '@/components/compliance/ProductComplianceExplorer';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function ToySafetyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F2EC] dark:bg-[#171713] text-[#171713] dark:text-[#f4f2ec] transition-colors">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb / Section context notice */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#d5c7b2]/20">
          <div className="flex items-center gap-2 text-xs text-[#6b675b] dark:text-[#d5c7b2]">
            <Link
              href="/industry"
              className="inline-flex items-center gap-1 hover:text-[#d1a24f] transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Compliance Portal</span>
            </Link>
            <span>/</span>
            <span className="text-[#171713] dark:text-[#f4f2ec] font-bold">
              Regulated Products & Standards
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4b4932]/20 dark:bg-[#4b4932]/60 border border-[#d1a24f]/30 text-xs font-semibold text-[#927a48] dark:text-[#d1a24f]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d1a24f]" />
            <span>Integrated Compliance View</span>
          </div>
        </div>

        {/* Unified Product Compliance Suite */}
        <ProductComplianceExplorer initialProductId="toys" />
      </main>

      <Footer />
    </div>
  );
}
