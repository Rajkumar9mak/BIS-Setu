'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, QrCode, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { verifyProduct } from '@/lib/api';
import { VerificationResult } from '@/lib/types';
import VerificationCard from './VerificationCard';

export default function ConsumerVerificationSection() {
  const [cmlInput, setCmlInput] = useState<string>('8400192');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<VerificationResult | null>({
    query: '8400192',
    normalized_number: '8400192',
    is_found: true,
    status: 'ACTIVE',
    verification_badge: 'GENUINE_ACTIVE',
    record: {
      cml_number: '8400192',
      cml_formatted: 'CM/L-8400192',
      status: 'ACTIVE',
      verification_badge: 'GENUINE_ACTIVE',
      brand_name: 'Havells India Limited',
      product_name: 'Electric Kettle (1.5L SS Cordless)',
      standard_number: 'IS 302 (Part 2/Sec 15):2009',
      standard_title: 'Safety of Household and Similar Electrical Appliances — Kettles',
      manufacturer_name: 'Havells India Ltd, Plant-IV',
      factory_address: 'Plot No. 2 & 3, Sector 12, Industrial Estate, Haridwar, Uttarakhand - 249403',
      issue_date: '2021-04-15',
      valid_until: '2027-04-14',
      operative_scope: 'Electric Kettles, 230V AC, 1500W, stainless steel concealed element with boil-dry protector.',
      regional_office: 'Northern Regional Office (NRO), Dehradun Branch',
      scheme: 'Scheme-I (ISI Mark)',
      official_bis_url: 'https://www.services.bis.gov.in/php/BIS_2.0/'
    },
    advisory: 'Genuine BIS licence. The manufacturer holds active certification conforming to IS 302.'
  });

  const handleVerify = async (codeToTest?: string) => {
    const q = (codeToTest ?? cmlInput).trim();
    if (!q) return;
    setLoading(true);
    try {
      const res = await verifyProduct(q);
      if (res) {
        setResult(res);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const sampleCodes = [
    { code: '8400192', label: 'Havells Kettle (Active)', type: 'active' },
    { code: '7123901', label: 'Steelbird Helmet (Active)', type: 'active' },
    { code: '8821945', label: 'Ceiling Fan (Expiring)', type: 'expiring' },
    { code: '9999999', label: 'Fake Stamp (Counterfeit)', type: 'fake' }
  ];

  return (
    <section id="consumer-verification" className="relative py-20 bg-[#f4f2ec] text-[#171713] rounded-[36px] my-12 overflow-hidden shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d5c7b2]/50 border border-[#927a48]/30 text-[#4b4932] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#927a48]" />
            <span>Product Authentication Registry</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#171713] tracking-tight">
            Verify before you trust.
          </h2>
          <p className="text-sm sm:text-base text-[#4b4932] leading-relaxed">
            Verify whether the ISI Mark or CM/L licence number on your electrical appliance, crash helmet, or packaged water is authentic before making a purchase.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#927a48]" />
              <input
                type="text"
                value={cmlInput}
                onChange={(e) => setCmlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                placeholder="Enter CM/L number or scan product (e.g. 8400192, 7123901, or 9999999)"
                className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white border-2 border-[#927a48]/30 focus:border-[#927a48] focus:ring-4 focus:ring-[#927a48]/15 text-[#171713] placeholder:text-[#4b4932]/50 text-sm font-semibold outline-none transition-all shadow-md font-mono"
              />
            </div>

            <button
              onClick={() => handleVerify()}
              disabled={loading}
              className="px-8 py-4 rounded-2xl font-bold text-sm bg-[#927a48] hover:bg-[#4b4932] text-[#f4f2ec] shadow-lg shadow-[#927a48]/25 transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2 shrink-0"
            >
              <Search className="w-4 h-4 text-[#d1a24f]" />
              <span>{loading ? 'Verifying Registry...' : 'Verify Product'}</span>
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4b4932] mr-1">
              Quick Test Codes:
            </span>
            {sampleCodes.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCmlInput(s.code);
                  handleVerify(s.code);
                }}
                className={`px-3 py-1.5 rounded-xl border font-mono text-xs transition-all ${
                  s.type === 'fake'
                    ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                    : 'bg-white text-[#4b4932] border-[#d5c7b2] hover:border-[#927a48]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Verification Result Card */}
        {result && (
          <div className="max-w-4xl mx-auto pt-4">
            <VerificationCard result={result} />
          </div>
        )}
      </div>
    </section>
  );
}
