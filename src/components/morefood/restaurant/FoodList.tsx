"use client"
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import MenuSection from "./menulist";
import { useQuery } from "@tanstack/react-query";
import { ResturantProductSkeletion } from "@/components/Skeletons/RestaurantFoodItemsSkeleton";
import { FoodListType, FoodtypeswithMenu } from "@/lib/type/morefood/restaurant";
import FoodCard from "../cards/FoodCard";
import { useEffect, useState } from "react";

export default function FoodList({ slug }: { slug: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchRestaurantsFooditems } = useFetchRestaurant();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [menuData, setMenuData] = useState<FoodListType[]>([]); // Store previous data

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);



  const { data, error, isLoading } = useQuery({
    queryKey: [`food items for restaurant ${slug}`, debouncedSearchTerm],
    queryFn: () => fetchRestaurantsFooditems(slug, debouncedSearchTerm),
    staleTime: 300000,
   
  });


  // if (isLoading) {
  //   return (
  //     <div className=" ">
  //       <ResturantProductSkeletion />
  //     </div>
  //   );
  // }

  if (error) {
    return <div>Error: Error getting menu items</div>;
  }

  useEffect(() => {

    if (!isLoading &&data?.data) {
      setMenuData(data.data);
    }
  }, [data , isLoading]);



  return (
    <div className="relative mt-2">
      {/* Search input remains interactive */}
      <MenuSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} menulist={menuData} />

      {/* Show skeleton only if no previous data exists */}
      {isLoading && menuData.length === 0 ? (
        <ResturantProductSkeletion />
      ) : (
        menuData
          .filter(category => category.food_items && category.food_items.length > 0) // Filter empty categories
          .map((category) => (    
            <div id={category.id} key={category.id} className="w-full mb-5 pt-10">
              <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold my-5 w-full">{category.name}</h2>
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl">
                  {category.food_items.map((item: FoodtypeswithMenu) => (
                    <FoodCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          ))
      )}
    </div>
  );
}


  

