import { Button } from "@/components/ui/button";
import { SaloonTypes } from "@/lib/type/moresalons/salon";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

type SalonCardProps = SaloonTypes

const SalonCard = forwardRef<HTMLDivElement, SalonCardProps>(({ banner, address, id,  is_open, name, rating, review_count }, ref) => {
  return (
    <Link href={`/morefood/salons/${id}`}>
      <div
        ref={ref}
        className="w-full min-w-xs max-w-xs rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-sm active:shadow-sm hover:shadow-primary active:shadow-primary bg-white dark:bg-zinc-900 border border-white/25"
      >
        <div className="relative w-full h-40">

          <Image
            src={banner}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          {/* {offers && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
              {offers}
            </span>
          )} */}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold  truncate text-primary text-center">{name}</h3>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground justify-center">
            <span className="text-yellow-500">&#9733;</span>
            <span className="font-medium">{rating}</span>
            <span>({review_count} reviews)</span>
            <span>&#8226;</span>
            {/* <span>{address} min</span> */}
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground justify-center">
            <span className="line-clamp-1 text-center">{address}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">

          <Button  className=" mt-2 mx-auto">Book Now</Button>
          </div>
        </div>
      </div>
    </Link>
  );
});

SalonCard.displayName = "SalonCard";

export default SalonCard;
