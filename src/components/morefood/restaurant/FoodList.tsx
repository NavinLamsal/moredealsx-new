"use client"
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import MenuSection from "./menulist";
import { useQuery } from "@tanstack/react-query";
import { ResturantProductSkeletion } from "@/components/Skeletons/RestaurantFoodItemsSkeleton";
import { FoodtypeswithMenu } from "@/lib/type/morefood/restaurant";
import FoodCard from "../cards/FoodCard";

export default function FoodList({ slug }: { slug: string }) {

  const { fetchRestaurantsFooditems } = useFetchRestaurant();
  const { data, error, isLoading } = useQuery({
    queryKey: [`food items for restaurant ${slug}`, slug],
    queryFn: () => fetchRestaurantsFooditems(slug),
    staleTime: 300000,
  });


  if (isLoading) {
    return (
      <div className=" ">
        <ResturantProductSkeletion />
      </div>
    );
  }

  if (error) {
    return <div>Error: Error getting menu items</div>;
  }





  return (
    <div className="relative mt-2 ">
     
      {data && data.data && data.data.length > 0 && (
        <>
         <MenuSection  menulist={data?.data} />

          {data.data.map((category) => (    
        <div
              id={category.id}
              key={category.id}
              className="w-full mb-5 pt-10"
            >
              <h2 className="text-xl  lg:text-2xl  2xl:text-3xl font-bold my-5 w-full">{category.name}</h2>
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl">
                  {category && category.food_items.length > 0 &&
                    category.food_items.map((item: FoodtypeswithMenu) => (
                      <FoodCard key={item.id} item={item} />
                    ))}
                </div>

                
              </div>
              {/* {index % 2 !== 0 && index !== 0 && <CTAbutton />} */}
            </div>

          ))}
        </>
      )}
      {/* Sections for each category */}
    </div>
  );
}
