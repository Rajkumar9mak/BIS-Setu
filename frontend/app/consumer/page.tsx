'use client';

import React, { useState } from 'react';
import {
  Search,
  QrCode,
  ShieldAlert,
  HelpCircle,
  Sparkles,
  Camera,
  Upload,
  CheckCircle,
  AlertCircle,
  FileCheck2,
  AlertTriangle,
  Send,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Shield
} from 'lucide-react';
import { verifyProduct, verifyQr, verifyImage, submitGrievance } from '@/lib/api';
import { VerificationResult, GrievanceResult } from '@/lib/types';
import VerificationCard from '@/components/VerificationCard';
import DecorativeShapes from '@/components/DecorativeShapes';

const BUYING_CHECKLISTS = [
  {
    id: 'kettle',
    title: 'Electric Kettles & Appliances',
    standard: 'IS 302 (Part 2/Sec 15)',
    mandate: 'Mandatory ISI under Electrical Appliances QCO',
    checks: [
      { rule: 'ISI Standard Mark & 7-8 Digit CM/L Number', tip: 'Must be permanently engraved or embossed on the rating plate, not a peeling paper sticker.' },
      { rule: 'Rated Voltage & 3-Pin Earthed Plug', tip: 'Must state 230V AC or 220-240V with a BIS-certified 3-pin earthed plug conforming to IS 1293.' },
      { rule: 'Automatic Boil-Dry Cut-off Sensor', tip: 'Ensure the heating element cuts power automatically within 30 seconds when empty to prevent fire.' }
    ]
  },
  {
    id: 'helmet',
    title: 'Two-Wheeler Protective Helmets',
    standard: 'IS 4151:2015',
    mandate: 'Mandatory ISI under Two-Wheeler Helmets QCO (Non-ISI helmets illegal in India)',
    checks: [
      { rule: 'Indelible ISI Monogram on Rear Lower Edge', tip: 'Painted or laminated under protective clearcoat. Removable hologram stickers alone are invalid.' },
      { rule: 'Clear CM/L Licence Code Below ISI Mark', tip: 'Format CM/L-XXXXXXX linking to the specific factory shell moulding facility.' },
      { rule: 'Visor Optical Clarity & Retention Strap', tip: 'Visor must be marked with IS 4151 scratch-resistant optical grade and buckle must withstand 3kN pull test.' }
    ]
  },
  {
    id: 'water',
    title: 'Packaged Drinking Water',
    standard: 'IS 14543:2024',
    mandate: 'Mandatory ISI Certification under Food Safety & BIS Statutory Orders',
    checks: [
      { rule: 'Square ISI Mark Box on Bottle Neck or Label', tip: 'Must display IS 14543 above and active CM/L licence number below the emblem.' },
      { rule: 'Batch Number, Date of Packaging & Best Before', tip: 'Never purchase bottles without distinct lot/batch coding and tamper-evident cap ring.' },
      { rule: 'Factory Address & RO/Ozonation Details', tip: 'Must state the exact processing plant address matching the BIS national register.' }
    ]
  },
  {
    id: 'fan',
    title: 'Electric Ceiling & Table Fans',
    standard: 'IS 374:2019',
    mandate: 'Mandatory ISI Mark & BEE Star Energy Labelling under Ceiling Fans QCO',
    checks: [
      { rule: 'Dual Labelling: ISI Mark + BEE Star Rating', tip: 'Must carry both the BIS ISI mark with CM/L code and BEE Star label with service value >= 4.0.' },
      { rule: 'Minimum Air Delivery Guarantee', tip: 'For standard 1200 mm sweep, minimum air delivery must be at least 210 m³/min.' },
      { rule: 'High-Voltage Insulation Withstand', tip: 'Tested for 1500 V dielectric strength to protect against motor leakage and shock.' }
    ]
  },
  {
    id: 'cement',
    title: 'Portland Pozzolana Cement (PPC)',
    standard: 'IS 1489 (Part 1):2015',
    mandate: 'Mandatory ISI under Cement (Quality Control) Order, 2024',
    checks: [
      { rule: 'ISI Mark on Every 50kg Bag', tip: 'Must be clearly screen-printed on the HDPE/paper bag with week and year of manufacture.' },
      { rule: 'Fly Ash Percentage Declaration', tip: 'Must explicitly state the percentage of fly ash addition (between 15% and 35%).' },
      { rule: '28-Day Strength Guarantee', tip: 'Mandated minimum compressive strength of 33 MPa (N/mm²) for structural durability.' }
    ]
  }
];

