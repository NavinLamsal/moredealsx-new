"use client";

import React, { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "../Homes/sectionTiltle";
import DashboardSectionTitle from "../ui/DashboardSectionTitle";

type MetaType = {
  page_number: number;
  total_pages: number;
};

type InfiniteListProps<T> = {
  title: string;
  queryKey: string;
  fetchFunction: (page: number) => Promise<{ data: T[]; meta: MetaType }>;
  renderItem: (item: T, index: number, ref: (node: HTMLDivElement | null) => void) => React.ReactNode;
  loadingFallback?: React.ReactNode;
  emptyFallback?: React.ReactNode;
};

const InfiniteHorizontalCarouselWithNav = <T,>({
  title,
  queryKey,
  fetchFunction,
  renderItem,
  loadingFallback = <p className="text-center">Loading...</p>,
  emptyFallback = <p className="text-center">No items found.</p>,
}: InfiniteListProps<T>) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam = 1 }) => fetchFunction(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page_number + 1;
      return nextPage <= lastPage.meta.total_pages ? nextPage : null;
    },
    initialPageParam: 1,
    staleTime: 36000,
  });

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!hasNextPage || isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        {
          root: scrollContainerRef.current,
          rootMargin: "0px",
          threshold: 0.5,
        }
      );

      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  const scrollBy = (distance: number) => {
    scrollContainerRef.current?.scrollBy({
      left: distance,
      behavior: "smooth",
    });
  };

  const allData = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) return loadingFallback;
  if (isError) return <p className="text-red-500 text-center">Something went wrong.</p>;
  if (allData.length === 0) return emptyFallback;

  return (
    <section className="w-full">
      {/* Title and navigation buttons */}
      <div className="flex items-center justify-between mb-4 px-2">
      <DashboardSectionTitle title={"Your Restaurants Offers"} />
        {/* <h2 className="text-xl font-semibold">{title}</h2> */}
        <div className="space-x-2">
          <button
            onClick={() => scrollBy(-300)}
            className="p-1 bg-white shadow rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollBy(300)}
            className="p-1 bg-white shadow rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 scroll-smooth px-2 pb-4 hide-scroll-bar"
      >
        {allData.map((item, index) => {
          const isLast = index === allData.length - 1;
          return renderItem(item, index, isLast ? lastItemRef : () => {});
        })}
        {isFetchingNextPage && (
          <div className="flex-shrink-0 w-72 flex items-center justify-center text-gray-500">
            Loading more...
          </div>
        )}
      </div>
    </section>
  );
};

export default InfiniteHorizontalCarouselWithNav;
