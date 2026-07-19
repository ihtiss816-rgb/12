'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, Car as CarIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { CarWithImages } from '@/lib/types';
import CarCard from '@/components/CarCard';
import Reveal from '@/components/Reveal';

const makes = ['Toyota', 'Nissan', 'Honda', 'Mazda', 'Subaru', 'Mitsubishi', 'Lexus', 'Suzuki', 'Daihatsu', 'Isuzu', 'Hino', 'Mercedes-Benz', 'BMW', 'Audi'];
const transmissions = ['Automatic', 'Manual', 'CVT'];
const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
const bodyTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Wagon', 'Van', 'Truck', 'Minibus', 'Pickup'];

function CarsContent() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<CarWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    make: searchParams.get('make') || '',
    model: '',
    minYear: '',
    maxYear: '',
    minPrice: '',
    maxPrice: '',
    transmission: '',
    fuelType: '',
    bodyType: '',
    search: '',
  });

  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'year-desc'>('newest');

  useEffect(() => {
    (async () => {
      setLoading(true);
      let query = supabase
        .from('cars')
        .select('*, car_images(*)')
        .eq('status', 'Available');

      if (filters.make) query = query.eq('make', filters.make);
      if (filters.transmission) query = query.eq('transmission', filters.transmission);
      if (filters.fuelType) query = query.eq('fuel_type', filters.fuelType);
      if (filters.bodyType) query = query.eq('body_type', filters.bodyType);
      if (filters.minYear) query = query.gte('year', Number(filters.minYear));
      if (filters.maxYear) query = query.lte('year', Number(filters.maxYear));
      if (filters.minPrice) query = query.gte('price_usd', Number(filters.minPrice));
      if (filters.maxPrice) query = query.lte('price_usd', Number(filters.maxPrice));
      if (filters.model) query = query.ilike('model', `%${filters.model}%`);
      if (filters.search) query = query.or(`make.ilike.%${filters.search}%,model.ilike.%${filters.search}%`);

      if (sortBy === 'price-asc') query = query.order('price_usd', { ascending: true });
      else if (sortBy === 'price-desc') query = query.order('price_usd', { ascending: false });
      else if (sortBy === 'year-desc') query = query.order('year', { ascending: false });
      else query = query.order('created_at', { ascending: false });

      const { data } = await query;
      setCars((data as CarWithImages[]) || []);
      setLoading(false);
    })();
  }, [filters, sortBy]);

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      make: '', model: '', minYear: '', maxYear: '', minPrice: '', maxPrice: '',
      transmission: '', fuelType: '', bodyType: '', search: '',
    });
  };

  const activeFilterCount = useMemo(
    () => Object.values(filters).filter((v) => v !== '').length,
    [filters]
  );

  return (
    <div>
      {/* Page Header */}
      <section className="bg-brand-dark-2 border-b border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">Inventory</div>
          <h1 className="text-white font-black text-3xl sm:text-5xl tracking-tight mb-3">
            Browse All Vehicles
          </h1>
          <p className="text-brand-gray text-lg">
            {loading ? 'Loading inventory...' : `${cars.length} vehicle${cars.length !== 1 ? 's' : ''} available for export`}
          </p>
        </div>
      </section>

      <section className="bg-brand-dark section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Search + Sort Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray" />
              <input
                type="text"
                placeholder="Search by make or model..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="w-full bg-brand-dark-2 border border-white/10 focus:border-brand-red text-white pl-12 pr-4 py-3 rounded-sm text-sm outline-none transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-brand-dark-2 border border-white/10 hover:border-brand-red/40 text-white px-4 py-3 rounded-sm text-sm font-medium transition-colors"
              >
                <SlidersHorizontal size={16} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-brand-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-brand-dark-2 border border-white/10 hover:border-brand-red/40 text-white px-4 py-3 rounded-sm text-sm font-medium outline-none cursor-pointer transition-colors"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Year: Newest</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-brand-dark-2 border border-white/10 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest">Refine Results</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-brand-gray hover:text-white text-xs transition-colors"
                  >
                    <X size={14} />
                    Clear all
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-brand-gray text-xs uppercase tracking-widest mb-2 block">Make</label>
                  <select
                    value={filters.make}
                    onChange={(e) => updateFilter('make', e.target.value)}
                    className="w-full bg-brand-dark border border-white/10 text-white px-3 py-2.5 rounded-sm text-sm outline-none focus:border-brand-red"
                  >
                    <option value="">All Makes</option>
                    {makes.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-brand-gray text-xs uppercase tracking-widest mb-2 block">Model</label>
                  <input
                    type="text"
                    placeholder="e.g. Land Cruiser"
                    value={filters.model}
                    onChange={(e) => updateFilter('model', e.target.value)}
                    className="w-full bg-brand-dark border border-white/10 text-white px-3 py-2.5 rounded-sm text-sm outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="text-brand-gray text-xs uppercase tracking-widest mb-2 block">Min Year</label>
                  <input
                    type="number"
                    placeholder="2010"
                    value={filters.minYear}
                    onChange={(e) => updateFilter('minYear', e.target.value)}
                    className="w-full bg-brand-dark border border-white/10 text-white px-3 py-2.5 rounded-sm text-sm outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="text-brand-gray text-xs uppercase tracking-widest mb-2 block">Max Year</label>
                  <input
                    type="number"
                    placeholder="2024"
                    value={filters.maxYear}
                    onChange={(e) => updateFilter('maxYear', e.target.value)}
                    className="w-full bg-brand-dark border border-white/10 text-white px-3 py-2.5 rounded-sm text-sm outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="text-brand-gray text-xs uppercase tracking-widest mb-2 block">Min Price (USD)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) => updateFilter('minPrice', e.target.value)}
                    className="w-full bg-brand-dark border border-white/10 text-white px-3 py-2.5 rounded-sm text-sm outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="text-brand-gray text-xs uppercase tracking-widest mb-2 block">Max Price (USD)</label>
                  <input
                    type="number"
                    placeholder="100000"
                    value={filters.maxPrice}
                    onChange={(e) => updateFilter('maxPrice', e.target.value)}
                    className="w-full bg-brand-dark border border-white/10 text-white px-3 py-2.5 rounded-sm text-sm outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="text-brand-gray text-xs uppercase tracking-widest mb-2 block">Transmission</label>
                  <select
                    value={filters.transmission}
                    onChange={(e) => updateFilter('transmission', e.target.value)}
                    className="w-full bg-brand-dark border border-white/10 text-white px-3 py-2.5 rounded-sm text-sm outline-none focus:border-brand-red"
                  >
                    <option value="">Any</option>
                    {transmissions.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-brand-gray text-xs uppercase tracking-widest mb-2 block">Fuel Type</label>
                  <select
                    value={filters.fuelType}
                    onChange={(e) => updateFilter('fuelType', e.target.value)}
                    className="w-full bg-brand-dark border border-white/10 text-white px-3 py-2.5 rounded-sm text-sm outline-none focus:border-brand-red"
                  >
                    <option value="">Any</option>
                    {fuelTypes.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-brand-gray text-xs uppercase tracking-widest mb-2 block">Body Type</label>
                  <select
                    value={filters.bodyType}
                    onChange={(e) => updateFilter('bodyType', e.target.value)}
                    className="w-full bg-brand-dark border border-white/10 text-white px-3 py-2.5 rounded-sm text-sm outline-none focus:border-brand-red"
                  >
                    <option value="">Any</option>
                    {bodyTypes.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Results Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-brand-dark-2 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : cars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car, i) => (
                <Reveal key={car.id} delay={(i % 3) * 0.08}>
                  <CarCard car={car} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <CarIcon size={48} className="text-brand-gray-dark mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-2">No vehicles found</h3>
              <p className="text-brand-gray mb-6">Try adjusting your filters or search criteria.</p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-light text-white px-6 py-3 rounded-sm text-sm font-semibold transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-brand-gray">Loading...</div>}>
      <CarsContent />
    </Suspense>
  );
}
