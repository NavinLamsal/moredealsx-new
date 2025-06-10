"use client";

import React, { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import AnimatedSection from "../ui/animations/FadeUpView";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import OfferCard from "../cards/morefood/OfferCard";

const OfferList = ({
  type,
  searchParams,
}: {
  type: string;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const city =
    typeof window !== "undefined" ? localStorage.getItem("city") : null;
  const { fetchAllOfferList } = useFetchRestaurant();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["offer List", type, { ...searchParams, city_name: city }],
    queryFn: ({ pageParam = 1 }) =>
      fetchAllOfferList(type, { ...searchParams, city_name: city }, pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page_number + 1;
      return nextPage <= lastPage.meta.total_pages ? nextPage : null;
    },
    initialPageParam: 1,
    staleTime: 36000,
    enabled: true,
  });

  // Infinite Scroll Observer
  const lastRestaurantRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!hasNextPage || isFetchingNextPage) return;

      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600">Loading offers...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center">Oops! Something went wrong.</p>
    );
  }

  return (
    <div className="">
      {/* No Transactions Found */}
      {data?.pages[0].data.length === 0 && (
        <p className="text-center">No Offers Found</p>
      )}

      {/* Transaction List */}
      <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3">
        {data?.pages.map((page, pageIndex) =>
          page.data.map((offer, index) => (
            <div key={`${pageIndex}-${index}`}>
              {/* <div className="flex-shrink-0 sm:w-48 lg:w-60" key={restaurant.id}>
                                <AnimatedSection key={restaurant.id} index={index}>
                                    <RestaurantCard
                                        key={index}
                                        {...restaurant}
                                        ref={index === page.data.length - 1 ? lastRestaurantRef : null}
                                    />
                                </AnimatedSection>
                            </div> */}
              <div className="flex-shrink-0 w-96" key={index}>
                <AnimatedSection key={index} index={index}>
                  <OfferCard index={index} offer={offer} />
                </AnimatedSection>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Loading More Transactions */}
      {isFetchingNextPage && (
        <p className="text-center mt-4 text-gray-600">Loading more offers...</p>
      )}
    </div>
  );
};

export default OfferList;
