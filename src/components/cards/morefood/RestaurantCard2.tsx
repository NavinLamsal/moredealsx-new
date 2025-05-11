import { Button } from "@/components/ui/button";
import { ResturantListType } from "@/lib/type/morefood/restaurant";
import { BookOpen, Crown, MoonIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

type RestaurantCardProps = ResturantListType

const RestaurantCard = forwardRef<HTMLDivElement, RestaurantCardProps>(({ banner, address, id, slug, open_hrs, name, restaurant_rating, review_count, offers,  menu_count}, ref) => {

  return (
    <Link href={`/morefood/restaurant/${slug}`}>
      <div
        ref={ref}
        className="w-full min-w-xs max-w-xs rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-sm active:shadow-sm hover:shadow-primary active:shadow-primary bg-white dark:bg-zinc-900  border border-white/25 "
      >
        <div className="relative w-full h-40">

          <Image
            src={banner}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          {(open_hrs !== "Closed") ? null :
          <div className="absolute inset-0 bg-black/50 text-xs flex flex-col items-center justify-center text-white font-semibold px-2 py-1 rounded-md">
          <MoonIcon/> Closed
          </div>
          }
          {offers && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
              {offers}
            </span>
          )}
          {menu_count && (
            <span className="absolute bottom-0 left-0 right-0 bg-morefoodPrimary text-white text-xs font-semibold px-2 py-1 rounded-b-md flex items-center gap-2">
             <BookOpen/> Menus: {menu_count}
            </span>
         )}
        </div>
        <div className="p-4">
          <h3 className="text-base font-semibold  truncate text-primary text-center">{name}</h3>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground justify-center">
            <span className="text-yellow-500"><Crown className="w-4 h-4" /></span>
            {restaurant_rating ?
              <>
                <span className="font-medium">{restaurant_rating ?? 0}</span>
                <span>({review_count ?? 0} reviews)</span>
              </>
              :
              <span className="text-center">No review yet</span>
            }
            
            {/* <span>{address} min</span> */}
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span className="line-clamp-1 text-center">{address}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">

          <Button  className=" mt-2 mx-auto">View More</Button>
          </div>
        </div>
      </div>
    </Link>
  );
});

RestaurantCard.displayName = "RestaurantCard";

export default RestaurantCard;
