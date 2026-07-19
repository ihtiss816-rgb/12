'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const chips = [
  { label: 'Under $2,000', href: '/cars?maxPrice=2000' },
  { label: 'SUV & 4WD', href: '/cars?bodyType=SUV' },
  { label: 'Right Hand Drive', href: '/cars?steering=RHD' },
];

export default function QuickSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/cars?search=${encodeURIComponent(q)}` : '/cars');
  };

  return (
    <section className="relative z-20 -mt-16 mb-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="glass-card rounded-xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray"
                aria-hidden="true"
              />
              <label htmlFor="quick-search" className="sr-only">
                Search by make, model or reference number
              </label>
              <input
                id="quick-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by make, model or reference number"
                className="w-full bg-brand-dark border border-white/10 focus:border-brand-red text-white pl-12 pr-4 py-3.5 rounded-sm text-sm outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-light text-white px-8 py-3.5 rounded-sm font-semibold transition-colors"
            >
              <Search size={16} />
              Search
            </button>
          </form>

          <div className="flex flex-wrap gap-2 mt-4">
            {chips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => router.push(chip.href)}
                className="text-xs font-medium text-white/80 bg-white/5 hover:bg-brand-red/20 hover:text-white border border-white/10 hover:border-brand-red/40 px-4 py-2 rounded-full transition-colors"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
