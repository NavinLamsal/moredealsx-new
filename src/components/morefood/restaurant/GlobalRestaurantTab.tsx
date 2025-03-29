"use client"

import React from "react";

import { usePathname } from "next/navigation";

import Link from "next/link";

const GlobalRestaurantTab = ({slug}:{slug:string}) => {
    const pathname = usePathname();
    const tablist = [
        {
            id: "6",
            value: "menu",
            name: "Menu",
            link: `/morefood/restaurant/${slug}/`,
        },
        {
            id: "3",
            value: "review",
            name: "Reviews",
            link: `/morefood/restaurant/${slug}/reviews`,
        },
        {
            id: "1",
            value: "overview",
            name: "About",
            link: `/morefood/restaurant/${slug}/?tab=overview`,
        },
        {
            id: "2",
            value: "gallery",
            name: "Gallery",
            link: `/morefood/restaurant/${slug}/gallery`,
        },
        {
            id: "4",
            value: "opening",
            name: "Availability",
            link: `/morefood/restaurant/${slug}/?tab=opening`,
        },
    ];

    return (
        <div className="w-full bg-card shadow-lg rounded-b-lg overflow-hidden pb-2">

            <div className=" w-full flex items-center justify-start  border-b border-muted-foreground dark:border-gray-700 bg-inherit rounded-none overflow-x-auto hide-scroll-bar">
                {tablist.map((item) => (
                    <Link href={item.link}>
                    <div
                        key={item.id}
                       
                        className={`relative px-4 py-2 text-sm sm:text-base font-medium  hover:text-morefoodPrimary transition-all duration-300 cursor-pointer
                        ${pathname === item.link ? "border-b-4 shadow-none bg-transparent text-morefoodPrimary dark:text-white rounded-none" : "text-muted-foreground"}
              `}
                    >
                        {item.name}
                        {/* Active Tab Underline */}
                        <span className={`absolute left-0 bottom-0 w-full h-[2px]  transition-all duration-300 ${pathname === item.link ? "bg-morefoodPrimary dark:bg-morefoodPrimary" : "bg-transparent"}`}></span>
                    </div>
                    </Link>
                ))}
            </div>


        </div>
    );
};

export default GlobalRestaurantTab;

