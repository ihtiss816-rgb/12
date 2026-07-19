'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, CheckCircle2, Car as CarIcon } from 'lucide-react';

const WHATSAPP = '818089227375';

export interface FeaturedCar {
  id: string;
  ref_number: string;
  make: string;
  model: string;
  year: number;
  engine_cc: number | null;
  fob_price_usd: number | null;
  image: string;
}

function CarCard({ car }: { car: FeaturedCar }) {
  const waText = encodeURIComponent(
    `Hello Wazir Trading, I'm interested in the ${car.year} ${car.make} ${car.model} (Ref: ${car.ref_number}). Please share more details.`,
  );

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="flex-shrink-0 w-72 snap-start bg-brand-dark border border-white/10 rounded-lg overflow-hidden hover:border-brand-red/40 transition-colors"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-dark-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={car.image || '/images/car-placeholder.png'}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-sm border border-white/10">
          {car.year}
        </span>
        {car.engine_cc ? (
          <span className="absolute top-3 right-3 bg-brand-red text-white text-[11px] font-bold px-2.5 py-1 rounded-sm">
            {car.engine_cc.toLocaleString()} cc
          </span>
        ) : null}
      </div>

      <div className="p-5">
        <div className="text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-1">
          {car.ref_number}
        </div>
        <h3 className="text-white font-bold text-base leading-tight mb-3 truncate">
          {car.make} {car.model}
        </h3>
        <div className="flex items-baseline gap-1.5 mb-4">
          <span className="text-brand-red font-black text-xl tracking-tight">
            {car.fob_price_usd != null ? `$${car.fob_price_usd.toLocaleString()}` : 'Ask price'}
          </span>
          <span className="text-brand-gray text-[10px] uppercase tracking-widest">FOB</span>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/contact?car=${encodeURIComponent(car.ref_number)}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brand-red hover:bg-brand-red-light text-white text-sm font-semibold px-3 py-2.5 rounded-sm transition-colors"
          >
            Inquire Now
            <ArrowRight size={15} />
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Message us on WhatsApp about the ${car.year} ${car.make} ${car.model}`}
            className="inline-flex items-center justify-center w-11 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-sm transition-colors"
          >
            <MessageCircle size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedCars({ cars }: { cars: FeaturedCar[] }) {
  return (
    <section className="py-16 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Featured Collection
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-white font-black text-2xl sm:text-4xl tracking-tight">
              Premium vehicles from Japan
            </h2>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 text-brand-gray text-xs font-medium">
                <CheckCircle2 size={15} className="text-green-500" />
                Quality Guaranteed
              </span>
              <span className="inline-flex items-center gap-1.5 text-brand-gray text-xs font-medium">
                <CheckCircle2 size={15} className="text-green-500" />
                Best Price
              </span>
            </div>
          </div>
        </div>

        {cars.length > 0 ? (
          <div className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card rounded-lg">
            <CarIcon size={44} className="text-brand-gray-dark mx-auto mb-4" />
            <p className="text-brand-gray">Featured inventory is being updated. Please check back soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}
