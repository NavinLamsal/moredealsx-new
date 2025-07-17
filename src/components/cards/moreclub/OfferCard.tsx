"use client";

import { Button } from "@/components/ui/button";
import { OfferType } from "@/lib/action/PublicCommonClient";
import Link from "next/link";
import React, { forwardRef, useEffect, useRef, useState } from "react";

interface OfferCardProps {
  offer: OfferType;
  isOffer?: boolean;
}

export const calculateDiscount = (offer: OfferType): number => {
  if (!offer.orginal_price || offer.orginal_price === 0) return 0; // prevent division by zero
  const discount =
    ((offer.orginal_price - offer.price) / offer.orginal_price) * 100;
  return Math.round(discount); // or use .toFixed(2) if you want decimal places
};

const OfferCard = forwardRef<HTMLDivElement, OfferCardProps>(
  ({ offer, isOffer }, ref) => {
    const discount = calculateDiscount(offer);

    const descRef = useRef<HTMLParagraphElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
      const element = descRef.current;
      if (element) {
        const isOverflowing = element.scrollHeight > element.clientHeight;
        setIsTruncated(isOverflowing);
      }
    }, [offer.description]);

    return (
      <div
        key={offer.id}
        ref={ref}
        className="bg-white dark:bg-background border   rounded-md overflow-hidden relative hover:-translate-y-2 transition-transform shadow-md hover:shadow-primary"
      >
        {discount > 0 && (
          <div className="flex flex-col justify-end gap-2 absolute top-3 right-3">
            {/* <span className=" bg-red-600 text-xs font-extrabold uppercase px-3 py-1 rounded text-white">
            {offer.platform}
          </span> */}
            <span className=" bg-green-600 text-xs font-extrabold uppercase px-3 py-1 rounded text-white">
              {`${discount}% off`}
            </span>
          </div>
        )}

        <img
          src={offer.banner}
          alt={offer.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-5">
          <h3 className="text-lg font-bold text-yellow-400 mb-2">
            {offer.name}
          </h3>
          {isOffer ? (
            <>
              {" "}
              <p
                ref={descRef}
                className={`sm:text-sm text-xs text-muted-foreground transition-all ${
                  expanded ? "" : "line-clamp-2 h-6"
                }`}
              >
                {offer.description}
              </p>
              {isTruncated && (
                <button
                  onClick={() => setExpanded((prev) => !prev)}
                  className="text-yellow-400 text-xs mb-2 underline"
                >
                  {expanded ? "Read Less" : "Read More"}
                </button>
              )}
            </>
          ) : (
            <p className="sm:text-sm text-xs text-muted-foreground mb-4 line-clamp-2 h-6">
              {offer.description}
            </p>
          )}

          <div className="flex items-center gap-2 mb-4">
            <span className="line-through text-gray-500">
              {offer.currency_code}
              {offer.orginal_price}
            </span>
            <span className="text-yellow-400 font-extrabold text-lg">
              {offer.currency_code}
              {offer.price}
            </span>
          </div>
          {/* {offer.url ? (
            <a href={offer.url} target="_blank">
              <Button variant="destructive" className="w-full font-bold">
                Grab Deal
              </Button>
            </a>
          ) : (
            <Link href={`/offers/${offer.id}`}>
              <Button variant="destructive" className="w-full font-bold">
                Grab Deal
              </Button>
            </Link>
          )} */}
          <Link href={`/offers/${offer.id}`}>
            <Button variant="destructive" className="w-full font-bold">
              Grab Deal
            </Button>
          </Link>
        </div>
      </div>
    );
  }
);
export default OfferCard;
