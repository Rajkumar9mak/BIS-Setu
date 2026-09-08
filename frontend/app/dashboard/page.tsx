'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Building,
  RefreshCw,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { fetchDashboardData, initiateRenewal } from '@/lib/api';
import { DashboardData, ManufacturerLicence } from '@/lib/types';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLicence, setSelectedLicence] = useState<ManufacturerLicence | null>(null);
  const [productionVolume, setProductionVolume] = useState<number>(15000);
  const [renewalSuccess, setRenewalSuccess] = useState<any | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetchDashboardData();
      setData(res);
      setLoading(false);
    }
    load();
  }, []);

  const handleRenew = async () => {
    if (!selectedLicence) return;
    const res = await initiateRenewal(selectedLicence.cml_number, productionVolume);
    setRenewalSuccess(res);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <LayoutDashboard className="w-4 h-4" />
            <span>Licence Lifecycle Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Manufacturer Certification Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Track active Certification Marks Licences (CM/L), monitor 90/60/30-day renewal deadlines, and submit annual production returns.
          </p>
        </div>

        {data && (
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl glass-panel border border-white/10 text-right">
              <span className="text-[11px] text-slate-400 block">Manufacturer</span>
              <span className="text-xs font-bold text-white">{data.manufacturer}</span>
            </div>
          </div>
        )}
      </div>

      {/* Alert Summary Cards */}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30 glow-emerald space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Active Licences
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-white">{data.total_active_licences}</span>
              <span className="text-xs text-emerald-300 font-medium">100% In Good Standing</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-amber-500/40 glow-saffron space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Urgent Renewals Due
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-amber-300">{data.urgent_renewals}</span>
              <span className="text-xs text-amber-200 font-medium">&lt; 30 Days Left</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-blue-500/30 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Surveillance Audits
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-white">Up to Date</span>
              <span className="text-xs text-blue-300 font-medium">All Samples Passed</span>
            </div>
          </div>
        </div>
      )}

      {/* Licences List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          <span>Registered BIS Licences</span>
        </h2>

        <div className="space-y-4">
          {data?.licences.map((lic) => {
            const isUrgent = lic.alert_level === 'URGENT';
            return (
              <div
                key={lic.id}
                className={`p-6 rounded-3xl glass-panel border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  isUrgent
                    ? 'border-amber-500/50 glow-saffron bg-amber-500/5'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-300 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                      CM/L-{lic.cml_number}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isUrgent
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {isUrgent ? 'URGENT RENEWAL REQUIRED' : 'ACTIVE & VALID'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{lic.product_name}</h3>
                  <p className="text-xs text-slate-300">
                    Standard: <strong className="text-amber-300 font-mono">{lic.standard_number}</strong> | Brand: <strong>{lic.brand_name}</strong>
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
                    <span>Issued: {lic.issue_date}</span>
                    <span>Valid Till: <strong className="text-white">{lic.expiry_date}</strong></span>
                    <span>Last Surveillance: {lic.last_audit_date}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="text-left md:text-right">
                    <span className="text-xs text-slate-400 block">Validity Countdown</span>
                    <span
                      className={`text-2xl font-black ${
                        isUrgent ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {lic.days_remaining} Days
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedLicence(lic);
                      setRenewalSuccess(null);
                    }}
                    className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
                      isUrgent
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25'
                        : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                    }`}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Initiate Renewal</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Renewal Modal */}
      {selectedLicence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">
                  Licence Renewal Application
                </h3>
              </div>
              <button
                onClick={() => setSelectedLicence(null)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {renewalSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Application Submitted!</h4>
                  <p className="text-xs text-slate-300 font-mono mt-1">
                    Ref: {renewalSuccess.application_reference}
                  </p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {renewalSuccess.message}
                </p>
                <div className="text-left text-xs text-slate-400 pt-2 space-y-1">
                  <strong>Next Actions:</strong>
                  {renewalSuccess.next_steps.map((s: string, i: number) => (
                    <p key={i} className="text-slate-300">• {s}</p>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedLicence(null)}
                  className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs mt-2"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-slate-400 block">Licence to Renew</span>
                  <p className="text-white font-bold text-sm">
                    {selectedLicence.product_name} (CM/L-{selectedLicence.cml_number})
                  </p>
                  <p className="text-amber-300 font-mono">{selectedLicence.standard_number}</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-slate-300 font-medium">
                    Declared Annual Production Volume (Units Produced in last 12 Months):
                  </label>
                  <input
                    type="number"
                    value={productionVolume}
                    onChange={(e) => setProductionVolume(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-sm outline-none focus:border-amber-400"
                  />
                  <span className="text-[11px] text-slate-400">
                    Statutory minimum annual marking fee: ₹{selectedLicence.minimum_marking_fee.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 leading-relaxed">
                  <strong>Declaration under Form-VI:</strong> I hereby declare that all units manufactured under this licence strictly conformed to the Scheme of Inspection and Testing (SIT) and the product standard.
                </div>

                <button
                  onClick={handleRenew}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 transition-all"
                >
                  Submit Form-VI Renewal to BIS
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
