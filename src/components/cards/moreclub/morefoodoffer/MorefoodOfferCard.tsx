"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { OfferType } from "@/lib/action/PublicCommonClient";

interface OfferCardProps {
  item: OfferType;
  isOffer?: boolean;
}

const MoreOfferCard = forwardRef<HTMLDivElement, OfferCardProps>(
  ({ item, isOffer }, ref) => {
    const handleRedirection = () => {
      window.open(
        `https://${item.domain_name}.merkoll.com/${item.restro_slug}/#offers`,
        "_blank"
      );
    };

    const descRef = useRef<HTMLParagraphElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
      const element = descRef.current;
      if (element) {
        // const isOverflowing = element.scrollHeight > element.clientHeight;
        const isOverflowing = element.scrollWidth > element.clientWidth;
        setIsTruncated(isOverflowing);
      }
    }, [item.description]);

    return (
      <div
        ref={ref}
        className="group bg-card  text-card-foreground flex flex-col rounded-xl shadow-lg overflow-hidden  transform transition duration-300 hover:-translate-y-2  h-full w-full"
      >
        <div className="relative w-full h-40">
          <Image
            src={item.banner}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className="w-52 sm:w-64 md:w-72 h-32 sm:h-36 md:h-44 lg:h-56 object-cover"
          />
          <div className="flex flex-col justify-end gap-2 absolute top-3 right-3">
            {item.is_hot_deal && (
              <span className=" bg-green-600 text-xs font-extrabold uppercase px-3 py-1 rounded text-white">
                HOT DEALS
              </span>
            )}
          </div>
          {/* <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300">
            MOREFOOD
          </span> */}
          {item.is_hot_deal && (
            <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300">
              HOT DEALS
            </span>
          )}
        </div>
        <div className="p-4 flex flex-col flex-1 grow justify-between items-start">
          <h3 className="text-yellow-500 font-bold smLtext-lg text-base line-clamp-1">
            {item.name}
          </h3>
          <div className="flex items-center gap-2 my-2">
            <span className=" font-bold md:text-xl text-sm">
              {item.currency_code} {item.price}
            </span>
            {item.orginal_price !== item.price &&
              item.orginal_price !== 0 &&
              item.orginal_price !== 0.0 && (
                <span className=" font-bold md:text-sm text-xs line-through text-red-500">
                  {item.currency_code} {item.orginal_price}
                </span>
              )}
          </div>

          {!expanded ? (
            <div className="flex items-center gap-1 mb-2 w-full overflow-hidden">
              <p
                ref={descRef}
                className="sm:text-sm text-xs text-muted-foreground truncate whitespace-nowrap overflow-hidden flex-1"
              >
                {item.description}
              </p>
              {isTruncated && (
                <button
                  onClick={() => setExpanded(true)}
                  className="text-yellow-400 text-xs underline flex-shrink-0"
                >
                  Read More
                </button>
              )}
            </div>
          ) : (
            <div className="mb-2">
              <p className="sm:text-sm text-xs text-muted-foreground mb-1">
                {item.description}
              </p>
              <button
                onClick={() => setExpanded(false)}
                className="text-yellow-400 text-xs underline"
              >
                Read Less
              </button>
            </div>
          )}

          <Button
            onClick={handleRedirection}
            className="bg-red-600 text-white w-full py-2 font-bold rounded hover:bg-red-700"
          >
            CLAIM THIS DEAL
          </Button>
        </div>
      </div>
    );
  }
);

export default MoreOfferCard;
