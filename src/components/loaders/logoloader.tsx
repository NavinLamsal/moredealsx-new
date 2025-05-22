"use client";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
export default function LoaderPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-400">
      <div className="relative flex flex-col items-center justify-center">
        <div
          className="absolute animate-spin  w-10 h-10 border-[3px] border-transparent border-t-black border-r-black rounded-full"
          // style={{ transform: rotate(${rotation}deg) }}
        />

        <div className="flex flex-col items-center justify-center z-10">
          <h1 className="text-xl font-bold text-black mb-2">X</h1>
        </div>
      </div>
      {/* <div className="absolute bottom-40 text-center">
        <p className="text-xl font-semibold text-black">Moredeals x</p>
      </div> */}
      <div
        className={`${montserrat.className} mt-20 absolute uppercase text-base font-extrabold tracking-wide text-white `}
      >
        MORE<span className="text-primary">DEALS</span>X
      </div>
    </div>
  );
}