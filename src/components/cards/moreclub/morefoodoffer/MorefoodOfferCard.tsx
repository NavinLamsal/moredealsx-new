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
        const isOverflowing = element.scrollHeight > element.clientHeight;
        setIsTruncated(isOverflowing);
      }
    }, [item.description]);

    return (
      <div
        ref={ref}
        className="group bg-card text-card-foreground flex flex-col h-full rounded-xl shadow-lg overflow-hidden  transform transition duration-300 hover:-translate-y-2  w-full"
      >
        <div className="relative">
          <Image
            src={item.banner}
            alt={item.name}
            width={500}
            height={500}
            className="w-64 sm:w-72 md:w-80 xl:w-96 h-32 sm:h-36 md:h-44 lg:h-56 object-cover"
          />
          <div className="flex flex-col justify-end gap-2 absolute top-3 right-3">
            {item.is_hot_deal && (
              <span className=" bg-green-600 text-xs font-extrabold uppercase px-3 py-1 rounded text-white">
                HOT DEALS
              </span>
            )}
          </div>
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300">
            MOREFOOD
          </span>
          {item.is_hot_deal && (
            <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300">
              HOT DEALS
            </span>
          )}
        </div>
        <div className="p-4 grow">
          <h3 className="text-yellow-500 font-bold smLtext-lg text-base">
            {item.name}
          </h3>
          <div className="flex items-center gap-2 my-2">
            <span className=" font-bold md:text-xl text-sm">
              {item.currency_code} {item.price}
            </span>
            {item.orginal_price !== item.price && (
              <span className=" font-bold md:text-sm text-xs line-through text-red-500">
                {item.currency_code} {item.orginal_price}
              </span>
            )}
          </div>
          {isOffer ? (
            <>
              <p
                ref={descRef}
                className={`sm:text-sm text-xs text-muted-foreground  transition-all ${
                  expanded ? "" : "line-clamp-2 h-6"
                }`}
              >
                {item.description}
              </p>

              {isTruncated && (
                <button
                  onClick={() => setExpanded((prev) => !prev)}
                  className="text-red-600 text-xs mb-2 underline"
                >
                  {expanded ? "Read Less" : "Read More"}
                </button>
              )}
            </>
          ) : (
            <p className="sm:text-sm text-xs text-muted-foreground mb-4 line-clamp-2 h-6">
              {item.description}
            </p>
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
