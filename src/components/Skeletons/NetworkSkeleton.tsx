import React from "react";
import { Skeleton } from "../ui/skeleton";

const NetworkSkeleton = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="bg-gray-300 dark:bg-gray-700 rounded flex items-center min-[405px]:gap-4 gap-2 min-[405px]:p-4 p-3">
        <Skeleton className="bg-gray-400 md:w-14 md:h-14 w-12 h-12 " />
        <div className="flex flex-col gap-2">
          <Skeleton className="bg-gray-400 rounded h-[6px] min-[1450px]:w-28 min-[670px]:w-20 w-14" />
          <Skeleton className="bg-gray-400 rounded h-[6px] min-[1450px]:w-36 min-[1325px]:w-28 min-[1280px]:w-24 min-[1130px]:w-36 min-[720px]:w-28 min-[640px]:w-24 w-32" />
          <Skeleton className="bg-gray-400 rounded h-[6px] min-[1450px]:w-40 min-[1325px]:w-32 min-[1280px]:w-28 min-[1190px]:w-40 min-[1080px]:w-32 min-[670px]:w-28 min-[640px]:w-24 w-28" />
        </div>
      </div>
      <div className="bg-gray-300 dark:bg-gray-700 rounded sm:flex hidden items-center min-[405px]:gap-4 gap-2 min-[405px]:p-4 p-3">
        <Skeleton className="bg-gray-400 md:w-14 md:h-14 w-12 h-12 " />
        <div className="flex flex-col gap-2">
          <Skeleton className="bg-gray-400 rounded h-[6px] min-[1450px]:w-28 min-[670px]:w-20 w-14" />
          <Skeleton className="bg-gray-400 rounded h-[6px] min-[1450px]:w-36 min-[1325px]:w-28 min-[1280px]:w-24 min-[1130px]:w-36 min-[720px]:w-28 min-[640px]:w-24 w-32" />
          <Skeleton className="bg-gray-400 rounded h-[6px] min-[1450px]:w-40 min-[1325px]:w-32 min-[1280px]:w-28 min-[1190px]:w-40 min-[1080px]:w-32 min-[670px]:w-28 min-[640px]:w-24 w-28" />
        </div>
      </div>
      <div className="bg-gray-300 dark:bg-gray-700 rounded min-[900px]:flex hidden items-center min-[405px]:gap-4 gap-2 min-[405px]:p-4 p-3">
        <Skeleton className="bg-gray-400 md:w-14 md:h-14 w-12 h-12 " />
        <div className="flex flex-col gap-2">
          <Skeleton className="bg-gray-400 rounded h-[6px] min-[1450px]:w-28 min-[670px]:w-20 w-14" />
          <Skeleton className="bg-gray-400 rounded h-[6px] min-[1450px]:w-36 min-[1325px]:w-28 min-[1280px]:w-24 min-[1130px]:w-36 min-[720px]:w-28 min-[640px]:w-24 w-32" />
          <Skeleton className="bg-gray-400 rounded h-[6px] min-[1450px]:w-40 min-[1325px]:w-32 min-[1280px]:w-28 min-[1190px]:w-40 min-[1080px]:w-32 min-[670px]:w-28 min-[640px]:w-24 w-28" />
        </div>
      </div>
      <div className="bg-gray-300 dark:bg-gray-700 rounded xl:flex lg:hidden flex items-center min-[405px]:gap-4 gap-2 min-[405px]:p-4 p-3">
        <Skeleton className="bg-gray-400 md:w-14 md:h-14 w-12 h-12 " />
        <div className="flex flex-col gap-2">
          <Skeleton className="bg-gray-400 rounded h-[6px] min-[1450px]:w-28 min-[670px]:w-20 w-14" />
          <Skeleton className="bg-gray-400 rounded h-[6px] min-[1450px]:w-36 min-[1325px]:w-28 min-[1280px]:w-24 min-[1130px]:w-36 min-[720px]:w-28 min-[640px]:w-24 w-32" />
          <Skeleton className="bg-gray-400 rounded h-[6px] min-[1450px]:w-40 min-[1325px]:w-32 min-[1280px]:w-28 min-[1190px]:w-40 min-[1080px]:w-32 min-[670px]:w-28 min-[640px]:w-24 w-28" />
        </div>
      </div>
    </div>
  );
};

export default NetworkSkeleton;
