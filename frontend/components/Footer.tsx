import React from 'react';
import Link from 'next/link';
import { Shield, ExternalLink, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-slate-950/80 backdrop-blur-md text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Shield className="w-5 h-5 text-amber-500" />
              <span>BIS SETU</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering Indian Industry with automated compliance intelligence and shielding consumers against spurious products through verified Indian Standards (e-BIS).
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero-Hallucination Grounded Engine</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Core Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/industry" className="hover:text-amber-400 transition-colors">
                  Industry Compliance Wizard
                </Link>
              </li>
              <li>
                <Link href="/consumer" className="hover:text-amber-400 transition-colors">
                  Consumer QR & CM-L Verification
                </Link>
              </li>
              <li>
                <Link href="/copilot" className="hover:text-amber-400 transition-colors">
                  Setu AI Copilot (Clause RAG)
                </Link>
              </li>
              <li>
                <Link href="/labs" className="hover:text-amber-400 transition-colors">
                  BIS Recognized Lab Directory
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-400 transition-colors">
                  License Expiry & Renewal Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Portals */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Statutory BIS Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.services.bis.gov.in/php/BIS_2.0/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-amber-400 transition-colors"
                >
                  <span>e-BIS Manakonline Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.crsbis.in/BIS/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-amber-400 transition-colors"
                >
                  <span>CRS Electronic Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://consumerhelpline.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-amber-400 transition-colors"
                >
                  <span>National Consumer Helpline (1915)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://bis.gov.in/index.php/consumer-overview/complaints/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-rose-400 transition-colors"
                >
                  <span>Report Counterfeit / Spurious Marks</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Statutory Legal Notice */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Regulatory Governance
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Standard Mark (ISI logo) is statutory intellectual property of the Bureau of Indian Standards under the BIS Act, 2016. Unlicensed manufacturing or imitation carries strict legal penalties under Section 29.
            </p>
            <div className="mt-3 p-2.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300">
              <span className="font-semibold text-amber-400">Smart India Hackathon Prototype:</span> Designed for scalable nationwide integration with BIS Manakonline APIs.
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 BIS Setu Initiative. Department of Consumer Affairs & Smart India Hackathon.</p>
          <div className="flex items-center gap-4">
            <span>Powered by Gemini & High-Precision Clause RAG</span>
            <span className="text-slate-600">|</span>
            <span>Zero Hallucination Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
