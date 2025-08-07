"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import AnimatedSection from "../ui/animations/FadeUpView";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import RestaurantCard from "../cards/morefood/RestaurantCard";
import { Button } from "../ui/button";
import { ResturantListType } from "@/lib/type/morefood/restaurant";
import Heading from "../ui/heading";
import DashboardSectionTitle from "../ui/DashboardSectionTitle";

const AllRestaurantList = () => {
  const city =
    typeof window !== "undefined" ? localStorage.getItem("city") : null;
  const country =
    typeof window !== "undefined" ? localStorage.getItem("country_code") : null;
  const { fetchRestaurantList } = useFetchRestaurant();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["Restaurant List", "list", { country: country }],
    queryFn: ({ pageParam = 1 }) =>
      //   fetchRestaurantList("list", { city_name: city }, pageParam),
      fetchRestaurantList<ResturantListType>(`list/${country}`, {}, pageParam),

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page_number + 1;
      return nextPage <= lastPage.meta.total_pages ? nextPage : null;
    },
    initialPageParam: 1,
    staleTime: 36000,
    enabled: true,
  });


  if (isLoading) {
    return (
      <>
      <DashboardSectionTitle title={"All Restaurants"} />
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600">Loading restaurants...</p>
      </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
      <DashboardSectionTitle title={"All Restaurants"} />
      <p className="text-red-500 text-center">Oops! Something went wrong.</p>
      </>
    );
  }

  return (
    <div className="">
      <DashboardSectionTitle title={"All Restaurants"} />
      {/* No Transactions Found */}
      {data?.pages[0].data.length === 0 && (
        <p className="text-center">No restaurants Found</p>
      )}

      {/* Transaction List */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap  xl:grid xl:grid-cols-3 2xl:flex 2xl:flex-wrap gap-3">
        {data?.pages.map((page, pageIndex) =>
          page.data.map((restaurant, index) => {
            return (
              <div key={`${pageIndex}-${index}`}>
                <div
                  className="flex-shrink-0 sm:w-48 lg:w-60 xl:w-48 2xl:w-60"
                  key={restaurant.id}
                >
                  <AnimatedSection key={restaurant.id} index={index}>
                    <RestaurantCard
                      key={index}
                      {...restaurant}
                      ref={null}
                      // ref={
                      //   index === page.data.length - 1 ? lastRestaurantRef : null
                      // }
                    />
                  </AnimatedSection>
                </div>
              </div>
            );
          })
        )}
      </div>

      {(hasNextPage || isFetchingNextPage) && (
        <div className="text-center mt-6">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      {/* Loading More Transactions */}
      {isFetchingNextPage && (
        <p className="text-center mt-4 text-gray-600">
          Loading more restaurants...
        </p>
      )}
    </div>
  );
};

export default AllRestaurantList;
