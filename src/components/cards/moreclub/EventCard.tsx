import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EventList } from '@/lib/type/moreclub/Event';
import { Avatar } from '@radix-ui/react-avatar';
import { Calendar1, MapPin, Pin } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { forwardRef } from 'react'
interface EventCardProps {
    event: EventList;
  }
  
  const EventCard = forwardRef<HTMLDivElement, EventCardProps>(({ event }, ref) => {
    return (
        <Link href={`/event/${event?.slug}`}>
            <div ref={ref} className="max-w-48 lg:max-w-xs  rounded-lg  overflow-hidden border border-muted bg-slate-50 dark:bg-slate-800">
                <div className="relative">
                    <Image
                        src={event.banner}
                        alt={event.name}
                        width={300}
                        height={500}
                        quality={100}
                        className="w-full h-40  lg:h-72 object-cover "
                    />
                    <div className="absolute top-2 left-2  text-xs font-semibold px-2 py-1 rounded">
                        <Avatar className=' w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white '>
                            <AvatarImage src={event.currency.icon} alt={event.currency.symbol} className='w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white' />
                            <AvatarFallback className='w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white text-black'>{event.currency.symbol}</AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Promoted Badge */}
                    <div className='absolute top-2 right-2 flex flex-col items-end gap-2'>
                        {event?.promoted && 
                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                            PROMOTED
                        </span>
                        }
                        {/* Seats Available Badge */}
                        {event.seat_available > 0 &&
                            <div className="bg-green-500 text-white text-xs font-light lg:font-semibold px-2 py-1 rounded">
                                {event.seat_available} SEATS <span className='hidden lg:inline-flex'>AVAILABLE</span>
                            </div>
                        }
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-primary text-white text-xs font-semibold px-2 py-1 inline-flex items-center ">
                       <Calendar1 size={12}/>&nbsp;{moment(event.start_date).format('Do MMM YY')}
                    </div>
                </div>
                <div className="px-1 py-3">
                    <h3 className="text-sm lg:text-lg font-bold  mt-2 h-14">
                        {event.name}
                    </h3>
                    <p className="text-muted-foreground text-xs lg:text-sm truncate flex items-center line-clamp-1">
                       <MapPin size={12} className='text-red-500'/>&nbsp;{event.location}
                    </p>
                    <p className="inline-flex px-1 py-0.5 rounded text-xs lg:text-sm bg-[hsla(264,68%,49%,0.2)] text-primary line-clamp-1">{event.event_type[0
        
                    ]}</p>
                    <p className="text-sm lg:text-base font-semibold mt-1">{event.currency.symbol} {event.price} onwards</p>
                </div>
            </div>
        </Link>
    );
})

export default EventCard

