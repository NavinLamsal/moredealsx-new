"use client";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import RestaurantCard from "../cards/morefood/RestaurantCard2";
import HorizontalCarousel from "../carousel/horizontalCarousel";
import { useQuery } from "@tanstack/react-query";
import { CardSkeleton } from "../Skeletons/CardSkeleton";
import AnimatedSection from "../ui/animations/FadeUpView";
import SectionTitle from "../Homes/sectionTiltle";



const FeaturedRestaurants = () => {
    const city = typeof window !== "undefined" ? localStorage.getItem("city") : null;

    const { fetchRestaurantList } = useFetchRestaurant()
    const { data, error, isLoading } = useQuery({
        queryKey: ["Featured resturants", 1, { city_name: city }],
        queryFn: () => fetchRestaurantList("featured-restaurants", { city_name: city }, 1),
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

    if (!data || data.data.length === 0) {
        return null;
    }


    return (
        <div className="p-1 lg:p-4 max-w-8xl mx-auto">
            <HorizontalCarousel
                center={true} title="Restaurants" viewAll="/morefood/category/featured-restaurants?title=Featured Restaurants">
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

export default FeaturedRestaurants;
