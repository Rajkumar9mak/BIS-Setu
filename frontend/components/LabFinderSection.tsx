'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Search, Award, ArrowRight, CheckCircle2, Phone, Filter } from 'lucide-react';

export default function LabFinderSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const labs = [
    {
      id: 'lab-1',
      name: 'National Test House (NTH), Northern Region',
      location: 'Kamla Nehru Nagar, Ghaziabad, Uttar Pradesh',
      region: 'north',
      category: 'electrical',
      testing_capability: 'Complete electrical safety, dielectric withstand, leakage current, and thermal endurance testing under IS 302.',
      status: 'BIS Recognized & NABL Accredited (TC-5120)',
      contact: '0120-2789823',
      turnaround: '14 Days'
    },
    {
      id: 'lab-2',
      name: 'Central Institute of Plastics Engineering & Tech (CIPET)',
      location: 'Murthal, Sonipat, Haryana',
      region: 'north',
      category: 'helmets',
      testing_capability: 'Drop impact acceleration, retention system strength, optical visor clarity, and penetration resistance under IS 4151:2015.',
      status: 'Statutory BIS Testing Centre (TC-6014)',
      contact: '0130-2203000',
      turnaround: '18 Days'
    },
    {
      id: 'lab-3',
      name: 'Shriram Institute for Industrial Research',
      location: '19 University Road, Delhi',
      region: 'north',
      category: 'water',
      testing_capability: 'Microbiological culture, pesticide residue chromatography (GC-MS), and heavy metal spectroscopy under IS 14543.',
      status: 'NABL Accredited & BIS Approved (TC-5001)',
      contact: '011-27667207',
      turnaround: '10 Days'
    }
  ];

  const filteredLabs = labs.filter((lab) => {
    const matchesCategory = selectedCategory === 'all' || lab.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || lab.region === selectedLocation;
    return matchesCategory && matchesLocation;
  });

  return (
    <section id="lab-finder" className="relative py-20 bg-[#f4f2ec] text-[#171713] rounded-[36px] my-12 overflow-hidden shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d5c7b2]/50 border border-[#927a48]/30 text-[#4b4932] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#927a48]" />
            <span>NABL Accredited Laboratory Directory</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#171713] tracking-tight">
            Find an accredited testing laboratory.
          </h2>
          <p className="text-sm sm:text-base text-[#4b4932] leading-relaxed">
            Locate authorized testing centres across India for official sample testing, verification audits, and grant of ISI mark.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-2xl border-2 border-[#d5c7b2] shadow-sm flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#927a48] block mb-1">
              Product Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f2ec] border border-[#d5c7b2] text-xs font-semibold text-[#171713] outline-none"
            >
              <option value="all">All Product Categories</option>
              <option value="electrical">Electrical Appliances (IS 302)</option>
              <option value="helmets">Two-Wheeler Helmets (IS 4151)</option>
              <option value="water">Packaged Drinking Water (IS 14543)</option>
            </select>
          </div>

          <div className="flex-1 w-full">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#927a48] block mb-1">
              Testing Requirement / Region
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f2ec] border border-[#d5c7b2] text-xs font-semibold text-[#171713] outline-none"
            >
              <option value="all">All Locations (India)</option>
              <option value="north">Northern Region (Delhi-NCR, UP, Haryana)</option>
              <option value="west">Western Region (Maharashtra, Gujarat)</option>
              <option value="south">Southern Region (Karnataka, Tamil Nadu)</option>
              <option value="east">Eastern Region (West Bengal, Odisha)</option>
            </select>
          </div>

          <div className="sm:self-end w-full sm:w-auto pt-2 sm:pt-0">
            <Link
              href="/labs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#927a48] hover:bg-[#4b4932] text-[#f4f2ec] text-xs font-bold transition-all shadow-md"
            >
              <Search className="w-3.5 h-3.5 text-[#d1a24f]" />
              <span>Full Directory</span>
            </Link>
          </div>
        </div>

        {/* Laboratory Cards: Ivory cards with olive borders and gold action buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredLabs.map((lab) => (
            <div
              key={lab.id}
              className="rounded-[26px] bg-white p-6 border-2 border-[#927a48]/30 hover:border-[#927a48] hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#f4f2ec] text-[#4b4932] border border-[#d5c7b2]">
                    {lab.status.split('(')[0]}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#927a48] bg-[#d1a24f]/20 px-2 py-0.5 rounded">
                    ~{lab.turnaround}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-[#171713] leading-snug">
                    {lab.name}
                  </h3>
                  <p className="text-xs text-[#4b4932] flex items-start gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#927a48] shrink-0 mt-0.5" />
                    <span>{lab.location}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#927a48] block">
                    Testing Capability:
                  </span>
                  <p className="text-xs text-[#4b4932] leading-relaxed">
                    {lab.testing_capability}
                  </p>
                </div>
              </div>

              {/* Action Button: Gold Button */}
              <div className="pt-4 border-t border-[#d5c7b2]/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#4b4932] flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#927a48]" />
                  {lab.contact}
                </span>

                <Link
                  href="/labs"
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-[#171713] bg-[#d1a24f] hover:bg-[#d1a24f]/90 transition-all shadow-sm"
                >
                  <span>Book Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
