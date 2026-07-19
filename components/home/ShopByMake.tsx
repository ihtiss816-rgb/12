'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Reveal from '@/components/Reveal';
import SectionHeading from './SectionHeading';

const makes = [
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

export default function ShopByMake() {
  const scroller = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('cars').select('make').eq('status', 'Available');
      const tally: Record<string, number> = {};
      (data || []).forEach((row: { make: string }) => {
        tally[row.make] = (tally[row.make] || 0) + 1;
      });
      setCounts(tally);
    })();
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    scroller.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <section className="section-padding bg-brand-dark-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <Reveal>
            <SectionHeading eyebrow="Browse Brands" title="Shop By Make" className="mb-0" />
          </Reveal>
          <div className="hidden flex-shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-white transition-colors hover:border-brand-red/40 hover:text-brand-red"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-white transition-colors hover:border-brand-red/40 hover:text-brand-red"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <Reveal>
          <div
            ref={scroller}
            className="-mx-4 mt-8 flex snap-x gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {makes.map((make) => (
              <Link
                key={make}
                href={`/cars?make=${encodeURIComponent(make)}`}
                className="group flex w-44 flex-shrink-0 snap-start flex-col justify-between gap-4 rounded-lg border border-white/5 bg-brand-dark p-6 transition-colors duration-300 hover:border-brand-red/40"
              >
                <span className="text-xl font-black uppercase tracking-tight text-white group-hover:text-brand-red">
                  {make}
                </span>
                <span className="text-xs uppercase tracking-widest text-brand-gray">
                  <span className="font-bold text-brand-gold">{counts[make] ?? 0}</span> in stock
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
