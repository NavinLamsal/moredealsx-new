import AutoTypingText from "./AutoTypingLoading";



export function UniversalTextLoading({messages , speed = 100, pauseTime = 1500}:{messages:string[] , speed?:number, pauseTime?:number}) {
    
  return (
    <div className="absolute inset-0">
    <div className=" w-full h-full dark:bg-black/50 bg-black/10 grid justify-center content-center z-50">
     {/* Additional Animated Icon */}
     <div className="mt-4 flex justify-center items-center">
        <div className="w-12 h-12  border-8 border-dotted rounded-full dark:border-S_btn border-S_btn animate-spin "></div>
      </div>
   
      {/* Animated Text */}
      <p  className="mt-8 dark:text-white text-black text-lg font-semibold">
        <AutoTypingText
          messages={messages}
          typingSpeed={speed}
          pauseTime={pauseTime}
          className="text-center"
        />
      </p>
    </div>

    </div>
  );
}


