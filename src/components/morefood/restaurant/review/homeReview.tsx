// import Heading from "@/components/ui/heading";
// import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
// import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
// import { Crown } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { ReviewCard } from "../Reviews";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";


// const HomeReview = ({ slug, rating, totalReview }: { slug: string, rating: string, totalReview: string }) => {
//     const { fetchRestaurantReview, fetchRestaurantUserReview } = useFetchRestaurant();
//     const { data: session } = useSession();

//     // const { data: review, isError: reviewError, isLoading: reviewLoading } = useQuery({
//     //     queryKey: ["reviews", slug],
//     //     queryFn: () => fetchRestaurantReview(slug, 1, 1), // Fetch only 1 review
//     //     staleTime: 36000,
//     // });


//     const {
//         data: review,
//         fetchNextPage,
//         hasNextPage,
//         isError: reviewError,
//         isLoading: reviewLoading,
//         isFetchingNextPage,
//     } = useInfiniteQuery({
//         queryKey: ["reviews", slug],
//         queryFn: ({ pageParam = 1 }) => fetchRestaurantReview(slug, pageParam, 10), // 10 reviews per load
//         getNextPageParam: (lastPage) => {
//             const nextPage = lastPage?.meta?.page_number + 1;
//             return nextPage && nextPage <= (lastPage?.meta?.total_pages || 0) ? nextPage : null;
//         },
//         initialPageParam: 1,
//         staleTime: 36000,
//     });


//     const { data: userReview, isLoading: userReviewLoading } = useQuery({
//         queryKey: ["user-review", slug],
//         queryFn: () => (session ? fetchRestaurantUserReview(slug) : null),
//         staleTime: 480000,
//         enabled: !!session,
//     });

//     if (reviewLoading) return <p>Loading...</p>;
//     if (reviewError) return <div>Error: Unable to fetch reviews.</div>;

//     // Extract the first review safely
//     const firstReview = review?.pages?.[0]?.data?.[0] || null;


//     return (
//         <div className="px-2 sm:px-6 border-t">
//             <Heading title="Reviews and Ratings" />
//             <div className="grid grid-cols-12 gap-4 mt-3">
//                 {firstReview && (
//                     <div className="col-span-12 md:col-span-4 flex flex-col items-start md:items-center gap-2">
//                         <span className="text-yellow-500 flex items-center gap-1">
//                             <Crown fill={"currentcolor"} className="w-6 h-6" />
//                             <span className="text-lg lg:text-3xl font-bold">{rating}</span>
//                         </span>
//                         <p className="text-sm lg:text-base text-muted-foreground">{review && review?.meta?.count} Ratings</p>
//                     </div>
//                 )}

//                 <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
//                     {firstReview && (
//                         <ReviewCard
//                             comment={firstReview.comment}
//                             rating={firstReview.rating}
//                             author={`${firstReview.user.first_name} ${firstReview.user.last_name}`}
//                             date={firstReview.created_at}
//                             key={firstReview.id}
//                         />
//                     )}

//                     {!firstReview && (
//                         <section className="py-8 px-4">
//                             <div className="border rounded-lg p-4">
//                                 <div className="flex flex-col items-center mb-2">
//                                     <h2>No reviews</h2>
//                                     <p className="text-base">Be the first to review</p>
//                                 </div>
//                             </div>
//                         </section>
//                     )}

                   
//                    {review && review?.meta?.count > 1 &&
//                     <div className="text-center mt-4">
//                         <Link href={`/morefood/restaurant/${slug}/reviews`}>
//                             <Button variant="outline">Show more</Button>
//                         </Link>
//                     </div>
//                    } 
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomeReview;

"use client";
import React from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Heading from "@/components/ui/heading";
import { Crown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import { ReviewCard } from "../Reviews";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HomeReview = ({ slug, rating, totalReview }: { slug: string; rating: string; totalReview: string }) => {
    const { fetchRestaurantReview } = useFetchRestaurant();

    const {
        data: review,
        isError: reviewError,
        isLoading: reviewLoading,
    } = useInfiniteQuery({
        queryKey: ["reviews", slug],
        queryFn: ({ pageParam = 1 }) => fetchRestaurantReview(slug, pageParam, 10),
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage?.meta?.page_number + 1;
            return nextPage && nextPage <= (lastPage?.meta?.total_pages || 0) ? nextPage : null;
        },
        initialPageParam: 1,
        staleTime: 36000,
    });

    if (reviewLoading) return <p>Loading...</p>;
    if (reviewError) return <div>Error: Unable to fetch reviews.</div>;

    // Extract first review safely
    const firstReview = review?.pages?.[0]?.data?.[0] || null;
    const totalReviewsCount = review?.pages?.flatMap((page) => page.data).length || 0;

    return (
        <div className="px-2 sm:px-6 border-t">
            <Heading title="Reviews and Ratings" />
            <div className="grid grid-cols-12 gap-4 mt-3">
                {/* Rating Section */}
                <div className="col-span-12 md:col-span-4 flex flex-col items-start md:items-center gap-2">
                    <span className="text-yellow-500 flex items-center gap-1">
                        <Crown fill={"currentcolor"} className="w-6 h-6" />
                        <span className="text-lg lg:text-3xl font-bold">{rating}</span>
                    </span>
                    <p className="text-sm lg:text-base text-muted-foreground">{totalReview} Ratings</p>
                </div>

                {/* Review Section */}
                <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
                    {firstReview ? (
                        <ReviewCard
                            comment={firstReview.comment}
                            rating={firstReview.rating}
                            author={`${firstReview.user.first_name} ${firstReview.user.last_name}`}
                            date={firstReview.created_at}
                            key={firstReview.id}
                        />
                    ) : (
                        <section className="py-8 px-4">
                            <div className="border rounded-lg p-4">
                                <div className="flex flex-col items-center mb-2">
                                    <h2>No reviews</h2>
                                    <p className="text-base">Be the first to review</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Show More Button */}
                    {Number(totalReview) > 1 && (
                        <div className="text-center mt-4">
                            <Link href={`/morefood/restaurant/${slug}/reviews`}>
                                <Button variant="outline">Show more</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeReview;

