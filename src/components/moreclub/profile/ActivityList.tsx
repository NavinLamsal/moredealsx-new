
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
      <h3 className="text-2xl font-bold mb-6 text-foreground">Activity Logs</h3>

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
                        <h5 className="font-medium text-primary dark:text-foreground text-sm">
                          {activity.action}
                        </h5>
                        <span className="text-xs text-primary dark:text-foreground">
                          {moment.utc(activity.timestamp).local().format("HH:mm")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
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
