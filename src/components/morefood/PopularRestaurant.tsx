"use client";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import RestaurantCard from "../cards/morefood/RestaurantCard";
import HorizontalCarousel from "../carousel/horizontalCarousel";
import { useQuery } from "@tanstack/react-query";
import { CardSkeleton } from "../Skeletons/CardSkeleton";
import AnimatedSection from "../ui/animations/FadeUpView";
import { ResturantListType } from "@/lib/type/morefood/restaurant";

const PopularRestaurant = () => {
  const city =
    typeof window !== "undefined" ? localStorage.getItem("city_code") : null;

  const { fetchRestaurantList } = useFetchRestaurant();
  const { data, error, isLoading } = useQuery({
    queryKey: ["Restaurant List", "popular", { city_code: city }],
    queryFn: () =>
      fetchRestaurantList<ResturantListType>(
        "popular/list",
        { city_code: city },
        1
      ),
    staleTime: 60000,
    enabled: !!city,
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
      <HorizontalCarousel
        title="Popular Restaurants"
        viewAll={`/morefood/category/popular/list?title=Popular Restaurants`}
      >
        {data.data.map((restaurant, index) => (
          <div className="flex-shrink-0 w-60" key={index}>
            <AnimatedSection key={restaurant.id} index={index}>
              <RestaurantCard key={index} {...restaurant} />
            </AnimatedSection>
          </div>
        ))}
      </HorizontalCarousel>
    </div>
  );
};

export default PopularRestaurant;
