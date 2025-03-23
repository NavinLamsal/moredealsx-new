
import { ResturantListType } from "@/lib/type/morefood/restaurant";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Restaurant = ({ item , linkUrl}: { item: ResturantListType , linkUrl?: string }) => {
  const defaultImage = "/Images/morefood.jpg";
  return (
    <Link
      href={linkUrl ?? `/restaurant/${item.slug}`}
      key={item.id}
      id={item.id}
      className="flex flex-1"
    >
      <div className="min-[500px]:max-w-xs w-full mt-3 relative overflow-hidden rounded-md shadow-md mx-auto group cursor-pointer pb-4 border border-white dark:border-gray-700 ">
        <Image
          width={300}
          height={300}
          src={item.banner ? `${item.banner}` : defaultImage}
          alt={item.name || "Restaurant Image"}
          title={item.name || "Restaurant Image"}
          className="h-32 min-[500px]:h-40 w-full rounded-lg rounded-b-none object-cover overflow-hidden transition-transform duration-200 group-hover:scale-105"
        />
        {/* <span
          className={`absolute top-4 right-4 px-3 py-1 z-30  rounded-full ${
            item?.open_hrs === "Open"
              ? "bg-green-500 text-black"
              : "bg-red-500 text-white"
          }   text-sm`}
        >
          {item.open_hrs}
        </span> */}
        <div className="bg-gray-100 dark:bg-dark-primary px-2 pt-2 rounded-lg rounded-t-none h-full">
          <p className="lg:ml-2 text-start font-medium text-wrap">
            {item.name}
          </p>
          <p className="text-P_text text-xs lg:ml-1 flex text-start">
            <MapPinIcon fill="currentColor" className="text-red-600" />
            &nbsp;
            {item.address}
          </p>
          {/* <p className="text-gray-700 dark:text-white  text-sm lg:ml-5 text-start line-clamp-2">
                {item.short_description}
              </p> */}
        </div>
      </div>
    </Link>
  );
};

export default Restaurant;
