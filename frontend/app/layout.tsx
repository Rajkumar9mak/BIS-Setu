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
    <html lang="en" className="dark scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  if (stored === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
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
      <body className="bg-earthy-mesh flex flex-col min-h-screen font-['Inter',system-ui,sans-serif] antialiased text-[#171713] dark:text-[#f4f2ec] selection:bg-[#d1a24f]/30 selection:text-[#f4f2ec] transition-colors duration-200">
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
