import { BusinessRestaurantList } from "@/lib/type/morefood/restaurant";
import { BookOpen, Crown, MoonIcon, SunIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

type BusinessRestaurantCardProps = BusinessRestaurantList;

const BusinessRestaurantCard = forwardRef<
  HTMLDivElement,
  BusinessRestaurantCardProps
>(({ banner, address, id, slug, name, is_open }, ref) => {
  return (
    <Link href={`/morefood/restaurant/${slug}`}>
      <div
        ref={ref}
        className="w-full min-w-xs max-w-xs rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:shadow-xl hover:bg-card active:bg-card bg-white dark:bg-zinc-900  border border-white/25"
      >
        <div className="relative w-full h-40 bg-gray-200">
          <Image
            src={banner}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          {is_open ? (
            <div className="absolute inset-0 bg-black/50 text-xs flex flex-col items-center justify-center text-white font-semibold px-2 py-1 rounded-md">
              <SunIcon /> Open
            </div>
          ) : (
            <div className="absolute inset-0 bg-black/50 text-xs flex flex-col items-center justify-center text-white font-semibold px-2 py-1 rounded-md">
              <MoonIcon /> Closed
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-base font-semibold  truncate">{name}</h3>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span className="text-yellow-500">
              <Crown className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span className="line-clamp-1">{address}</span>
          </div>
        </div>
      </div>
    </Link>
  );
});

BusinessRestaurantCard.displayName = "BusinessRestaurantCard";

export default BusinessRestaurantCard;
