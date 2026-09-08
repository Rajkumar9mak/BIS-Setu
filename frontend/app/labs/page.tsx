'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Search,
  Filter,
  Phone,
  Mail,
  Clock,
  Award,
  ExternalLink,
  Building,
  CheckCircle2
} from 'lucide-react';
import { Laboratory } from '@/lib/types';
import { fetchLaboratories } from '@/lib/api';

export default function LabsPage() {
  const [labs, setLabs] = useState<Laboratory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStandard, setSelectedStandard] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  useEffect(() => {
    async function loadLabs() {
      setLoading(true);
      const data = await fetchLaboratories(selectedStandard || undefined);
      setLabs(data);
      setLoading(false);
    }
    loadLabs();
  }, [selectedStandard]);

  const filteredLabs = labs.filter((lab) => {
    const matchesSearch =
      lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = !selectedRegion || lab.region.toLowerCase() === selectedRegion.toLowerCase();
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>NABL Accredited & BIS Recognized Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          BIS Recognized Testing Laboratories
        </h1>
        <p className="text-sm text-slate-300">
          Locate accredited laboratories across India authorized to conduct type-testing and factory surveillance sample tests for ISI certification.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by lab name, city, or state..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-white/15 focus:border-amber-400 text-white placeholder:text-slate-500 text-xs font-medium outline-none"
            />
          </div>

          <div>
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/15 focus:border-amber-400 text-white text-xs font-medium outline-none"
            >
              <option value="">All Indian Standards</option>
              <option value="IS 302">IS 302 (Electric Kettles & Appliances)</option>
              <option value="IS 4151">IS 4151 (Protective Helmets)</option>
              <option value="IS 9873">IS 9873 (Child Safety Toys)</option>
              <option value="IS 14543">IS 14543 (Packaged Drinking Water)</option>
              <option value="IS 13252">IS 13252 (Electronics & IT Equipment)</option>
            </select>
          </div>

          <div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/15 focus:border-amber-400 text-white text-xs font-medium outline-none"
            >
              <option value="">All Geographic Regions</option>
              <option value="Northern">Northern Region</option>
              <option value="Western">Western Region</option>
              <option value="Southern">Southern Region</option>
              <option value="Eastern">Eastern Region</option>
            </select>
          </div>
        </div>
      </div>

      {/* Laboratories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabs.map((lab) => (
          <div
            key={lab.id}
            className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 glass-card-hover"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {lab.type}
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded">
                  ★ {lab.rating}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{lab.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{lab.city}, {lab.state}</span>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1 text-xs">
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>NABL Code:</span>
                  <span className="font-mono font-bold text-amber-300">{lab.nabl_accreditation}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Avg Turnaround:</span>
                  <span className="font-bold text-white">{lab.sample_turnaround_days} Days</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Accredited Testing Scope:
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {lab.testing_scopes.map((scope, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                      <span className="text-amber-400">•</span>
                      <span>{scope}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
              <span className="font-mono text-[11px]">{lab.contact.split('|')[0]}</span>
              <span className="text-amber-400 font-semibold">{lab.region} Region</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
