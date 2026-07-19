import Hero from '@/components/home/Hero';
import QuickSearch from '@/components/home/QuickSearch';
import Destinations from '@/components/home/Destinations';
import ShopByMake from '@/components/home/ShopByMake';
import ShopByBodyType from '@/components/home/ShopByBodyType';
import ShopByBudget from '@/components/home/ShopByBudget';
import FeaturedCars from '@/components/home/FeaturedCars';
import HowToBuy from '@/components/home/HowToBuy';
import CustomRequest from '@/components/home/CustomRequest';
import TrustBadges from '@/components/home/TrustBadges';
import Reviews from '@/components/home/Reviews';

export default function Home() {
  return (
    <>
      {/* Sections 1 & 2 (Alert Bar + Info Bar) render globally in the root layout */}
      <Hero />
      <QuickSearch />
      <Destinations />
      <ShopByMake />
      <ShopByBodyType />
      <ShopByBudget />
      <FeaturedCars />
      <HowToBuy />
      <CustomRequest />
      <TrustBadges />
      <Reviews />
    </>
  );
}
