import React from 'react';
import Link from 'next/link';
import { Shield, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#d5c7b2]/15 bg-[#171713] text-[#d5c7b2] text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#927a48]/30 border border-[#d1a24f]/40 flex items-center justify-center text-[#d1a24f]">
                <Shield className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-black text-lg tracking-tight text-[#f4f2ec]">
                BIS-Setu
              </span>
            </div>

            <p className="text-xs text-[#d5c7b2] leading-relaxed">
              AI-powered assistance for Indian Standards and BIS services. Empowering Indian manufacturers with automated compliance roadmaps and shielding consumers against spurious products.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#d1a24f] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#d1a24f]" />
              <span>Zero-Hallucination Grounded Engine</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-[#f4f2ec] uppercase tracking-wider mb-4">
              Core Modules
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/industry" className="hover:text-[#d1a24f] transition-colors">
                  Standards Discovery
                </Link>
              </li>
              <li>
                <Link href="/industry" className="hover:text-[#d1a24f] transition-colors">
                  Compliance Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/consumer" className="hover:text-[#d1a24f] transition-colors">
                  Verification & Counterfeit Detection
                </Link>
              </li>
              <li>
                <Link href="/labs" className="hover:text-[#d1a24f] transition-colors">
                  Laboratory Directory
                </Link>
              </li>
              <li>
                <Link href="/copilot" className="hover:text-[#d1a24f] transition-colors">
                  AI Assistant (Clause RAG)
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#d1a24f] transition-colors">
                  Certifications Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Statutory Portals */}
          <div>
            <h4 className="text-xs font-bold text-[#f4f2ec] uppercase tracking-wider mb-4">
              Statutory BIS Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://www.services.bis.gov.in/php/BIS_2.0/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#d1a24f] transition-colors"
                >
                  <span>e-BIS Manakonline Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#927a48]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.crsbis.in/BIS/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#d1a24f] transition-colors"
                >
                  <span>CRS Electronic Registration</span>
                  <ExternalLink className="w-3 h-3 text-[#927a48]" />
                </a>
              </li>
              <li>
                <a
                  href="https://consumerhelpline.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#d1a24f] transition-colors"
                >
                  <span>National Consumer Helpline (1915)</span>
                  <ExternalLink className="w-3 h-3 text-[#927a48]" />
                </a>
              </li>
              <li>
                <a
                  href="https://bis.gov.in/index.php/consumer-overview/complaints/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#d1a24f] transition-colors"
                >
                  <span>Report Spurious Standard Marks</span>
                  <ExternalLink className="w-3 h-3 text-[#927a48]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Regulatory Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#f4f2ec] uppercase tracking-wider mb-4">
              Statutory Governance
            </h4>
            <p className="text-xs text-[#d5c7b2] leading-relaxed">
              Standard Mark (ISI logo) is statutory intellectual property of the Bureau of Indian Standards under the BIS Act, 2016. Deceptive usage or imitation carries strict legal penalties under Section 29.
            </p>
            <div className="p-3 rounded-xl bg-[#4b4932]/40 border border-[#d5c7b2]/15 text-[11px] text-[#f4f2ec]">
              <span className="font-bold text-[#d1a24f]">National Compliance Architecture:</span> Aligned with BIS Manakonline digital transformation initiatives.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#d5c7b2]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#d5c7b2]/80 gap-4">
          <p>© 2026 BIS-Setu Initiative. Department of Consumer Affairs, Government of India.</p>
          <div className="flex items-center gap-3">
            <span className="text-[#d1a24f]">Trustworthy</span>
            <span>•</span>
            <span className="text-[#f4f2ec]">Indian Standards Authority</span>
            <span>•</span>
            <span className="text-[#927a48]">Modern AI Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
