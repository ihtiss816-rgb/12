'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import {
  ArrowLeft,
  Gauge,
  Fuel,
  Settings,
  Calendar,
  Car as CarIcon,
  Palette,
  Cog,
  DoorOpen,
  Users,
  Ship,
  CheckCircle2,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { CarWithImages, ShippingRate } from '@/lib/types';
import Reveal from '@/components/Reveal';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '818089227375';

export default function CarDetailPage() {
  const params = useParams();
  const ref = params.ref as string;
  const [car, setCar] = useState<CarWithImages | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('cars')
        .select('*, car_images(*)')
        .eq('ref_number', ref)
        .maybeSingle();
      if (data) {
        setCar(data as CarWithImages);
        const { data: rates } = await supabase
          .from('shipping_rates')
          .select('*')
          .eq('active', true)
          .order('destination_country');
        setShippingRates((rates as ShippingRate[]) || []);
      }
      setLoading(false);
    })();
  }, [ref]);

  if (loading) {
    return (
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="aspect-[4/3] bg-brand-dark-2 animate-pulse rounded-lg" />
          <div className="space-y-4">
            <div className="h-10 bg-brand-dark-2 animate-pulse rounded" />
            <div className="h-6 bg-brand-dark-2 animate-pulse rounded w-2/3" />
            <div className="h-40 bg-brand-dark-2 animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!car) return notFound();

  const images = car.car_images?.length
    ? car.car_images.sort((a, b) => a.display_order - b.display_order)
    : [{ url: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200', is_primary: true, id: 'placeholder', car_id: car.id, display_order: 0, created_at: '' }];

  const specs = [
    { icon: Gauge, label: 'Mileage', value: car.mileage != null ? `${car.mileage.toLocaleString()} km` : '—' },
    { icon: Fuel, label: 'Fuel Type', value: car.fuel_type || '—' },
    { icon: Settings, label: 'Transmission', value: car.transmission || '—' },
    { icon: Calendar, label: 'Year', value: car.year.toString() },
    { icon: Cog, label: 'Engine', value: car.engine_cc ? `${car.engine_cc} cc` : '—' },
    { icon: CarIcon, label: 'Body Type', value: car.body_type || '—' },
    { icon: Palette, label: 'Color', value: car.color || '—' },
    { icon: Cog, label: 'Drive', value: car.drive_type || '—' },
    { icon: DoorOpen, label: 'Doors', value: car.doors?.toString() || '—' },
    { icon: Users, label: 'Seats', value: car.seats?.toString() || '—' },
  ];

  const whatsappMsg = `Hello Wazir Trading, I'm interested in the ${car.year} ${car.make} ${car.model} (Ref: ${car.ref_number}). Could you provide more details?`;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-brand-dark-2 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm">
          <Link href="/" className="text-brand-gray hover:text-white transition-colors">Home</Link>
          <span className="text-brand-gray-dark">/</span>
          <Link href="/cars" className="text-brand-gray hover:text-white transition-colors">Cars</Link>
          <span className="text-brand-gray-dark">/</span>
          <span className="text-white">{car.ref_number}</span>
        </div>
      </div>

      <section className="section-padding bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/cars" className="inline-flex items-center gap-2 text-brand-gray hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={16} />
            Back to Inventory
          </Link>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Image Gallery */}
            <div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-brand-dark-2 border border-white/5 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[activeImage]?.url || images[0].url}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest ${
                    car.status === 'Available' ? 'bg-green-500/90 text-white' :
                    car.status === 'Sold' ? 'bg-red-600/90 text-white' : 'bg-yellow-500/90 text-black'
                  }`}>
                    {car.status}
                  </span>
                  {car.featured && (
                    <span className="bg-brand-gold text-black px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {images.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveImage(i)}
                      className={`aspect-square rounded overflow-hidden border-2 transition-colors ${
                        i === activeImage ? 'border-brand-red' : 'border-white/5 hover:border-white/20'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-2">
                Ref: {car.ref_number}
              </div>
              <h1 className="text-white font-black text-3xl sm:text-4xl tracking-tight mb-2">
                {car.year} {car.make} {car.model}
              </h1>
              {car.body_type && (
                <p className="text-brand-gray text-sm uppercase tracking-wider mb-6">{car.body_type}</p>
              )}

              {/* Price */}
              <div className="glass-card rounded-lg p-6 mb-6 border-brand-red/20">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-brand-gray-dark text-xs uppercase tracking-widest mb-1">F.O.B Price</div>
                    <div className="text-brand-gold font-black text-4xl tracking-tight">
                      ${car.price_usd.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-brand-gray text-xs">Port of Loading</div>
                    <div className="text-white font-semibold text-sm">{car.port_of_loading || 'Yokohama'}, Japan</div>
                  </div>
                </div>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {specs.slice(0, 4).map((spec) => (
                  <div key={spec.label} className="flex items-center gap-3 bg-brand-dark-2 border border-white/5 rounded-sm p-3">
                    <spec.icon size={18} className="text-brand-red flex-shrink-0" />
                    <div>
                      <div className="text-brand-gray-dark text-[10px] uppercase tracking-widest">{spec.label}</div>
                      <div className="text-white text-sm font-semibold">{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-4 rounded-sm font-semibold transition-all duration-200"
                >
                  <MessageCircle size={18} />
                  Inquire on WhatsApp
                </a>
                <Link
                  href={`/contact?car=${car.ref_number}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-light text-white px-6 py-4 rounded-sm font-semibold transition-all duration-200"
                >
                  <Mail size={18} />
                  Request Details
                </Link>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: ShieldCheck, label: 'Inspected' },
                  { icon: Ship, label: 'Global Shipping' },
                  { icon: CheckCircle2, label: 'Verified' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-2 text-center p-3 bg-brand-dark-2 border border-white/5 rounded-sm">
                    <item.icon size={18} className="text-brand-red" />
                    <span className="text-brand-gray text-xs">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full Specs + Description */}
          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            <div className="lg:col-span-2">
              <Reveal>
                <h2 className="text-white font-black text-2xl tracking-tight mb-6 red-line">
                  Full Specifications
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {specs.map((spec) => (
                    <div key={spec.label} className="bg-brand-dark-2 border border-white/5 rounded-sm p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <spec.icon size={14} className="text-brand-red" />
                        <span className="text-brand-gray-dark text-[10px] uppercase tracking-widest">{spec.label}</span>
                      </div>
                      <div className="text-white text-sm font-semibold">{spec.value}</div>
                    </div>
                  ))}
                </div>

                {car.features && car.features.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-white font-bold text-lg mb-4">Features</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {car.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-brand-gray text-sm">
                          <CheckCircle2 size={14} className="text-brand-red flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {car.description && (
                  <div className="mt-8">
                    <h3 className="text-white font-bold text-lg mb-4">Description</h3>
                    <p className="text-brand-gray leading-relaxed whitespace-pre-line">{car.description}</p>
                  </div>
                )}
              </Reveal>
            </div>

            {/* Sidebar: Shipping */}
            <div>
              <Reveal delay={0.1}>
                <div className="glass-card rounded-lg p-6 sticky top-24">
                  <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <Ship size={18} className="text-brand-red" />
                    Shipping Estimates
                  </h3>
                  <p className="text-brand-gray text-xs mb-4">
                    Estimated RORO shipping from {car.port_of_loading || 'Yokohama'} to major ports. Final quote provided on inquiry.
                  </p>
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {shippingRates.map((rate) => (
                      <div key={rate.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div>
                          <div className="text-white text-sm font-medium">{rate.destination_country}</div>
                          <div className="text-brand-gray-dark text-xs">{rate.destination_port}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-brand-gold text-sm font-bold">
                            ${rate.roro_price_usd?.toLocaleString() || '—'}
                          </div>
                          <div className="text-brand-gray-dark text-[10px]">~{rate.transit_days} days</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs text-brand-gray">
                    <div className="flex items-center gap-2"><Phone size={12} className="text-brand-red" /> +81-50-3740-8980</div>
                    <div className="flex items-center gap-2"><Mail size={12} className="text-brand-red" /> wazirtrading-pc@outlook.jp</div>
                    <div className="flex items-center gap-2"><MapPin size={12} className="text-brand-red" /> Kuwana-City, Mie, Japan</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
