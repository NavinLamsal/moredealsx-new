"use client";

import React, { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import AnimatedSection from "@/components/ui/animations/FadeUpView";
import { UserReviewCard } from "./userReviewCard";

const UserReviewList = () => {
  const { fetchUserReview } = useFetchRestaurant();
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
    queryKey: ["User Review list"],
    queryFn: ({ pageParam = 1 }) => fetchUserReview(pageParam),
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
        <p className="text-gray-600">Loading reviews...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center">Oops! Something went wrong.</p>
    );
  }

  return (
    <div className="max-w-5xl">
      {/* No Transactions Found */}
      {data?.pages[0].data.length === 0 && (
        <p className="text-center">No reviews Found</p>
      )}

      {/* Transaction List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        {data?.pages.map((page, pageIndex) =>
          page.data.map((order, index) => (
            <div key={`${pageIndex}-${index}`}>
              <div
                className="flex-shrink-0 w-full"
                key={`${order.id}-${index}`}
              >
                <AnimatedSection key={`${order.id}-${index}`} index={index}>
                  <UserReviewCard
                    key={`${order.id}-${index}`}
                    review={order}
                    slug={order.restaurant.slug}
                    showName={true}
                    // ref={index === page.data.length - 1 ? lastRestaurantRef : null}
                  />
                </AnimatedSection>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Loading More Transactions */}
      {isFetchingNextPage && (
        <p className="text-center mt-4 text-gray-600">
          Loading more reviews...
        </p>
      )}
    </div>
  );
};

export default UserReviewList;
