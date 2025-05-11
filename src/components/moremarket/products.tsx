"use client";
// import PopularResturantsCard from "@/components/cards/PopularResturantsCard";
import React, { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { CardSkeleton } from "../Skeletons/CardSkeleton";
import SalonCard from "./cards/ProductCard2";
import { SaloonTypes } from "@/lib/type/moresalons/salon";
import { useFetchSalon } from "@/lib/action/moreSalon/salonlist";
import AnimatedSection from "../ui/animations/FadeUpView";
import HorizontalCarousel from "../carousel/horizontalCarousel";
import { useFetchProduct } from "@/lib/action/moreMarket/productlist";
import { ProductTypes } from "@/lib/type/moremarket/market";
import ProductCard from "./cards/ProductCard2";

const Products = () => {
  
  const { fetchPopularproductList} = useFetchProduct()
 

   const { data, error, isLoading } = useQuery({
     queryKey: ["Popular products" , 1],
     queryFn: () => fetchPopularproductList(),
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
   <div className="p-1 lg:p-4">
     <HorizontalCarousel center={true} title="Marketplace" viewAll="/moresalon/category/featured-Products?title=Featured Products">
     {data.data.map((item: ProductTypes , index: number) => (
       <div className="flex-shrink-0 w-60" key={item.id}>
        <AnimatedSection key={item.id} index={index}>
        <ProductCard key={item.id} {...item} />
         </AnimatedSection>
         
       </div>
))}

     </HorizontalCarousel>
   </div>
 );
};


export default Products;
