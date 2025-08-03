// import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { EventList } from '@/lib/type/moreclub/Event';
// import { Avatar } from '@radix-ui/react-avatar';
// import { Calendar1, MapPin, Pin } from 'lucide-react';
// import moment from 'moment';
// import Image from 'next/image';
// import Link from 'next/link';
// import React, { forwardRef } from 'react'
// interface EventCardProps {
//     event: EventList;
//   }

//   const EventCard = forwardRef<HTMLDivElement, EventCardProps>(({ event }, ref) => {
//     return (
//         <Link href={`/event/${event?.slug}`}>
//             <div ref={ref} className="max-w-48 lg:max-w-xs  rounded-lg  overflow-hidden border border-muted bg-slate-50 dark:bg-slate-800">
//                 <div className="relative">
//                     <Image
//                         src={event.banner}
//                         alt={event.name}
//                         width={300}
//                         height={500}
//                         quality={100}
//                         className="w-full h-40  lg:h-72 object-cover "
//                     />
//                     <div className="absolute top-2 left-2  text-xs font-semibold px-2 py-1 rounded">
//                         <Avatar className=' w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white '>
//                             <AvatarImage src={event.currency.icon} alt={event.currency.symbol} className='w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white' />
//                             <AvatarFallback className='w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white text-black'>{event.currency.symbol}</AvatarFallback>
//                         </Avatar>
//                     </div>

//                     {/* Promoted Badge */}
//                     <div className='absolute top-2 right-2 flex flex-col items-end gap-2'>
//                         {event?.promoted &&
//                         <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
//                             PROMOTED
//                         </span>
//                         }
//                         {/* Seats Available Badge */}
//                         {event.seat_available > 0 &&
//                             <div className="bg-green-500 text-white text-xs font-light lg:font-semibold px-2 py-1 rounded">
//                                 {event.seat_available} SEATS <span className='hidden lg:inline-flex'>AVAILABLE</span>
//                             </div>
//                         }
//                     </div>
//                     <div className="absolute bottom-0 left-0 right-0 bg-primary text-white text-xs font-semibold px-2 py-1 inline-flex items-center ">
//                        <Calendar1 size={12}/>&nbsp;{moment(event.start_date).format('Do MMM YY')}
//                     </div>
//                 </div>
//                 <div className="px-1 py-3">
//                     <h3 className="text-sm lg:text-lg font-bold  mt-2 h-14 line-clamp-2">
//                         {event.name}
//                     </h3>
//                     <p className="text-muted-foreground text-xs lg:text-sm truncate flex items-center line-clamp-1">
//                        <MapPin size={12} className='text-red-500'/>&nbsp;{event.location}
//                     </p>
//                     <p className="inline-flex px-1 py-0.5 rounded text-xs lg:text-sm bg-[hsla(264,68%,49%,0.2)] text-primary line-clamp-1">{event.event_type[0

//                     ]}</p>
//                     <p className="text-sm lg:text-base font-semibold mt-1">{event.currency.symbol} {event.price} onwards</p>
//                 </div>
//             </div>
//         </Link>
//     );
// })

// export default EventCard

import React, { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import moment from "moment";

interface EventCardProps {
  start_date: string;
  banner: string;
  name: string;
  location: string;
  slug: string;
  platform: string;
  schema_name?: string;
  url?: string;
  currency?: {
    symbol: string;
    icon: string;
  };
  price?: string;
  domain_name?: string;
  restro_slug?: string;
}

const EventCard = forwardRef<HTMLDivElement, EventCardProps>(
  (
    {
      banner,
      start_date,
      name,
      location,
      slug,
      platform,
      url,
      domain_name,
      currency,
      price,
      schema_name,
      restro_slug,
    },
    ref
  ) => {
    const isValidUrl = (str: string) => {
      try {
        new URL(str);
        return true;
      } catch (_) {
        return false;
      }
    };

    const bannerToUse = isValidUrl(banner)
      ? banner
      : `/images/png/restro/hall.png`;

    const handleRedirection = () => {
      window.open(
        `https://${domain_name}.merkoll.com/${restro_slug}?redirect=/event/${slug}`,
        "_blank"
      );
    };

    return (
      <div
        ref={ref}
        className="bg-card border border-card rounded-lg overflow-hidden shadow-md max-w-sm"
      >
        {/* Date Badge */}
        <div className="bg-yellow-400 text-black text-center font-bold py-2 text-sm">
          {moment(start_date).format("Do MMM")}
        </div>

        {/* Event Image */}
        <div className="w-full h-40 relative">
          <Image
            src={bannerToUse}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-yellow-500 text-lg h-14 font-semibold mb-2 line-clamp-2">
            {name}
          </h3>
          {currency && (
            <p className="text-gray-500 text-sm mb-2">
              {currency.symbol} {price}
            </p>
          )}
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <MapPin className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="line-clamp-1">{location}</span>
          </div>

          {platform === "morefood" ? (
            <div
              onClick={handleRedirection}
              className="block text-center text-sm font-bold bg-yellow-400 text-black py-2 rounded uppercase hover:bg-yellow-500 transition cursor-pointer"
            >
              View Details
            </div>
          ) : (
            <Link
              href={`/event/${slug}`}
              className="block text-center text-sm font-bold bg-yellow-400 text-black py-2 rounded uppercase hover:bg-yellow-500 transition"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    );
  }
);

EventCard.displayName = "EventCard";

export default EventCard;

// banner
// :
// "http://192.168.1.155:8001/media/event_banner/ChatGPT_Image_Apr_7_2025_05_39_18_PM.png"
// can_book_by_country
// :
// ["e97856a7-d27c-4989-bcbd-e73f72d7d124"]
// currency
// :
// "0cd4bd69-c2ec-4d91-8516-f10b27341f74"
// description
// :
// "Join the biggest summer fest in town!"
// end_date
// :
// "2025-07-12T22:00:00"
// event_highlights_description
// :
// "Don't miss the fireworks and the top bands performing live."
// event_highlights_title
// :
// "Fireworks, Live Music"
// event_type
// :
// [1]
// id
// :
// 1
// is_active
// :
// true
// lat
// :
// "28.2096"
// lng
// :
// "83.9856"
// location
// :
// "Pokhara"
// max_limit
// :
// 100
// name
// :
// "SummerFest 2025"
// price
// :
// "1500.00"
// start_date
// :
// "2025-05-20T14:00:00"
