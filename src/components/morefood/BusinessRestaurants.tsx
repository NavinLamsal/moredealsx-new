"use client";

import React from "react";

import AnimatedSection from "../ui/animations/FadeUpView";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import { Button } from "../ui/button";
import BusinessRestaurantCard from "../cards/morefood/BusinessRestaurantCard";
import InfiniteList from "../lists/infiniteListing";
import TrendingEventSkeleton from "../Skeletons/EventSkeleton";

const BusinessRestaurantList = () => {
  const { fetchBusinessRestaurantList } = useFetchRestaurant();
  // const {
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  //   isError,
  //   isLoading,
  //   isFetchingNextPage,
  //   refetch,
  // } = useInfiniteQuery({
  //   queryKey: ["Business Restaurant List", "list"],
  //   queryFn: ({ pageParam = 1 }) => fetchBusinessRestaurantList(pageParam),

  //   getNextPageParam: (lastPage) => {
  //     const nextPage = lastPage.meta.page_number + 1;
  //     return nextPage <= lastPage.meta.total_pages ? nextPage : null;
  //   },
  //   initialPageParam: 1,
  //   staleTime: 36000,
  //   enabled: true,
  // });

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-40">
  //       <p className="text-gray-600">Loading restaurants...</p>
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <p className="text-red-500 text-center">Oops! Something went wrong.</p>
  //   );
  // }

  return (
    // <div className="">
    //   {/* No Transactions Found */}
    //   {data?.pages[0].data.length === 0 && (
    //     <p className="text-center">No restaurants Found</p>
    //   )}

    //   {/* Transaction List */}
    //   <div className="grid grid-cols-2 sm:flex sm:flex-wrap  xl:grid xl:grid-cols-3 2xl:flex 2xl:flex-wrap gap-3">
    //     {data?.pages.map((page, pageIndex) =>
    //       page.data.map((restaurant, index) => (
    //           <div
    //             className="flex-shrink-0 sm:w-48 lg:w-60 xl:w-48"
    //             key={`${pageIndex}-${index}`}
    //           >
    //             <AnimatedSection key={restaurant.id} index={index}>
    //               <BusinessRestaurantCard
    //                 key={index}
    //                 {...restaurant}
    //                 ref={null}
    //                 // ref={index === page.data.length - 1 ? lastRestaurantRef : null}
    //               />
    //             </AnimatedSection>
    //           </div>
    //       ))
    //     )}
    //   </div>

    //   {(hasNextPage || isFetchingNextPage) && (
    //     <div className="text-center mt-6">
    //       <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
    //         {isFetchingNextPage ? "Loading..." : "Load More"}
    //       </Button>
    //     </div>
    //   )}

    //   {/* Loading More Transactions */}
    //   {isFetchingNextPage && (
    //     <p className="text-center mt-4 text-gray-600">
    //       Loading more restaurants...
    //     </p>
    //   )}
    // </div>
    <InfiniteList
    queryKey="restro-events-list"
    fetchFunction={fetchBusinessRestaurantList}
    loadingFallback={<TrendingEventSkeleton />}
    emptyFallback={<p className="text-center">No Events Found</p>}
    renderItem={(restaurant, index, ref) => (
      <div key={restaurant.id} className="flex-shrink-0 w-60 lg:w-72" ref={ref}>
        <AnimatedSection index={index}>
        <BusinessRestaurantCard
                    key={index}
                    {...restaurant}
                    // ref={index === page.data.length - 1 ? lastRestaurantRef : null}
                  />
          {/* <EventCard {...event} platform="morefood" /> */}
        </AnimatedSection>
      </div>
    )}
  />
  );

  
};

export default BusinessRestaurantList;
