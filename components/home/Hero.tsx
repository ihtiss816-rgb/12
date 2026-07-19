'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import CountUp from './CountUp';

const stats = [
  { end: 30000, suffix: '+', label: 'Cars' },
  { end: 50, suffix: '+', label: 'Countries' },
  { end: 5, suffix: '+', label: 'Years' },
  { end: 100, suffix: '%', label: 'Verified' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-dark">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(204,0,0,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/30 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
            <span className="text-white/90 text-xs font-semibold uppercase tracking-widest">
              Japan-Based · Worldwide Export
            </span>
          </div>

          <h1 className="text-white font-black text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 text-balance">
            Japanese Cars <span className="text-brand-red">&mdash;</span> Exported Worldwide
          </h1>

          <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10 text-pretty">
            Buy directly from Japan auctions. Export to 130+ countries.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cars"
              className="group inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-light text-white px-8 py-4 rounded-sm font-semibold transition-all duration-200 hover:shadow-[0_0_30px_rgba(204,0,0,0.4)]"
            >
              Browse Cars
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 border border-white/40 text-white px-8 py-4 rounded-sm font-semibold transition-all duration-200"
            >
              <FileText size={18} />
              Get a Quote
            </Link>
          </div>
        </motion.div>

        {/* Animated stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/10 max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
            >
              <div className="text-white font-black text-2xl sm:text-4xl tracking-tight">
                <CountUp end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-brand-gray text-xs uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
