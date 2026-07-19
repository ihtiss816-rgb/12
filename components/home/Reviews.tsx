import { Star } from 'lucide-react';
import Reveal from '@/components/Reveal';
import CountUp from './CountUp';

const stats = [
  { end: 500, suffix: '+', label: 'Happy Customers' },
  { value: '5.0', star: true, label: 'Rating' },
  { end: 100, suffix: '%', label: 'Satisfaction' },
];

const reviews = [
  {
    quote:
      'Wazir Trading made my first import completely stress-free. The car arrived exactly as described and the shipping was faster than expected.',
    name: 'Verified Importer',
    location: 'Mombasa, Kenya',
  },
  {
    quote:
      'Transparent pricing and constant updates from auction to delivery. The bank transfer process to their Japan account was clear and secure.',
    name: 'Verified Importer',
    location: 'Karachi, Pakistan',
  },
];

export default function Reviews() {
  return (
    <section className="py-16 bg-brand-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-10">
          <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Testimonials
          </div>
          <h2 className="text-white font-black text-2xl sm:text-4xl tracking-tight">
            What Our Customers Say
          </h2>
        </Reveal>

        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-white font-black text-2xl sm:text-3xl tracking-tight flex items-center justify-center gap-1">
                {'end' in s && s.end != null ? (
                  <CountUp end={s.end} suffix={s.suffix} />
                ) : (
                  <>
                    {s.value}
                    {s.star && <Star size={20} className="text-brand-gold fill-brand-gold" />}
                  </>
                )}
              </div>
              <div className="text-brand-gray text-[11px] uppercase tracking-widest mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <Reveal key={r.location} delay={i * 0.1}>
              <div className="glass-card rounded-lg p-6 h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={16} className="text-brand-gold fill-brand-gold" />
                  ))}
                </div>
                <blockquote className="text-white/90 text-sm leading-relaxed mb-5 text-pretty">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <div className="text-white font-semibold text-sm">{r.name}</div>
                <div className="text-brand-gray text-xs uppercase tracking-widest mt-0.5">
                  {r.location}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
