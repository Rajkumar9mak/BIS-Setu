import React from 'react';
import Link from 'next/link';
import {
  Cpu,
  Search,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  HelpCircle,
  ArrowUpRight
} from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: React.ElementType;
  badge: string;
}

export const CORE_FEATURES: FeatureItem[] = [
  {
    id: 'ai-assistant',
    title: 'AI Standards Assistant',
    description: 'Ask questions about Indian Standards and receive evidence-backed answers.',
    link: '/copilot',
    icon: Cpu,
    badge: 'Clause RAG'
  },
  {
    id: 'standards-discovery',
    title: 'Smart Standards Discovery',
    description: 'Describe your product and discover potentially applicable standards.',
    link: '/industry',
    icon: Search,
    badge: 'Semantic Matching'
  },
  {
    id: 'compliance-guidance',
    title: 'Compliance Guidance',
    description: 'Understand certification schemes, requirements and procedures.',
    link: '/industry',
    icon: CheckCircle2,
    badge: '7-Step Roadmap'
  },
  {
    id: 'product-verification',
    title: 'Product Verification',
    description: 'Verify BIS certification information before you buy or use a product.',
    link: '/consumer',
    icon: ShieldCheck,
    badge: 'Instant QR / CM-L'
  },
  {
    id: 'lab-finder',
    title: 'Laboratory Finder',
    description: 'Discover relevant testing laboratory information.',
    link: '/labs',
    icon: MapPin,
    badge: 'Accredited Directory'
  },
  {
    id: 'consumer-assistance',
    title: 'Consumer Assistance',
    description: 'Understand BIS marks, certification and consumer-related services.',
    link: '/consumer',
    icon: HelpCircle,
    badge: 'Statutory Safety'
  }
];

export default function FeatureSection() {
  return (
    <section className="relative py-20 bg-[#f4f2ec] dark:bg-[#25251d] text-[#171713] dark:text-[#f4f2ec] rounded-[36px] my-12 overflow-hidden shadow-2xl transition-colors">
      {/* Decorative Warm Background Pattern */}
      <div className="absolute inset-0 bg-ivory-mesh dark:bg-earthy-mesh opacity-80 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d5c7b2]/50 dark:bg-[#4b4932]/60 border border-[#927a48]/30 dark:border-[#d1a24f]/30 text-[#4b4932] dark:text-[#d1a24f] text-xs font-bold uppercase tracking-wider">
            <span>Modular Regulatory Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#171713] dark:text-[#f4f2ec] tracking-tight">
            Everything you need to navigate BIS.
          </h2>
          <p className="text-sm sm:text-base text-[#4b4932] dark:text-[#d5c7b2] leading-relaxed font-normal">
            Whether manufacturing a new product, seeking laboratory testing, or verifying an ISI mark on a consumer purchase.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.id}
                href={feature.link}
                className="group relative rounded-[26px] bg-white dark:bg-[#171713] p-7 border-2 border-[#927a48]/25 dark:border-[#4b4932] hover:border-[#d1a24f] hover:shadow-2xl hover:shadow-[#927a48]/15 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#927a48]/15 border border-[#927a48]/30 text-[#927a48] group-hover:text-[#d1a24f] group-hover:bg-[#4b4932] flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#d5c7b2]/40 dark:bg-[#4b4932]/60 text-[#4b4932] dark:text-[#d5c7b2] border border-[#927a48]/20">
                      {feature.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-[#171713] dark:text-[#f4f2ec] group-hover:text-[#927a48] dark:group-hover:text-[#d1a24f] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-[#4b4932] dark:text-[#d5c7b2] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-[#d5c7b2]/40 dark:border-[#4b4932] flex items-center justify-between text-xs font-bold text-[#927a48] group-hover:text-[#d1a24f] transition-colors">
                  <span>Explore Feature</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
