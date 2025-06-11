import { Button } from "@/components/ui/button";
import { OfferDealType } from "@/lib/type/morefood/restaurant";
import Image from "next/image";
import React from "react";
// import OfferDialog from "../dialog/OfferDialog";

interface CardProps {
  item: OfferDealType;
}

const RestroOfferCard: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="group flex flex-col h-full rounded-xl shadow-lg overflow-hidden border border-gray-300 dark:border-gray-700 transform transition duration-300 hover:-translate-y-2  w-52 sm:w-64 md:w-72 xl:w-80">
      <div className="relative">
        <Image
          src={item.banner}
          alt={item.name}
          width={500}
          height={500}
          className="w-52 sm:w-64 md:w-72 xl:w-80 h-28 sm:h-32 md:h-36 lg:h-44 object-cover"
        />
        {/* {item.badge && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300">
            {item.badge}
          </span>
        )} */}
      </div>
      <div className="px-4 pb-4 py-2 grow">
        <h3 className="text-yellow-500 font-bold sm:text-lg text-base">
          {item.name}
        </h3>
        <div className="flex items-center gap-2 my-1">
          <span className=" font-bold md:text-xl text-sm">
            {item.currency_code} {item.price}
          </span>
          <span className=" font-bold md:text-sm text-xs line-through text-red-500">
            {item.currency_code} {item.orginal_price}
          </span>
        </div>
        <p className="text-[13px]  mb-4">{item.description}</p>
        {/* <OfferDialog offer={item} /> */}
        <Button className="bg-red-500 text-white">Claim this offer</Button>
      </div>
    </div>
  );
};

export default RestroOfferCard;
