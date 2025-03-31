"use client";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import RestaurantCard from "../cards/morefood/RestaurantCard";
import HorizontalCarousel from "../carousel/horizontalCarousel";
import { useQuery } from "@tanstack/react-query";
import { CardSkeleton } from "../Skeletons/CardSkeleton";
import AnimatedSection from "../ui/animations/FadeUpView";
import OfferCard from "../cards/morefood/OfferCard";



const PopularCombos = () => {

  const { fetchcomboList} = useFetchRestaurant();
 
  const { data, error, isLoading } = useQuery({
    queryKey: ["Popular Combos" , 1],
    queryFn: () => fetchcomboList(),
    staleTime: 60000,
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
   <div className="p-4">
     <HorizontalCarousel title="Popular Combos">
     {data.data.map((offer, index) => (
       <div className="flex-shrink-0 w-96" key={index}>
        <AnimatedSection key={index} index={index}>
        <OfferCard
        index={index} 
        offer={offer}
         />
         </AnimatedSection>
       </div>
     ))}


     </HorizontalCarousel>
   </div>
 );
};


export default PopularCombos;

