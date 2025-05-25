import { Skeleton } from "../ui/skeleton";

const OfferSkeleton = () => {
  return (
    <div className="flex items-center justify-center sm:gap-8 gap-4">
      <div className="flex flex-col">
        <div className="relative">
          <Skeleton className="bg-gray-300 md:w-52 min-[420px]:w-44 min-[350px]:w-36 w-48 sm:h-40 h-32 rounded-t rounded-b-none" />
          <Skeleton className="bg-gray-400 w-20 h-4 rounded absolute top-2 right-2" />
        </div>
        <div className="bg-card md:w-52 min-[420px]:w-44 min-[350px]:w-36 w-48 sm:h-18 h-16 rounded-b p-3 sm:space-y-2 space-y-1">
          <Skeleton className="bg-gray-300 h-2 md:w-28 min-[420px]:w-20 min-[350px]:w-14 w-28" />
          <Skeleton className="bg-gray-300 md:w-44 min-[420px]:w-36 min-[350px]:w-28 w-40 h-6 rounded " />
        </div>
      </div>{" "}
      <div className="hidden min-[350px]:flex flex-col">
        <div className="relative">
          <Skeleton className="bg-gray-300 md:w-52 min-[420px]:w-44 min-[350px]:w-36 w-48 sm:h-40 h-32 rounded-t rounded-b-none" />
          <Skeleton className="bg-gray-400 w-20 h-4 rounded absolute top-2 right-2" />
        </div>
        <div className="bg-card md:w-52 min-[420px]:w-44 min-[350px]:w-36 w-48 sm:h-18 h-16 rounded-b p-3 sm:space-y-2 space-y-1">
          <Skeleton className="bg-gray-300 h-2 md:w-28 min-[420px]:w-20 min-[350px]:w-14 w-28" />
          <Skeleton className="bg-gray-300 md:w-44 min-[420px]:w-36 min-[350px]:w-28 w-40 h-6 rounded " />
        </div>
      </div>{" "}
      <div className="hidden sm:flex flex-col">
        <div className="relative">
          <Skeleton className="bg-gray-300 md:w-52 min-[420px]:w-44 min-[350px]:w-36 w-48 sm:h-40 h-32 rounded-t rounded-b-none" />
          <Skeleton className="bg-gray-400 w-20 h-4 rounded absolute top-2 right-2" />
        </div>
        <div className="bg-card md:w-52 min-[420px]:w-44 min-[350px]:w-36 w-48 sm:h-18 h-16 rounded-b p-3 sm:space-y-2 space-y-1">
          <Skeleton className="bg-gray-300 h-2 md:w-28 min-[420px]:w-20 min-[350px]:w-14 w-28" />
          <Skeleton className="bg-gray-300 md:w-44 min-[420px]:w-36 min-[350px]:w-28 w-40 h-6 rounded " />
        </div>
      </div>{" "}
      <div className="hidden lg:flex flex-col">
        <div className="relative">
          <Skeleton className="bg-gray-300 md:w-52 min-[420px]:w-44 min-[350px]:w-36 w-48 sm:h-40 h-32 rounded-t rounded-b-none" />
          <Skeleton className="bg-gray-400 w-20 h-4 rounded absolute top-2 right-2" />
        </div>
        <div className="bg-card md:w-52 min-[420px]:w-44 min-[350px]:w-36 w-48 sm:h-18 h-16 rounded-b p-3 sm:space-y-2 space-y-1">
          <Skeleton className="bg-gray-300 h-2 md:w-28 min-[420px]:w-20 min-[350px]:w-14 w-28" />
          <Skeleton className="bg-gray-300 md:w-44 min-[420px]:w-36 min-[350px]:w-28 w-40 h-6 rounded " />
        </div>
      </div>{" "}
      <div className=" hidden xl:flex flex-col">
        <div className="relative">
          <Skeleton className="bg-gray-300 md:w-52 min-[420px]:w-44 min-[350px]:w-36 w-48 sm:h-40 h-32 rounded-t rounded-b-none" />
          <Skeleton className="bg-gray-400 w-20 h-4 rounded absolute top-2 right-2" />
        </div>
        <div className="bg-card md:w-52 min-[420px]:w-44 min-[350px]:w-36 w-48 sm:h-18 h-16 rounded-b p-3 sm:space-y-2 space-y-1">
          <Skeleton className="bg-gray-300 h-2 md:w-28 min-[420px]:w-20 min-[350px]:w-14 w-28" />
          <Skeleton className="bg-gray-300 md:w-44 min-[420px]:w-36 min-[350px]:w-28 w-40 h-6 rounded " />
        </div>
      </div>{" "}
    </div>
  );
};

export default OfferSkeleton;