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
  AlertCircle
} from 'lucide-react';
import { verifyProduct } from '@/lib/api';
import { VerificationResult } from '@/lib/types';
import VerificationCard from '@/components/VerificationCard';

export default function ConsumerPage() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  const handleSearch = async (codeToSearch?: string) => {
    const target = (codeToSearch ?? query).trim();
    if (!target) return;
    setLoading(true);
    const res = await verifyProduct(target);
    setResult(res);
    setLoading(false);
  };

  const handleSampleClick = (code: string) => {
    setQuery(code);
    handleSearch(code);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>National Verification Database • Direct e-BIS Sync</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Verify Product Authenticity
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Verify whether the ISI mark or CM/L licence number printed on your product is genuinely registered with the Bureau of Indian Standards or a counterfeit imitation.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter 7 or 8-digit CM/L Number (e.g. 8400192, 7123901, or R-41028392)"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900/80 border border-white/15 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 text-white placeholder:text-slate-500 text-sm font-medium outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSearch()}
              disabled={loading || !query.trim()}
              className="flex-1 sm:flex-none px-6 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'Verifying...' : 'Verify Now'}</span>
            </button>

            <button
              onClick={() => setShowQrModal(true)}
              className="px-4 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors flex items-center gap-2 text-xs font-semibold"
              title="Scan QR Code or Upload Image"
            >
              <QrCode className="w-5 h-5 text-amber-400" />
              <span className="hidden md:inline">Scan QR</span>
            </button>
          </div>
        </div>

        {/* Demo Quick Test Chips */}
        <div className="space-y-2.5 pt-2 border-t border-white/10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Try Demo Verification Scenarios:
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => handleSampleClick('8400192')}
              className="px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 transition-all text-left"
            >
              ✓ Havells Kettle (8400192)
            </button>

            <button
              onClick={() => handleSampleClick('7123901')}
              className="px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 transition-all text-left"
            >
              ✓ Steelbird Helmet (7123901)
            </button>

            <button
              onClick={() => handleSampleClick('6320148')}
              className="px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 transition-all text-left"
            >
              ✓ Bisleri Water (6320148)
            </button>

            <button
              onClick={() => handleSampleClick('8821945')}
              className="px-3 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-500/30 transition-all text-left"
            >
              ⚠ Vega Helmet (Expiring in 28d)
            </button>

            <button
              onClick={() => handleSampleClick('3341098')}
              className="px-3 py-1.5 rounded-lg bg-orange-950/40 hover:bg-orange-900/60 text-orange-300 border border-orange-500/30 transition-all text-left"
            >
              ⚠ Suspended Licence (3341098)
            </button>

            <button
              onClick={() => handleSampleClick('9999999')}
              className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 transition-all text-left font-semibold"
            >
              ✕ Counterfeit Fake Mark (9999999)
            </button>
          </div>
        </div>
      </div>

      {/* Verification Results View */}
      {result && (
        <div className="space-y-4">
          <VerificationCard result={result} />
        </div>
      )}

      {/* Consumer Educational Guide: Anatomical Breakdown of Genuine ISI Mark */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <span>How to Identify a Genuine BIS ISI Mark</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center">
              1
            </span>
            <h4 className="font-bold text-white text-sm">Standard Number on Top</h4>
            <p className="text-slate-400 leading-relaxed">
              The exact Indian Standard code (e.g. <strong>IS 302 (Part 2/Sec 15)</strong> or <strong>IS 4151</strong>) must be indelibly printed right above the ISI monogram.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">
              2
            </span>
            <h4 className="font-bold text-white text-sm">Official ISI Monogram</h4>
            <p className="text-slate-400 leading-relaxed">
              The classic stepped ISI emblem. It must have sharp, unblurred geometric lines and proportional aspect ratio.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center">
              3
            </span>
            <h4 className="font-bold text-white text-sm">Unique 7-8 Digit CM/L Code</h4>
            <p className="text-slate-400 leading-relaxed">
              Every licensed factory receives a distinct Certification Marks Licence number (e.g. <strong>CM/L-8400192</strong>) beneath the mark. If absent, it is illegal.
            </p>
          </div>
        </div>
      </div>

      {/* QR Scanner Simulation Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl border border-white/20 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Scan Product QR / Barcode</h3>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border-2 border-dashed border-white/20 text-center space-y-4">
              <div className="mx-auto w-24 h-24 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <QrCode className="w-12 h-12 animate-pulse" />
              </div>
              <p className="text-xs text-slate-300">
                Point your smartphone camera at the QR code on the packaging or rating plate.
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setShowQrModal(false);
                    handleSampleClick('8400192');
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
                >
                  Simulate Camera Scan (Havells QR)
                </button>
                <button
                  onClick={() => {
                    setShowQrModal(false);
                    handleSampleClick('9999999');
                  }}
                  className="w-full py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all"
                >
                  Simulate Camera Scan (Counterfeit QR)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
