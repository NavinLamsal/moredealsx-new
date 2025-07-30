// "use client"
// import React, { useCallback, useEffect, useRef, useState } from 'react'
// import BlogCard from '../cards/BlogCard';
// import { Blog } from '@/lib/type/CommonType';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { fetchBlogs } from '@/lib/action/PubilcCommon';
// import { useSearchParams } from 'next/navigation';

// const OfferList = () => {
//     const searchParams = useSearchParams();
//   const searchQuery = searchParams.get("search") || "";
//   const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

//   // Ref for Intersection Observer
//   const observerRef = useRef<IntersectionObserver | null>(null);

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isError,
//     isLoading,
//     isFetching,
//     refetch,
//   } = useInfiniteQuery({
//     queryKey: ["blog list", searchQuery,],
//     queryFn: ({ pageParam = 1 }) => fetchBlogs(pageParam, searchQuery),
//     getNextPageParam: (lastPage) => {
//       return lastPage.meta.links.next ? lastPage.meta.page_number + 1 : null;
//     },
//     initialPageParam: 1, // ✅ Required for Infinite Query
//     staleTime: 100,
//     enabled: true,
//   });

//   // Infinite Scroll Observer
//   const lastPostRef = useCallback(
//     (node: HTMLDivElement | null) => {
//       if (isFetchingNextPage || !hasNextPage) return;

//       if (observerRef.current) observerRef.current.disconnect();
//       observerRef.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting) {
//           setIsFetchingNextPage(true);
//           fetchNextPage().finally(() => setIsFetchingNextPage(false));
//         }
//       });

//       if (node) observerRef.current.observe(node);
//     },
//     [fetchNextPage, hasNextPage, isFetchingNextPage]
//   );

//   // Refetch on search query change
//   useEffect(() => {
//     refetch();
//   }, [searchQuery, refetch]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-40">
//         <p className="text-gray-600">Loading articles...</p>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <p>OOps something went wrong</p>
//       // <UniversalErrorbox
//       //   message="Something went wrong while fetching the data"
//       //   retry={["blog list", searchQuery]}
//       // />
//     );
//   }
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">

//       {/* Blog Listing */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
//         {data?.pages.map((page: any) =>
//           page?.data.map((blog: Blog, index:number) => (
//             <div
//               key={blog.id}
//               ref={index === page.data.length - 1 ? lastPostRef : null}
//               className="animate-fadeIn"
//             >
//               <BlogCard
//                 blog={blog}
//               />
//             </div>
//           ))
//         )}
//       </div>

//       {/* Loading More */}
//       {isFetchingNextPage && (
//         <div className="text-center mt-4 text-gray-600">Loading more articles...</div>
//       )}
//     </div>
//   );
// };


// export default OfferList


"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { fetchOffer, fetchOfferList, Offer, OfferDealType } from "@/lib/action/PublicCommonClient";
import OfferCard from "../cards/moreclub/OfferCard";

import OfferSkeleton from "../Skeletons/OfferSkeelton";
import MoreOfferCard from "../cards/moreclub/morefoodoffer/MorefoodOfferCard";
// import OfferCard from "../cards/OfferCard";



const AllOffersList = () => {
    const country = typeof window !== "undefined" ? localStorage.getItem("country") : null;
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

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
        queryKey: ["Offers List", "list", country, category, searchQuery],
        queryFn: ({ pageParam = 1 }) => fetchOffer(country, category, pageParam, searchQuery),
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
                <OfferSkeleton />
            </div>
        );
    }

    if (isError) {
        return <p className="text-red-500 text-center">Oops! Something went wrong.</p>;
    }


    function isMoreFoodOffers(data: any[]): data is OfferDealType[] {
        return data.length > 0 && "restro_url" in data[0];
    }

    return (
        <div className=" px-4 py-8">
            {/* No Transactions Found */}
            {data?.pages[0].data.length === 0 && <p className="text-center">No Offers Found</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {data?.pages.map((page: any) =>
                    page?.data.map((offer: any, index: number) => {
                        const isLast = index === page.data.length - 1;
                        return (
                            <div key={offer.id} className="animate-fadeIn">
                                {category === "morefood" && isMoreFoodOffers(page.data) ? (
                                    <MoreOfferCard
                                        key={offer.id}
                                        item={offer}
                                        ref={isLast ? lastRestaurantRef : null}
                                    />
                                ) : (
                                    <OfferCard
                                        key={offer.id}
                                        offer={offer}
                                        ref={isLast ? lastRestaurantRef : null}
                                    />
                                )}
                            </div>
                        );
                    })
                )}
            </div>




            {/* Loading More Transactions */}
            {isFetchingNextPage && <p className="text-center mt-4 text-gray-600">Loading more offers...</p>}
        </div>
    );
};

export default AllOffersList;

