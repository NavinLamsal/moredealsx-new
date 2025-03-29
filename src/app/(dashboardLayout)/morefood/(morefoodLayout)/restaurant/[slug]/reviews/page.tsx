import GlobalRestaurantTab from '@/components/morefood/restaurant/GlobalRestaurantTab'
import ReviewsList from '@/components/morefood/restaurant/review/ReviewFullList';
import React, { Suspense } from 'react'

const Reviews = async({params }:{ params: Promise<{ slug: string }>}) => {
    const { slug } = await params;
  return (
    <div>
        <Suspense>

        <GlobalRestaurantTab slug={slug}/>
        </Suspense>
        <Suspense>
        <ReviewsList slug={slug}/>
        </Suspense>
        </div>
  )
}

export default Reviews