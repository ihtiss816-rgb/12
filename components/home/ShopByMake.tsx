'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const brands = [
  'Toyota',
  'Nissan',
  'Honda',
  'Mazda',
  'Mitsubishi',
  'Subaru',
  'Suzuki',
  'Daihatsu',
  'Lexus',
  'Isuzu',
];

export default function ShopByMake({ counts }: { counts: Record<string, number> }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -320 : 320,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-16 bg-brand-dark-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">
              Browse Brands
            </div>
            <h2 className="text-white font-black text-2xl sm:text-4xl tracking-tight">
              Shop By Make
            </h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-sm border border-white/15 text-white hover:bg-brand-red hover:border-brand-red flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-sm border border-white/15 text-white hover:bg-brand-red hover:border-brand-red flex items-center justify-center transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x scroll-smooth"
        >
          {brands.map((brand) => (
            <Link
              key={brand}
              href={`/cars?make=${encodeURIComponent(brand)}`}
              className="group flex-shrink-0 w-40 snap-start bg-brand-dark border border-white/10 rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:border-brand-red/40 transition-colors"
            >
              <span className="text-white font-black text-xl tracking-tight group-hover:text-brand-red transition-colors">
                {brand}
              </span>
              <span className="text-brand-gray text-xs uppercase tracking-widest">
                {counts[brand] ?? 0} in stock
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
