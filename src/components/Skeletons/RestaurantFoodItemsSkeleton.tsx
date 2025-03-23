import AutoTypingText from "../loaders/AutoTypingLoading";
import { Button } from "../ui/button";



export function ResturantProductLoading() {
    const messages = [
        "Finding the best deal for you...",
        "Getting your next delicious meal...",
      ];
    

  return (
    <div className="absolute inset-0">
    <div className=" w-full h-full dark:bg-black/50 bg-black/10 grid justify-center content-center z-50">
     {/* Additional Animated Icon */}
     <div className="mt-4 flex justify-center items-center">
        <div className="w-12 h-12  border-8 border-dotted rounded-full dark:border-S_btn border-S_btn animate-spin "></div>
      </div>
   
      {/* Animated Text */}
      <Button  className="mt-8 dark:text-white text-black text-lg font-semibold">
        <AutoTypingText
          messages={messages}
          typingSpeed={100}
          pauseTime={1500}
          className="text-center"
        />
      </Button>
    </div>
    </div>
  );
}


export function ResturantProductSkeletion() {
    const skeletonItems = Array(5).fill(null);
    return (
      <div className="flex flex-wrap relative">
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="m-4 flex w-96 h-36 animate-pulse rounded-xl bg-gray-200 p-2"
          >
            <div className="mx-5 space-y-3">
              <div className="h-6 w-48 bg-gray-100 rounded-md"></div>
              <div className="h-4 w-32 bg-gray-100 rounded-md"></div>
              <div className="h-4 w-full bg-gray-100 rounded-md"></div>
            </div>
            <div className="h-32 w-32 ml-auto bg-gray-100 rounded-xl "></div>
          </div>
        ))}
        <ResturantProductLoading/>
      </div>
    );
  }