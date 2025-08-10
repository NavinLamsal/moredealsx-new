"use client";

import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import AnimatedSection from "../ui/animations/FadeUpView";
import { fetchHOTDealsList } from "@/lib/action/PublicCommonClient";
import MoreOfferCard from "../cards/moreclub/morefoodoffer/MorefoodOfferCard";
import { Button } from "../ui/button";

const HotDealsList = () => {
  const city_code =
    typeof window !== "undefined" ? localStorage.getItem("city_code") : null;
  const country_code =
    typeof window !== "undefined" ? localStorage.getItem("country_code") : null;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["offers", "all hotdeals list", country_code, city_code],
    queryFn: ({ pageParam = 1 }) =>
      fetchHOTDealsList(country_code, city_code, pageParam),

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page_number + 1;
      return nextPage <= lastPage.meta.total_pages ? nextPage : null;
    },
    initialPageParam: 1,
    staleTime: 36000,
    enabled: !!country_code && !!city_code,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600">Loading hot deals...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center">Oops! Something went wrong.</p>
    );
  }

  if (!country_code || !city_code) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600">Loading location...</p>
      </div>
    );
  }

  return (
    <div className="">
      {data?.pages[0].data.length === 0 && (
        <p className="text-center">No hot deals Found</p>
      )}

      <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.pages.map((page, pageIndex) =>
          page.data.map((hotdeal, index) => {
            return (
              <div key={`${pageIndex}-${index}`}>
                <div
                  className="w-full sm:w-[18rem] md:w-[19rem] lg:w-[20rem]"
                  key={hotdeal.id}
                >
                  <AnimatedSection key={hotdeal.id} index={index}>
                    <MoreOfferCard item={hotdeal} />
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

      {isFetchingNextPage && (
        <p className="text-center mt-4 text-gray-600">
          Loading more hot deals...
        </p>
      )}
    </div>
  );
};

export default HotDealsList;
