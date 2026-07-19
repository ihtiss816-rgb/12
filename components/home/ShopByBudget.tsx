import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';

const budgets = [
  { price: 'Under $1,000', tier: 'Entry Level', max: 1000, accent: 'bg-green-500', text: 'text-green-400', border: 'hover:border-green-500/50' },
  { price: 'Under $2,000', tier: 'Budget Pick', max: 2000, accent: 'bg-teal-500', text: 'text-teal-400', border: 'hover:border-teal-500/50' },
  { price: 'Under $3,000', tier: 'Popular Range', max: 3000, accent: 'bg-blue-500', text: 'text-blue-400', border: 'hover:border-blue-500/50' },
  { price: 'Under $4,000', tier: 'Mid Range', max: 4000, accent: 'bg-yellow-500', text: 'text-yellow-400', border: 'hover:border-yellow-500/50' },
  { price: 'Under $5,000', tier: 'Premium Select', max: 5000, accent: 'bg-orange-500', text: 'text-orange-400', border: 'hover:border-orange-500/50' },
  { price: '$5,000+', tier: 'Luxury Tier', max: 0, accent: 'bg-brand-red', text: 'text-brand-red', border: 'hover:border-brand-red/50' },
];

export default function ShopByBudget() {
  return (
    <section className="py-16 bg-brand-dark-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="mb-8">
          <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Find Your Price
          </div>
          <h2 className="text-white font-black text-2xl sm:text-4xl tracking-tight">
            Shop by Budget (FOB)
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {budgets.map((b, i) => (
            <Reveal key={b.price} delay={i * 0.06}>
              <Link
                href={b.max ? `/cars?maxPrice=${b.max}` : '/cars?minPrice=5000'}
                className={`group block h-full bg-brand-dark border border-white/10 rounded-lg p-5 transition-colors ${b.border}`}
              >
                <span className={`block w-8 h-1 rounded-full ${b.accent} mb-4`} />
                <div className="text-white font-black text-lg tracking-tight mb-1">{b.price}</div>
                <div className={`text-[11px] font-bold uppercase tracking-widest ${b.text} mb-4`}>
                  {b.tier}
                </div>
                <span className="inline-flex items-center gap-1 text-brand-gray text-xs group-hover:text-white transition-colors">
                  View cars
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
