import { Button } from "@/components/ui/button";
// import { OfferDealType } from "@/lib/types/public/restaurant";
import Image from "next/image";
import React, { forwardRef } from "react";
import { OfferDealType } from "@/lib/action/PublicCommonClient";


interface OfferCardProps {
  item: OfferDealType;
}

const MoreOfferCard = forwardRef<HTMLDivElement, OfferCardProps>(
  ({ item }, ref) => {

// const MoreOfferCard: React.FC<CardProps> = ({ item }) => {

const handleRedirection = () => {
  window.open(`${item.restro_url}/#offers`, "_blank");
};




 
  return (
    <div
    ref={ref}
    className="group bg-card text-card-foreground flex flex-col h-full rounded-xl shadow-lg overflow-hidden  transform transition duration-300 hover:-translate-y-2  w-full">
      <div className="relative">
        <Image
          src={item.banner}
          alt={item.name}
          width={500}
          height={500}
          className="w-64 sm:w-72 md:w-80 xl:w-96 h-32 sm:h-36 md:h-44 lg:h-56 object-cover"
        />
      <div className="flex flex-col justify-end gap-2 absolute top-3 right-3">
          <span className=" bg-red-600 text-xs font-extrabold uppercase px-3 py-1 rounded text-white">
            {/* {offer.} */}
            MOREFOOD
          </span>
          {item.is_hot_deal &&
          <span className=" bg-green-600 text-xs font-extrabold uppercase px-3 py-1 rounded text-white">
            HOT DEALS
          </span>}
        </div>
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300">
            MOREFOOD
          </span>
          {item.is_hot_deal &&
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300">
            HOT DEALS
          </span>
}
      </div>
      <div className="p-4 grow">
        <h3 className="text-yellow-500 font-bold smLtext-lg text-base">
          {item.name}
        </h3>
        <div className="flex items-center gap-2 my-2">

          <span className=" font-bold md:text-xl text-sm">
            {item.currency_code} {item.price}
          </span>
          {item.original_price !== item.price &&
          <span className=" font-bold md:text-sm text-xs line-through text-red-500">
            {item.currency_code} {item.original_price}
          </span>}
        </div>
        <p className="sm:text-sm text-xs text-muted-foreground mb-4 line-clamp-2 h-6">
          {item.description}
        </p>
        <Button onClick={handleRedirection} className="bg-red-600 text-white w-full py-2 font-bold rounded hover:bg-red-700">
          CLAIM THIS DEAL
        </Button>
        
      </div>
    </div>
  );
}
);

export default MoreOfferCard;
