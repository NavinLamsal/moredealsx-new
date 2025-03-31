"use client"
import OfferCard from '@/components/cards/morefood/OfferCard';
import HorizontalCarousel from '@/components/carousel/horizontalCarousel';
import { CardSkeleton } from '@/components/Skeletons/CardSkeleton';
import AnimatedSection from '@/components/ui/animations/FadeUpView';
import { useFetchRestaurant } from '@/lib/action/morefood/restaurantlist';
import { useQuery } from '@tanstack/react-query';
import React from 'react'




const OfferList = ({slug}:{slug:string}) => {


    const { fetchRestroOffersList} = useFetchRestaurant()
 

    const { data, error, isLoading } = useQuery({
      queryKey: ["offer list of", slug, 1],
      queryFn: () => fetchRestroOffersList(slug, 1),
      staleTime: 60000,
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
 
    if (!data || data.data.length === 0) {
      return null;
    }


  return (
    <div className='mt-4'>

    <HorizontalCarousel title="Active Offers">
    {data.data.map((offer, index) => (
    // {[0,1,2,3,4,5,6].map((index) => (
      <div className="flex-shrink-0 w-96" key={index}>
       <AnimatedSection key={index} index={index}>
       <OfferCard
       index={index}
       offer={offer} 
        />
        </AnimatedSection>
        
      </div>
    ))}
{/* ))} */}

    </HorizontalCarousel>
    </div>
  )
}

export default OfferList
