// import { Clock1 } from 'lucide-react'
// import React from 'react'

// const ActivityList = () => {

//   const city = typeof window !== "undefined" ? localStorage.getItem("city") : null;
//     const { fetchRestaurantList } = useFetchRestaurant()
//     const {
//         data,
//         fetchNextPage,
//         hasNextPage,
//         isError,
//         isLoading,
//         isFetchingNextPage,
//         refetch,
//     } = useInfiniteQuery({
//         queryKey: ["Restaurant List", "list" , {city_name: city}],
//         queryFn: ({ pageParam = 1 }) => fetchRestaurantList("lists" ,{city_name: city}, pageParam),
//         getNextPageParam: (lastPage) => {
//             const nextPage = lastPage.meta.page_number + 1;
//             return nextPage <= lastPage.meta.total_pages ? nextPage : null;
//         },
//         initialPageParam: 1,
//         staleTime: 36000,
//         enabled: true,
//     });


  

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-40">
//                 <p className="text-gray-600">Loading restaurants...</p>
//             </div>
//         );
//     }

//     if (isError) {
//         return <p className="text-red-500 text-center">Oops! Something went wrong.</p>;
//     }

//     return (
//         <div className="">
//             {/* No Transactions Found */}
//             {data?.pages[0].data.length === 0 && <p className="text-center">No restaurants Found</p>}
//             <h3 className="text-2xl text-gray-700 font-bold mb-6 ml-3"> Activity</h3>
//             <ol >
//       <li className="border-l-2 border-green-600">
//         <div className="md:flex flex-start">
//           <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
//             <Clock1 className="text-white w-3 h-3" />
//           </div>
//           <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-xl ml-6 mb-10">
//             <div className="flex justify-between mb-4">
//               <h4  className="font-medium text-primary hover:text-primary focus:text-primary duration-300 transition ease-in-out text-sm">Awesome Employers</h4>
//               <h6  className="font-medium text-primary hover:text-primary focus:text-primary duration-300 transition ease-in-out text-sm">21 / 12 / 2021</h6>
//             </div>
//             <p className="text-muted-foreground ">Voluptatibus temporibus esse illum eum aspernatur, fugiat suscipit natus! Eum corporis illum nihil officiis tempore. Excepturi illo natus libero sit doloremque, laborum molestias rerum pariatur quam ipsam necessitatibus incidunt, explicabo.</p>
//           </div>
//         </div>
//       </li>
//     </ol>
//             {/* Transaction List */}
//             <div className="grid grid-cols-2 sm:flex sm:flex-wrap  xl:grid xl:grid-cols-3 2xl:flex 2xl:flex-wrap gap-3">
//                 {data?.pages.map((page, pageIndex) =>
//                     page.data.map((restaurant, index) => (
//                         <div key={`${pageIndex}-${index}`}>
//                             <div className="flex-shrink-0 sm:w-48 lg:w-60 xl:w-48" key={restaurant.id}>
//                                 <AnimatedSection key={restaurant.id} index={index}>
//                                     {/* <RestaurantCard
//                                         key={index}
//                                         {...restaurant}
//                                         ref= {null}
//                                         // ref={index === page.data.length - 1 ? lastRestaurantRef : null}
//                                     /> */}
//                                 </AnimatedSection>
//                             </div>
//                         </div>
//                     )))}
//             </div>


//             {(hasNextPage || isFetchingNextPage) && (
//                 <div className="text-center mt-6">
//                     <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
//                         {isFetchingNextPage ? "Loading..." : "Load More"}
//                     </Button>
//                 </div>
//             )}
            
//             {/* Loading More Transactions */}
//             {isFetchingNextPage && <p className="text-center mt-4 text-gray-600">Loading more restaurants...</p>}
//         </div>
//     );
// };




  

// export default ActivityList


"use client";

import { Clock1 } from "lucide-react";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useFetchActivity } from "@/lib/action/moreClub/activity";
import moment from "moment";
import { parseUserAgent } from "@/lib/utils";

const ActivityList = () => {
  const {  fetchActivityList } = useFetchActivity();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["ActivityList"],
    queryFn: ({ pageParam = 1 }) =>fetchActivityList(pageParam),
    getNextPageParam: (lastPage) => {
      const next = lastPage.meta.page_number + 1;
      return next <= lastPage.meta.total_pages ? next : null;
    },
    initialPageParam: 1,
    staleTime: 36000,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600">Loading activities...</p>
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500 text-center">Oops! Something went wrong.</p>;
  }

  const activityGroups = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="px-4 py-6">
      <h3 className="text-2xl font-bold mb-6 text-foreground">Activity</h3>

      {activityGroups.length === 0 ? (
        <p className="text-center text-foreground">No activity found</p>
      ) : (
        activityGroups.map((group: any, groupIndex: number) => (
          <div key={group.day} className="mb-10">
            <h4 className="text-lg font-semibold text-muted-foreground mb-4">
            {moment.utc(group.day).local().format("dddd, MMM D, YYYY")}
            </h4>

            <ol className="border-l-2 border-green-600 space-y-6">
              {group.activities.map((activity: any, index: number) => {
                  const {deviceType , browser} =parseUserAgent(activity.user_agent)
                return(
                <li key={activity.id}>
                  <div className="flex items-start">
                    <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5 mt-1">
                      <Clock1 className="text-white w-3 h-3" />
                    </div>
                    <div className="block p-4 rounded-lg shadow bg-card ml-6 max-w-3xl w-full">
                      <div className="flex justify-between mb-1">
                        <h5 className="font-medium text-primary dark:text-primary-foreground text-sm">
                          {activity.action}
                        </h5>
                        <span className="text-xs text-primary dark:text-primary-foreground">
                          {moment.utc(activity.timestamp).local().format("HH:mm")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-sm text-muted-foreground ml-3">IP Address: {activity.ip_address}</p>
                      <p className="text-sm text-muted-foreground ml-3">IP Address: {activity.ip_address}</p>
                      <p className="text-sm text-muted-foreground ml-3">User Agent: {deviceType} {browser}</p>
                    </div>
                  </div>
                </li>
              )})}
            </ol>
          </div>
        ))
      )}

      {/* {allActivities.length === 0 ? (
        <p className="text-center text-gray-500">No activity found</p>
      ) : (
        <ol className="border-l-2 border-green-600 space-y-6">
          {allActivities.map((activity: any, index: number) => (
            <li key={activity.id || index}>
              <div className="flex flex-start items-start">
                <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5 mt-1">
                  <Clock1 className="text-white w-3 h-3" />
                </div>
                <div className="block p-4 rounded-lg shadow bg-gray-100 ml-6 max-w-3xl w-full">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold text-primary text-sm">
                      {activity.title || "Untitled Activity"}
                    </h4>
                    <span className="text-sm text-muted-foreground">
                      {activity.date || "Unknown date"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{activity.description || "No description provided."}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )} */}

      {(hasNextPage || isFetchingNextPage) && (
        <div className="text-center mt-6">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivityList;
