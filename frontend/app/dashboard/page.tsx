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
import DecorativeShapes from '@/components/DecorativeShapes';

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
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <DecorativeShapes variant="loop" className="-top-12 -right-20 opacity-50" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d5c7b2]/15">
        <div>
          <div className="flex items-center gap-2 text-[#d1a24f] text-xs font-semibold uppercase tracking-wider mb-1">
            <LayoutDashboard className="w-4 h-4" />
            <span>Licence Lifecycle Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#f4f2ec] tracking-tight">
            Manufacturer Certification Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#d5c7b2] mt-1">
            Track active Certification Marks Licences (CM/L), monitor 90/60/30-day renewal deadlines, and submit annual production returns.
          </p>
        </div>

        {data && (
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl glass-charcoal border border-[#d5c7b2]/15 text-right">
              <span className="text-[11px] text-[#d5c7b2]/70 block">Manufacturer</span>
              <span className="text-xs font-bold text-[#f4f2ec]">{data.manufacturer}</span>
            </div>
          </div>
        )}
      </div>

      {/* Alert Summary Cards */}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-[26px] glass-charcoal border border-[#927a48]/40 space-y-1 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d1a24f]">
              Active Licences
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-[#f4f2ec] font-mono">{data.total_active_licences}</span>
              <span className="text-xs text-[#d1a24f] font-medium">100% In Good Standing</span>
            </div>
          </div>

          <div className="p-6 rounded-[26px] glass-charcoal border border-[#d1a24f]/50 space-y-1 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d1a24f]">
              Urgent Renewals Due
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-[#d1a24f] font-mono">{data.urgent_renewals}</span>
              <span className="text-xs text-[#d5c7b2] font-medium">&lt; 30 Days Left</span>
            </div>
          </div>

          <div className="p-6 rounded-[26px] glass-charcoal border border-[#d5c7b2]/20 space-y-1 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d5c7b2]">
              Surveillance Audits
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-[#f4f2ec] font-mono">Up to Date</span>
              <span className="text-xs text-[#d1a24f] font-medium">All Samples Passed</span>
            </div>
          </div>
        </div>
      )}

      {/* Licences List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#f4f2ec] flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#d1a24f]" />
          <span>Registered BIS Licences</span>
        </h2>

        <div className="space-y-4">
          {data?.licences.map((lic) => {
            const isUrgent = lic.alert_level === 'URGENT';
            return (
              <div
                key={lic.id}
                className={`p-6 rounded-[28px] glass-charcoal border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl ${
                  isUrgent
                    ? 'border-[#d1a24f]/60 bg-[#4b4932]/25'
                    : 'border-[#d5c7b2]/15 hover:border-[#d5c7b2]/30'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#d1a24f] bg-[#171713] px-2.5 py-1 rounded-xl border border-[#d5c7b2]/20">
                      CM/L-{lic.cml_number}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isUrgent
                          ? 'bg-[#d1a24f]/20 text-[#d1a24f] border border-[#d1a24f]/40'
                          : 'bg-[#927a48]/20 text-[#d1a24f] border border-[#927a48]/30'
                      }`}
                    >
                      {isUrgent ? 'URGENT RENEWAL REQUIRED' : 'ACTIVE & VALID'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#f4f2ec]">{lic.product_name}</h3>
                  <p className="text-xs text-[#d5c7b2]">
                    Standard: <strong className="text-[#d1a24f] font-mono">{lic.standard_number}</strong> | Brand: <strong>{lic.brand_name}</strong>
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-[#d5c7b2]/80 pt-1">
                    <span>Issued: {lic.issue_date}</span>
                    <span>Valid Till: <strong className="text-[#f4f2ec]">{lic.expiry_date}</strong></span>
                    <span>Last Surveillance: {lic.last_audit_date}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="text-left md:text-right">
                    <span className="text-xs text-[#d5c7b2] block">Validity Countdown</span>
                    <span
                      className={`text-2xl font-black font-mono ${
                        isUrgent ? 'text-[#d1a24f]' : 'text-[#f4f2ec]'
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
                        ? 'bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] shadow-[#d1a24f]/20'
                        : 'bg-[#4b4932]/60 hover:bg-[#4b4932]/90 text-[#f4f2ec] border border-[#d5c7b2]/20'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171713]/85 backdrop-blur-md">
          <div className="w-full max-w-lg glass-charcoal p-6 sm:p-8 rounded-3xl border border-[#d1a24f]/30 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#d5c7b2]/15">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#d1a24f]" />
                <h3 className="font-bold text-[#f4f2ec] text-base">
                  Licence Renewal Application
                </h3>
              </div>
              <button
                onClick={() => setSelectedLicence(null)}
                className="text-[#d5c7b2] hover:text-[#f4f2ec] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {renewalSuccess ? (
              <div className="p-6 rounded-2xl bg-[#4b4932]/40 border border-[#d1a24f]/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#d1a24f]/20 text-[#d1a24f] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-[#f4f2ec] text-base">Application Submitted!</h4>
                  <p className="text-xs text-[#d5c7b2] font-mono mt-1">
                    Ref: {renewalSuccess.application_reference}
                  </p>
                </div>
                <p className="text-xs text-[#d5c7b2] leading-relaxed">
                  {renewalSuccess.message}
                </p>
                <div className="text-left text-xs text-[#d5c7b2] pt-2 space-y-1">
                  <strong>Next Actions:</strong>
                  {renewalSuccess.next_steps.map((s: string, i: number) => (
                    <p key={i} className="text-[#f4f2ec]">• {s}</p>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedLicence(null)}
                  className="w-full py-3 rounded-xl bg-[#d1a24f] text-[#171713] font-bold text-xs mt-2"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-[#171713] border border-[#d5c7b2]/15 space-y-1">
                  <span className="text-[#d5c7b2]/70 block">Licence to Renew</span>
                  <p className="text-[#f4f2ec] font-bold text-sm">
                    {selectedLicence.product_name} (CM/L-{selectedLicence.cml_number})
                  </p>
                  <p className="text-[#d1a24f] font-mono">{selectedLicence.standard_number}</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-[#d5c7b2] font-medium">
                    Declared Annual Production Volume (Units Produced in last 12 Months):
                  </label>
                  <input
                    type="number"
                    value={productionVolume}
                    onChange={(e) => setProductionVolume(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-[#171713] border border-[#d5c7b2]/20 text-[#f4f2ec] font-mono text-sm outline-none focus:border-[#d1a24f]"
                  />
                  <span className="text-[11px] text-[#d5c7b2]/70">
                    Statutory minimum annual marking fee: ₹{selectedLicence.minimum_marking_fee.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#4b4932]/40 border border-[#d1a24f]/30 text-[#f4f2ec] leading-relaxed">
                  <strong>Declaration under Form-VI:</strong> I hereby declare that all units manufactured under this licence strictly conformed to the Scheme of Inspection and Testing (SIT) and the product standard.
                </div>

                <button
                  onClick={handleRenew}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#d1a24f] hover:bg-[#d1a24f]/90 text-[#171713] shadow-lg shadow-[#d1a24f]/25 transition-all"
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
