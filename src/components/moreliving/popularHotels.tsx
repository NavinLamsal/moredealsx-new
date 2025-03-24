"use client";
import React, { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { CardSkeleton } from "../Skeletons/CardSkeleton";
import Heading from "../ui/heading";
import AnimatedSection from "../ui/FadeUpView";
import HotelCard from "./cards/HotelCard";
import { HotelTypes } from "@/lib/type/moreliving/hotel";
import { useFetchHotel } from "@/lib/action/moreliving/hotellist";
import HorizontalCarousel from "../carousel/horizontalCarousel";

const PopularHotels = () => {
  
  const { fetchPopularHotelList} = useFetchHotel()
 

   const { data, error, isLoading } = useQuery({
     queryKey: ["Popular Hotels" , 1],
     queryFn: () => fetchPopularHotelList(),
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

   if (!data || data.data.length === 0) {
    return null;
  }


 return (
   <div className=" p-1 lg:p-4">
     <HorizontalCarousel title="Featured Hotels" viewAll="/moreliving/category/featured-hotel?title=Featured Hotels">
     {data &&
            data.data.map((item: HotelTypes , index: number) => (
       <div className="flex-shrink-0 w-60" key={item.id}>
        <AnimatedSection key={item.id} index={index}>
        <HotelCard key={item.id} {...item} />
         </AnimatedSection>
         
       </div>
))}

     </HorizontalCarousel>
   </div>
 );
};


export default PopularHotels;
