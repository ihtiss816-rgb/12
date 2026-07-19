'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Check, Car } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { CarWithImages } from '@/lib/types';
import Reveal from '@/components/Reveal';
import SectionHeading from './SectionHeading';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '818089227375';
const FALLBACK = 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200';

export default function FeaturedCars() {
  const [cars, setCars] = useState<CarWithImages[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('cars')
        .select('*, car_images(*)')
        .eq('featured', true)
        .eq('status', 'Available')
        .order('price_usd', { ascending: false })
        .limit(8);
      setCars((data as CarWithImages[]) || []);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="section-padding bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-10">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-red">
              Featured Collection
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-balance text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Premium vehicles from Japan
              </h2>
              <div className="flex flex-wrap gap-3">
                {['Quality Guaranteed', 'Best Price'].map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-xs font-semibold text-brand-gold"
                  >
                    <Check size={13} />
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {loading ? (
          <div className="-mx-4 flex gap-6 overflow-hidden px-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-96 w-80 flex-shrink-0 animate-pulse rounded-xl bg-brand-dark-2" />
            ))}
          </div>
        ) : cars.length > 0 ? (
          <div className="-mx-4 flex snap-x gap-6 overflow-x-auto px-4 pb-4 [scrollbar-width:thin]">
            {cars.map((car, i) => {
              const img =
                car.car_images?.find((im) => im.is_primary)?.url || car.car_images?.[0]?.url || FALLBACK;
              const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                `Hi Wazir Trading, I'm interested in ${car.ref_number} — ${car.year} ${car.make} ${car.model}.`,
              )}`;
              return (
                <Reveal key={car.id} delay={i * 0.06}>
                  <div className="group flex w-80 flex-shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-white/5 bg-brand-dark-2 transition-colors duration-300 hover:border-brand-red/40">
                    <div className="relative aspect-[16/10] overflow-hidden bg-brand-dark-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${car.year} ${car.make} ${car.model}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute left-3 top-3 rounded-sm bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                        {car.year}
                      </span>
                      {car.engine_cc && (
                        <span className="absolute right-3 top-3 rounded-sm bg-brand-red/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                          {car.engine_cc} cc
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <Link href={`/cars/${car.ref_number}`}>
                        <h3 className="text-balance text-lg font-bold leading-tight tracking-tight text-white transition-colors hover:text-brand-red">
                          {car.make} {car.model}
                        </h3>
                      </Link>
                      <p className="mt-0.5 text-xs uppercase tracking-wider text-brand-gray">
                        {car.ref_number}
                        {car.body_type ? ` · ${car.body_type}` : ''}
                      </p>

                      <div className="mt-3">
                        <div className="text-2xl font-black tracking-tight text-brand-red">
                          ${car.price_usd.toLocaleString()}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-brand-gray-dark">
                          F.O.B Japan
                        </div>
                      </div>

                      <div className="mt-auto flex items-center gap-2 pt-5">
                        <Link
                          href={`/cars/${car.ref_number}`}
                          className="flex-1 rounded-sm bg-brand-red px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-red-light"
                        >
                          Inquire Now
                        </Link>
                        <a
                          href={wa}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`WhatsApp about ${car.make} ${car.model}`}
                          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm bg-[#25D366] text-white transition-colors hover:bg-[#20BA5A]"
                        >
                          <MessageCircle size={17} />
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center">
            <Car size={44} className="mx-auto mb-4 text-brand-gray-dark" />
            <p className="text-brand-gray">Featured inventory is being updated. Please check back soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}
