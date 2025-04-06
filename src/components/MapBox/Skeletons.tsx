



export function ContainerSkeleton() {
    const skeletonItems = Array(5).fill(null);
  
    return (
      <div className="container bg-slate-200 dark:bg-slate-800 text-primary rounded-md drop-shadow-md  my-4 mx-auto grid max-w-7xl ">
        {Array(2)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="m-3 w-full">
              <div className="max-w-xs animate-pulse overflow-hidden rounded shadow-lg">
                <div className="h-6 bg-gray-200"></div>
                <div className="px-6 py-4">
                <div className="mb-2 h-6 bg-gray-200"></div>
                <div className="h-4 w-2/3 bg-gray-200"></div>
              </div>
              </div>
            </div>
          ))}
      </div>
    );
  }