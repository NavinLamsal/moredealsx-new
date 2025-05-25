import React from "react";
import { Skeleton } from "../ui/skeleton";

const PartnerSkeleton = () => {
  return (
    <div className="flex items-center justify-center sm:gap-8 gap-4">
      <div className="flex flex-col items-center gap-2 bg-gray-200 rounded w-40 py-6 p-3">
        <Skeleton className="bg-gray-300 w-20 h-20 rounded-full mb-2" />
        <Skeleton className="bg-gray-300 h-2 w-20" />
        <Skeleton className="bg-gray-300 w-32 h-2 rounded " />
      </div>{" "}
      <div className="hidden min-[350px]:flex flex-col items-center gap-2 bg-gray-200 rounded w-40 py-6 p-3">
        <Skeleton className="bg-gray-300 w-20 h-20 rounded-full mb-2" />
        <Skeleton className="bg-gray-300 h-2 w-20" />
        <Skeleton className="bg-gray-300 w-32 h-2 rounded " />
      </div>{" "}
      <div className="hidden sm:flex flex-col items-center gap-2 bg-gray-200 rounded w-40 py-6 p-3">
        <Skeleton className="bg-gray-300 w-20 h-20 rounded-full mb-2" />
        <Skeleton className="bg-gray-300 h-2 w-20" />
        <Skeleton className="bg-gray-300 w-32 h-2 rounded " />
      </div>{" "}
      <div className="hidden lg:flex flex-col items-center gap-2 bg-gray-200 rounded w-40 py-6 p-3">
        <Skeleton className="bg-gray-300 w-20 h-20 rounded-full mb-2" />
        <Skeleton className="bg-gray-300 h-2 w-20" />
        <Skeleton className="bg-gray-300 w-32 h-2 rounded " />
      </div>{" "}
      <div className=" hidden xl:flex flex-col items-center gap-2 bg-gray-200 rounded w-40 py-6 p-3">
        <Skeleton className="bg-gray-300 w-20 h-20 rounded-full mb-2" />
        <Skeleton className="bg-gray-300 h-2 w-20" />
        <Skeleton className="bg-gray-300 w-32 h-2 rounded " />
      </div>
    </div>
  );
};

export default PartnerSkeleton;