import React from "react";
import { Skeleton } from "../ui/skeleton";

const BusinessUpdateSkeleton = () => {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-4">
        <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded h-2  w-1/4" />
        <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded h-2  w-1/3" />
      </div>
      <div className="grid sm:grid-cols-6 grid-cols-2 gap-8">
        <div className="sm:col-span-2">
          <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded h-full w-full p-4 flex flex-col gap-4">
            <Skeleton className="bg-gray-400 rounded h-8 w-full" />
            <Skeleton className="bg-gray-400 rounded h-2 w-full" />
            <Skeleton className="bg-gray-400 rounded h-2 w-full" />
          </Skeleton>
        </div>
        <div className="space-y-4 sm:col-span-4">
          <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded h-2 w-1/3" />
          <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded h-2 w-full" />
          <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded h-2 w-4/5" />
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded w-1/2 h-2" />
              <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded w-full h-8" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded w-1/2 h-2" />
              <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded w-full h-8" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded w-1/2 h-2" />
              <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded w-full h-8" />
            </div>

            <div className="flex flex-col gap-2">
              <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded w-1/2 h-2" />
              <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded w-full h-8" />
              <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded w-full h-56" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessUpdateSkeleton;
