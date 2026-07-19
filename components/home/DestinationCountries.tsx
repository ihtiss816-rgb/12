import Link from 'next/link';
import Reveal from '@/components/Reveal';

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

export default function DestinationCountries() {
  return (
    <section className="py-16 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="mb-8">
          <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Worldwide Shipping
          </div>
          <h2 className="text-white font-black text-2xl sm:text-4xl tracking-tight">
            Select Your Destination Country
          </h2>
        </Reveal>

        <Reveal>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
            {countries.map((country) => (
              <Link
                key={country.name}
                href={`/cars?country=${encodeURIComponent(country.name)}`}
                className="group flex-shrink-0 w-36 snap-start glass-card rounded-lg p-5 text-center hover:border-brand-red/40 transition-colors"
              >
                <div className="text-4xl mb-3" aria-hidden="true">
                  {country.flag}
                </div>
                <div className="text-white font-semibold text-sm mb-2 leading-tight">
                  {country.name}
                </div>
                <span className="inline-block bg-brand-red/15 text-brand-red text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm group-hover:bg-brand-red group-hover:text-white transition-colors">
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
