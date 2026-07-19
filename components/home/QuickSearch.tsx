'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';
import Reveal from '@/components/Reveal';

const chips = [
  { label: 'Under $2,000', href: '/cars?max_price=2000' },
  { label: 'SUV & 4WD', href: '/cars?body_type=SUV' },
  { label: 'Right Hand Drive', href: '/cars?steering=Right' },
];

export default function QuickSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/cars?q=${encodeURIComponent(q)}` : '/cars');
  };

  return (
    <section className="relative z-20 bg-brand-dark">
      <div className="mx-auto -mt-10 max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="glass-card rounded-2xl border-white/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:p-6">
            <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by make, model or reference number"
                  aria-label="Search inventory"
                  className="w-full rounded-sm border border-white/10 bg-brand-dark-3 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-brand-gray focus:border-brand-red/50 focus:outline-none focus:ring-1 focus:ring-brand-red/50"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-brand-red px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-light"
              >
                <Search size={16} />
                Search
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-brand-gray-dark">Quick filters:</span>
              {chips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => router.push(chip.href)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-brand-red/40 hover:text-white"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
