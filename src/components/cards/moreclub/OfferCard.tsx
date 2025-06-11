import { Button } from "@/components/ui/button";
import { Offer } from "@/lib/action/PublicCommonClient";
import Link from "next/link";
import React, { forwardRef } from "react";

interface OfferCardProps {
  offer: Offer;
}

const OfferCard = forwardRef<HTMLDivElement, OfferCardProps>(
  ({ offer }, ref) => {
    return (
      <div
        key={offer.id}
        ref={ref}
        className="bg-white dark:bg-background border   rounded-md overflow-hidden relative hover:-translate-y-2 transition-transform shadow-md hover:shadow-primary"
      >
        <div className="flex flex-col justify-end gap-2 absolute top-3 right-3">
          <span className=" bg-red-600 text-xs font-extrabold uppercase px-3 py-1 rounded text-white">
            {/* {offer.} */}
            {offer.platform}
          </span>
          <span className=" bg-green-600 text-xs font-extrabold uppercase px-3 py-1 rounded text-white">
            {/* {offer.} */}
            {offer.discount_amount
              ? `${offer.currency_symbol} ${offer.discount_amount} off`
              : `${offer.discount_percentage} % off`}
          </span>
        </div>

        <img
          src={offer.banner}
          alt={offer.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-5">
          <h3 className="text-lg font-bold text-yellow-400 mb-2">
            {offer.title}
          </h3>
          <p className="text-gray-400 mb-4">{offer.short_description}</p>
          <div className="flex items-center gap-2 mb-4">
            <span className="line-through text-gray-500">
              {offer.currency_symbol}
              {offer.original_price}
            </span>
            <span className="text-yellow-400 font-extrabold text-lg">
              {offer.currency_symbol}
              {offer.final_price}
            </span>
          </div>
          {offer.url ? (
            <a href={offer.url} target="_blank">
              <Button variant="destructive" className="w-full font-bold">
                Grab Deal
              </Button>
            </a>
          ) : (
            <Link href={`/offers/${offer.slug}`}>
              <Button variant="destructive" className="w-full font-bold">
                Grab Deal
              </Button>
            </Link>
          )}
        </div>
      </div>
    );
  }
);
export default OfferCard;
