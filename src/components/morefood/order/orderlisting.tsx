// "use client";
// import { OrderCardSkeleton } from "@/components/Skeletons/OrderCardSkeleton";
// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// // import OrderCard from "../components/OrderCard";

// // import { EmptyOrder } from "../components/EmptyOrder";
// // import useAxios from "@/lib/axiosInterface";
// // import { useQuery } from "@tanstack/react-query";
// // import { useParams, useSearchParams } from "next/navigation";
// // import { OrderCardSkeleton } from "@/components/ui/Skeletions";
// // import Pagination from "@/components/ui/pagination";
// // import { OrderDetailsTypes } from "@/lib/type/Ordertype";

// const Allorder = () => {
//   const searchParams = useSearchParams();
//   const page = searchParams.get("page")?? "1";
//     const axios = useAxios();
//     const getAllOrder = async (page: string) => {
//       try {
//         const response = await axios.get(
//           `orders/order/user/list/?page=${page}`
//         );
//         return { order: response.data.data, meta: response.data.meta };
//       } catch (err: any) {
//         return err.response;
//       }
//     };
    

//     const { data, error, isLoading, isFetching } = useQuery({
//       queryKey: ["All Orders", page],
//       queryFn: () => getAllOrder(page),
//       staleTime: 60000,
//     });
  


//    if (isLoading ) {
//      return (
//        <div>
//          <OrderCardSkeleton />
//        </div>
//      );
//    }

//   if (error) {
//      console.log(error);
//      return <div>Error: {error?.message}</div>;
//    }
  
//   return (
//     <div className="flex flex-col gap-4">
//       {isFetching && <OrderCardSkeleton />}
//       {!isFetching && data &&
//         data.order &&
//         data.order.length > 0 &&
//         data.order.map((item: OrderDetailsTypes) => (
//           <OrderCard item={item} key={item.id} />
//         ))}
//       <Pagination
//         currentPage={parseInt(data?.meta?.page_number)}
//         totalPages={data?.meta?.total_pages}
//       />
//       {data && data.order && data.order.length === 0 && (
//         <EmptyOrder list={"You havenot ordered anything yet "} />
//       )}
//     </div>
//   );
// };

// export default Allorder;
"use client";

import React, { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import AnimatedSection from "@/components/ui/animations/FadeUpView";
import OrderCard from "../cards/OrderCard";
import { Card, CardContent } from "@/components/ui/card";



const OrderList = ({type , searchParams}:{type: string , searchParams:{ [key: string]: string | string[] | undefined }}) => {


    const { fetchOrderList } = useFetchRestaurant()
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
        queryKey: ["Order list", type, searchParams ],
        queryFn: ({ pageParam = 1 }) => fetchOrderList(type , searchParams , pageParam),
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
                <p className="text-gray-600">Loading order...</p>
            </div>
        );
    }

    if (isError) {
        return <p className="text-red-500 text-center">Oops! Something went wrong.</p>;
    }

    return (
        <div className="max-w-5xl">
            

            {/* No Transactions Found */}
            {data?.pages[0].data.length === 0 && <p className="text-center">No order Found</p>}

            {/* Transaction List */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                {data?.pages.map((page, pageIndex) =>
                    page.data.map((order, index) => (
                        <div key={`${pageIndex}-${index}`}>
                            <div className="flex-shrink-0 w-full" key={`${order.order_id}-${index}`}>
                                <AnimatedSection key={`${order.order_id}-${index}`} index={index}>
                                    <OrderCard
                                        key={`${order.order_id}-${index}`}
                                        item={order}
                                        ref={index === page.data.length - 1 ? lastRestaurantRef : null}
                                    />
                                </AnimatedSection>
                            </div>
                        </div>
                    )))}
            </div>

            {/* Loading More Transactions */}
            {isFetchingNextPage && <p className="text-center mt-4 text-gray-600">Loading more orders...</p>}

        </div>
    );
};

export default OrderList;
