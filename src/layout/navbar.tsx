import React from "react";
import { LocationDialog } from "./location/LocationDialog";

import AuthNavbarContent from "./AuthNavbarContent";
import { Montserrat } from "next/font/google";
import { X } from "lucide-react";

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
      <div className="w-11/12 mx-auto py-5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <LocationDialog dashboard={false} />
          </div>
          <div className="flex items-center justify-center sm:-ml-0 -ml-5">
            <div className="sm:w-12 sm:h-12 w-8 h-8 relative sm:mr-2 md:mr-4">
              <span className="absolute  font-extrabold  -translate-y-1/2 sm:w-8 sm:h-8 w-6 h-6 text-primary -rotate-45 sm:text-7xl text-4xl">
                +
              </span>
            </div>
            <div
              className={`${montserrat.className} uppercase text-xl md:text-3xl lg:text-5xl font-extrabold tracking-wide text-white `}
            >
              MORE<span className="text-primary">DEALS</span>X
            </div>
          </div>
          <div>
            <AuthNavbarContent header={true} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
