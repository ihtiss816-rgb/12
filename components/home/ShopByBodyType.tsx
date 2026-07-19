import Link from 'next/link';
import { Car, CarFront, Truck, Bus, Caravan } from 'lucide-react';
import Reveal from '@/components/Reveal';

const bodyTypes = [
  { name: 'Sedan', Icon: Car },
  { name: 'SUV', Icon: CarFront },
  { name: 'Hatchback', Icon: Car },
  { name: 'Van', Icon: Caravan },
  { name: 'Mini Van', Icon: Caravan },
  { name: 'Truck', Icon: Truck },
  { name: 'Bus', Icon: Bus },
  { name: 'MPV', Icon: CarFront },
  { name: 'Pickup Truck', Icon: Truck },
  { name: 'Coupe', Icon: Car },
];

export default function ShopByBodyType() {
  return (
    <section className="py-16 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="mb-8">
          <div className="text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">
            By Category
          </div>
          <h2 className="text-white font-black text-2xl sm:text-4xl tracking-tight">
            Shop by Vehicle Body Type
          </h2>
        </Reveal>

        <Reveal>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
            {bodyTypes.map(({ name, Icon }) => (
              <Link
                key={name}
                href={`/cars?bodyType=${encodeURIComponent(name)}`}
                className="group flex-shrink-0 w-36 snap-start glass-card rounded-lg p-5 flex flex-col items-center gap-3 text-center hover:border-brand-red/40 transition-colors"
              >
                <span className="w-14 h-14 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center group-hover:bg-brand-red transition-colors">
                  <Icon
                    size={26}
                    className="text-brand-red group-hover:text-white transition-colors"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-white font-semibold text-sm leading-tight">{name}</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
