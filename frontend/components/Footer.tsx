'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.18)] bg-white dark:bg-[#171812] text-[#475569] dark:text-[#D5D0C4] text-sm mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand & Subtitle */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#FFF8E7] dark:bg-[#23241C] border border-[#C49A45]/30 dark:border-[#D4AF62]/40 flex items-center justify-center text-[#C49A45] dark:text-[#D4AF62] group-hover:border-[#C49A45] dark:group-hover:border-[#D4AF62] transition-colors">
                <Shield className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-black text-lg tracking-tight text-[#111827] dark:text-[#F4F1E8]">
                BIS-Setu
              </span>
            </Link>

            <p className="text-xs text-[#64748B] dark:text-[#969287] leading-relaxed">
              &ldquo;Indian Standards, Simplified.&rdquo; A digital gateway transforming regulatory intelligence, certification workflows, and consumer mark verification for Indian Standards.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#C49A45] dark:text-[#D4AF62] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A45] dark:text-[#D4AF62]" />
              <span>Grounded AI &amp; Statutory Authority Verification</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-[#111827] dark:text-[#F4F1E8] uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#64748B] dark:text-[#969287]">
              <li>
                <Link href="/" className="hover:text-[#C49A45] dark:hover:text-[#D4AF62] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/standards" className="hover:text-[#C49A45] dark:hover:text-[#D4AF62] transition-colors">
                  Standards
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="hover:text-[#C49A45] dark:hover:text-[#D4AF62] transition-colors">
                  Compliance
                </Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-[#C49A45] dark:hover:text-[#D4AF62] transition-colors">
                  Verify Product
                </Link>
              </li>
              <li>
                <Link href="/labs" className="hover:text-[#C49A45] dark:hover:text-[#D4AF62] transition-colors">
                  Labs
                </Link>
              </li>
              <li>
                <Link href="/ai" className="hover:text-[#C49A45] dark:hover:text-[#D4AF62] transition-colors">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="text-xs font-bold text-[#111827] dark:text-[#F4F1E8] uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-[#64748B] dark:text-[#969287]">
              <li>
                <a
                  href="https://bis.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#C49A45] dark:hover:text-[#D4AF62] transition-colors"
                >
                  <span>BIS Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#C49A45] dark:text-[#D4AF62]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.services.bis.gov.in/php/BIS_2.0/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#C49A45] dark:hover:text-[#D4AF62] transition-colors"
                >
                  <span>e-BIS Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#C49A45] dark:text-[#D4AF62]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.manakonline.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#C49A45] dark:hover:text-[#D4AF62] transition-colors"
                >
                  <span>Manakonline</span>
                  <ExternalLink className="w-3 h-3 text-[#C49A45] dark:text-[#D4AF62]" />
                </a>
              </li>
              <li>
                <a
                  href="https://standardsbis.bsbedge.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#C49A45] dark:hover:text-[#D4AF62] transition-colors"
                >
                  <span>Standards Resources &amp; Sales</span>
                  <ExternalLink className="w-3 h-3 text-[#C49A45] dark:text-[#D4AF62]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Notice */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#111827] dark:text-[#F4F1E8] uppercase tracking-wider mb-4">
              Legal &amp; Governance
            </h4>
            <ul className="space-y-2.5 text-xs text-[#64748B] dark:text-[#969287]">
              <li>
                <Link href="#privacy" className="hover:text-[#C49A45] dark:hover:text-[#D4AF62] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#terms" className="hover:text-[#C49A45] dark:hover:text-[#D4AF62] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#disclaimer" className="hover:text-[#C49A45] dark:hover:text-[#D4AF62] transition-colors">
                  Statutory Disclaimer
                </Link>
              </li>
            </ul>
            <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#23241C] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.18)] text-[11px] text-[#64748B] dark:text-[#969287] mt-3">
              <span className="font-bold text-[#C49A45] dark:text-[#D4AF62]">BIS Act 2016 Notice:</span> Standard Marks (ISI, CRS) are statutory intellectual property. Unauthorized replication or falsification is punishable by law.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.18)] flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] dark:text-[#969287] gap-4">
          <p>© 2026 BIS-Setu. Bureau of Indian Standards &bull; Digital Gateway.</p>
          <div className="flex items-center gap-3">
            <span className="text-[#C49A45] dark:text-[#D4AF62]">Government-Tech Intelligence</span>
            <span>&bull;</span>
            <span className="text-[#111827] dark:text-[#F4F1E8]">Source Grounded</span>
            <span>&bull;</span>
            <span className="text-[#C49A45] dark:text-[#D4AF62]">Official Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
