import RestaurantDetail from "@/components/morefood/restaurant/detail";
import FoodList from "@/components/morefood/restaurant/FoodList";
import OfferList from "@/components/morefood/restaurant/OfferList";
import RestaurantTab from "@/components/morefood/restaurant/RestaurantTab";
import { fetchResturantsIdDetails } from "@/lib/action/morefood/restaurantServerside";
import { Restaurant } from "@/lib/type/morefood/restaurant";
import React from "react";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  console.log("Fetching restaurant details for slug:", slug);

  const details: Restaurant = await fetchResturantsIdDetails(slug);

  return (
    <div>
      {/* <RestaurantDetail details={details}/> */}
      <RestaurantTab details={details} />

      <OfferList slug={slug} />
      <FoodList slug={slug} />
    </div>
  );
};

export default Page;
