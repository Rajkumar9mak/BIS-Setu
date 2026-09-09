'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TOY_CATEGORIES, ToyCategoryInfo } from '@/data/toy_standards';

interface ToyCategoryCardsProps {
  onSelectCategory: (categoryName: string) => void;
  selectedCategory?: string | null;
}

export default function ToyCategoryCards({
  onSelectCategory,
  selectedCategory
}: ToyCategoryCardsProps) {
  return (
    <section className="w-full py-16 bg-[#F4F2EC] dark:bg-[#171713] transition-colors border-b border-[#d5c7b2]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4b4932]/10 dark:bg-[#4b4932]/40 border border-[#927a48]/30 text-[#927a48] dark:text-[#d1a24f] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Safety Domains</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#171713] dark:text-[#f4f2ec] tracking-tight">
            Explore Standards by Category
          </h2>
          <p className="text-sm sm:text-base text-[#6b675b] dark:text-[#d5c7b2] mt-2">
            Structured classification directly derived from Bureau of Indian Standards toy safety publications.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {TOY_CATEGORIES.map((cat: ToyCategoryInfo) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`text-left p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[#4b4932] dark:bg-[#4b4932] border-[#d1a24f] text-[#f4f2ec] shadow-lg ring-2 ring-[#d1a24f]/40 scale-[1.01]'
                    : 'bg-white dark:bg-[#25251d] border-[#d5c7b2]/40 dark:border-[#4b4932] hover:border-[#927a48] dark:hover:border-[#d1a24f]/60 hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl" role="img" aria-label={cat.name}>
                      {cat.icon}
                    </span>
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#d1a24f] text-[#171713]'
                          : 'bg-[#e8e3d9] dark:bg-[#303027] text-[#4b4932] dark:text-[#d5c7b2]'
                      }`}
                    >
                      {cat.standardsCount} {cat.standardsCount === 1 ? 'Standard' : 'Standards'}
                    </span>
                  </div>

                  <h3
                    className={`text-sm font-bold tracking-tight mb-1.5 transition-colors ${
                      isSelected
                        ? 'text-[#f4f2ec]'
                        : 'text-[#171713] dark:text-[#f4f2ec] group-hover:text-[#927a48] dark:group-hover:text-[#d1a24f]'
                    }`}
                  >
                    {cat.name}
                  </h3>

                  <p
                    className={`text-xs line-clamp-2 leading-relaxed mb-3 ${
                      isSelected ? 'text-[#d5c7b2]' : 'text-[#6b675b] dark:text-[#d5c7b2]/80'
                    }`}
                  >
                    {cat.description}
                  </p>
                </div>

                <div
                  className={`pt-3 border-t flex items-center justify-between text-[11px] font-medium ${
                    isSelected
                      ? 'border-[#f4f2ec]/20 text-[#d1a24f]'
                      : 'border-[#d5c7b2]/20 text-[#927a48] dark:text-[#d1a24f]'
                  }`}
                >
                  <span className="font-mono text-[10px] truncate max-w-[170px]">{cat.sampleStandard}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Filter</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
