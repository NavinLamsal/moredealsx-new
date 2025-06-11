"use client";

import React, { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

type MetaType = {
  page_number: number;
  total_pages: number;
};

type InfiniteListProps<T> = {
  queryKey: string;
  fetchFunction: (page: number) => Promise<{ data: T[]; meta: MetaType }>;
  renderItem: (item: T, index: number, ref: (node: HTMLDivElement | null) => void) => React.ReactNode;
  loadingFallback?: React.ReactNode;
  emptyFallback?: React.ReactNode;
};

const InfiniteList = <T,>({
  queryKey,
  fetchFunction,
  renderItem,
  loadingFallback = <p className="text-center">Loading...</p>,
  emptyFallback = <p className="text-center">No items found.</p>,
}: InfiniteListProps<T>) => {
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

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  if (isLoading) return loadingFallback;
  if (isError) return <p className="text-red-500 text-center">Something went wrong.</p>;

  const allData = data?.pages.flatMap((page) => page.data) ?? [];

  if (allData.length === 0) return emptyFallback;

  return (
    <div className="flex flex-wrap gap-3">
      {allData.map((item, index) => {
        const isLast = index === allData.length - 1;
        return renderItem(item, index, isLast ? lastItemRef : () => {});
      })}
      {isFetchingNextPage && (
        <p className="text-center mt-4 text-gray-600">Loading more...</p>
      )}
    </div>
  );
};

export default InfiniteList;
