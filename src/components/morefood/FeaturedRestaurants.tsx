"use client";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import RestaurantCard from "../cards/morefood/RestaurantCard";
import HorizontalCarousel from "../carousel/horizontalCarousel";
import { useQuery } from "@tanstack/react-query";
import { CardSkeleton } from "../Skeletons/CardSkeleton";
import AnimatedSection from "../ui/animations/FadeUpView";
import {
  fetchFeaturedRestaurants,
  fetchPopularRestaurants,
} from "@/lib/action/PublicCommonClient";

const FeaturedRestaurant = () => {
  const city_code =
    typeof window !== "undefined" ? localStorage.getItem("city_code") : null;

  const { data, error, isLoading } = useQuery({
    queryKey: ["Restaurant List", "popular", { city_name: city_code }],
    queryFn: () => fetchFeaturedRestaurants(city_code),
    staleTime: 60000,
    enabled: !!city_code,
  });

  return (
    <div className="p-1 lg:p-4 sm:mt-12">
      <HorizontalCarousel
        title="Featured Restaurants"
        // viewAll="/morefood/category/popular?title=Popular Restaurants"
      >
        {error ? (
          <div>Error: {error?.message}</div>
        ) : isLoading ? (
          <CardSkeleton />
        ) : data && data.length > 0 ? (
          data.map((restaurant, index) => (
            <div className="flex-shrink-0 w-60" key={index}>
              <AnimatedSection key={restaurant.id} index={index}>
                <RestaurantCard key={index} {...restaurant} />
              </AnimatedSection>
            </div>
          ))
        ) : (
          <p className="text-center mx-auto">
            No featured restaurants at the moment!
          </p>
        )}
      </HorizontalCarousel>
    </div>
  );
};

export default FeaturedRestaurant;
