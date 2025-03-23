"use client"
import { useFetchEvents } from '@/lib/action/moreClub/Events';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { CardSkeleton } from '../Skeletons/CardSkeleton';
import EventCarousel from './PopularEventList';

const PopularEvent = () => {
   const { fetchEventsList} = useFetchEvents()

    const { data, error, isLoading } = useQuery({
        queryKey: ["Events" , 1],
        queryFn: () => fetchEventsList(1),
        staleTime: 36000,
      });
   
      if (isLoading) {
        return (
          <div>
            <CardSkeleton />
          </div>
        );
      }
   
      if (error) {
        return <div>Error: {error?.message}</div>;
      }

  return (
    <>
    {/* {data && data.data && data.data.length > 0 && ( */}
        <EventCarousel list={data?.data}/>      
    {/* )} */}
    </>
  )
}

export default PopularEvent
