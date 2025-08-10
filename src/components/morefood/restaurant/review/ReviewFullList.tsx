
"use client";
import React from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Heading from "@/components/ui/heading";
import { ReviewCard } from "../Reviews";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import { Review } from "@/lib/type/morefood/restaurant";
import { ReviewUpload } from "./ReviewUpload";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserReviewCard } from "./userReviewCard";
import { useAuth } from "@/providers/auth-provider";

const ReviewsList = ({ slug }: { slug: string }) => {
    const { fetchRestaurantReview, fetchRestaurantUserReview } = useFetchRestaurant();
    const { user: session } = useAuth(); 

    // Fetch restaurant reviews
    const {
        data: review,
        fetchNextPage,
        hasNextPage,
        isError: reviewError,
        isLoading: reviewLoading,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["reviews", slug],
        queryFn: ({ pageParam = 1 }) => fetchRestaurantReview(slug, pageParam, 10), // 10 reviews per load
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage?.meta?.page_number + 1;
            return nextPage && nextPage <= (lastPage?.meta?.total_pages || 0) ? nextPage : null;
        },
        initialPageParam: 1,
        staleTime: 36000,
    });

    // Fetch user-specific review
    const { data: userReview, isLoading: userReviewLoading } = useQuery({
        queryKey: ["user-review", slug],
        queryFn: () => (session ? fetchRestaurantUserReview(slug) : null),
        staleTime: 480000,
        enabled: !!session, 
    });

    if (reviewLoading) return <p>Loading...</p>;
    if (reviewError) return <div>Error: Unable to fetch reviews.</div>;

    const hasReviews = review?.pages?.some((page) => page?.data?.length > 0) || false;
    const hasUserReview = userReview && JSON.stringify(userReview) !== "{}";

    return (
        <div className="container px-0 lg:flex flex-col gap-4 mx-0 mb-5">
            <Card className="p-2 my-4">
                <Heading title="Reviews & Ratings" />

                {/* Show Review Upload Section if user is logged in & hasn't posted a review */}
                {session && !userReviewLoading && !hasUserReview && (
                    <section className="py-8 px-4">
                        <div className="space-y-6">
                            <div className="border rounded-lg p-4">
                                <div className="flex flex-col items-center mb-2">
                                    {!hasReviews && (
                                        <p className="text-muted-foreground text-center">
                                            No reviews yet. <br />Be the first to leave one!
                                        </p>
                                    )}
                                    <ReviewUpload slug={slug} />
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Display user's posted review if available */}
                {session && hasUserReview && (
                    <div>
                       <UserReviewCard review={userReview} slug={slug} />
                    </div>
                )}

                {/* Render all reviews */}
                {hasReviews && (
                    <div className="flex flex-col gap-4">
                        {review?.pages?.flatMap((page) =>
                            page?.data?.map((review: Review) => (
                                <ReviewCard
                                    comment={review.comment}
                                    rating={review.rating}
                                    author={`${review.user.first_name} ${review.user.last_name}`}
                                    date={review.created_at}
                                    key={review.id}
                                />
                            ))
                        )}
                    </div>
                )}

                {/* Show message if no reviews exist */}
                {!session && !hasReviews && (
                    <section className="py-8 px-4">
                        <div className="border rounded-lg p-4">
                            <div className="flex flex-col items-center mb-2">
                                <h2>No reviews</h2>
                                <p className="text-base">Be the first to review</p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Load More Button */}
                {hasNextPage && !isFetchingNextPage && (
                    <div className="flex justify-center mt-3">
                        <Button
                            variant="morefoodPrimary"
                            size="sm"
                            onClick={() => fetchNextPage()}
                        >
                            Load More
                        </Button>
                    </div>
                )}

                {/* Loading more state */}
                {isFetchingNextPage && <p className="text-center">Loading more reviews...</p>}
            </Card>
        </div>
    );
};

export default ReviewsList;
