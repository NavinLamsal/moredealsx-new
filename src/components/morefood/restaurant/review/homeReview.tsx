
"use client";
import React from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Heading from "@/components/ui/heading";
import { Crown } from "lucide-react";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import { ReviewCard } from "../Reviews";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReviewUpload } from "./ReviewUpload";
import { UserReviewCard } from "./userReviewCard";
import { ContainerSkeleton } from "@/components/MapBox/Skeletons";
import { useAuth } from "@/providers/auth-provider";

const HomeReview = ({ slug, rating, totalReview , postitveReview , negativeReview }: { slug: string; rating: number; totalReview: number , postitveReview: number , negativeReview: number }) => {
    const { fetchRestaurantReview , fetchRestaurantUserReview} = useFetchRestaurant();
    const { user: session } = useAuth();

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

     const { data: userReview, isLoading: userReviewLoading } = useQuery({
            queryKey: ["user-review", slug],
            queryFn: () => (session ? fetchRestaurantUserReview(slug) : null),
            staleTime: 480000,
            enabled: !!session, 
        });

    if (reviewLoading || (session && userReviewLoading)) return <ContainerSkeleton/>;
    if (reviewError) return <div>Error: Unable to fetch reviews.</div>;
    
    const firstReview = review?.pages?.[0]?.data?.[0] ??  null;
    

    return (
        <div className="px-2 sm:px-6 border-t">
            <Heading title="Reviews and Ratings" />
            <div className="grid grid-cols-12 gap-4 mt-3">
                {/* Rating Section */}
                {rating && rating > 0 && 
                <div className="col-span-12 md:col-span-4 flex flex-col items-start md:items-center gap-2 ">
                    <span className="text-yellow-500 flex items-center gap-1">
                        <Crown fill={"currentcolor"} className="w-6 h-6" />
                        <span className="text-lg lg:text-3xl font-bold">{rating}</span>
                    </span>
                    <p className="text-sm lg:text-base text-muted-foreground">{totalReview} Ratings</p>
                    <p className="text-sm lg:text-base text-muted-foreground">{postitveReview} Postive Reviews</p>
                    {/* <p className="text-sm lg:text-base text-muted-foreground">{negativeReview} Negative Ratings</p> */}
                </div>
                }

                {/* Review Section */}
                    
                    {firstReview ? (
                        <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
                        <ReviewCard
                            comment={firstReview.comment}
                            rating={firstReview.rating}
                            author={`${firstReview.user.first_name} ${firstReview.user.last_name}`}
                            date={firstReview.created_at}
                            key={firstReview.id}
                        />
                         {Number(totalReview) > 1 && (
                        <div className="text-center mt-4">
                            <Link href={`/morefood/restaurant/${slug}/reviews`}>
                                <Button variant="outline">Show more</Button>
                            </Link>
                        </div>
                    )}
                </div>
                    ) : <>
                    {(userReview && JSON.stringify(userReview) !== "{}") ?
                    <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
                    <UserReviewCard review={userReview} slug={slug} />
                    </div>
                    :
                    (
                        <section className="py-2 px-4 col-span-12">
                            <div className="border rounded-lg p-4">
                                <div className="flex flex-col items-center mb-2">
                                    <h2>No reviews</h2>
                                    <p className="text-base">Be the first to review</p>
                                    <ReviewUpload slug={slug} />
                                </div>
                            </div>
                        </section>
                    )
                    }
                    </>
                    }

                    {/* Show More Button */}
                   
            </div>
        </div>
    );
};

export default HomeReview;

