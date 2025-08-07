"use client";
import AllRestaurantList from "@/components/morefood/AllRestaurant";
import BusinessView from "@/components/morefood/businessView/BusinessView";
import CategoriesList from "@/components/morefood/CategoriesList";
import FeaturedRestaurants from "@/components/morefood/FeaturedRestaurant";

import NearestRestaurant from "@/components/morefood/NearestRestaurant";
// import PopularCombos from "@/components/morefood/PopularCombos";
import PopularRestaurant from "@/components/morefood/PopularRestaurant";
// import TodaysOffer from "@/components/morefood/TodaysOffer";
import Heading from "@/components/ui/heading";
import { useBusinessType } from "@/hooks/useBusinessType";
import React from "react";

const Page = () => {
  const { businessType, userType, loading } = useBusinessType();

  if (businessType === "restaurant" && userType === "BUSINESS") {
    return (
      <>
        <BusinessView />
      </>
    );
  }

  return (
    <>
      {/* <Offers /> */}
      {/* <TodaysOffer /> */}
      <CategoriesList />
      <FeaturedRestaurants  dashboard={true}/>
      <NearestRestaurant  dashboard={true}/>
      <PopularRestaurant  dashboard={true}/>
      {/* <PopularCombos /> */}
      <AllRestaurantList />
    </>
  );
};

export default Page;
