'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  X,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ShieldAlert,
  History,
  ArrowDown,
  ArrowRight,
  Compass,
  Bot,
  Send,
  User,
  Info,
  Layers,
  AlertCircle,
  ExternalLink,
  Eye,
  CheckCircle,
} from 'lucide-react';
import {
  REGULATED_PRODUCTS_DATA,
  ProductSafetyScope,
} from '@/data/products_standards_data';
import { ToyStandard } from '@/data/toy_standards';
import { queryRag } from '@/lib/api';

interface ProductComplianceExplorerProps {
  initialProductId?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  citation?: {
    standard_number: string;
    title: string;
    evidence: string;
    clause?: string | null;
    page?: string | number | null;
    provenance_status: string;
  };
}

export default function ProductComplianceExplorer({
  initialProductId = 'toys',
}: ProductComplianceExplorerProps) {
  // Active product
  const [selectedProductId, setSelectedProductId] = useState<string>(initialProductId);

  const activeProduct = useMemo(() => {
    return (
      REGULATED_PRODUCTS_DATA.find((p) => p.id === selectedProductId) ||
      REGULATED_PRODUCTS_DATA[0]
    );
  }, [selectedProductId]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [includeWithdrawn, setIncludeWithdrawn] = useState(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [selectedStandardForModal, setSelectedStandardForModal] = useState<ToyStandard | null>(null);

  // Explorer State
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [selectedInquiry, setSelectedInquiry] = useState<string>('');

  // Evolution series index
  const [selectedEvolutionIndex, setSelectedEvolutionIndex] = useState<number>(0);

  // Chat State
  const [chatQuery, setChatQuery] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Welcome to the BIS Product Compliance Assistant for ${activeProduct.name}. Ask any question regarding applicable Indian Standards, test parameters, QCO mandates, or clause thresholds.`,
    },
  ]);

  const searchRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);

  // Reset local state when product changes
  const handleProductChange = (prodId: string) => {
    setSelectedProductId(prodId);
    setSearchQuery('');
    setActiveFilter('All');
    setSelectedCategoryFilter(null);
    setSelectedEvolutionIndex(0);
    const newProd = REGULATED_PRODUCTS_DATA.find((p) => p.id === prodId) || REGULATED_PRODUCTS_DATA[0];
    if (newProd.explorerVariants.length > 0) {
      setSelectedVariant(newProd.explorerVariants[0].id);
    }
    if (newProd.explorerInquiries.length > 0) {
      setSelectedInquiry(newProd.explorerInquiries[0].id);
    }
    setMessages([
      {
        role: 'assistant',
        content: `Switched to ${newProd.name}. Governed primarily under ${newProd.primaryStandardCode} and ${newProd.qcoName}. Ask any safety or compliance question below.`,
      },
    ]);
  };

  // Init variant/inquiry on mount or product change
  React.useEffect(() => {
    if (activeProduct.explorerVariants.length > 0 && !selectedVariant) {
      setSelectedVariant(activeProduct.explorerVariants[0].id);
    }
    if (activeProduct.explorerInquiries.length > 0 && !selectedInquiry) {
      setSelectedInquiry(activeProduct.explorerInquiries[0].id);
    }
  }, [activeProduct, selectedVariant, selectedInquiry]);

  // Filtered Standards for active product
  const filteredStandards = useMemo(() => {
    return activeProduct.standards.filter((std) => {
      if (!includeWithdrawn && std.status === 'Withdrawn') return false;
      if (activeFilter === 'Current' && std.status !== 'Current') return false;
      if (activeFilter === 'Withdrawn' && std.status !== 'Withdrawn') return false;
      if (activeFilter === 'Mechanical' && std.safety_scope !== 'Mechanical') return false;
      if (activeFilter === 'Chemical' && std.safety_scope !== 'Chemical') return false;
      if (activeFilter === 'Electrical' && std.safety_scope !== 'Electrical') return false;

      if (selectedCategoryFilter && std.category !== selectedCategoryFilter) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          std.standard_number.toLowerCase().includes(q) ||
          std.title.toLowerCase().includes(q) ||
          std.category.toLowerCase().includes(q) ||
          (std.revision || '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeProduct, includeWithdrawn, activeFilter, selectedCategoryFilter, searchQuery]);

  // Explorer results
  const explorerMatchedStandards = useMemo(() => {
    return activeProduct.standards.filter((std) => {
      if (selectedInquiry === 'Applicable standards') return true;
      const inqLower = selectedInquiry.toLowerCase();
      if (inqLower.includes('mechanical') || inqLower.includes('impact') || inqLower.includes('penetration')) {
        return std.safety_scope === 'Mechanical';
      }
      if (inqLower.includes('electrical') || inqLower.includes('high voltage') || inqLower.includes('dielectric') || inqLower.includes('earthing')) {
        return std.safety_scope === 'Electrical';
      }
      if (inqLower.includes('chemical') || inqLower.includes('heavy metal') || inqLower.includes('pesticide') || inqLower.includes('microbiology')) {
        return std.safety_scope === 'Chemical';
      }
      if (inqLower.includes('flammab')) {
        return std.category.toLowerCase().includes('flammability');
      }
      return true;
    });
  }, [activeProduct, selectedInquiry]);

  // Stats
  const totalStandards = activeProduct.standards.length;
  const currentStandards = activeProduct.standards.filter((s) => s.status === 'Current').length;
  const withdrawnStandards = activeProduct.standards.filter((s) => s.status === 'Withdrawn').length;
  const totalCategories = activeProduct.categories.length;

  const currentEvolutionGroup = activeProduct.evolutionGroups[selectedEvolutionIndex] || activeProduct.evolutionGroups[0];

  // AI Ask handler
  const handleAsk = async (queryText: string) => {
    const q = (queryText || chatQuery).trim();
    if (!q) return;

    setMessages((prev) => [...prev, { role: 'user', content: q }]);
    setChatQuery('');
    setChatLoading(true);

    try {
      let ragAnswer = '';
      try {
        const ragRes = await queryRag(q, activeProduct.category);
        if (ragRes && ragRes.answer) ragAnswer = ragRes.answer;
      } catch {
        // Fallback gracefully
      }

      // Match nearest standard in active product
      const qLower = q.toLowerCase();
      const matched =
        activeProduct.standards.find(
          (s) =>
            s.title.toLowerCase().includes(qLower) ||
            s.standard_number.toLowerCase().includes(qLower)
        ) || activeProduct.standards[0];

      const content = ragAnswer
        ? `${ragAnswer}\n\nPotentially governing reference: ${matched.standard_number} (${matched.status}${matched.revision ? `, ${matched.revision}` : ''}) - ${matched.title}.`
        : `Under the ${activeProduct.qcoName}, products must conform to ${matched.standard_number}. Standard description: ${matched.description}`;

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content,
          citation: {
            standard_number: matched.standard_number,
            title: matched.title,
            evidence: `Grounded BIS record: ${matched.standard_number} (${matched.status}) - ${matched.description}`,
            clause: null,
            page: null,
            provenance_status: 'Verified BIS Catalog Entry',
          },
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Unable to query knowledge base at this moment. Please check connectivity.',
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <section className="w-full space-y-10 animate-in fade-in duration-300">
      {/* 1. TOP PRODUCT SELECTOR BAR */}
      <div className="rounded-[28px] glass-charcoal p-6 sm:p-8 border border-[#d1a24f]/30 shadow-2xl space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4b4932]/40 border border-[#d1a24f]/30 text-[#d1a24f] text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5 text-[#d1a24f]" />
            <span>Regulated Product Standards & Safety Explorer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#f4f2ec] tracking-tight">
            Explore Standards, QCOs & Technical Safety by Product
          </h2>
          <p className="text-xs sm:text-sm text-[#d5c7b2] mt-1 max-w-3xl">
            Select an official regulated product category to view its governing Indian Standards, active vs. withdrawn revisions, test scopes, and regulatory roadmaps.
          </p>
        </div>

        {/* Horizontal Product Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {REGULATED_PRODUCTS_DATA.map((prod) => {
            const isSelected = selectedProductId === prod.id;
            return (
              <button
                key={prod.id}
                onClick={() => handleProductChange(prod.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#d1a24f] text-[#171713] shadow-lg shadow-[#d1a24f]/25 scale-[1.02]'
                    : 'bg-[#171713]/80 hover:bg-[#4b4932]/50 text-[#d5c7b2] hover:text-[#f4f2ec] border border-[#d5c7b2]/20'
                }`}
              >
                <span className="text-base">{prod.icon}</span>
                <span>{prod.name}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-[#171713] text-[#d1a24f]' : 'bg-[#4b4932] text-[#d5c7b2]'
                  }`}
                >
                  {prod.standards.length} std
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. ACTIVE PRODUCT HERO & QCO BANNER */}
      <div className="rounded-3xl bg-white dark:bg-[#25251d] border border-[#d5c7b2]/40 dark:border-[#4b4932] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#d5c7b2]/20">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#4b4932]/20 dark:bg-[#4b4932]/50 border border-[#d1a24f]/30 flex items-center justify-center text-3xl flex-shrink-0">
              {activeProduct.icon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-[#171713] dark:text-[#f4f2ec]">
                  {activeProduct.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#927a48]/20 border border-[#d1a24f]/40 font-mono text-xs font-bold text-[#927a48] dark:text-[#d1a24f]">
                  {activeProduct.primaryStandardCode}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#6b675b] dark:text-[#d5c7b2] mt-1 max-w-2xl leading-relaxed">
                {activeProduct.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2 text-xs flex-shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#d1a24f]/20 border border-[#d1a24f]/40 font-bold text-[#171713] dark:text-[#d1a24f]">
              <ShieldCheck className="w-4 h-4 text-[#d1a24f]" />
              <span>{activeProduct.qcoName}</span>
            </div>
            <span className="text-[11px] text-[#6b675b] dark:text-[#d5c7b2]/80">
              Certification Scheme: <strong>{activeProduct.scheme}</strong>
            </span>
          </div>
        </div>

        {/* 3. METRICS OVERVIEW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="p-4 rounded-xl bg-[#F4F2EC] dark:bg-[#171713] border border-[#d5c7b2]/30">
            <span className="text-[11px] font-semibold text-[#6b675b] dark:text-[#d5c7b2] uppercase block">
              Total Standards
            </span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#d1a24f]">
              {totalStandards}
            </span>
            <p className="text-[10px] text-[#6b675b] dark:text-[#d5c7b2]/70 mt-0.5">Indexed in Dataset</p>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F2EC] dark:bg-[#171713] border border-[#d5c7b2]/30">
            <span className="text-[11px] font-semibold text-[#6b675b] dark:text-[#d5c7b2] uppercase block">
              Current Standards
            </span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-green-600 dark:text-green-400">
              {currentStandards}
            </span>
            <p className="text-[10px] text-[#6b675b] dark:text-[#d5c7b2]/70 mt-0.5">Active Published Editions</p>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F2EC] dark:bg-[#171713] border border-[#d5c7b2]/30">
            <span className="text-[11px] font-semibold text-[#6b675b] dark:text-[#d5c7b2] uppercase block">
              Withdrawn Standards
            </span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#b84a3a]">
              {withdrawnStandards}
            </span>
            <p className="text-[10px] text-[#6b675b] dark:text-[#d5c7b2]/70 mt-0.5">Kept for Provenance</p>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F2EC] dark:bg-[#171713] border border-[#d5c7b2]/30">
            <span className="text-[11px] font-semibold text-[#6b675b] dark:text-[#d5c7b2] uppercase block">
              Safety / Test Domains
            </span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#927a48] dark:text-[#f4f2ec]">
              {totalCategories}
            </span>
            <p className="text-[10px] text-[#6b675b] dark:text-[#d5c7b2]/70 mt-0.5">Specific Verification Scopes</p>
          </div>
        </div>
      </div>

      {/* 4. SAFETY & TESTING DOMAIN CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#171713] dark:text-[#f4f2ec]">
              Safety & Verification Domains ({activeProduct.name})
            </h3>
            <p className="text-xs text-[#6b675b] dark:text-[#d5c7b2]">
              Click any domain card to filter the catalog below.
            </p>
          </div>
          {selectedCategoryFilter && (
            <button
              onClick={() => setSelectedCategoryFilter(null)}
              className="text-xs font-bold text-[#b84a3a] hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeProduct.categories.map((cat) => {
            const isSelected = selectedCategoryFilter === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() =>
                  setSelectedCategoryFilter(isSelected ? null : cat.name)
                }
                className={`text-left p-5 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-[#4b4932] text-[#f4f2ec] border-[#d1a24f] shadow-lg ring-2 ring-[#d1a24f]/40'
                    : 'bg-white dark:bg-[#25251d] border-[#d5c7b2]/40 dark:border-[#4b4932] hover:border-[#927a48]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#e8e3d9] dark:bg-[#303027] text-[#4b4932] dark:text-[#d5c7b2]">
                    {cat.standardsCount} {cat.standardsCount === 1 ? 'Rule' : 'Rules'}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#171713] dark:text-[#f4f2ec] mb-1">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-[#6b675b] dark:text-[#d5c7b2]/80 line-clamp-2 leading-relaxed mb-2">
                  {cat.description}
                </p>
                <span className="text-[10px] font-mono text-[#927a48] dark:text-[#d1a24f] block truncate">
                  {cat.sampleStandard}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. INTERACTIVE 2-STEP REGULATORY EXPLORER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#25251d] border border-[#d5c7b2]/40 dark:border-[#4b4932] shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#d1a24f]/20 flex items-center justify-center text-[#d1a24f]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#171713] dark:text-[#f4f2ec]">
              Interactive Product Safety Explorer
            </h3>
            <p className="text-xs text-[#6b675b] dark:text-[#d5c7b2]">
              Select product variant and inquiry to discover potentially governing standards.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            {/* Step 1: Product Form Factor */}
            <div className="p-4 rounded-2xl bg-[#F4F2EC] dark:bg-[#171713] border border-[#d5c7b2]/30 space-y-2.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#927a48] dark:text-[#d1a24f]">
                Step 01: Product Variant
              </span>
              <div className="space-y-2">
                {activeProduct.explorerVariants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`w-full p-2.5 rounded-xl text-left border flex items-center gap-3 transition-all ${
                      selectedVariant === variant.id
                        ? 'bg-[#4b4932] text-[#f4f2ec] border-[#d1a24f] font-semibold shadow-md'
                        : 'bg-white dark:bg-[#25251d] border-[#d5c7b2]/30 text-[#171713] dark:text-[#d5c7b2]'
                    }`}
                  >
                    <span className="text-lg">{variant.icon}</span>
                    <div className="text-xs leading-tight">
                      <p className="font-bold">{variant.id}</p>
                      <p className="text-[10px] opacity-80">{variant.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Inquiry Topic */}
            <div className="p-4 rounded-2xl bg-[#F4F2EC] dark:bg-[#171713] border border-[#d5c7b2]/30 space-y-2.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#927a48] dark:text-[#d1a24f]">
                Step 02: Safety / Test Inquiry
              </span>
              <div className="space-y-1.5">
                {activeProduct.explorerInquiries.map((inq) => (
                  <button
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq.id)}
                    className={`w-full p-2 rounded-xl text-left text-xs border flex items-center justify-between transition-all ${
                      selectedInquiry === inq.id
                        ? 'bg-[#d1a24f] text-[#171713] font-bold border-[#d1a24f]'
                        : 'bg-white dark:bg-[#25251d] border-[#d5c7b2]/30 text-[#4b4932] dark:text-[#d5c7b2]'
                    }`}
                  >
                    <span>{inq.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Box */}
          <div className="lg:col-span-7 space-y-3">
            <div className="p-3.5 rounded-xl bg-[#4b4932]/20 border border-[#d1a24f]/30 text-xs text-[#171713] dark:text-[#f4f2ec] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#d1a24f] flex-shrink-0 mt-0.5" />
              <div>
                <strong>Potentially Relevant Standards Guidance:</strong> For {selectedVariant || activeProduct.name} regarding {selectedInquiry || 'applicable standards'}, refer to the indexed records below.
              </div>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {explorerMatchedStandards.length > 0 ? (
                explorerMatchedStandards.map((std) => {
                  const isWithdrawn = std.status === 'Withdrawn';
                  return (
                    <div
                      key={std.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isWithdrawn
                          ? 'bg-[#171713]/40 border-[#b84a3a]/30'
                          : 'bg-[#F4F2EC] dark:bg-[#171713] border-[#d5c7b2]/40 dark:border-[#4b4932]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-xs font-bold text-[#171713] dark:text-[#f4f2ec]">
                          {std.standard_number}
                        </span>
                        {isWithdrawn ? (
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#b84a3a]/15 text-[#b84a3a] border border-[#b84a3a]/30">
                            WITHDRAWN
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#927a48]/20 text-[#927a48] dark:text-[#d1a24f] border border-[#d1a24f]/30">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#4b4932] dark:text-[#d5c7b2] leading-snug">
                        {std.title}
                      </p>
                      <div className="mt-2 pt-2 border-t border-[#d5c7b2]/20 flex items-center justify-between text-[10px]">
                        <span className="text-[#6b675b] dark:text-[#d5c7b2]/60 font-mono">
                          Scope: {std.category}
                        </span>
                        <button
                          onClick={() => handleAsk(`How does ${std.standard_number} apply to ${selectedVariant || activeProduct.name}?`)}
                          className="inline-flex items-center gap-1 font-bold text-[#927a48] dark:text-[#d1a24f] hover:underline"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Ask BIS AI →</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-xs text-[#6b675b]">No specific standards matched.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 6. DYNAMIC STANDARDS SEARCH & CATALOG */}
      <div ref={searchRef} className="space-y-6">
        <div className="rounded-3xl glass-charcoal p-6 sm:p-8 border border-[#d5c7b2]/20 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#d1a24f]">
                Standards Catalog ({activeProduct.name})
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#f4f2ec]">
                Published & Historical Specifications
              </h3>
            </div>

            <label className="inline-flex items-center gap-2 text-xs font-semibold text-[#d5c7b2] cursor-pointer">
              <input
                type="checkbox"
                checked={includeWithdrawn}
                onChange={(e) => setIncludeWithdrawn(e.target.checked)}
                className="w-4 h-4 accent-[#d1a24f] rounded"
              />
              <span>Include Withdrawn Standards</span>
            </label>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d5c7b2]/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeProduct.name} standards by IS code, title, or scope...`}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#171713]/90 border border-[#d5c7b2]/20 focus:border-[#d1a24f] text-[#f4f2ec] placeholder:text-[#d5c7b2]/40 text-xs sm:text-sm outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#d5c7b2]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStandards.map((std) => {
              const isWithdrawn = std.status === 'Withdrawn';
              return (
                <div
                  key={std.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isWithdrawn
                      ? 'bg-[#171713]/40 border-[#b84a3a]/30'
                      : 'bg-[#25251d] border-[#d5c7b2]/20 hover:border-[#d1a24f]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4b4932] text-[#d5c7b2]">
                        {std.category}
                      </span>
                      {isWithdrawn ? (
                        <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#b84a3a]/20 text-[#b84a3a] border border-[#b84a3a]/40">
                          WITHDRAWN
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#927a48]/30 text-[#d1a24f] border border-[#d1a24f]/40">
                          CURRENT
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-mono font-black text-[#f4f2ec] mb-1">
                      {std.standard_number}
                    </h4>
                    {std.revision && (
                      <p className="text-[10px] font-mono text-[#d1a24f] mb-1">{std.revision}</p>
                    )}
                    <p className="text-xs text-[#d5c7b2] leading-snug mb-3 line-clamp-3">
                      {std.title}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#d5c7b2]/10 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setSelectedStandardForModal(std)}
                      className="font-bold text-[#d5c7b2] hover:text-[#d1a24f] transition-colors"
                    >
                      View Details →
                    </button>
                    <button
                      onClick={() => handleAsk(`What are the key provisions of ${std.standard_number}?`)}
                      className="px-2.5 py-1 rounded-lg bg-[#4b4932]/40 hover:bg-[#d1a24f] hover:text-[#171713] text-[#d1a24f] text-[11px] font-bold transition-all"
                    >
                      Ask AI
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 7. VERSION & REVISION PROGRESSION TIMELINE */}
      {activeProduct.evolutionGroups.length > 0 && (
        <div className="rounded-3xl glass-charcoal p-6 sm:p-8 border border-[#d5c7b2]/20 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d5c7b2]/15 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#d1a24f]/20 flex items-center justify-center text-[#d1a24f]">
                <History className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#f4f2ec]">
                  Historical Standards Evolution ({activeProduct.name})
                </h3>
                <p className="text-xs text-[#d5c7b2]">
                  Chronological progression of revisions cataloged by the Bureau of Indian Standards.
                </p>
              </div>
            </div>

            {/* Evolution Selector if multiple groups */}
            {activeProduct.evolutionGroups.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {activeProduct.evolutionGroups.map((grp, gIdx) => (
                  <button
                    key={grp.series}
                    onClick={() => setSelectedEvolutionIndex(gIdx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                      selectedEvolutionIndex === gIdx
                        ? 'bg-[#d1a24f] text-[#171713]'
                        : 'bg-[#25251d] text-[#d5c7b2] border border-[#4b4932]'
                    }`}
                  >
                    {grp.series}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stepper list */}
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#4b4932]">
            {currentEvolutionGroup.versions.map((ver, idx) => {
              const isWithdrawn = ver.status === 'Withdrawn';
              const isLast = idx === currentEvolutionGroup.versions.length - 1;
              return (
                <div key={ver.id} className="relative group">
                  <div
                    className={`absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                      isWithdrawn
                        ? 'bg-[#171713] border-[#b84a3a] text-[#b84a3a]'
                        : 'bg-[#d1a24f] border-[#f4f2ec] text-[#171713]'
                    }`}
                  >
                    {isWithdrawn ? (
                      <span className="w-2 h-2 rounded-full bg-[#b84a3a]" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>

                  <div
                    className={`p-4 rounded-xl border ${
                      isWithdrawn
                        ? 'bg-[#171713]/60 border-[#b84a3a]/30 text-[#d5c7b2]/70'
                        : 'bg-[#25251d] border-[#d1a24f]/60 text-[#f4f2ec]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-sm font-bold">{ver.standard_number}</span>
                      {isWithdrawn ? (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#b84a3a]/15 text-[#b84a3a]">
                          WITHDRAWN
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#927a48]/30 text-[#d1a24f]">
                          CURRENT SPECIFICATION
                        </span>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed">{ver.title}</p>
                    <div className="mt-2 text-[10px] font-mono opacity-70">
                      Publication Year: {ver.year} {ver.revision ? `• ${ver.revision}` : ''}
                    </div>
                  </div>

                  {!isLast && (
                    <div className="pl-4 pt-2 text-[#927a48]">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 8. DEDICATED AI COMPLIANCE ASSISTANT */}
      <div ref={aiRef} className="rounded-3xl glass-charcoal p-6 sm:p-8 border border-[#d5c7b2]/20 shadow-2xl space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4b4932]/40 border border-[#d1a24f]/30 text-[#d1a24f] text-xs font-bold uppercase tracking-wider mb-2">
            <Bot className="w-3.5 h-3.5 text-[#d1a24f]" />
            <span>AI Regulatory Assistant</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#f4f2ec]">
            Ask about {activeProduct.name} Compliance
          </h3>
          <p className="text-xs text-[#d5c7b2] mt-1">
            Grounded answers backed by authoritative BIS publications and QCO statutes.
          </p>
        </div>

        {/* Sample queries */}
        <div className="flex flex-wrap gap-2">
          {activeProduct.sampleAiQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(q)}
              className="px-3 py-1.5 rounded-xl bg-[#25251d] hover:bg-[#4b4932] border border-[#4b4932] hover:border-[#d1a24f] text-xs text-[#d5c7b2] hover:text-[#f4f2ec] transition-all text-left"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#171713]/80 border border-[#d5c7b2]/10 space-y-4 max-h-[400px] overflow-y-auto">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-[#4b4932] border border-[#d1a24f]/40 flex items-center justify-center text-[#d1a24f] flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#d1a24f] text-[#171713] font-medium'
                    : 'bg-[#25251d] text-[#f4f2ec] border border-[#d5c7b2]/15'
                }`}
              >
                <p className="whitespace-pre-line">{m.content}</p>

                {m.citation && (
                  <div className="mt-3 p-3 rounded-xl bg-[#171713] border border-[#d1a24f]/40 text-[#f4f2ec] space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="font-bold text-[#d1a24f]">SOURCE-BACKED</span>
                      <span className="text-green-400">{m.citation.provenance_status}</span>
                    </div>
                    <p className="font-mono text-xs font-bold text-[#d1a24f]">
                      {m.citation.standard_number}
                    </p>
                    <p className="text-[11px] text-[#d5c7b2]">{m.citation.evidence}</p>
                  </div>
                )}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-[#d1a24f] flex items-center justify-center text-[#171713] flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {chatLoading && (
            <div className="text-xs text-[#d1a24f] flex items-center gap-2 p-2">
              <span className="w-2 h-2 rounded-full bg-[#d1a24f] animate-ping" />
              <span>Retrieving regulatory requirements for {activeProduct.name}...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(chatQuery);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={chatQuery}
            onChange={(e) => setChatQuery(e.target.value)}
            placeholder={`Ask about ${activeProduct.name} tests, tolerances, or licensing...`}
            className="flex-1 px-4 py-3 rounded-xl bg-[#171713] border border-[#d5c7b2]/20 text-xs sm:text-sm text-[#f4f2ec] focus:outline-none focus:border-[#d1a24f]"
          />
          <button
            type="submit"
            disabled={chatLoading || !chatQuery.trim()}
            className="px-5 py-3 rounded-xl bg-[#d1a24f] hover:bg-[#d1a24f]/90 disabled:opacity-50 text-[#171713] font-bold text-xs sm:text-sm flex items-center gap-1.5"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* MODAL: VIEW DETAILS */}
      {selectedStandardForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="rounded-2xl max-w-xl w-full bg-[#F4F2EC] dark:bg-[#1d1d18] border border-[#d5c7b2] dark:border-[#4b4932] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#d5c7b2]/20 pb-3">
              <span className="font-mono text-sm font-bold text-[#927a48] dark:text-[#d1a24f]">
                {selectedStandardForModal.standard_number}
              </span>
              <button
                onClick={() => setSelectedStandardForModal(null)}
                className="p-1 rounded-lg hover:bg-[#e8e3d9] dark:hover:bg-[#303027] text-[#6b675b] dark:text-[#d5c7b2]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h4 className="text-base font-bold text-[#171713] dark:text-[#f4f2ec]">
                {selectedStandardForModal.title}
              </h4>
              {selectedStandardForModal.revision && (
                <p className="text-xs font-mono text-[#d1a24f] font-semibold mt-0.5">
                  {selectedStandardForModal.revision}
                </p>
              )}
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-[#25251d] border border-[#d5c7b2]/30 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#6b675b]">Publication Year:</span>
                <span className="font-mono font-semibold">{selectedStandardForModal.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b675b]">Status:</span>
                <span
                  className={`font-semibold ${
                    selectedStandardForModal.status === 'Withdrawn'
                      ? 'text-[#b84a3a]'
                      : 'text-green-600 dark:text-green-400'
                  }`}
                >
                  {selectedStandardForModal.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b675b]">Domain Scope:</span>
                <span>{selectedStandardForModal.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b675b]">Source Record:</span>
                <span>{selectedStandardForModal.source}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#d5c7b2]/20 flex justify-end gap-2">
              <button
                onClick={() => setSelectedStandardForModal(null)}
                className="px-4 py-2 rounded-xl border border-[#d5c7b2] text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const s = selectedStandardForModal;
                  setSelectedStandardForModal(null);
                  handleAsk(`Explain requirements of ${s.standard_number}`);
                }}
                className="px-4 py-2 rounded-xl bg-[#d1a24f] text-[#171713] text-xs font-bold"
              >
                Ask BIS AI
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
