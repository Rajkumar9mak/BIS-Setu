import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'BIS SETU — AI Indian Standards Assistant & Product Verification Engine',
  description: 'AI-powered compliance roadmap wizard for manufacturers and instant QR/CM-L counterfeit verification engine for consumers, backed by grounded Indian Standards (BIS) RAG.',
  keywords: 'BIS, Indian Standards, ISI Mark, CM/L, Smart India Hackathon, Compliance Wizard, Counterfeit Detection, Manakonline, e-BIS',
  authors: [{ name: 'BIS Setu Initiative' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-mesh-gradient flex flex-col min-h-screen font-['Plus_Jakarta_Sans',sans-serif] antialiased selection:bg-amber-500/30 selection:text-amber-200">
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
