'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import CountUp from './CountUp';

const stats = [
  { value: 30000, suffix: '+', label: 'Cars' },
  { value: 50, suffix: '+', label: 'Countries' },
  { value: 5, suffix: '+', label: 'Years' },
  { value: 100, suffix: '%', label: 'Verified' },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-brand-dark">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/50" />
        <div className="absolute inset-0 bg-hero-gradient opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-red" />
            <span className="text-xs font-semibold uppercase tracking-widest text-white/90">
              Japan-Based · Worldwide Export
            </span>
          </div>

          <h1 className="mb-6 text-balance text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
            Japanese Cars — <span className="text-brand-red">Exported Worldwide</span>
          </h1>

          <p className="mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-white/70 sm:text-xl">
            Buy directly from Japan auctions. Export to 130+ countries.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/cars"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-brand-red px-8 py-4 font-semibold text-white transition-all duration-200 hover:bg-brand-red-light hover:shadow-[0_0_30px_rgba(204,0,0,0.4)]"
            >
              Browse Cars
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/25 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
            >
              <FileText size={18} />
              Get a Quote
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              >
                <div className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-brand-gray">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
