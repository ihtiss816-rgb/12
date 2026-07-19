import Link from 'next/link';
import { MapPin, Phone, Mail, MessageCircle, Shield, Award, Truck, Globe } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '818089227375';

const quickLinks = [
  { href: '/cars', label: 'Browse All Cars' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

const popularMakes = ['Toyota', 'Nissan', 'Honda', 'Mazda', 'Subaru', 'Mitsubishi', 'Lexus', 'Suzuki'];

const trustBadges = [
  { icon: Shield, label: 'Verified Exporter', desc: 'Licensed & bonded' },
  { icon: Award, label: '10+ Years Experience', desc: 'In Japanese exports' },
  { icon: Truck, label: 'Global Shipping', desc: 'RORO & Container' },
  { icon: Globe, label: 'Worldwide Delivery', desc: '50+ destinations' },
];

export default function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP}`;

  return (
    <footer className="bg-[#080808] border-t border-white/5">
      {/* Trust Badges Strip */}
      <div className="border-b border-white/5 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-brand-red/10 border border-brand-red/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-brand-red" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{label}</div>
                  <div className="text-brand-gray text-xs">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="w-10 h-10 bg-brand-red flex items-center justify-center rounded-sm">
                  <span className="text-white font-black text-lg tracking-tighter">W</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-brand-gold rounded-sm" />
              </div>
              <div className="leading-none">
                <div className="text-white font-black text-base tracking-tight uppercase">Wazir Trading</div>
                <div className="text-brand-gold text-[9px] font-semibold tracking-[0.2em] uppercase">LLC</div>
              </div>
            </Link>
            <p className="text-brand-gray text-sm leading-relaxed mb-6">
              Premium Japanese used vehicle exporter. Sourcing quality cars directly from Japan with transparent pricing and reliable global shipping.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white px-4 py-2.5 rounded-sm text-sm font-semibold transition-all duration-200"
            >
              <MessageCircle size={15} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-brand-red" />
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-gray hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-red/50 group-hover:bg-brand-red rounded-full transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Makes */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-brand-red" />
              Popular Makes
            </h4>
            <ul className="space-y-2.5">
              {popularMakes.map((make) => (
                <li key={make}>
                  <Link
                    href={`/cars?make=${make}`}
                    className="text-brand-gray hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-red/50 group-hover:bg-brand-red rounded-full transition-colors flex-shrink-0" />
                    {make}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-brand-red" />
              Japan Office
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={15} className="text-brand-red flex-shrink-0 mt-0.5" />
                <div className="text-brand-gray text-sm leading-relaxed">
                  Heights Mizutani 1C, 158-1 Jizou,<br />
                  Kuwana-City, Mie-Pref, Japan
                </div>
              </li>
              <li className="flex gap-3">
                <Phone size={15} className="text-brand-red flex-shrink-0 mt-0.5" />
                <div className="text-brand-gray text-sm">
                  <div>+81-50-3740-8980</div>
                  <div>+81-80-8922-7375</div>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={15} className="text-brand-red flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:wazirtrading-pc@outlook.jp"
                  className="text-brand-gray hover:text-white text-sm transition-colors"
                >
                  wazirtrading-pc@outlook.jp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-[#060606]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-brand-gray-dark text-xs">
            © {new Date().getFullYear()} Wazir Trading LLC. All rights reserved.
          </p>
          <p className="text-brand-gray-dark text-xs">
            Japanese Vehicles Exporting · Yokohama & Nagoya Port
          </p>
        </div>
      </div>
    </footer>
  );
}
