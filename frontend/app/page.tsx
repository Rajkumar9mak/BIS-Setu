'use client';

import React from 'react';
import Hero from '@/components/homepage/Hero';
import TrustStats from '@/components/homepage/TrustStats';
import FeatureGrid from '@/components/homepage/FeatureGrid';
import StandardSearch from '@/components/homepage/StandardSearch';
import ComplianceWorkflow from '@/components/homepage/ComplianceWorkflow';
import ProductVerification from '@/components/homepage/ProductVerification';
import BISAI from '@/components/homepage/BISAI';
import LaboratorySearch from '@/components/homepage/LaboratorySearch';
import LatestUpdates from '@/components/homepage/LatestUpdates';
import AudienceSection from '@/components/homepage/AudienceSection';
import FinalCTA from '@/components/homepage/FinalCTA';

export default function HomePage() {
  return (
    <div className="relative bg-[#F7F8FA] dark:bg-[#171812] text-[#111827] dark:text-[#F4F1E8] min-h-screen overflow-hidden transition-colors duration-200">
      {/* 1. Large Two-Column Hero with BIS-Setu Service Hub */}
      <Hero />

      {/* 2. Platform Trust & Scope Indicators */}
      <TrustStats />

      {/* 3. Comprehensive Feature Overview (2x3 Grid) */}
      <FeatureGrid />

      {/* 4. Standards Discovery & Fast Search */}
      <StandardSearch />

      {/* 5. Horizontal Compliance Workflow (Product -> Compliance) */}
      <ComplianceWorkflow />

      {/* 6. Product Verification & Anti-Counterfeit Preview */}
      <ProductVerification />

      {/* 7. Source-Grounded BIS AI Assistant Preview */}
      <BISAI />

      {/* 8. NABL Accredited Testing Laboratories Search */}
      <LaboratorySearch />

      {/* 9. Gazette Notifications & Regulatory Updates */}
      <LatestUpdates />

      {/* 10. Audience Split: Industry vs Consumer */}
      <AudienceSection />

      {/* 11. Final High-Impact Gold Glow Call-to-Action */}
      <FinalCTA />
    </div>
  );
}
