'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, X, ShieldAlert, Sparkles, BookOpen, Layers } from 'lucide-react';
import { TOY_STANDARDS_DATA, ToyStandard, ToySafetyScope } from '@/data/toy_standards';
import ToyStandardCard from './ToyStandardCard';

interface ToyStandardSearchProps {
  onAskAi: (queryOrStandard: string | ToyStandard) => void;
  selectedCategoryFilter?: string | null;
  onClearCategoryFilter?: () => void;
}

type FilterOption =
  | 'All'
  | 'Current'
  | 'Withdrawn'
  | 'Mechanical'
  | 'Chemical'
  | 'Electrical'
  | 'Age'
  | 'Activity Toys';

export default function ToyStandardSearch({
  onAskAi,
  selectedCategoryFilter,
  onClearCategoryFilter,
}: ToyStandardSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [includeWithdrawn, setIncludeWithdrawn] = useState(true);
  const [selectedStandardForModal, setSelectedStandardForModal] = useState<ToyStandard | null>(null);

  const filterOptions: FilterOption[] = [
    'All',
    'Current',
    'Withdrawn',
    'Mechanical',
    'Chemical',
    'Electrical',
    'Age',
    'Activity Toys',
  ];

  const exampleSearches = [
    'electric toys',
    'toy flammability',
    'mechanical safety',
    'finger paints',
    'age determination',
    'IS 9873',
  ];

  // Filtering Logic
  const filteredStandards = useMemo(() => {
    return TOY_STANDARDS_DATA.filter((standard) => {
      // 1. Withdrawn toggle check
      if (!includeWithdrawn && standard.status === 'Withdrawn') {
        return false;
      }

      // 2. Specific filter pills
      if (activeFilter === 'Current' && standard.status !== 'Current') return false;
      if (activeFilter === 'Withdrawn' && standard.status !== 'Withdrawn') return false;
      if (activeFilter === 'Mechanical' && standard.safety_scope !== 'Mechanical') return false;
      if (activeFilter === 'Chemical' && standard.safety_scope !== 'Chemical') return false;
      if (activeFilter === 'Electrical' && standard.safety_scope !== 'Electrical') return false;
      if (activeFilter === 'Age' && standard.safety_scope !== 'Age') return false;
      if (activeFilter === 'Activity Toys' && standard.safety_scope !== 'Activity') return false;

      // 3. Category click from quick category cards
      if (selectedCategoryFilter && standard.category !== selectedCategoryFilter) {
        return false;
      }

      // 4. Text search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const numMatch = standard.standard_number.toLowerCase().includes(q);
        const titleMatch = standard.title.toLowerCase().includes(q);
        const catMatch = standard.category.toLowerCase().includes(q);
        const revMatch = (standard.revision || '').toLowerCase().includes(q);
        const descMatch = standard.description.toLowerCase().includes(q);

        return numMatch || titleMatch || catMatch || revMatch || descMatch;
      }

      return true;
    });
  }, [searchQuery, activeFilter, includeWithdrawn, selectedCategoryFilter]);

  return (
    <section id="toy-search-section" className="w-full py-16 bg-[#F4F2EC] dark:bg-[#171713] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#927a48]/15 dark:bg-[#927a48]/30 border border-[#927a48]/30 text-[#927a48] dark:text-[#d1a24f] text-xs font-bold uppercase tracking-wider mb-3">
            <Search className="w-3.5 h-3.5 text-[#d1a24f]" />
            <span>Interactive Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#171713] dark:text-[#f4f2ec] tracking-tight">
            Find a Toy Standard
          </h2>
          <p className="text-sm sm:text-base text-[#6b675b] dark:text-[#d5c7b2] mt-2">
            Search by standard code, product form factor, physical property, or chemical test scope.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="relative flex items-center shadow-lg rounded-2xl bg-white dark:bg-[#25251d] border-2 border-[#d5c7b2] dark:border-[#4b4932] focus-within:border-[#d1a24f] transition-all">
            <Search className="w-5 h-5 text-[#927a48] dark:text-[#d1a24f] ml-4 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search toy type, safety topic or IS number..."
              className="w-full px-4 py-4 bg-transparent text-[#171713] dark:text-[#f4f2ec] placeholder-[#6b675b]/60 dark:placeholder-[#d5c7b2]/40 text-sm sm:text-base focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mr-3 p-1.5 rounded-lg hover:bg-[#e8e3d9] dark:hover:bg-[#303027] text-[#6b675b] dark:text-[#d5c7b2]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => onAskAi(searchQuery || 'Toy safety standards')}
              className="mr-2 hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#d1a24f] text-[#171713] font-bold text-xs hover:bg-[#d1a24f]/90 transition-all flex-shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI</span>
            </button>
          </div>

          {/* Quick Examples */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-[#6b675b] dark:text-[#d5c7b2]">
            <span className="font-semibold text-[#4b4932] dark:text-[#d1a24f]">Try:</span>
            {exampleSearches.map((example) => (
              <button
                key={example}
                onClick={() => setSearchQuery(example)}
                className="px-2.5 py-1 rounded-full bg-[#e8e3d9]/70 dark:bg-[#25251d] border border-[#d5c7b2]/40 dark:border-[#4b4932] hover:border-[#d1a24f] transition-colors text-[11px]"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Withdrawn Toggle Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#d5c7b2]/20">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-[#4b4932] dark:text-[#d5c7b2] flex items-center gap-1 flex-shrink-0">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveFilter(opt)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  activeFilter === opt
                    ? 'bg-[#4b4932] dark:bg-[#d1a24f] text-[#f4f2ec] dark:text-[#171713] shadow-md'
                    : 'bg-white dark:bg-[#25251d] border border-[#d5c7b2]/40 dark:border-[#4b4932] text-[#6b675b] dark:text-[#d5c7b2] hover:border-[#927a48]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Include Withdrawn Toggle & Category Filter Clear */}
          <div className="flex items-center gap-4 flex-shrink-0 self-end md:self-center">
            {selectedCategoryFilter && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d1a24f]/20 border border-[#d1a24f]/40 text-xs font-semibold text-[#171713] dark:text-[#d1a24f]">
                <span>Category: {selectedCategoryFilter}</span>
                {onClearCategoryFilter && (
                  <button onClick={onClearCategoryFilter} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#4b4932] dark:text-[#d5c7b2]">
              <input
                type="checkbox"
                checked={includeWithdrawn}
                onChange={(e) => setIncludeWithdrawn(e.target.checked)}
                className="w-4 h-4 accent-[#d1a24f] rounded cursor-pointer"
              />
              <span>Include Withdrawn Standards</span>
            </label>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#6b675b] dark:text-[#d5c7b2]">
          <div>
            Showing <span className="font-mono font-bold text-[#171713] dark:text-[#f4f2ec]">{filteredStandards.length}</span> of {TOY_STANDARDS_DATA.length} standards
          </div>
          {!includeWithdrawn && (
            <span className="text-[11px] text-[#b84a3a]">
              (Withdrawn records hidden by filter)
            </span>
          )}
        </div>

        {/* Standards Grid */}
        {filteredStandards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStandards.map((std) => (
              <ToyStandardCard
                key={std.id}
                standard={std}
                onViewDetails={(s) => setSelectedStandardForModal(s)}
                onAskAi={(s) => onAskAi(`Tell me about toy safety standard ${s.standard_number}: ${s.title}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 p-8 rounded-2xl bg-white dark:bg-[#25251d] border border-[#d5c7b2]/30 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-[#927a48] dark:text-[#d1a24f] mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-[#171713] dark:text-[#f4f2ec]">No standards matched your search</h3>
            <p className="text-xs text-[#6b675b] dark:text-[#d5c7b2] mt-1 mb-4">
              Try adjusting your query or toggle &quot;Include Withdrawn Standards&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('All');
                setIncludeWithdrawn(true);
                if (onClearCategoryFilter) onClearCategoryFilter();
              }}
              className="px-4 py-2 rounded-xl bg-[#4b4932] text-[#f4f2ec] text-xs font-semibold hover:bg-[#927a48] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Modal: View Details */}
        {selectedStandardForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="rounded-2xl max-w-xl w-full bg-[#F4F2EC] dark:bg-[#1d1d18] border border-[#d5c7b2] dark:border-[#4b4932] p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#d5c7b2]/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#927a48] dark:text-[#d1a24f]">
                    {selectedStandardForModal.standard_number}
                  </span>
                  {selectedStandardForModal.status === 'Withdrawn' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#b84a3a]/15 text-[#b84a3a] border border-[#b84a3a]/30">
                      WITHDRAWN
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#927a48]/20 text-[#927a48] dark:text-[#d1a24f] border border-[#d1a24f]/30">
                      CURRENT
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedStandardForModal(null)}
                  className="p-1 rounded-lg hover:bg-[#e8e3d9] dark:hover:bg-[#303027] text-[#6b675b] dark:text-[#d5c7b2]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#171713] dark:text-[#f4f2ec] mb-1">
                  {selectedStandardForModal.title}
                </h3>
                {selectedStandardForModal.revision && (
                  <p className="text-xs font-mono text-[#d1a24f] font-semibold">
                    {selectedStandardForModal.revision}
                  </p>
                )}
              </div>

              <div className="space-y-2 text-xs text-[#4b4932] dark:text-[#d5c7b2]">
                <div className="p-3 rounded-xl bg-white dark:bg-[#25251d] border border-[#d5c7b2]/30 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#6b675b] dark:text-[#d5c7b2]/60">Category:</span>
                    <span className="font-semibold text-[#171713] dark:text-[#f4f2ec]">{selectedStandardForModal.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b675b] dark:text-[#d5c7b2]/60">Publication Year:</span>
                    <span className="font-mono font-semibold text-[#171713] dark:text-[#f4f2ec]">{selectedStandardForModal.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b675b] dark:text-[#d5c7b2]/60">Status:</span>
                    <span className={`font-semibold ${selectedStandardForModal.status === 'Withdrawn' ? 'text-[#b84a3a]' : 'text-green-600 dark:text-green-400'}`}>
                      {selectedStandardForModal.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b675b] dark:text-[#d5c7b2]/60">Source Record:</span>
                    <span className="text-[#171713] dark:text-[#f4f2ec]">{selectedStandardForModal.source}</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#6b675b] dark:text-[#d5c7b2]/80 leading-relaxed italic">
                  Note: Grounded record strictly derived from official BIS publications. For full normative text, amendments, or licensing mandates, consult the authoritative BIS portal.
                </p>
              </div>

              <div className="pt-3 border-t border-[#d5c7b2]/20 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedStandardForModal(null)}
                  className="px-4 py-2 rounded-xl border border-[#d5c7b2] text-xs font-semibold text-[#4b4932] dark:text-[#d5c7b2]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const std = selectedStandardForModal;
                    setSelectedStandardForModal(null);
                    onAskAi(`What does ${std.standard_number} cover for toy safety?`);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#d1a24f] text-[#171713] text-xs font-bold hover:bg-[#d1a24f]/90 transition-colors inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask BIS AI</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
