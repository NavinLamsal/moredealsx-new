// "use client";
// import React from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import Heading from "@/components/ui/heading";
// import { ReviewCard } from "../Reviews";
// import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";


// const ReviewsList =  ({ slug }: { slug: string }) => {
//     const { fetchRestaurantReview , fetchRestaurantUserReview }= useFetchRestaurant();


//     const {
//       data: review,
//       error: reviewError,
//       isLoading: reviewLoading,
//     } = useQuery({
//       queryKey: ["reviews", slug],
//       queryFn: () => fetchRestaurantReview(slug),
//       staleTime: 360000, 
//     });

//     const {
//       data: userReview,
//       error: userReviewError,
//       isLoading: userReviewLoading,
//     } = useQuery({
//       queryKey: ["user-review", slug],
//       queryFn: () => fetchRestaurantUserReview(slug),
//       staleTime: 480000, 
//     });

//   const queryClient = useQueryClient();

//     const handleRefresh = async () => {
//       await Promise.all([
//         queryClient.invalidateQueries({ queryKey: ["reviews", slug] }),
//         queryClient.invalidateQueries({ queryKey: ["user-review", slug] }),
//       ]);
//     };

//   if (reviewLoading) {
//     return (
//       <div>
//         <p>Loading...</p>
//         {/* <ReviewSkeleton /> */}
//       </div>
//     );
//   }

//   if (reviewError) {
//     return <div>Error: {reviewError?.message}</div>;
//   }


//   return (
//     <div className="lg:flex flex-col  container px-0 4xl:max-w-6xl 3xl:max-w-5xl  gap-4 2xl:max-w-3xl xl:max-w-3xl lg:max-w-2xl mx-0  mb-5">
//       {/* <div className="lg:flex flex-col  hidden container px-0 4xl:max-w-9xl 3xl:max-w-8xl  gap-4 2xl:max-w-6xl xl:max-w-4xl lg:max-w-3xl mx-0  mb-5"> */}
//       <div className="bg-slate-200  dark:bg-dark-primary rounded-md drop-shadow-md p-2 my-4 ">
//         <Heading title="Reviews & Ratings"/>

//         {/* {session?.data?.user.accessToken && (
//           <>
//             {userReviewLoading && <ContainerSkeleton />}
//             {userReview && JSON.stringify(userReview) !== "{}" ? (
//               <UserReview userReview={userReview} onRefresh={handleRefresh} />
//             ) : (
//               <TestimonialForm onRefresh={handleRefresh} />
//             )}
//           </>
//         )} */}

//         {review && review.data.length > 0 && 
//         <div>
//             <div className='col-span-12 md:col-span-8 flex flex-col  gap-4'>
//       {review.data.map((review: any) => <ReviewCard comment={review.review} rating={review.rating} author={review.name} date={review.date} key={review.id} />)}



//       </div>

//         </div>
//         }

//         {review &&
//           review.data.length === 0 &&
//           userReview &&
//           JSON.stringify(userReview) === "{}" && (
//             <section className="py-8 px-4">
//               <div className="space-y-6">
//                 <div className="border rounded-lg p-4 ">
//                   <div className="flex flex-col items-center mb-2">
//                    <h2>No reviews</h2>
//                     <p className="text-base">Be First to Review</p>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           )}
//         {review &&
//           review.data.length === 0 &&
//           !userReview &&
//            (
//             <section className="py-8 px-4">
//               <div className="space-y-6">
//                 <div className="border rounded-lg p-4 ">
//                   <div className="flex flex-col items-center mb-2">
//                   <h2>No reviews</h2>
//                     <p className="text-base">Be First to Review </p>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           )}
//       </div>
//       {/* </div> */}
//       <div></div>
//     </div>
//   );
// };

// export default ReviewsList;






"use client";
import React, { useState } from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import Heading from "@/components/ui/heading";
import { ReviewCard } from "../Reviews";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import { useSession } from "next-auth/react";
import { Review } from "@/lib/type/morefood/restaurant";
import { UserReviewCard } from "./userReviewCard";
import { ReviewUpload } from "./ReviewUpload";
import { Card } from "@/components/ui/card";

