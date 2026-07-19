import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Wazir Trading LLC — Japanese Vehicles Exporting',
  description:
    'Premium Japanese used car exporter. Buy quality vehicles directly from Japan with transparent pricing, reliable shipping to worldwide destinations.',
  keywords: 'Japanese used cars, Japan car export, RORO shipping, JDM cars, Wazir Trading',
  openGraph: {
    title: 'Wazir Trading LLC — Japanese Vehicles Exporting',
    description: 'Premium Japanese used car exporter. Quality vehicles shipped worldwide.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-brand-dark text-white antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
