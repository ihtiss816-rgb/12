'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Award,
  Truck,
  Globe,
  CheckCircle2,
  Search,
  FileCheck,
  Ship,
  Car,
  Star,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { CarWithImages } from '@/lib/types';
import CarCard from '@/components/CarCard';
import Reveal from '@/components/Reveal';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '818089227375';

const heroStats = [
  { value: '500+', label: 'Cars Exported' },
  { value: '50+', label: 'Destinations' },
  { value: '10+', label: 'Years Experience' },
  { value: '100%', label: 'Verified Stock' },
];

const steps = [
  {
    icon: Search,
    title: 'Browse & Select',
    desc: 'Explore our verified inventory of quality Japanese vehicles. Filter by make, year, price, and specs to find your perfect match.',
  },
  {
    icon: FileCheck,
    title: 'Place Order',
    desc: 'Submit an inquiry or contact us on WhatsApp. Receive a detailed invoice with FOB price, shipping quote, and total cost breakdown.',
  },
  {
    icon: Ship,
    title: 'We Ship It',
    desc: 'Once payment is confirmed, we handle documentation, export clearance, and book your vehicle on the next available vessel.',
  },
  {
    icon: Car,
    title: 'Receive Delivery',
    desc: 'Track your shipment and receive your vehicle at your destination port. Full support until the keys are in your hands.',
  },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: 'Verified Stock Only',
    desc: 'Every vehicle is physically inspected. What you see is exactly what you get — no surprises, no hidden conditions.',
  },
  {
    icon: Award,
    title: 'Transparent Pricing',
    desc: 'Honest FOB pricing with no hidden fees. You see the full cost breakdown before committing to any purchase.',
  },
  {
    icon: Truck,
    title: 'Reliable Shipping',
    desc: 'RORO and container shipping to 50+ ports worldwide. We handle all export documentation and logistics.',
  },
  {
    icon: Globe,
    title: 'Global Network',
    desc: 'Trusted by importers across Africa, the Caribbean, South Asia, and Oceania. We speak your market.',
  },
];

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState<CarWithImages[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('cars')
        .select('*, car_images(*)')
        .eq('status', 'Available')
        .order('featured', { ascending: false })
        .limit(6);
      setFeaturedCars((data as CarWithImages[]) || []);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Japanese car export"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/30 px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
              <span className="text-white/90 text-xs font-semibold uppercase tracking-widest">
                Japan-Based · Worldwide Export
              </span>
            </div>

            <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-6">
              Japanese Cars,
              <br />
              <span className="text-brand-red">Exported Worldwide</span>
            </h1>

            <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10">
              Wazir Trading LLC sources premium Japanese vehicles directly from auctions and dealerships across Japan. Verified stock, transparent FOB pricing, and reliable shipping to your port.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/cars"
                className="group inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-light text-white px-8 py-4 rounded-sm font-semibold transition-all duration-200 hover:shadow-[0_0_30px_rgba(204,0,0,0.4)]"
              >
                Browse Inventory
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white px-8 py-4 rounded-sm font-semibold transition-all duration-200 backdrop-blur-sm"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/10">
              {heroStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                >
                  <div className="text-white font-black text-2xl sm:text-3xl tracking-tight">{stat.value}</div>
                  <div className="text-brand-gray text-xs uppercase tracking-widest mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-brand-red rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* FEATURED CARS */}
      <section className="section-padding bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-12">
            <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">Featured Inventory</div>
            <h2 className="text-white font-black text-3xl sm:text-5xl tracking-tight mb-4">
              Handpicked Vehicles
            </h2>
            <p className="text-brand-gray text-lg max-w-2xl mx-auto">
              A selection of our finest available stock. Every vehicle is inspected and ready for export.
            </p>
          </Reveal>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-brand-dark-2 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : featuredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.map((car, i) => (
                <Reveal key={car.id} delay={i * 0.08}>
                  <CarCard car={car} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Car size={48} className="text-brand-gray-dark mx-auto mb-4" />
              <p className="text-brand-gray">Inventory is being updated. Please check back soon.</p>
            </div>
          )}

          <Reveal className="text-center mt-12">
            <Link
              href="/cars"
              className="group inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white px-8 py-4 rounded-sm font-semibold transition-all duration-200"
            >
              View All Vehicles
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS PREVIEW */}
      <section className="section-padding bg-brand-dark-2 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-16">
            <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">Simple Process</div>
            <h2 className="text-white font-black text-3xl sm:text-5xl tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-brand-gray text-lg max-w-2xl mx-auto">
              Four straightforward steps from browsing to delivery at your port.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="relative group h-full">
                  <div className="absolute -top-3 -left-3 text-7xl font-black text-white/5 group-hover:text-brand-red/10 transition-colors duration-300">
                    {i + 1}
                  </div>
                  <div className="relative glass-card rounded-lg p-6 h-full hover:border-brand-red/30 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-sm bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-5">
                      <step.icon size={22} className="text-brand-red" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 tracking-tight">{step.title}</h3>
                    <p className="text-brand-gray text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <Link
              href="/how-it-works"
              className="group inline-flex items-center gap-2 text-brand-red hover:text-brand-red-light font-semibold transition-colors"
            >
              See full process details
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-padding bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">Why Wazir Trading</div>
              <h2 className="text-white font-black text-3xl sm:text-5xl tracking-tight mb-6">
                Built on Trust,
                <br />
                <span className="text-brand-gold">Driven by Quality</span>
              </h2>
              <p className="text-brand-gray text-lg leading-relaxed mb-8">
                We are a Japan-based exporter with direct access to all major auctions and dealerships. Our team physically inspects every vehicle before it enters our inventory, so you buy with complete confidence.
              </p>
              <div className="space-y-3 mb-8">
                {['Direct auction access in Japan', 'Physical inspection of every vehicle', 'Complete export documentation handled', 'Real-time shipping updates'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-brand-red flex-shrink-0" />
                    <span className="text-white/90 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white px-6 py-3 rounded-sm font-semibold transition-all duration-200"
              >
                Learn About Us
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>

            <div className="grid grid-cols-2 gap-4">
              {whyChooseUs.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.1}>
                  <div className="glass-card rounded-lg p-6 h-full hover:border-brand-red/30 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-sm bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-4">
                      <item.icon size={18} className="text-brand-red" />
                    </div>
                    <h3 className="text-white font-bold text-base mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-brand-gray text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / CTA */}
      <section className="section-padding bg-brand-dark-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} className="text-brand-gold fill-brand-gold" />
              ))}
            </div>
            <blockquote className="text-white text-2xl sm:text-3xl font-bold leading-relaxed tracking-tight mb-6">
              &ldquo;Wazir Trading made my first import completely stress-free. The car arrived exactly as described, and the shipping was faster than expected. Highly recommended.&rdquo;
            </blockquote>
            <div className="text-brand-gray text-sm uppercase tracking-widest">
              — Verified Importer, Mombasa, Kenya
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding bg-brand-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="glass-card rounded-2xl p-8 sm:p-12 text-center border-brand-red/20">
              <h2 className="text-white font-black text-3xl sm:text-4xl tracking-tight mb-4">
                Ready to Find Your Next Vehicle?
              </h2>
              <p className="text-brand-gray text-lg mb-8 max-w-2xl mx-auto">
                Browse our inventory or reach out directly. Our team responds within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/cars"
                  className="group inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-light text-white px-8 py-4 rounded-sm font-semibold transition-all duration-200 hover:shadow-[0_0_30px_rgba(204,0,0,0.4)]"
                >
                  Browse Cars
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white px-8 py-4 rounded-sm font-semibold transition-all duration-200"
                >
                  <Phone size={18} />
                  Contact Us
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
