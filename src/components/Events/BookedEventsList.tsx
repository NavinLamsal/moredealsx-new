"use client";

import React, { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useFetchEvents } from "@/lib/action/moreClub/Events";
import AnimatedSection from "../ui/animations/FadeUpView";
import EventCard from "../cards/moreclub/EventCard";




const BoookedEventList = ({type}:{type: "upcoming_events" | "past_events"}) => {

    const { fetchBookedEventsList } = useFetchEvents()
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
        queryKey: [`User Booked ${type} Event list`],
        queryFn: ({ pageParam = 1 }) => fetchBookedEventsList(type,pageParam),
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.meta.page_number + 1;
            return nextPage <= lastPage.meta.total_pages ? nextPage : null;
        },
        initialPageParam: 1,
        staleTime: 36000,
        enabled: true,
    });

    // Infinite Scroll Observer
    const lastEventRef = useCallback(
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
                <p className="text-gray-600">Loading events...</p>
            </div>
        );
    }

    if (isError) {
        return <p className="text-red-500 text-center">Oops! Something went wrong.</p>;
    }

    return (
        <div className="">
            {/* No Transactions Found */}
            {data?.pages[0].data.length === 0 && <p className="text-center">No Events Found</p>}

            {/* Transaction List */}
            <div className="flex flex-wrap gap-3">
                {data?.pages.map((page, pageIndex) =>
                    page.data.map((event, index) => (
                        <div key={`${pageIndex}-${index}`}>
                            <div className="flex-shrink-0 w-48 lg:w-60" key={event.id}>
                                <AnimatedSection key={event.id} index={index}>
                                    <EventCard
                                        key={index}
                                        event={event.event}
                                        ref={index === page.data.length - 1 ? lastEventRef : null}
                                    />
                                </AnimatedSection>
                            </div>
                        </div>
                    )))}
            </div>

            {/* Loading More Transactions */}
            {isFetchingNextPage && <p className="text-center mt-4 text-gray-600">Loading more events...</p>}
        </div>
    );
};

export default BoookedEventList;
