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
import DecorativeShapes from '@/components/DecorativeShapes';

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
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <DecorativeShapes variant="ribbon" className="-top-12 -right-20 opacity-50" />

      {/* Header */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4b4932]/50 border border-[#d1a24f]/30 text-[#d1a24f] text-xs font-semibold">
          <Award className="w-3.5 h-3.5 text-[#d1a24f]" />
          <span>NABL Accredited & BIS Recognized Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#f4f2ec] tracking-tight">
          BIS Recognized Testing Laboratories
        </h1>
        <p className="text-sm text-[#d5c7b2]">
          Locate accredited laboratories across India authorized to conduct type-testing and factory surveillance sample tests for ISI certification.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-[28px] glass-charcoal p-6 border border-[#d1a24f]/30 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d5c7b2]/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by lab name, city, or state..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#171713]/90 border border-[#d5c7b2]/20 focus:border-[#d1a24f] text-[#f4f2ec] placeholder:text-[#d5c7b2]/40 text-xs font-medium outline-none"
            />
          </div>

          <div>
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#171713]/90 border border-[#d5c7b2]/20 focus:border-[#d1a24f] text-[#f4f2ec] text-xs font-medium outline-none"
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
              className="w-full px-4 py-3 rounded-xl bg-[#171713]/90 border border-[#d5c7b2]/20 focus:border-[#d1a24f] text-[#f4f2ec] text-xs font-medium outline-none"
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
            className="p-6 rounded-[26px] glass-charcoal border border-[#d5c7b2]/20 hover:border-[#d1a24f] transition-all flex flex-col justify-between space-y-4 shadow-xl card-hover-gold"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#927a48]/25 text-[#d1a24f] border border-[#d1a24f]/30">
                  {lab.type}
                </span>
                <span className="text-xs font-bold text-[#d1a24f] bg-[#4b4932]/60 px-2 py-0.5 rounded border border-[#d1a24f]/20">
                  ★ {lab.rating}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#f4f2ec]">{lab.name}</h3>
                <p className="text-xs text-[#d5c7b2] flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#927a48] shrink-0" />
                  <span>{lab.city}, {lab.state}</span>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#4b4932]/30 border border-[#d5c7b2]/10 space-y-1 text-xs">
                <div className="flex justify-between text-[#d5c7b2] text-[11px]">
                  <span>NABL Code:</span>
                  <span className="font-mono font-bold text-[#d1a24f]">{lab.nabl_accreditation}</span>
                </div>
                <div className="flex justify-between text-[#d5c7b2] text-[11px]">
                  <span>Avg Turnaround:</span>
                  <span className="font-bold text-[#f4f2ec]">{lab.sample_turnaround_days} Days</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#d5c7b2]/70 block mb-1">
                  Accredited Testing Scope:
                </span>
                <ul className="space-y-1 text-xs text-[#d5c7b2]">
                  {lab.testing_scopes.map((scope, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                      <span className="text-[#d1a24f]">•</span>
                      <span>{scope}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-[#d5c7b2]/15 text-xs text-[#d5c7b2] flex items-center justify-between">
              <span className="font-mono text-[11px]">{lab.contact.split('|')[0]}</span>
              <span className="text-[#d1a24f] font-semibold">{lab.region} Region</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