export default function ConsumerPage() {
  const [activeVerifyTab, setActiveVerifyTab] = useState<'cml' | 'qr' | 'image'>('cml');
  const [query, setQuery] = useState<string>('');
  const [qrInput, setQrInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [activeChecklist, setActiveChecklist] = useState<string>('kettle');

  // Grievance Modal State
  const [showGrievanceModal, setShowGrievanceModal] = useState<boolean>(false);
  const [grievanceLoading, setGrievanceLoading] = useState<boolean>(false);
  const [grievanceResult, setGrievanceResult] = useState<GrievanceResult | null>(null);
  const [grievanceForm, setGrievanceForm] = useState({
    complaint_type: 'COUNTERFEIT_ISI_MARK',
    product_name: '',
    brand_name: '',
    cml_number: '',
    store_name: '',
    city: '',
    state: '',
    description: ''
  });

  const handleSearch = async (codeToSearch?: string) => {
    const target = (codeToSearch ?? query).trim();
    if (!target) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await verifyProduct(target);
      if (!res) {
        setErrorMessage('Verification service is unreachable. Please make sure the backend is active on port 8001.');
      } else {
        setResult(res);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error executing product verification');
    } finally {
      setLoading(false);
    }
  };

  const handleQrVerify = async (textToVerify?: string) => {
    const target = (textToVerify ?? qrInput).trim();
    if (!target) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await verifyQr(target);
      if (!res) {
        setErrorMessage('QR verification service is unreachable.');
      } else {
        setResult(res);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error executing QR verification');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await verifyImage(file);
      if (!res) {
        setErrorMessage('Image verification service is unreachable.');
      } else {
        setResult(res);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error analyzing product label image');
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = (code: string) => {
    setQuery(code);
    setActiveVerifyTab('cml');
    handleSearch(code);
  };

  const handleOpenGrievance = (prefillCml?: string, prefillBrand?: string) => {
    setGrievanceForm((prev) => ({
      ...prev,
      cml_number: prefillCml || result?.normalized_number || '',
      brand_name: prefillBrand || result?.record?.brand_name || '',
      product_name: result?.record?.product_name || 'Consumer Product'
    }));
    setGrievanceResult(null);
    setShowGrievanceModal(true);
  };

  const handleSubmitGrievance = async (e: React.FormEvent) => {
    e.preventDefault();
    setGrievanceLoading(true);
    try {
      const res = await submitGrievance(grievanceForm);
      if (res) {
        setGrievanceResult(res);
      } else {
        alert('Failed to submit grievance. Please try again.');
      }
    } catch (err: any) {
      alert('Error submitting grievance: ' + (err?.message || 'Server error'));
    } finally {
      setGrievanceLoading(false);
    }
  };

  const currentChecklistData = BUYING_CHECKLISTS.find((c) => c.id === activeChecklist) || BUYING_CHECKLISTS[0];

  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <DecorativeShapes variant="tubular" className="-top-12 -left-20 opacity-50" />

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4b4932]/50 border border-[#d1a24f]/30 text-[#d1a24f] text-xs font-semibold">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>National Verification Registry • Direct e-BIS Sync</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#f4f2ec] tracking-tight">
          Consumer Authenticity & Safety
        </h1>
        <p className="text-sm text-[#d5c7b2] leading-relaxed">
          Verify whether the ISI mark or CM/L licence printed on your product is genuine, inspect pre-purchase checklists, or report suspicious counterfeit marks directly to BIS enforcement.
        </p>
      </div>

      {/* Multimodal Verification Section */}
      <div className="rounded-[30px] glass-charcoal p-6 sm:p-8 border border-[#d1a24f]/30 space-y-6 shadow-2xl backdrop-blur-2xl">
        {/* Verification Mode Selector */}
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#d5c7b2]/15 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveVerifyTab('cml')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeVerifyTab === 'cml'
                  ? 'bg-[#d1a24f] text-[#171713] shadow-md shadow-[#d1a24f]/20'
                  : 'text-[#d5c7b2] hover:text-[#f4f2ec] hover:bg-[#4b4932]/40'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>CM/L Number Search</span>
            </button>

            <button
              onClick={() => setActiveVerifyTab('qr')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeVerifyTab === 'qr'
                  ? 'bg-[#d1a24f] text-[#171713] shadow-md shadow-[#d1a24f]/20'
                  : 'text-[#d5c7b2] hover:text-[#f4f2ec] hover:bg-[#4b4932]/40'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Code Verification</span>
            </button>

            <button
              onClick={() => setActiveVerifyTab('image')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeVerifyTab === 'image'
                  ? 'bg-[#d1a24f] text-[#171713] shadow-md shadow-[#d1a24f]/20'
                  : 'text-[#d5c7b2] hover:text-[#f4f2ec] hover:bg-[#4b4932]/40'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Product Label OCR</span>
            </button>
          </div>

          <button
            onClick={() => handleOpenGrievance()}
            className="px-3.5 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Report Counterfeit</span>
          </button>
        </div>

        {/* Tab 1: CM/L Number Input */}
        {activeVerifyTab === 'cml' && (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#d5c7b2]/60" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter 7 or 8-digit CM/L Number (e.g. 8400192, 7123901, or 8219011)"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#171713]/90 border border-[#d5c7b2]/20 focus:border-[#d1a24f] focus:ring-2 focus:ring-[#d1a24f]/20 text-[#f4f2ec] placeholder:text-[#d5c7b2]/40 text-sm font-medium outline-none transition-all font-mono"
              />
            </div>

            <button
              onClick={() => handleSearch()}
              disabled={loading || !query.trim()}
              className="px-8 py-4 rounded-2xl font-bold text-sm bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] shadow-lg shadow-[#d1a24f]/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
            >
              <Search className="w-4 h-4 text-[#171713]" />
              <span>{loading ? 'Verifying...' : 'Verify CM/L'}</span>
            </button>
          </div>
        )}

        {/* Tab 2: QR Code Payload Input */}
        {activeVerifyTab === 'qr' && (
          <div className="space-y-3">
            <p className="text-xs text-[#d5c7b2]">
              Paste the scanned URL or raw text from the product QR code (e.g. from Manakonline or product packaging):
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={qrInput}
                onChange={(e) => setQrInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQrVerify()}
                placeholder="e.g. https://www.manakonline.in/verify?cml=8400192 or CM/L-8219011"
                className="flex-1 px-4 py-3.5 rounded-xl bg-[#171713]/90 border border-[#d5c7b2]/20 focus:border-[#d1a24f] text-[#f4f2ec] placeholder:text-[#d5c7b2]/40 text-xs font-mono outline-none"
              />
              <button
                onClick={() => handleQrVerify()}
                disabled={loading || !qrInput.trim()}
                className="px-6 py-3.5 rounded-xl font-bold text-xs bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] transition-all flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                <span>Verify QR</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Product Label Photo Upload */}
        {activeVerifyTab === 'image' && (
          <div className="p-6 rounded-2xl bg-[#171713]/60 border-2 border-dashed border-[#d5c7b2]/20 text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#927a48]/20 border border-[#d1a24f]/30 flex items-center justify-center mx-auto text-[#d1a24f]">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#f4f2ec]">Upload Photograph of Product Rating Plate or ISI Mark</p>
              <p className="text-xs text-[#d5c7b2] mt-1">
                Supports JPG, PNG, WEBP. The system extracts CM/L registration codes and matches them against the national registry.
              </p>
            </div>
            <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] font-bold text-xs cursor-pointer shadow-md transition-all">
              <Camera className="w-4 h-4" />
              <span>Choose Photo or Take Picture</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        )}

        {/* Demo Scenarios Palette */}
        <div className="space-y-2.5 pt-2 border-t border-[#d5c7b2]/15">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#d5c7b2]/70 block">
            Click to Test Registered & Unregistered Scenarios:
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => handleSampleClick('8400192')}
              className="px-3 py-1.5 rounded-lg bg-[#4b4932]/40 hover:bg-[#4b4932]/70 text-[#d1a24f] border border-[#d1a24f]/30 transition-all text-left"
            >
              ✓ Havells Kettle (8400192)
            </button>
            <button
              onClick={() => handleSampleClick('8219011')}
              className="px-3 py-1.5 rounded-lg bg-[#4b4932]/40 hover:bg-[#4b4932]/70 text-[#d1a24f] border border-[#d1a24f]/30 transition-all text-left"
            >
              ✓ Crompton Fans (8219011)
            </button>
            <button
              onClick={() => handleSampleClick('7123901')}
              className="px-3 py-1.5 rounded-lg bg-[#4b4932]/40 hover:bg-[#4b4932]/70 text-[#d1a24f] border border-[#d1a24f]/30 transition-all text-left"
            >
              ✓ Steelbird Helmet (7123901)
            </button>
            <button
              onClick={() => handleSampleClick('8821945')}
              className="px-3 py-1.5 rounded-lg bg-[#4b4932]/40 hover:bg-[#4b4932]/70 text-[#d1a24f] border border-[#d1a24f]/30 transition-all text-left"
            >
              ⚠ Expiring Licence (8821945)
            </button>
            <button
              onClick={() => handleSampleClick('1234567')}
              className="px-3 py-1.5 rounded-lg bg-[#171713]/80 hover:bg-[#4b4932]/40 text-[#d5c7b2] border border-[#d5c7b2]/20 transition-all text-left"
            >
              ℹ Unregistered Query (1234567)
            </button>
            <button
              onClick={() => handleSampleClick('9999999')}
              className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/40 transition-all text-left font-semibold"
            >
              ✕ Fake Mark (9999999)
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/40 text-center space-y-2 max-w-xl mx-auto">
          <p className="text-xs text-red-300 font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Verification Result Display */}
      {result && (
        <div className="space-y-4">
          <VerificationCard result={result} />
        </div>
      )}

      {/* Consumer Buying Guide & Checklist Section */}
      <div className="rounded-[30px] glass-charcoal p-6 sm:p-8 border border-[#d5c7b2]/20 space-y-6 shadow-2xl">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#d1a24f] text-xs font-bold uppercase tracking-wider">
              <FileCheck2 className="w-4 h-4" />
              <span>Statutory Pre-Purchase Advisory</span>
            </div>
            <h3 className="text-xl font-bold text-[#f4f2ec] mt-1">What to Check Before Buying</h3>
            <p className="text-xs text-[#d5c7b2]">
              Crucial safety features and mandatory markings mandated under Central Government Quality Control Orders.
            </p>
          </div>

          {/* Checklist Product Selector */}
          <div className="flex flex-wrap gap-1.5 bg-[#171713]/60 p-1.5 rounded-xl border border-[#d5c7b2]/15 text-xs">
            {BUYING_CHECKLISTS.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveChecklist(c.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeChecklist === c.id
                    ? 'bg-[#d1a24f] text-[#171713] shadow-sm'
                    : 'text-[#d5c7b2] hover:text-[#f4f2ec]'
                }`}
              >
                {c.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Product Checklist Card */}
        <div className="p-6 rounded-2xl bg-[#4b4932]/25 border border-[#d5c7b2]/15 space-y-4">
          <div className="flex items-start justify-between flex-wrap gap-2 pb-3 border-b border-[#d5c7b2]/15">
            <div>
              <span className="text-xs font-mono font-bold text-[#d1a24f]">{currentChecklistData.standard}</span>
              <h4 className="text-lg font-black text-[#f4f2ec]">{currentChecklistData.title}</h4>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#d1a24f]/20 text-[#d1a24f] border border-[#d1a24f]/30">
              {currentChecklistData.mandate}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentChecklistData.checks.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#171713]/80 border border-[#d5c7b2]/10 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#927a48]/20 text-[#d1a24f] font-bold flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                  <h5 className="font-bold text-[#f4f2ec]">{item.rule}</h5>
                </div>
                <p className="text-[#d5c7b2] text-[11px] leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Anatomy of Genuine ISI Mark Guide */}
      <div className="p-6 sm:p-8 rounded-[30px] glass-charcoal border border-[#d5c7b2]/20 space-y-6 shadow-xl">
        <h3 className="text-base font-bold text-[#f4f2ec] flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#d1a24f]" />
          <span>Anatomy of a Genuine Bureau of Indian Standards Mark</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#d5c7b2]">
          <div className="p-4 rounded-2xl bg-[#4b4932]/25 border border-[#d5c7b2]/10 space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#d1a24f]/20 text-[#d1a24f] font-bold flex items-center justify-center">
              1
            </span>
            <h4 className="font-bold text-[#f4f2ec] text-sm">Standard Number on Top</h4>
            <p className="text-[#d5c7b2] leading-relaxed">
              The exact Indian Standard code (e.g. <strong>IS 302-2-15</strong>, <strong>IS 374</strong>, or <strong>IS 4151</strong>) must be permanently printed directly above the emblem.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#4b4932]/25 border border-[#d5c7b2]/10 space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#927a48]/20 text-[#d1a24f] font-bold flex items-center justify-center">
              2
            </span>
            <h4 className="font-bold text-[#f4f2ec] text-sm">Official ISI Monogram</h4>
            <p className="text-[#d5c7b2] leading-relaxed">
              The classic stepped geometric emblem. Blurred lines, improper ratios, or "IS" without "I" signify non-conforming counterfeit attempts.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#4b4932]/25 border border-[#d5c7b2]/10 space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#d1a24f]/20 text-[#d1a24f] font-bold flex items-center justify-center">
              3
            </span>
            <h4 className="font-bold text-[#f4f2ec] text-sm">7-8 Digit CM/L Licence Code</h4>
            <p className="text-[#d5c7b2] leading-relaxed">
              Every authorized factory holds a unique licence number (e.g. <strong>CM/L-8400192</strong>) below the mark. Without this code, the mark is illegal.
            </p>
          </div>
        </div>
      </div>

      {/* Grievance Submission Modal */}
      {showGrievanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171713]/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg glass-charcoal p-6 sm:p-8 rounded-3xl border border-[#d1a24f]/30 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#d5c7b2]/15">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <h3 className="font-bold text-[#f4f2ec] text-base">Report Non-Compliant Product</h3>
              </div>
              <button
                onClick={() => setShowGrievanceModal(false)}
                className="text-[#d5c7b2] hover:text-[#f4f2ec] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {grievanceResult ? (
              <div className="p-6 rounded-2xl bg-[#4b4932]/40 border border-[#d1a24f]/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#d1a24f]/20 text-[#d1a24f] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d1a24f]">Report Registered</span>
                  <h4 className="text-lg font-black text-[#f4f2ec] mt-1">Grievance Successfully Lodged</h4>
                  <div className="mt-3 p-3 rounded-xl bg-[#171713] font-mono text-sm font-bold text-[#d1a24f] border border-[#d1a24f]/30">
                    {grievanceResult.reference_number}
                  </div>
                </div>
                <p className="text-xs text-[#d5c7b2] leading-relaxed">{grievanceResult.message}</p>
                <button
                  onClick={() => setShowGrievanceModal(false)}
                  className="w-full py-2.5 rounded-xl bg-[#d1a24f] text-[#171713] font-bold text-xs hover:bg-[#d1a24f]/90 transition-all"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitGrievance} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#d5c7b2] font-semibold mb-1">Complaint Type</label>
                  <select
                    value={grievanceForm.complaint_type}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, complaint_type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171713] border border-[#d5c7b2]/20 text-[#f4f2ec] outline-none focus:border-[#d1a24f]"
                  >
                    <option value="COUNTERFEIT_ISI_MARK">Counterfeit / Fake ISI Mark</option>
                    <option value="MISUSE_OF_CML">Misuse of Expired / Suspended CM/L Number</option>
                    <option value="SUBSTANDARD_QUALITY">Substandard / Dangerous Quality</option>
                    <option value="MISSING_MANDATORY_MARK">Missing Mandatory ISI Mark on Regulated Good</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#d5c7b2] font-semibold mb-1">Product Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Electric Kettle"
                      value={grievanceForm.product_name}
                      onChange={(e) => setGrievanceForm({ ...grievanceForm, product_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#171713] border border-[#d5c7b2]/20 text-[#f4f2ec] outline-none focus:border-[#d1a24f]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#d5c7b2] font-semibold mb-1">Brand Name</label>
                    <input
                      type="text"
                      placeholder="e.g. FakePower"
                      value={grievanceForm.brand_name}
                      onChange={(e) => setGrievanceForm({ ...grievanceForm, brand_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#171713] border border-[#d5c7b2]/20 text-[#f4f2ec] outline-none focus:border-[#d1a24f]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#d5c7b2] font-semibold mb-1">CM/L Code on Package</label>
                    <input
                      type="text"
                      placeholder="e.g. 9999999"
                      value={grievanceForm.cml_number}
                      onChange={(e) => setGrievanceForm({ ...grievanceForm, cml_number: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#171713] border border-[#d5c7b2]/20 text-[#f4f2ec] outline-none focus:border-[#d1a24f]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#d5c7b2] font-semibold mb-1">Store / E-Commerce Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Modern Retail Store"
                      value={grievanceForm.store_name}
                      onChange={(e) => setGrievanceForm({ ...grievanceForm, store_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#171713] border border-[#d5c7b2]/20 text-[#f4f2ec] outline-none focus:border-[#d1a24f]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#d5c7b2] font-semibold mb-1">Detailed Description *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe where the product was purchased, why you suspect it is non-compliant, or any defects observed..."
                    value={grievanceForm.description}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171713] border border-[#d5c7b2]/20 text-[#f4f2ec] outline-none focus:border-[#d1a24f]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowGrievanceModal(false)}
                    className="px-4 py-2.5 rounded-xl text-[#d5c7b2] hover:text-[#f4f2ec] border border-[#d5c7b2]/20"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={grievanceLoading}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold flex items-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{grievanceLoading ? 'Submitting...' : 'Register Grievance'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
