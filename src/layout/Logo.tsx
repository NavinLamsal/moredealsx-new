import React from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({ subsets: ["latin"] });

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 relative mr-2 md:mr-4">
        <span className="absolute  font-extrabold  -translate-y-1/2 w-8 h-8 text-primary -rotate-45 text-7xl">
          +
        </span>
      </div>
      <div
        className={`${montserrat.className} uppercase text-2xl md:text-3xl lg:text-5xl font-extrabold tracking-wide text-white`}
      >
        MORE<span className="text-primary">DEALS</span>
      </div>
      <div className="relative place-self-start">
        <div className="absolute font-extrabold -translate-x-1 translate-y-1 md:translate-y-0 lg:-translate-y-2 w-8 h-8 text-primary text-7xl">
          <Image
            src={"/images/png/moredealsxnew.png"}
            alt="x logo"
            width={100}
            height={100}
            className="w-auto lg:h-16 md:h-12 h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Logo;

export const SmallLogo = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-10 h-10 relative mr-2 md:mr-3">
        <span className="absolute  font-extrabold  -translate-y-1/2 w-6 h-6 text-primary -rotate-45 text-7xl">
          +
        </span>
      </div>
      <div
        className={`${montserrat.className} uppercase text-xl md:text-2xl lg:text-3xl font-extrabold tracking-wide text-white `}
      >
        MORE<span className="text-primary">DEALS</span>X
      </div>
    </div>
  );
};
