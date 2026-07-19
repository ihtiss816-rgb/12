import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from './SectionHeading';

const budgets = [
  { price: 1000, label: 'Under $1,000', tier: 'Entry Level', dot: 'bg-green-500', text: 'text-green-400' },
  { price: 2000, label: 'Under $2,000', tier: 'Budget Pick', dot: 'bg-teal-500', text: 'text-teal-400' },
  { price: 3000, label: 'Under $3,000', tier: 'Popular Range', dot: 'bg-blue-500', text: 'text-blue-400' },
  { price: 4000, label: 'Under $4,000', tier: 'Mid Range', dot: 'bg-yellow-500', text: 'text-yellow-400' },
  { price: 5000, label: 'Under $5,000', tier: 'Premium Select', dot: 'bg-orange-500', text: 'text-orange-400' },
  { price: null, label: '$5,000+', tier: 'Luxury Tier', dot: 'bg-brand-red', text: 'text-brand-red' },
];

export default function ShopByBudget() {
  return (
    <section className="section-padding bg-brand-dark-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Price Range" title="Shop by Budget (FOB)" />
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {budgets.map((b, i) => (
            <Reveal key={b.label} delay={i * 0.06}>
              <Link
                href={b.price ? `/cars?max_price=${b.price}` : '/cars?min_price=5000'}
                className="group flex h-full flex-col justify-between gap-6 rounded-lg border border-white/5 bg-brand-dark p-5 transition-colors duration-300 hover:border-brand-red/40"
              >
                <div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${b.text}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${b.dot}`} />
                    {b.tier}
                  </span>
                  <div className="mt-4 text-xl font-black tracking-tight text-white">{b.label}</div>
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-brand-gray group-hover:text-brand-red">
                  View Cars
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
