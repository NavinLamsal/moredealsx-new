import AutoTypingText from "./AutoTypingLoading";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });



export function UniversalTextLoading({messages , speed = 100, pauseTime = 1500}:{messages:string[] , speed?:number, pauseTime?:number}) {
  
return(
  <div className="absolute inset-0">
  <div className="w-full h-full dark:bg-black/50 bg-black/10 grid place-items-center z-50 relative">
    {/* Spinner + X */}
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center w-16 h-16">
        {/* Spinning border */}
        <div className="absolute animate-spin w-16 h-16 border-[3px] border-transparent border-t-black border-r-black dark:border-t-white dark:border-r-white rounded-full" />

        {/* Inner X */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary z-10">
          <span className="text-3xl font-extrabold text-black">x</span>
        </div>
      </div>

      {/* MOREDEALSX Label */}
      <div
        className={`${montserrat.className} mt-6 uppercase text-base font-extrabold tracking-wide text-white`}
      >
        MORE<span className="text-primary">DEALS</span>X
      </div>

      {/* Animated Text */}
      <p className="mt-4 dark:text-white text-black text-lg font-semibold text-center">
        <AutoTypingText
          messages={messages}
          typingSpeed={speed}
          pauseTime={pauseTime}
        />
      </p>
    </div>
  </div>
</div>

)
}


