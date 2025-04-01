import { ResturantListType } from "@/lib/type/morefood/restaurant";
import { Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

type RestaurantCardProps = ResturantListType

const RestaurantCard = forwardRef<HTMLDivElement, RestaurantCardProps>(({ banner, address, id, slug, is_open, name, restaurant_rating, review_count, offers, }, ref) => {
  return (
    <Link href={`/morefood/restaurant/${slug}`}>
      <div
        ref={ref}
        className="w-full min-w-xs max-w-xs rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:shadow-xl hover:bg-card active:bg-card"
      >
        <div className="relative w-full h-40">

          <Image
            src={banner}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          {offers && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
              {offers}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-base font-semibold  truncate">{name}</h3>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span className="text-yellow-500"><Crown className="w-4 h-4" /></span>
            {restaurant_rating ?
              <>
                <span className="font-medium">{restaurant_rating ?? 0}</span>
                <span>({review_count ?? 0} reviews)</span>
              </>
              :
              <span>No review yet</span>
            }
            
            {/* <span>{address} min</span> */}
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span className="line-clamp-1">{address}</span>
          </div>
        </div>
      </div>
    </Link>
  );
});

RestaurantCard.displayName = "RestaurantCard";

export default RestaurantCard;
