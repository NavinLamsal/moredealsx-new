"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet';
import BookingAction from './BookingAction';
import { Dialog, DialogContent } from '../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { useFetchEvents } from '@/lib/action/moreClub/Events';

const EventBooking = ({ slug , bookingData }: { slug: string, bookingData: {
    id: number,
    name: string,
    price: string,
    currency: string
  } }) => {
    const [showSheet, setShowSheet] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const { fetchEventsSeatAndStatus } = useFetchEvents()

    const { data, isLoading, isError } = useQuery({
        queryKey: ["Event Booking Details", slug],
        queryFn: async () => await fetchEventsSeatAndStatus(slug),
        staleTime: 6000,

    });

    const handleClick = async (show: string) => {
        if (show === "sheet") {
            setShowSheet(true);
        }
        if (show === "dialog") {
            setShowDialog(true);
        }
    };

    return (
        <>
            <p className="text-sm text-muted-foreground mt-2 mb-4">
                <strong>Available:</strong>{isLoading && "..." } {data?.seat_available}/{data?.max_limit} Seats
            </p>
            <p className="text-sm text-muted-foreground mt-2 mb-4">
                <strong>Only Available:</strong>{isLoading && "..." } {data?.can_book_by_country && 
                data.can_book_by_country.map((item, index) => (
                    <span key={index} className="inline-flex px-1 py-0.5 rounded text-sm bg-primary  text-primary-foreground">{item}</span>
                ))
                }
            </p>

            <Button variant="destructive" className="w-full py-2 rounded-md font-semibold  transition block md:hidden"
                onClick={(event) => {
                    event.preventDefault();
                    handleClick("sheet");
                }}
                disabled={isLoading || data?.event_booked}
            >
                {isLoading && "..." }{data && data?.event_booked ? "Booked" : "Book Now"}
            </Button>
            <Button variant="destructive" className="w-full py-2 rounded-md font-semibold  transition hidden md:block"
                onClick={(event) => {
                    event.preventDefault();
                    handleClick("dialog");
                }}
                disabled={isLoading || data?.event_booked || data?.seat_available === 0}

            >
                {isLoading && "..." }{ data && data?.event_booked ? "Booked" : "Book Now"}
            </Button>


            <Sheet open={showSheet} onOpenChange={setShowSheet}>
                <SheetTitle className='hidden'>Book Now</SheetTitle>
                <SheetContent side="bottom" className="h-[80vh] overflow-y-scroll p-0">
                    <BookingAction
                        slug={slug}
                        type='sheet'
                        setShowDialog={setShowDialog}
                        setShowSheet={setShowSheet}
                        bookingData={bookingData}
                    />
                </SheetContent>
            </Sheet>

            {/* Dialog for Desktop */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogTitle className='hidden'>Book Now</DialogTitle>
                <DialogContent className="sm:max-w-[425px] md:max-w-md lg:max-w-lg xl:max-w-xl md:max-h-[60%] lg:max-h-[75%] overflow-y-scroll hide-scroll-bar p-0">
                    <BookingAction
                        slug={slug}
                        type='dialog'
                        setShowDialog={setShowDialog}
                        setShowSheet={setShowSheet}
                        bookingData={bookingData}
                    />

                </DialogContent>
            </Dialog>
        </>
    )
}

export default EventBooking
