"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { fetchTransactions } from "@/lib/action/moreClub/transaction";
import moment from "moment";
import TransactionCard from "@/components/cards/TransactionCard";
import { getCurrencySymbolKey, getTransactionAmountKey } from "@/lib/utils";




const TransactionList = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  
  // Ref for Intersection Observer
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
    queryKey: ["Transaction list", searchQuery],
    queryFn: ({ pageParam = 1 }) => fetchTransactions(pageParam, searchQuery),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page_number + 1;
      return nextPage <= lastPage.meta.total_pages ? nextPage : null;
    },
    initialPageParam: 1,
    staleTime: 100,
    enabled: true,
  });

  // Infinite Scroll Observer
  const lastTransactionRef = useCallback(
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

  // Refetch when search query changes
  useEffect(() => {
    refetch();
  }, [searchQuery, refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600">Loading transactions...</p>
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500 text-center">Oops! Something went wrong.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* No Transactions Found */}
      {data?.pages[0].data.length === 0 && <p className="text-center">No Transactions Found</p>}

      {/* Transaction List */}
      <div className="grid grid-cols-1">
        {data?.pages.map((page, pageIndex) =>
          page.data.map((notification, index) => (
            <div key={`${pageIndex}-${index}`}>
              <h6 className="mt-2 mb-1">
                {moment(notification.day).format("dddd DD MMM, YY")}
              </h6>
              {notification.transactions.map((row, transactionIndex) => (
                <TransactionCard
                  key={`${row.transaction_id}-${transactionIndex}`}
                  id={row.transaction_id}
                  
                  type={row.transaction_type}
                  is_Completed={row.is_completed}
                  narration={`${row.is_refund ? `${row.narration} (Refund)` : row.narration}`}
                  time={moment(row.timestamp).format("hh:mm A")}
                  amount={row[getTransactionAmountKey(row.transaction_type)]}
                  prevbalance={row.previous_balance}
                  currency={row[getCurrencySymbolKey(row.transaction_type)]}
                  default_currency={row[getCurrencySymbolKey(row.transaction_type)]}
                  ref={index === page.data.length - 1 ? lastTransactionRef : null} // Attach observer to last element
                />
              ))}
            </div>
          ))
        )}
      </div>

      {/* Loading More Transactions */}
      {isFetchingNextPage && <p className="text-center mt-4 text-gray-600">Loading more transactions...</p>}
    </div>
  );
};

export default TransactionList;
