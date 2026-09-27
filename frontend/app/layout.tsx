import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'BIS-Setu — AI Intelligent Assistant for Indian Standards (BIS)',
  description: 'Grounded AI Assistant for the Bureau of Indian Standards (BIS). Discover Indian Standards, navigate certification schemes, verify authentic ISI/CM-L marks, and locate testing laboratories.',
  keywords: 'BIS, Indian Standards, ISI Mark, CM/L, Quality Control Orders, BIS-Setu, Manakonline, e-BIS, Certification Roadmap, Conformity Assessment',
  authors: [{ name: 'BIS-Setu Initiative' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  if (stored === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else if (stored === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                      document.documentElement.classList.remove('dark');
                    } else {
                      document.documentElement.classList.add('dark');
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F7F8FA] dark:bg-[#171812] text-[#111827] dark:text-[#F4F1E8] flex flex-col min-h-screen font-['Inter',system-ui,sans-serif] antialiased selection:bg-[#C49A45]/20 dark:selection:bg-[#D4AF62]/30 selection:text-[#C49A45] dark:selection:text-[#F4F1E8] transition-colors duration-200">
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
