// import TrendingEvents from "@/components/Events/TrendingEvent";
// import MobileAppShowcase from "@/components/Home/appPromotion";
// import CallToAction from "@/components/Home/CallToAction";
// import BentoGrids from "@/components/Home/DentoGrids";
// import Hero from "@/components/Home/Hero";
// import HowItWorksSection from "@/components/Home/Howitworks";

// import DealsSection from "@/components/Home/popularDeals";
// import Pricing from "@/components/Home/pricing";
// import TrackRecordSection from "@/components/Home/Stats";

import Hero from "@/components/Homes/hero";

import PartnersSection from "@/components/Homes/partner";
import PremiumSection from "@/components/Homes/pricing";
// import TicketSection from "@/components/Homes/ticketSection";
import TreasureSection from "@/components/Homes/trasureSection";

import FeaturedRestaurants from "@/components/morefood/Restaurantslist";
// import Hotels from "@/components/moreliving/Hotels";

// import Products from "@/components/moremarket/products";
// import Salons from "@/components/moresalons/Salons";
import OfferSection from "@/components/offers/OfferSection";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <OfferSection classname="min-[660px]:pl-0 min-[570px]:pl-20 min-[460px]:pl-40 pl-64" />
      </Suspense>
      <TreasureSection />
      {/* <TicketSection /> */}
      <PartnersSection />
      <FeaturedRestaurants />
      {/* <Salons />
      <Products />
      <Hotels /> */}
      <PremiumSection />
    </>
  );
}
