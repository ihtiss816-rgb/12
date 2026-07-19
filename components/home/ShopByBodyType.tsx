import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SectionHeading from './SectionHeading';
import BodyIcon from './BodyIcon';

const bodyTypes = [
  'Sedan',
  'SUV',
  'Hatchback',
  'Van',
  'Mini Van',
  'Truck',
  'Bus',
  'MPV',
  'Pickup Truck',
  'Coupe',
];

export default function ShopByBodyType() {
  return (
    <section className="section-padding bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Body Styles" title="Shop by Vehicle Body Type" />
        </Reveal>

        <Reveal>
          <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin]">
            {bodyTypes.map((type) => (
              <Link
                key={type}
                href={`/cars?body_type=${encodeURIComponent(type)}`}
                className="group flex w-36 flex-shrink-0 snap-start flex-col items-center gap-3 rounded-lg border border-white/5 bg-brand-dark-2 p-5 text-center transition-colors duration-300 hover:border-brand-red/40"
              >
                <span className="text-brand-gray transition-colors group-hover:text-brand-red">
                  <BodyIcon type={type} />
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-brand-red">{type}</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
