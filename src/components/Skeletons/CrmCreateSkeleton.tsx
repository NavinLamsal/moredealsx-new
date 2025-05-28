import React from "react";
import { Skeleton } from "../ui/skeleton";

const CrmCreateSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <Skeleton className="bg-gray-300 rounded w-1/3 h-2" />
        <Skeleton className="bg-gray-300 rounded w-full h-2" />
        <Skeleton className="bg-gray-300 rounded w-3/4 h-2" />
      </div>
      <div className="space-y-4">
        <Skeleton className="bg-gray-300 rounded w-1/4 h-2" />
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-gray-300 rounded w-1/2 h-2" />
            <Skeleton className="bg-gray-300 rounded w-full h-8" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-gray-300 rounded w-1/2 h-2" />
            <Skeleton className="bg-gray-300 rounded w-full h-8" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-gray-300 rounded w-1/2 h-2" />
            <Skeleton className="bg-gray-300 rounded w-full h-8" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-gray-300 rounded w-1/2 h-2" />
            <Skeleton className="bg-gray-300 rounded w-full h-8" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-gray-300 rounded w-1/2 h-2" />
            <Skeleton className="bg-gray-300 rounded w-full h-8" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="bg-gray-300 rounded w-1/4 h-2" />
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-gray-300 rounded w-1/2 h-2" />
            <Skeleton className="bg-gray-300 rounded w-full h-8" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-gray-300 rounded w-1/2 h-2" />
            <Skeleton className="bg-gray-300 rounded w-full h-8" />
          </div>
        </div>
        <Skeleton className="bg-gray-300 rounded w-full h-8" />
      </div>
    </div>
  );
};

export default CrmCreateSkeleton;
