import RestaurantTrendingEvents from "@/components/Events/ResturantListCarousel";
import TrendingEvents from "@/components/Events/TrendingEvent";
import Hero from "@/components/Homes/hero";

import PartnersSection from "@/components/Homes/partner";
import PremiumSection from "@/components/Homes/pricing";
import TreasureSection from "@/components/Homes/trasureSection";
import FeaturedRestaurants from "@/components/morefood/FeaturedRestaurant";
import NearestRestaurant from "@/components/morefood/NearestRestaurant";
import PopularRestaurant from "@/components/morefood/PopularRestaurant";
import RestroList from "@/components/morefood/RestroList";
import OfferSection from "@/components/offers/OfferSection";
import HotDeals from "@/components/offers/restaurants/hotDeals";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <HotDeals classname="min-[660px]:pl-0 min-[570px]:pl-20 min-[460px]:pl-40 pl-64" />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <OfferSection classname="min-[660px]:pl-0 min-[570px]:pl-20 min-[460px]:pl-40 pl-64" />
      </Suspense>

      <FeaturedRestaurants />
      <NearestRestaurant />
      <RestroList />

      <div className="px-4">
        <RestaurantTrendingEvents
          title="Taste & Experience – Restaurant Events"
          dashboard={false}
        />
        {/* <FeaturedRestaurants /> */}
        <TrendingEvents dashboard={false} />
      </div>

      <TreasureSection />

      <PopularRestaurant />

      {/* <TicketSection /> */}
      <PartnersSection />

      {/* <Salons />
      <Products />
      <Hotels /> */}
      <PremiumSection />
    </>
  );
}
