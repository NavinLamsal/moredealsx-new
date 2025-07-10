"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Montserrat } from "next/font/google";
import Image from "next/image";
const montserrat = Montserrat({ subsets: ["latin"] });

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    light: string;
    dark: string;
    plan: string;
  }[];
}) {
  const { isMobile, state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  return (
    <SidebarMenu className="flex">
      <SidebarMenuItem className="bg-background text-foreground">
        {/* <div className="flex items-center gap-2 ">
                      <div className="flex  items-center justify-center rounded-lg text-sidebar-primary-foreground">
                        <activeTeam.logo className="size-4" />
                        <Image src={activeTeam.dark} alt={activeTeam.name} width={200} height={200} className='h-[4.5rem] w-auto hidden dark:block' />
                        <Image src={activeTeam.light} alt={activeTeam.name} width={200} height={200} className='h-[4.5rem] w-auto  block dark:hidden' />

                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {activeTeam.name}
                        </span>
                        <span className="truncate text-xs">{activeTeam.plan}</span>
                      </div>
                      
                     
                    </div>          */}
        {isCollapsed ? (
          <div className="flex items-center justify-center my-5 ">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary z-10">
              <span className="text-xl font-extrabold text-black p-0">X</span>
            </div>
          </div>
        ) : (
          // <div className="flex items-center justify-center my-5 ">
          //   <div className="w-6 h-8 relative mr-1">
          //     <span className="absolute  font-extrabold  -translate-y-1/2 w-4 h-4 text-primary -rotate-45 text-4xl">
          //       +
          //     </span>
          //   </div>
          //   <div
          //     className={`${montserrat.className} uppercase text-2xl font-extrabold tracking-wide text-foreground `}
          //   >
          //     MORE<span className="text-primary">DEALS</span>X
          //   </div>
          // </div>

          <div className="flex items-center justify-center my-5">
            {/* New "X" Image positioned like the old "+" sign */}
            {/* <div className="w-6 h-8 relative mr-1 flex items-center justify-center">
              <Image
                src="/images/png/moredealsxnew.png"
                alt="x logo"
                width={32}
                height={32}
                className="w-4 h-4 object-contain"
              />
            </div> */}

            {/* Logo Text */}
            <div
              className={`${montserrat.className} uppercase text-2xl font-extrabold tracking-wide text-foreground`}
            >
              MORE<span className="text-primary">DEALS</span>X
            </div>
          </div>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
