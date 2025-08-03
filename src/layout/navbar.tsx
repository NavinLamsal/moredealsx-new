import React from "react";
import { LocationDialog } from "./location/LocationDialog";

import AuthNavbarContent from "./AuthNavbarContent";
import { Montserrat } from "next/font/google";
import { X } from "lucide-react";
import Logo from "./Logo";
import Image from "next/image";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });

const Navbar = () => {
  return (
    // <div className="bg-navbar text-white py-1 px-6 ">
    //   <div className='max-w-8xl mx-auto flex justify-between items-center'>

    //     <div className="flex items-center gap-4">
    //       <a href="/" className="flex items-center gap-3">
    //         <Image src={dark_logo} alt={"MOREDEALSCLUB"} width={200} height={200} className='h-[4.5rem] w-auto hidden dark:inline-block' />
    //         <Image src={light_logo} alt={"MOREDEALSCLUB"} width={200} height={200} className='h-[4.5rem] w-auto  inline-block dark:hidden' />
    //       </a>
    //       <LocationDialog />
    //     </div>

    //     <AuthNavbarContent header={true} />
    //   </div>
    // </div>
    <header className="bg-black bg-background py-5 border-b-2 border-primary">
      <div className="mx-auto sm:py-5 py-2 sm:px-6 px-3">
        <div className="flex flex-col justify-end">
          <div className="flex items-center justify-between gap-2">
            <div className="md:block hidden">
              <LocationDialog dashboard={false} />
            </div>
            <Link href={"/"} className="flex items-center justify-center -ml-0">
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
          <div className="block md:hidden">
            <LocationDialog dashboard={false} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