const ReviewsList = ({ slug }: { slug: string }) => {
    const { fetchRestaurantReview, fetchRestaurantUserReview } = useFetchRestaurant();
    const { data: session } = useSession(); // Get session data for checking if the user is logged in

    const [page, setPage] = useState(1); // Page state to handle pagination
    const [reviewsPerPage, setReviewsPerPage] = useState(5); // Number of reviews to load per page

    // Fetch reviews with pagination
    //   const {
    //     data: review,
    //     error: reviewError,
    //     isLoading: reviewLoading,
    //     isFetchingNextPage,
    //     fetchNextPage,
    //     hasNextPage,
    //   } = useQuery({
    // queryKey: ["reviews", slug, page],
    // queryFn: () => fetchRestaurantReview(slug, page, reviewsPerPage),
    //     staleTime: 360000,
    //     getNextPageParam: (lastPage, allPages) => {
    //       return lastPage.data.length === reviewsPerPage ? page + 1 : false; // If we have a full page, go to the next page
    //     },
    //   });

    const {
        data: review,
        fetchNextPage,
        hasNextPage,
        isError: reviewError,
        isLoading: reviewLoading,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["reviews", slug, page],
        queryFn: () => fetchRestaurantReview(slug, page, reviewsPerPage),
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.meta.page_number + 1;
            return nextPage <= lastPage.meta.total_pages ? nextPage : null;
        },
        initialPageParam: 1,
        staleTime: 36000,
        enabled: true,
    });

    // Only fetch user reviews if the user is logged in
    const {
        data: userReview,
        error: userReviewError,
        isLoading: userReviewLoading,
    } = useQuery({
        queryKey: ["user-review", slug],
        queryFn: () => (session ? fetchRestaurantUserReview(slug) : null),
        staleTime: 480000,
        enabled: !!session, // Only run this query if the user is logged in
    });

    const queryClient = useQueryClient();

    const handleRefresh = async () => {
        await Promise.all([
            queryClient.invalidateQueries({ queryKey: ["reviews", slug] }),
            queryClient.invalidateQueries({ queryKey: ["user-review", slug] }),
        ]);
    };

    if (reviewLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    if (reviewError) {
        return <div>Error: error getting reviews</div>;
    }

    console.log("review", review);

    return (
        <div className="lg:flex flex-col container px-0 4xl:max-w-6xl 3xl:max-w-5xl gap-4 2xl:max-w-3xl xl:max-w-3xl lg:max-w-2xl mx-0 mb-5">
            <Card className=" p-2 my-4">
                <Heading title="Reviews & Ratings" />
                {session?.accessToken && (
                    <>
                        {!userReviewLoading && userReview && JSON.stringify(userReview) === "{}" ? (
                            <section className="py-8 px-4">
                            <div className="space-y-6">
                                <div className="border rounded-lg p-4">
                                    <div className="flex flex-col items-center mb-2">
                                        {review && review.pages.length !== 0 && review.pages[0].data.length === 0 && (
                                            <p className="text-muted-foreground text-center ">
                                                No reviews yet. <br/>Be the first to leave one!
                                            </p>
                                        )}
                                        <ReviewUpload slug={slug} />
                                    </div>
                                </div>
                            </div>
                        </section>
                            ): null}
                    </>
                )}
                {session?.accessToken && (
                    <>
                        {userReviewLoading && <div>Loading User Review...</div>}
                        {userReview && JSON.stringify(userReview) !== "{}" && (
                            <div>
                                {/* Render user review component */}
                                {/* Add your custom user review rendering component here */}
                                <UserReviewCard review={userReview} />
                            </div>
                        )}
                    </>
                )}

                {review && review.pages.length > 0 && (
                    <div>
                        <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
                            {review.pages.map((page: any) =>
                                page.data.map((review: Review) => (
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
                    </div>
                )}

                {!session?.accessToken && review && review.pages.length !== 0 && review.pages[0].data.length === 0 && (
                    <section className="py-8 px-4">
                        <div className="space-y-6">
                            <div className="border rounded-lg p-4">
                                <div className="flex flex-col items-center mb-2">
                                    <h2>No reviews</h2>
                                    <p className="text-base">Be First to Review</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Load More Button */}
                {hasNextPage && !isFetchingNextPage && (
                    <button
                        onClick={() => {
                            setPage(page + 1); // Increase page number
                            fetchNextPage(); // Fetch next page of reviews
                        }}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Load More Reviews
                    </button>
                )}

                {isFetchingNextPage && <p>Loading more reviews...</p>}
            </Card>
        </div>
    );
};

export default ReviewsList;
