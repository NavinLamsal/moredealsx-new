import React from "react";
import { Skeleton } from "../ui/skeleton";

const MembershipSkeleton = () => {
  return (
    <div className="flex items-center justify-center sm:gap-8 gap-4">
      <div className="relative  bg-gray-200 rounded w-40 ">
        <Skeleton className="bg-gray-400 w-40 h-6 rounded absolute top-0" />
        <div className="flex flex-col items-center gap-2 py-4 p-3 pt-10">
          <Skeleton className="bg-gray-300 w-20 h-20 rounded-full mb-1" />
          <Skeleton className="bg-gray-300 h-2 w-24" />
          <Skeleton className="bg-gray-300 w-28 h-6 rounded-2xl " />
        </div>
      </div>{" "}
      <div className="hidden min-[350px]:block relative bg-gray-200 rounded w-40 ">
        <Skeleton className="bg-gray-400 w-40 h-6 rounded absolute top-0" />
        <div className="flex flex-col items-center gap-2 py-4 p-3 pt-10">
          <Skeleton className="bg-gray-300 w-20 h-20 rounded-full mb-1" />
          <Skeleton className="bg-gray-300 h-2 w-24" />
          <Skeleton className="bg-gray-300 w-28 h-6 rounded-2xl " />
        </div>
      </div>{" "}
      <div className="hidden sm:block relative  bg-gray-200 rounded w-40 ">
        <Skeleton className="bg-gray-400 w-40 h-6 rounded absolute top-0" />
        <div className="flex flex-col items-center gap-2 py-4 p-3 pt-10">
          <Skeleton className="bg-gray-300 w-20 h-20 rounded-full mb-1" />
          <Skeleton className="bg-gray-300 h-2 w-24" />
          <Skeleton className="bg-gray-300 w-28 h-6 rounded-2xl " />
        </div>
      </div>{" "}
      <div className="hidden lg:block relative  bg-gray-200 rounded w-40 ">
        <Skeleton className="bg-gray-400 w-40 h-6 rounded absolute top-0" />
        <div className="flex flex-col items-center gap-2 py-4 p-3 pt-10">
          <Skeleton className="bg-gray-300 w-20 h-20 rounded-full mb-1" />
          <Skeleton className="bg-gray-300 h-2 w-24" />
          <Skeleton className="bg-gray-300 w-28 h-6 rounded-2xl " />
        </div>
      </div>{" "}
      <div className="hidden xl:block relative  bg-gray-200 rounded w-40 ">
        <Skeleton className="bg-gray-400 w-40 h-6 rounded absolute top-0" />
        <div className="flex flex-col items-center gap-2 py-4 p-3 pt-10">
          <Skeleton className="bg-gray-300 w-20 h-20 rounded-full mb-1" />
          <Skeleton className="bg-gray-300 h-2 w-24" />
          <Skeleton className="bg-gray-300 w-28 h-6 rounded-2xl " />
        </div>
      </div>{" "}
    </div>
  );
};

export default MembershipSkeleton;