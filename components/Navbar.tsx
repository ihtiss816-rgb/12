'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle, ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/cars', label: 'Browse Cars' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '818089227375';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const whatsappUrl = `https://wa.me/${WHATSAPP}`;

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#0A0A0A]/98 backdrop-blur-md shadow-[0_2px_30px_rgba(0,0,0,0.5)] border-b border-white/5'
          : 'bg-[#0A0A0A]/90 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              <div className="w-11 h-11 bg-brand-red flex items-center justify-center rounded-sm transform rotate-0 group-hover:rotate-3 transition-transform duration-300">
                <span className="text-white font-black text-xl tracking-tighter">W</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-brand-gold rounded-sm" />
            </div>
            <div className="leading-none">
              <div className="text-white font-black text-lg tracking-tight uppercase">Wazir Trading</div>
              <div className="text-brand-gold text-[10px] font-semibold tracking-[0.2em] uppercase">Japanese Vehicles Exporting</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-sm relative group ${
                  pathname === link.href
                    ? 'text-brand-red'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-red rounded-full" />
                )}
                {pathname !== link.href && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-red/60 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:+81503740-8980`}
              className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
            >
              <Phone size={14} />
              <span>+81-50-3740-8980</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-2 rounded-sm text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0D0D0D] border-t border-white/5 px-4 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'text-brand-red bg-brand-red/10'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-3">
            <a
              href={`tel:+81503740-8980`}
              className="flex items-center gap-2 text-white/70 text-sm px-4"
            >
              <Phone size={14} />
              +81-50-3740-8980
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-sm text-sm font-semibold"
            >
              <MessageCircle size={15} />
              Contact on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
