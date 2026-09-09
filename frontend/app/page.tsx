'use client';

import React from 'react';
import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import FeatureSection from '@/components/FeatureCard';
import AIChatSection from '@/components/AIChatSection';
import TraceabilitySection from '@/components/TraceabilitySection';
import StandardsSearchSection from '@/components/StandardsSearchSection';
import ComplianceRoadmap from '@/components/ComplianceRoadmap';
import ConsumerVerificationSection from '@/components/ConsumerVerificationSection';
import DashboardPreviewSection from '@/components/DashboardPreviewSection';
import LabFinderSection from '@/components/LabFinderSection';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden space-y-4">
      {/* 1. Hero Section (Deep Charcoal) */}
      <Hero />

      {/* 2. Trust Statistics Bar (Glass / Olive) */}
      <StatsSection />

      {/* 3. Core Features (Warm Ivory) */}
      <FeatureSection />

      {/* 4. AI Assistant Section (Deep Charcoal) */}
      <AIChatSection />

      {/* 5. Traceability Flow Pipeline (Deep Charcoal / Gold) */}
      <TraceabilitySection />

      {/* 6. Standards Discovery (Warm Ivory) */}
      <StandardsSearchSection />

      {/* 7. Industry Compliance Connected Roadmap (Dark Olive) */}
      <ComplianceRoadmap />

      {/* 8. Consumer Verification (Warm Ivory) */}
      <ConsumerVerificationSection />

      {/* 9. Compliance Dashboard Preview (Deep Charcoal / Dark Olive) */}
      <DashboardPreviewSection />

      {/* 10. Lab Finder Preview (Warm Ivory) */}
      <LabFinderSection />
    </div>
  );
}
