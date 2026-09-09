'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  Sparkles,
  BookOpen,
  CheckCircle,
  Search,
  MapPin,
  Cpu,
  ArrowRight,
  Sun,
  Moon,
  Shapes
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check localStorage or document class
    try {
      const stored = localStorage.getItem('theme');
      const root = document.documentElement;
      if (stored === 'light') {
        root.classList.remove('dark');
        setIsDark(false);
      } else if (stored === 'dark') {
        root.classList.add('dark');
        setIsDark(true);
      } else if (root.classList.contains('dark')) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    } catch {
      // Fallback
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch {}
      setIsDark(false);
    } else {
      root.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch {}
      setIsDark(true);
    }
  };

  const navLinks = [
    { href: '/industry', label: 'Standards', icon: BookOpen },
    { href: '/industry', label: 'Compliance', icon: CheckCircle },
    { href: '/consumer', label: 'Verify Product', icon: Search },
    { href: '/labs', label: 'Labs', icon: MapPin },
    { href: '/copilot', label: 'AI Assistant', icon: Cpu, badge: 'Grounded' },
  ];

  return (
    <header className="sticky top-4 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl glass-charcoal border border-[#d5c7b2]/20 dark:border-[#d5c7b2]/20 px-4 sm:px-6 py-3 transition-all duration-300 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between">
          {/* Left: BIS-Setu Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#927a48] to-[#4b4932] border border-[#d1a24f]/40 text-[#f4f2ec] shadow-md group-hover:border-[#d1a24f] transition-all">
              <Shield className="w-5 h-5 text-[#d1a24f] stroke-[2.2]" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d1a24f] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d1a24f]"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-[#171713] dark:text-[#f4f2ec] group-hover:text-[#d1a24f] transition-colors">
                  BIS-Setu
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase bg-[#4b4932]/15 dark:bg-[#4b4932]/60 text-[#927a48] dark:text-[#d1a24f] border border-[#d1a24f]/30 rounded-md">
                  Official Bridge
                </span>
              </div>
              <p className="text-[10px] font-medium text-[#6b675b] dark:text-[#d5c7b2]/80 tracking-wide">
                Indian Standards, Simplified
              </p>
            </div>
          </Link>

          {/* Center: Main Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, idx) => {
              const Icon = link.icon;
              const isActive = pathname === link.href && (link.label !== 'Standards' || pathname !== '/industry');
              return (
                <Link
                  key={idx}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'text-[#171713] dark:text-[#d1a24f] bg-[#d1a24f]/25 dark:bg-[#4b4932]/60 border border-[#d1a24f]/40 shadow-sm font-bold'
                      : 'text-[#4b4932] dark:text-[#f4f2ec]/80 hover:text-[#171713] dark:hover:text-[#f4f2ec] hover:bg-[#d5c7b2]/30 dark:hover:bg-[#4b4932]/40 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-80" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider bg-[#d1a24f]/20 text-[#927a48] dark:text-[#d1a24f] border border-[#d1a24f]/30 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Quick Portals, Theme Toggle & Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Segment Links */}
            <div className="hidden sm:flex items-center bg-[#e8e3d9]/70 dark:bg-[#4b4932]/40 border border-[#d5c7b2]/40 dark:border-[#d5c7b2]/10 rounded-xl p-1 text-xs font-semibold">
              <Link
                href="/industry"
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  pathname === '/industry'
                    ? 'bg-[#927a48] text-[#ffffff]'
                    : 'text-[#4b4932] dark:text-[#d5c7b2] hover:text-[#171713] dark:hover:text-[#f4f2ec]'
                }`}
              >
                Industry
              </Link>
              <Link
                href="/consumer"
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  pathname === '/consumer'
                    ? 'bg-[#927a48] text-[#ffffff]'
                    : 'text-[#4b4932] dark:text-[#d5c7b2] hover:text-[#171713] dark:hover:text-[#f4f2ec]'
                }`}
              >
                Consumer
              </Link>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode (#F4F2EC)' : 'Switch to Dark Mode (#171713)'}
              className="p-2 rounded-xl bg-[#e8e3d9]/80 dark:bg-[#4b4932]/40 hover:bg-[#d5c7b2] dark:hover:bg-[#4b4932]/70 text-[#927a48] dark:text-[#d1a24f] border border-[#d5c7b2]/50 dark:border-[#d5c7b2]/15 transition-all shadow-sm"
              aria-label="Toggle Theme Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#d1a24f]" /> : <Moon className="w-4 h-4 text-[#4b4932]" />}
            </button>

            {/* Primary Action Button */}
            <Link
              href="/copilot"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#171713] bg-[#d1a24f] hover:bg-[#e0b25e] hover:shadow-lg hover:shadow-[#d1a24f]/25 hover:-translate-y-0.5 active:translate-y-0 rounded-xl transition-all"
            >
              <span>Ask BIS AI</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#171713]" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
