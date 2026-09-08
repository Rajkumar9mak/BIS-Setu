'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Clock,
  ExternalLink,
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
  FileBadge
} from 'lucide-react';
import { VerificationResult } from '@/lib/types';

interface Props {
  result: VerificationResult;
}

export default function VerificationCard({ result }: Props) {
  const { is_found, status, record, advisory, normalized_number } = result;

  useEffect(() => {
    if (status === 'ACTIVE') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [status]);

  if (status === 'ACTIVE') {
    return (
      <div className="w-full glass-panel rounded-2xl p-6 sm:p-8 border-2 border-emerald-500/40 glow-emerald transition-all animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-400">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  GENUINE & ACTIVE
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {record?.cml_formatted}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                {record?.brand_name}
              </h2>
              <p className="text-sm text-slate-300 font-medium">{record?.product_name}</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Conforms to Indian Standards</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Valid Until: <span className="text-white font-semibold">{record?.valid_until}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-white/10 text-sm">
          <div className="space-y-4">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider flex items-center gap-1.5 mb-1">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                Licensed Manufacturer
              </span>
              <p className="text-white font-semibold text-base">{record?.manufacturer_name}</p>
              <p className="text-xs text-slate-300 flex items-start gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{record?.factory_address}</span>
              </p>
            </div>

            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider flex items-center gap-1.5 mb-1">
                <FileBadge className="w-3.5 h-3.5 text-blue-400" />
                Governing Indian Standard
              </span>
              <p className="text-amber-300 font-mono font-bold">{record?.standard_number}</p>
              <p className="text-xs text-slate-300">{record?.standard_title}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                Licence Validity Range
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-slate-400 block">Granted On</span>
                  <span className="text-white font-medium">{record?.issue_date}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-slate-400 block">Valid Till</span>
                  <span className="text-emerald-400 font-semibold">{record?.valid_until}</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1 block">
                Operative Scope & Specifications
              </span>
              <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-white/5 leading-relaxed">
                {record?.operative_scope}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Regional Branch Office: <strong className="text-slate-200">{record?.regional_office}</strong></span>
          </div>

          {record?.official_bis_url && (
            <a
              href={record.official_bis_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <span>View Official e-BIS Record</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    );
  }

  if (status === 'EXPIRING_SOON') {
    return (
      <div className="w-full glass-panel rounded-2xl p-6 sm:p-8 border-2 border-amber-500/50 glow-saffron transition-all animate-in fade-in duration-300">
        <div className="flex items-center gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                ACTION REQUIRED: EXPIRING IN {record?.days_remaining || 28} DAYS
              </span>
              <span className="text-xs text-slate-400 font-mono">{record?.cml_formatted}</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">{record?.brand_name}</h2>
            <p className="text-xs text-slate-300">{record?.manufacturer_name}</p>
          </div>
        </div>

        <div className="py-4 space-y-2 text-xs text-slate-300">
          <p>
            This licence is genuinely registered under <strong className="text-amber-300">{record?.standard_number}</strong>, but is approaching its validity date on <strong className="text-white">{record?.valid_until}</strong>.
          </p>
          <p className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-200">
            <strong>Advisory:</strong> The manufacturer must submit the renewal application and annual marking fee before expiry to prevent revocation of the ISI marking rights.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'EXPIRED' || status === 'SUSPENDED') {
    return (
      <div className="w-full glass-panel rounded-2xl p-6 sm:p-8 border-2 border-orange-500/50 transition-all animate-in fade-in duration-300">
        <div className="flex items-center gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-500/40 text-orange-400">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40">
              {status === 'SUSPENDED' ? 'LICENCE SUSPENDED' : 'LICENCE EXPIRED / LAPSED'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">{record?.brand_name}</h2>
            <p className="text-xs text-slate-400">{record?.manufacturer_name}</p>
          </div>
        </div>

        <div className="py-4 space-y-3 text-xs text-slate-300">
          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-200">
            <strong>Warning:</strong> {record?.operative_scope}
          </div>
          <p className="text-slate-400">
            Products manufactured after the expiry/suspension date cannot legally carry the ISI Standard Mark.
          </p>
        </div>
      </div>
    );
  }

  // COUNTERFEIT / UNREGISTERED
  return (
    <div className="w-full glass-panel rounded-2xl p-6 sm:p-8 border-2 border-rose-500/60 shadow-[0_0_35px_rgba(244,63,94,0.25)] transition-all animate-in fade-in duration-300">
      <div className="flex items-start gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/50 text-rose-400 shrink-0">
          <XCircle className="w-9 h-9" />
        </div>
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
            CRITICAL WARNING: COUNTERFEIT / UNREGISTERED MARK
          </span>
          <h2 className="text-2xl font-black text-rose-400">
            Licence Not Found in National Register
          </h2>
          <p className="text-xs text-slate-300 font-mono">
            Query Tested: <span className="text-rose-200 font-bold">{normalized_number || result.query}</span>
          </p>
        </div>
      </div>

      <div className="py-6 space-y-4 text-xs">
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 leading-relaxed">
          <strong className="block text-sm font-bold text-rose-300 mb-1">
            Consumer Safety Notice:
          </strong>
          {advisory ||
            'This product has NOT been certified by the Bureau of Indian Standards. Using an uncertified product—especially for electrical appliances, crash helmets, or baby toys—poses severe safety hazards.'}
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
          <h4 className="font-semibold text-slate-200">Legal Consequence under Section 29 of BIS Act:</h4>
          <p className="text-slate-400 leading-relaxed">
            Deceptive use of the Standard Mark is a cognizable criminal offense punishable by up to 2 years imprisonment and heavy statutory fines.
          </p>
        </div>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
        <span className="text-xs text-slate-400">
          Suspicious product? Help protect fellow citizens:
        </span>
        <div className="flex items-center gap-3">
          <a
            href="https://bis.gov.in/index.php/consumer-overview/complaints/"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all active:scale-95"
          >
            File Grievance on BIS Portal
          </a>
          <a
            href="tel:1915"
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 transition-colors"
          >
            Call Helpline 1915
          </a>
        </div>
      </div>
    </div>
  );
}
