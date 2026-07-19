import { supabase } from '@/lib/supabase';
import AlertBar from '@/components/home/AlertBar';
import InfoBar from '@/components/home/InfoBar';
import Hero from '@/components/home/Hero';
import QuickSearch from '@/components/home/QuickSearch';
import DestinationCountries from '@/components/home/DestinationCountries';
import ShopByMake from '@/components/home/ShopByMake';
import ShopByBodyType from '@/components/home/ShopByBodyType';
import ShopByBudget from '@/components/home/ShopByBudget';
import FeaturedCars, { type FeaturedCar } from '@/components/home/FeaturedCars';
import HowToBuy from '@/components/home/HowToBuy';
import CustomRequestForm from '@/components/home/CustomRequestForm';
import TrustBadges from '@/components/home/TrustBadges';
import Reviews from '@/components/home/Reviews';

export const dynamic = 'force-dynamic';

const PLACEHOLDER = '/images/car-placeholder.png';

type CarImageRow = { image_url: string; is_primary: boolean; display_order: number };

async function getHomeData() {
  // Total available stock
  const { count: stockCount } = await supabase
    .from('cars')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'available');

  // Featured cars (limit 8) with images
  const { data: featuredRows } = await supabase
    .from('cars')
    .select('id, ref_number, make, model, year, engine_cc, fob_price_usd, car_images(image_url, is_primary, display_order)')
    .eq('is_featured', true)
    .eq('status', 'available')
    .limit(8);

  const featured: FeaturedCar[] = (featuredRows || []).map((row: Record<string, unknown>) => {
    const images = (row.car_images as CarImageRow[] | null) || [];
    const primary =
      images.find((img) => img.is_primary) ||
      [...images].sort((a, b) => a.display_order - b.display_order)[0];
    return {
      id: row.id as string,
      ref_number: row.ref_number as string,
      make: row.make as string,
      model: row.model as string,
      year: row.year as number,
      engine_cc: (row.engine_cc as number | null) ?? null,
      fob_price_usd: (row.fob_price_usd as number | null) ?? null,
      image: primary?.image_url || PLACEHOLDER,
    };
  });

  // Count per make (available stock)
  const { data: makeRows } = await supabase
    .from('cars')
    .select('make')
    .eq('status', 'available');

  const makeCounts: Record<string, number> = {};
  for (const row of makeRows || []) {
    const make = (row as { make: string }).make;
    if (make) makeCounts[make] = (makeCounts[make] || 0) + 1;
  }

  return { stockCount: stockCount ?? 0, featured, makeCounts };
}

export default async function Home() {
  const { stockCount, featured, makeCounts } = await getHomeData();

  return (
    <>
      {/* Offset below the global fixed navbar */}
      <div className="pt-20">
        <AlertBar />
        <InfoBar stockCount={stockCount} />
      </div>

      <Hero />
      <QuickSearch />
      <DestinationCountries />
      <ShopByMake counts={makeCounts} />
      <ShopByBodyType />
      <ShopByBudget />
      <FeaturedCars cars={featured} />
      <HowToBuy />
      <CustomRequestForm />
      <TrustBadges />
      <Reviews />
    </>
  );
}
