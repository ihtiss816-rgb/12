import { Star, Quote } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from './SectionHeading';

const stats = [
  { value: '500+', label: 'Happy Customers' },
  { value: '5.0★', label: 'Rating' },
  { value: '100%', label: 'Satisfaction' },
];

const reviews = [
  {
    quote:
      'Wazir Trading made my first import completely stress-free. The car arrived exactly as described and shipping was faster than expected.',
    name: 'James O.',
    location: 'Mombasa, Kenya',
  },
  {
    quote:
      'Transparent pricing and honest communication throughout. The proforma invoice matched the final cost with no surprises. Highly recommended.',
    name: 'Ali R.',
    location: 'Karachi, Pakistan',
  },
];

export default function Reviews() {
  return (
    <section className="section-padding bg-brand-dark-2">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Testimonials" title="What Our Customers Say" center />
        </Reveal>

        <Reveal>
          <div className="mb-12 grid grid-cols-3 gap-4 border-y border-white/5 py-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black tracking-tight text-brand-red sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-brand-gray">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <figure className="glass-card h-full rounded-lg p-6">
                <Quote size={26} className="mb-4 text-brand-red/50" aria-hidden="true" />
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <blockquote className="text-pretty text-base leading-relaxed text-white/90">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-white/5 pt-4">
                  <div className="text-sm font-bold text-white">{r.name}</div>
                  <div className="text-xs uppercase tracking-widest text-brand-gray">{r.location}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
