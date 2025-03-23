import { Skeleton } from "../ui/skeleton";

export function CardSkeleton() {
    const skeletonItems = Array(5).fill(null);
  
    return (
      <div className="container mx-auto grid max-w-7xl grid-cols-2 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {skeletonItems.map((_, index) => (
          <div key={index} className="m-3 w-full">
            <div className="max-w-xs animate-pulse overflow-hidden rounded shadow-lg">
            <Skeleton className="h-48 w-full" />
              <div className="px-6 py-4">
                <Skeleton className="mb-2 h-6 w-1/2" />
                <Skeleton className="mb-2 h-4 w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }