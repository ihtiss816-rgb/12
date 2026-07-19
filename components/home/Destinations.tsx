import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SectionHeading from './SectionHeading';

const countries = [
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'Guyana', flag: '🇬🇾' },
  { name: 'UK', flag: '🇬🇧' },
  { name: 'Russia', flag: '🇷🇺' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Jamaica', flag: '🇯🇲' },
  { name: 'Kenya', flag: '🇰🇪' },
  { name: 'New Zealand', flag: '🇳🇿' },
  { name: 'Papua New Guinea', flag: '🇵🇬' },
  { name: 'Ghana', flag: '🇬🇭' },
  { name: 'Tanzania', flag: '🇹🇿' },
  { name: 'Nigeria', flag: '🇳🇬' },
];

export default function Destinations() {
  return (
    <section className="section-padding bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Worldwide Shipping" title="Select Your Destination Country" />
        </Reveal>

        <Reveal>
          <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin]">
            {countries.map((c) => (
              <Link
                key={c.name}
                href={`/cars?country=${encodeURIComponent(c.name)}`}
                className="group flex w-36 flex-shrink-0 snap-start flex-col items-center gap-3 rounded-lg border border-white/5 bg-brand-dark-2 p-5 text-center transition-colors duration-300 hover:border-brand-red/40"
              >
                <span className="text-4xl leading-none" aria-hidden="true">
                  {c.flag}
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-brand-red">{c.name}</span>
                <span className="rounded-sm bg-brand-red/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand-red">
                  Stock
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
