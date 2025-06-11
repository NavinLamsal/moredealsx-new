"use client";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import RestaurantCard from "../cards/morefood/RestaurantCard";
import HorizontalCarousel from "../carousel/horizontalCarousel";
import { useQuery } from "@tanstack/react-query";
import { CardSkeleton } from "../Skeletons/CardSkeleton";
import AnimatedSection from "../ui/animations/FadeUpView";



const NearestRestaurant = () => {
  const city = typeof window !== "undefined" ? localStorage.getItem("city_code") : null;
  const latitude = typeof window !== "undefined" ? localStorage.getItem("latitude") : null;
  const longitude = typeof window !== "undefined" ? localStorage.getItem("longitude") : null;

  const { fetchRestaurantList} = useFetchRestaurant()
   const { data, error, isLoading } = useQuery({
     queryKey: ["Restaurant List", "nearest" , {city_code: city , lat: latitude , lng: longitude} ],
     queryFn: () => fetchRestaurantList("nearest-restro/list" ,{city_code: city , lat: latitude , lng: longitude}, 1) ,
  
     staleTime: 60000,
     enabled: !!city
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


   if (!data || JSON.stringify(data.data) === '{}' ||  data.data.length === 0) {
     return null;
   }


  return (
    <div className="p-1 lg:p-4">
      <HorizontalCarousel title="Nearest Restaurants" viewAll={`/morefood/category/nearest?title=Nearest Restaurants&lat=${latitude}&lng=${longitude}`} dashboard={true}>
      {data.data.map((restaurant, index) => (
        <div className="flex-shrink-0 w-60" key={index}>
         <AnimatedSection key={restaurant.id} index={index}>
         <RestaurantCard 
            key={index} 
            {...restaurant} 
           
          />
          </AnimatedSection>
          
        </div>
))}

      </HorizontalCarousel>
    </div>
  );
};

export default NearestRestaurant;
