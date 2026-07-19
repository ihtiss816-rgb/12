'use client';

import Link from 'next/link';
import { Gauge, Fuel, Settings, Calendar, ArrowRight } from 'lucide-react';
import type { CarWithImages } from '@/lib/types';

export default function CarCard({ car }: { car: CarWithImages }) {
  const primaryImage =
    car.car_images?.find((img) => img.is_primary)?.url ||
    car.car_images?.[0]?.url ||
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200';

  const statusColor =
    car.status === 'Available'
      ? 'bg-green-500/90'
      : car.status === 'Sold'
      ? 'bg-red-600/90'
      : 'bg-yellow-500/90';

  return (
    <Link href={`/cars/${car.ref_number}`} className="car-card block group">
      <div className="relative overflow-hidden rounded-lg bg-brand-dark-2 border border-white/5 hover:border-brand-red/40 transition-colors duration-300">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-brand-dark-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={primaryImage}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Status Badge */}
          <div className={`absolute top-3 left-3 ${statusColor} text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm`}>
            {car.status}
          </div>

          {/* Ref Badge */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-brand-gold text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm border border-white/10">
            {car.ref_number}
          </div>

          {/* Featured Badge */}
          {car.featured && (
            <div className="absolute bottom-3 left-3 bg-brand-gold text-black text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-white font-bold text-lg leading-tight tracking-tight group-hover:text-brand-red transition-colors duration-200">
                {car.year} {car.make} {car.model}
              </h3>
              {car.body_type && (
                <p className="text-brand-gray text-xs uppercase tracking-wider mt-0.5">{car.body_type}</p>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-brand-gold font-black text-xl tracking-tight">
                ${car.price_usd.toLocaleString()}
              </div>
              <div className="text-brand-gray-dark text-[10px] uppercase tracking-widest">F.O.B Japan</div>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5">
            {car.mileage != null && (
              <div className="flex items-center gap-1.5 text-brand-gray text-xs">
                <Gauge size={13} className="text-brand-red" />
                <span>{car.mileage.toLocaleString()} km</span>
              </div>
            )}
            {car.fuel_type && (
              <div className="flex items-center gap-1.5 text-brand-gray text-xs">
                <Fuel size={13} className="text-brand-red" />
                <span>{car.fuel_type}</span>
              </div>
            )}
            {car.transmission && (
              <div className="flex items-center gap-1.5 text-brand-gray text-xs">
                <Settings size={13} className="text-brand-red" />
                <span>{car.transmission}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-brand-gray text-xs">
              <Calendar size={13} className="text-brand-red" />
              <span>{car.year}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-white/60 text-xs uppercase tracking-widest">View Details</span>
            <ArrowRight size={16} className="text-brand-red group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </Link>
  );
}
