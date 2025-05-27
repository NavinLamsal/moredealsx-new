import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex flex-col items-center justify-center">
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
          className={`${montserrat.className} mt-6 uppercase text-base font-extrabold tracking-wide text-black`}
        >
          MORE<span className="text-primary">DEALS</span>X
        </div>
      </div>
    </div>
  );
}
