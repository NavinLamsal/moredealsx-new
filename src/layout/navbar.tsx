import React from "react";
import { LocationDialog } from "./location/LocationDialog";
import AuthNavbarContent from "./AuthNavbarContent";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });

const Navbar = () => {
  return (
    <header className="bg-black bg-background py-5 border-b-2 border-primary">
      <div className="w-11/12 mx-auto py-5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <LocationDialog dashboard={false} />
          </div>
          <Link href={"/"} className="flex items-center justify-center sm:-ml-0 -ml-5">
            <div
              className={`${montserrat.className} uppercase text-2xl py-1 sm:py-2 md:text-3xl lg:text-5xl font-extrabold tracking-wide text-white`}
            >
              MORE<span className="text-primary">DEALS</span>
            </div>
            <div className="relative place-self-start">
              <div className="absolute font-extrabold -translate-x-1 translate-y-1 md:translate-y-0 lg:-translate-y-2 lg:h-16 md:h-12 h-10 lg:w-16 md:w-12 w-10  text-primary text-7xl">
                <Image
                  src={"/images/png/moredealsxnew.png"}
                  alt="x logo"
                  width={100}
                  height={100}
                  className="w-auto lg:h-16 md:h-12 h-10"
                />
              </div>
            </div>
          </Link>
          <div>
            <AuthNavbarContent header={true} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
