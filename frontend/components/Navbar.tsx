'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  BookOpen,
  CheckCircle,
  Search,
  MapPin,
  Cpu,
  ArrowRight,
  Sun,
  Moon,
  Home,
  Menu,
  X
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('theme');
      const root = document.documentElement;
      if (stored === 'dark') {
        root.classList.add('dark');
        setIsDark(true);
      } else if (stored === 'light') {
        root.classList.remove('dark');
        setIsDark(false);
      } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          root.classList.add('dark');
          setIsDark(true);
        } else {
          root.classList.remove('dark');
          setIsDark(false);
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  const setThemeMode = (mode: 'light' | 'dark') => {
    const root = document.documentElement;
    if (mode === 'light') {
      root.classList.remove('dark');
      setIsDark(false);
      try {
        localStorage.setItem('theme', 'light');
      } catch {}
    } else {
      root.classList.add('dark');
      setIsDark(true);
      try {
        localStorage.setItem('theme', 'dark');
      } catch {}
    }
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/standards', label: 'Standards', icon: BookOpen },
    { href: '/compliance', label: 'Compliance', icon: CheckCircle },
    { href: '/verify', label: 'Verify Product', icon: Search },
    { href: '/labs', label: 'Labs', icon: MapPin },
    { href: '/ai', label: 'AI Assistant', icon: Cpu, badge: 'GROUNDED' },
  ];

  return (
    <header className="sticky top-3 sm:top-4 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-[20px] bg-white/95 dark:bg-[#1D1E18]/95 border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.22)] px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 shadow-[0_2px_12px_rgba(15,23,42,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 lg:gap-8">
            {/* Left: BIS-Setu Logo & Subtitle */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFF8E7] to-[#F1F5F9] dark:from-[#2D2E24] dark:to-[#171812] border border-[#C49A45]/30 dark:border-[#D4AF62]/40 shadow-sm group-hover:border-[#C49A45] dark:group-hover:border-[#D4AF62] transition-all">
                <Shield className="w-5 h-5 text-[#C49A45] dark:text-[#D4AF62] stroke-[2.2]" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C49A45] dark:bg-[#D4AF62] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C49A45] dark:bg-[#D4AF62]"></span>
                </span>
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-[#111827] dark:text-[#F4F1E8] group-hover:text-[#C49A45] dark:group-hover:text-[#D4AF62] transition-colors block">
                  BIS-Setu
                </span>
                <p className="text-[10px] font-medium text-[#64748B] dark:text-[#969287] tracking-wide">
                  Indian Standards, Simplified
                </p>
              </div>
            </Link>

            {/* Center: Main Navigation Desktop immediately after branding */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, idx) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={idx}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'text-[#C49A45] bg-[#FFF8E7] border border-[#C49A45]/30 shadow-sm font-bold dark:text-[#F4F1E8] dark:bg-[#D4AF62]/20 dark:border-[#D4AF62]/45 dark:shadow-[0_0_15px_rgba(212,175,98,0.15)]'
                        : 'text-[#64748B] hover:text-[#111827] hover:bg-[#F1F5F9] border border-transparent dark:text-[#D5D0C4] dark:hover:text-[#F4F1E8] dark:hover:bg-[#23241C]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C49A45] dark:text-[#D4AF62]' : 'text-[#94A3B8] dark:text-[#969287]'}`} />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="ml-1 px-1.5 py-0.2 text-[8px] font-extrabold uppercase tracking-wider bg-[#FFF8E7] text-[#C49A45] border border-[#C49A45]/30 rounded-full dark:bg-[#D4AF62]/25 dark:text-[#D4AF62] dark:border-[#D4AF62]/35">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Theme Switcher & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Segmented Theme Switcher: Light / Dark */}
            <div className="flex items-center bg-[#F1F5F9] dark:bg-[#23241C] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.20)] rounded-xl p-1 text-xs">
              <button
                type="button"
                onClick={() => setThemeMode('light')}
                title="Switch to Light Mode"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold text-xs transition-all ${
                  mounted && !isDark
                    ? 'bg-white text-[#111827] shadow-sm font-bold border border-[#E5E7EB]'
                    : 'text-[#64748B] dark:text-[#969287] hover:text-[#111827] dark:hover:text-[#F4F1E8]'
                }`}
              >
                <Sun className={`w-3.5 h-3.5 ${mounted && !isDark ? 'text-[#C49A45]' : 'text-[#94A3B8]'}`} />
                <span className="hidden sm:inline">Light</span>
              </button>
              <button
                type="button"
                onClick={() => setThemeMode('dark')}
                title="Switch to Dark Mode"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold text-xs transition-all ${
                  mounted && isDark
                    ? 'bg-[#171812] text-[#D4AF62] shadow-sm font-bold border border-[rgba(212,175,98,0.30)]'
                    : 'text-[#64748B] dark:text-[#969287] hover:text-[#111827] dark:hover:text-[#F4F1E8]'
                }`}
              >
                <Moon className={`w-3.5 h-3.5 ${mounted && isDark ? 'text-[#D4AF62]' : 'text-[#94A3B8]'}`} />
                <span className="hidden sm:inline">Dark</span>
              </button>
            </div>

            {/* Primary Action Button */}
            <Link
              href="/ai"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#C49A45] hover:bg-[#B58936] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 rounded-xl transition-all dark:bg-gradient-to-r dark:from-[#D4AF62] dark:to-[#C9A55A] dark:hover:from-[#E0BD70] dark:hover:to-[#D4AF62] dark:text-[#171812]"
            >
              <span>Ask BIS AI</span>
              <ArrowRight className="w-3.5 h-3.5 text-white dark:text-[#171812]" />
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#F1F5F9] dark:bg-[#23241C] text-[#111827] dark:text-[#F4F1E8] border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.20)]"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-3 mt-3 border-t border-[#E5E7EB] dark:border-[rgba(212,175,98,0.15)] space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link, idx) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={idx}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold ${
                      isActive
                        ? 'text-[#C49A45] bg-[#FFF8E7] border border-[#C49A45]/30 dark:text-[#F4F1E8] dark:bg-[#D4AF62]/20 dark:border-[#D4AF62]/40'
                        : 'text-[#64748B] bg-[#F8FAFC] dark:text-[#D5D0C4] dark:bg-[#23241C]'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#C49A45] dark:text-[#D4AF62]" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="pt-2 flex items-center justify-between gap-2">
              <Link
                href="/industry"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 text-xs font-bold text-[#111827] bg-[#F1F5F9] dark:text-[#F4F1E8] dark:bg-[#23241C] rounded-xl border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.20)]"
              >
                Industry Portal
              </Link>
              <Link
                href="/consumer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 text-xs font-bold text-[#111827] bg-[#F1F5F9] dark:text-[#F4F1E8] dark:bg-[#23241C] rounded-xl border border-[#E5E7EB] dark:border-[rgba(212,175,98,0.20)]"
              >
                Consumer Portal
              </Link>
            </div>
            <Link
              href="/ai"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-[#C49A45] hover:bg-[#B58936] dark:text-[#171812] dark:bg-[#D4AF62] rounded-xl"
            >
              <span>Ask BIS AI →</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
