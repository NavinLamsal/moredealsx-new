"use client";
// import PopularResturantsCard from "@/components/cards/PopularResturantsCard";
import React, { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import Restaurant from "./cards/RestaurantCard";
import { CardSkeleton } from "../Skeletons/CardSkeleton";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import { ResturantListType } from "@/lib/type/morefood/restaurant";
import Heading from "../ui/heading";

const PopularResturants = () => {
  
  const { fetchPopularRestaurantsList} = useFetchRestaurant()
 

   const { data, error, isLoading } = useQuery({
     queryKey: ["Popular resturants" , 1],
     queryFn: () => fetchPopularRestaurantsList(),
     staleTime: 6000,
   });

   if (isLoading) {
     return (
       <div>
         <CardSkeleton />
       </div>
     );
   }

   if (error) {
     return <div>Error: {error?.message}</div>;
   }

  return (
    <div className="w-full mx-auto">
      <div className="container px-4 flex items-center justify-between mx-auto">
        <Heading  title="Popular Resturants" viewAll="/morefood/restaurants"/>
      </div>
      <Suspense fallback={<CardSkeleton />}>
        {data && data.data && data.data.length > 0 && (
          <section className="grid grid-cols-2 min-[500px]:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-5  mx-auto p-4">
          {data &&
            data.data.map((item: ResturantListType) => (
          <Restaurant item={item} key={item.id}/>
            ))}
          </section>
        )}
      </Suspense>
      {data && data.data && data.data.length === 0 && (
         <p className="w-full mx-auto my-12 text-center">No Popular Resturants found for your region</p>)}
      
    </div>
  );
};

export default PopularResturants;
