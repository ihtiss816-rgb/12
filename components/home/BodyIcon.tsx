import {
  Car,
  Truck,
  Bus,
  CarFront,
  Caravan,
  type LucideIcon,
} from 'lucide-react';

// Map each body type to the closest available vehicle glyph.
const map: Record<string, LucideIcon> = {
  Sedan: CarFront,
  SUV: Car,
  Hatchback: CarFront,
  Van: Caravan,
  'Mini Van': Caravan,
  Truck: Truck,
  Bus: Bus,
  MPV: Caravan,
  'Pickup Truck': Truck,
  Coupe: Car,
};

export default function BodyIcon({ type, size = 34 }: { type: string; size?: number }) {
  const Icon = map[type] ?? Car;
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}
