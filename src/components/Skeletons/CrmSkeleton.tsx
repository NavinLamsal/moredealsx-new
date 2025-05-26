import React from "react";
import { Skeleton } from "../ui/skeleton";

const CrmSkeleton = () => {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded h-2 sm:w-1/3 w-1/2" />
      <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded h-2 sm:w-2/5 w-3/4" />
      <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded h-6 w-40" />
      <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded h-1 sm:w-3/4" />
      <div className="bg-gray-300 dark:bg-gray-600 rounded h-56 sm:w-3/4 w-full p-4 flex items-center justify-center">
        <div className="bg-gray-400 rounded sm:w-1/2 w-3/4 h-full p-6 flex flex-col gap-4 items-center justify-center">
          <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded-full h-12 w-12" />
          <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded h-2 w-4/5" />
          <Skeleton className="bg-gray-300 dark:bg-gray-600 rounded h-2 w-full" />
        </div>
      </div>
    </div>
  );
};

export default CrmSkeleton;
