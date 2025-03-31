export const OrderCardSkeleton = () => {
    const skeletonItems = Array(2).fill(null);
    return (
      <>
        <div>
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-3"
            >
              {/* <!-- Image Section --> */}
              <div className="flex items-center">
                <div className="w-20 h-20 bg-gray-300 rounded-lg overflow-hidden"></div>
                {/* <!-- Text Section --> */}
                <div className="ml-4 space-y-2">
                  <div className="text-lg font-bold w-36 p-2 animate-pulse bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xs  w-24 p-2 bg-gray-300"></div>
                    <div className="px-2 py-1 text-xs font-medium text-white w-10 h-4 bg-gray-300 animate-pulse rounded-full"></div>
                  </div>
                  <p className="text-sm w-30 p-2 bg-gray-300 animate-pulse"></p>
                </div>
              </div>
              {/* <!-- Status and Price Section --> */}
              <div className="text-right space-y-3 animate-pulse">
                <div className="flex items-center justify-end space-x-2">
                  <span className="px-3 py-1  h-4 w-24 bg-gray-300 rounded-full"></span>
                </div>
                <p className="px-3 py-1 text-sm h-4 w-14 bg-gray-300 rounded-full"></p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
  