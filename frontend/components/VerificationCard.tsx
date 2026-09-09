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
          particleCount: 40,
          spread: 55,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [status]);

  // 1. ACTIVE / GENUINE (Uses Olive for success and Gold for important metadata)
  if (status === 'ACTIVE') {
    return (
      <div className="w-full rounded-[26px] bg-[#171713] p-6 sm:p-8 border-2 border-[#927a48] shadow-2xl text-[#f4f2ec] transition-all animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#d5c7b2]/15">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#927a48]/25 border border-[#927a48] text-[#d1a24f]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#927a48]/30 text-[#d1a24f] border border-[#927a48]">
                  ✓ Certificate Found
                </span>
                <span className="text-xs text-[#d5c7b2] font-mono">
                  STATUS: <strong className="text-[#d1a24f]">ACTIVE</strong>
                </span>
              </div>
              <h2 className="text-2xl font-black text-[#f4f2ec] mt-1">
                {record?.brand_name}
              </h2>
              <p className="text-xs sm:text-sm text-[#d5c7b2] font-medium">PRODUCT: {record?.product_name}</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#4b4932]/60 border border-[#927a48]/40 text-[#d1a24f] text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#d1a24f]" />
              <span>Conforms to Indian Standards</span>
            </div>
            <p className="text-xs text-[#d5c7b2] mt-1">
              VALID UNTIL: <span className="text-[#f4f2ec] font-bold">{record?.valid_until}</span>
            </p>
          </div>
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-[#d5c7b2]/15 text-sm">
          <div className="space-y-4">
            <div>
              <span className="text-xs text-[#d5c7b2]/70 uppercase font-semibold tracking-wider flex items-center gap-1.5 mb-1">
                <Building className="w-3.5 h-3.5 text-[#d1a24f]" />
                Licensed Manufacturer
              </span>
              <p className="text-[#f4f2ec] font-semibold text-base">{record?.manufacturer_name}</p>
              <p className="text-xs text-[#d5c7b2] flex items-start gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#927a48] shrink-0 mt-0.5" />
                <span>{record?.factory_address}</span>
              </p>
            </div>

            <div>
              <span className="text-xs text-[#d5c7b2]/70 uppercase font-semibold tracking-wider flex items-center gap-1.5 mb-1">
                <FileBadge className="w-3.5 h-3.5 text-[#d1a24f]" />
                Governing Indian Standard
              </span>
              <p className="text-[#d1a24f] font-mono font-bold">{record?.standard_number}</p>
              <p className="text-xs text-[#d5c7b2]">{record?.standard_title}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs text-[#d5c7b2]/70 uppercase font-semibold tracking-wider flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#d1a24f]" />
                License Validity Range
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-[#4b4932]/30 border border-[#d5c7b2]/10">
                  <span className="text-[#d5c7b2] block text-[11px]">Granted On</span>
                  <span className="text-[#f4f2ec] font-semibold">{record?.issue_date}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#4b4932]/30 border border-[#d5c7b2]/10">
                  <span className="text-[#d5c7b2] block text-[11px]">Valid Until</span>
                  <span className="text-[#d1a24f] font-bold">{record?.valid_until}</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs text-[#d5c7b2]/70 uppercase font-semibold tracking-wider mb-1 block">
                Operative Scope & License Code
              </span>
              <p className="text-xs text-[#d5c7b2] bg-[#4b4932]/25 p-3 rounded-xl border border-[#d5c7b2]/10 leading-relaxed font-mono">
                LICENSE: {record?.cml_formatted || normalized_number} • {record?.operative_scope}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#d5c7b2]">
            <span className="w-2 h-2 rounded-full bg-[#927a48]" />
            <span>Regional Branch Office: <strong className="text-[#f4f2ec]">{record?.regional_office}</strong></span>
          </div>

          {record?.official_bis_url && (
            <a
              href={record.official_bis_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#927a48]/30 hover:bg-[#927a48]/50 text-[#f4f2ec] text-xs font-semibold border border-[#d5c7b2]/20 transition-colors"
            >
              <span>View Official e-BIS Record</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    );
  }

  // 2. EXPIRING SOON (Uses Warm Gold)
  if (status === 'EXPIRING_SOON') {
    return (
      <div className="w-full rounded-[26px] bg-[#171713] p-6 sm:p-8 border-2 border-[#d1a24f] shadow-2xl text-[#f4f2ec] transition-all animate-in fade-in duration-300">
        <div className="flex items-center gap-4 pb-4 border-b border-[#d5c7b2]/15">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#d1a24f]/20 border border-[#d1a24f]/50 text-[#d1a24f]">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#d1a24f]/20 text-[#d1a24f] border border-[#d1a24f]/40">
                ACTION REQUIRED: EXPIRING IN {record?.days_remaining || 28} DAYS
              </span>
              <span className="text-xs text-[#d5c7b2] font-mono">LICENSE: {record?.cml_formatted}</span>
            </div>
            <h2 className="text-xl font-bold text-[#f4f2ec] mt-1">{record?.brand_name}</h2>
            <p className="text-xs text-[#d5c7b2]">PRODUCT: {record?.product_name}</p>
          </div>
        </div>

        <div className="py-4 space-y-2 text-xs text-[#d5c7b2]">
          <p>
            This licence is genuinely registered under <strong className="text-[#d1a24f]">{record?.standard_number}</strong>, but is approaching its validity date on <strong className="text-[#f4f2ec]">{record?.valid_until}</strong>.
          </p>
          <div className="p-3 bg-[#4b4932]/40 border border-[#d1a24f]/30 rounded-xl text-[#f4f2ec]">
            <strong>Advisory:</strong> The manufacturer must submit the annual renewal application and marking fee before expiry to prevent revocation of the ISI marking rights.
          </div>
        </div>
      </div>
    );
  }

  // 3. EXPIRED / SUSPENDED
  if (status === 'EXPIRED' || status === 'SUSPENDED') {
    return (
      <div className="w-full rounded-[26px] bg-[#171713] p-6 sm:p-8 border-2 border-[#927a48] text-[#f4f2ec] shadow-2xl transition-all animate-in fade-in duration-300">
        <div className="flex items-center gap-4 pb-4 border-b border-[#d5c7b2]/15">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#927a48]/20 border border-[#927a48] text-[#d1a24f]">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#4b4932] text-[#d5c7b2] border border-[#d5c7b2]/30">
              {status === 'SUSPENDED' ? 'LICENCE SUSPENDED' : 'LICENCE EXPIRED / LAPSED'}
            </span>
            <h2 className="text-xl font-bold text-[#f4f2ec] mt-1">{record?.brand_name}</h2>
            <p className="text-xs text-[#d5c7b2]">{record?.manufacturer_name}</p>
          </div>
        </div>

        <div className="py-4 space-y-3 text-xs text-[#d5c7b2]">
          <div className="p-3 rounded-xl bg-[#4b4932]/40 border border-[#d5c7b2]/20 text-[#f4f2ec]">
            <strong>Warning:</strong> {record?.operative_scope}
          </div>
          <p className="text-[#d5c7b2]">
            Products manufactured after the expiry/suspension date cannot legally carry the ISI Standard Mark.
          </p>
        </div>
      </div>
    );
  }

  // 4. NOT_FOUND / UNVERIFIED (Neutral informative state, not automatically red)
  if (status === 'NOT_FOUND') {
    return (
      <div className="w-full rounded-[26px] bg-[#171713] p-6 sm:p-8 border-2 border-[#d5c7b2]/30 text-[#f4f2ec] shadow-2xl transition-all animate-in fade-in duration-300">
        <div className="flex items-start gap-4 pb-6 border-b border-[#d5c7b2]/15">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#4b4932]/50 border border-[#d5c7b2]/30 text-[#d1a24f] shrink-0">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-[#4b4932] text-[#d5c7b2] border border-[#d5c7b2]/30">
              STATUS: UNVERIFIED IN LOCAL SNAPSHOT
            </span>
            <h2 className="text-2xl font-black text-[#f4f2ec]">
              Certification Could Not Be Verified
            </h2>
            <p className="text-xs text-[#d5c7b2] font-mono">
              Query Tested: <span className="text-[#d1a24f] font-bold">{normalized_number || result.query}</span>
            </p>
          </div>
        </div>

        <div className="py-6 space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-[#4b4932]/30 border border-[#d5c7b2]/20 text-[#d5c7b2] leading-relaxed">
            <strong className="block text-sm font-bold text-[#f4f2ec] mb-1">
              Verification Notice:
            </strong>
            {advisory ||
              'Certification information could not be verified in the local BIS register. This does not automatically confirm counterfeit status, but warrants cross-verification with the manufacturer or via official e-BIS Manakonline.'}
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#d5c7b2]/15">
          <span className="text-xs text-[#d5c7b2]">
            Verify with official statutory portal:
          </span>
          <a
            href="https://www.manakonline.in"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <span>Check Manakonline</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  // 5. CONFIRMED COUNTERFEIT (Use red strictly for confirmed fraud)
  return (
    <div className="w-full rounded-[26px] bg-[#171713] p-6 sm:p-8 border-2 border-red-500/80 shadow-2xl text-[#f4f2ec] transition-all animate-in fade-in duration-300">
      <div className="flex items-start gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/50 text-red-400 shrink-0">
          <XCircle className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40">
            CRITICAL: CONFIRMED COUNTERFEIT RECORD
          </span>
          <h2 className="text-2xl font-black text-red-400">
            Counterfeit / Fraudulent Mark Detected
          </h2>
          <p className="text-xs text-[#d5c7b2] font-mono">
            Licence Code: <span className="text-red-300 font-bold">{normalized_number || result.query}</span>
          </p>
        </div>
      </div>

      <div className="py-6 space-y-4 text-xs">
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 leading-relaxed">
          <strong className="block text-sm font-bold text-red-300 mb-1">
            Consumer Safety Warning:
          </strong>
          {advisory ||
            'This licence code is confirmed fraudulent or non-existent in official records. Using an uncertified product—especially for electrical appliances, crash helmets, or baby toys—poses severe safety hazards.'}
        </div>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
        <span className="text-xs text-[#d5c7b2]">
          Lodge an immediate enforcement notice with BIS:
        </span>
        <a
          href="https://bis.gov.in/index.php/consumer-overview/complaints/"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg transition-all"
        >
          File Statutory Grievance
        </a>
      </div>
    </div>
  );
}
