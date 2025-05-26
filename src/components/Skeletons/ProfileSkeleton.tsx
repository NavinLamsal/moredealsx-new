import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="bg-gray-300 dark:bg-gray-700 rounded-md flex items-center xl:gap-10 gap-6 xl:p-12 p-8 w-full sm:w-3/4 lg:w-1/2 mt-4">
      <div className="">
        <Skeleton className="bg-gray-400 rounded-full xl:h-32 xl:w-32 md:h-28 md:w-28 h-20 w-20 flex-shrink-0" />
      </div>
      <div className="space-y-4 w-full">
        <Skeleton className="bg-gray-400 rounded h-2 w-28 md:w-36 lg:w-32 xl:w-40" />
        <Skeleton className="bg-gray-400 rounded h-2 w-20 md:w-28 lg:w-36 xl:w-44" />
        <Skeleton className="bg-gray-400 rounded h-2 w-12 md:w-20 lg:w-24 xl:w-32" />
        <Skeleton className="bg-gray-400 rounded h-2 min-[1360px]:w-64 w-full" />
        <Skeleton className="bg-gray-400 rounded h-2 min-[1195px]:w-52 min-[790px]:w-36 w-28" />
        <Skeleton className="bg-gray-400 rounded h-2 min-[1360px]:w-64 w-full" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
