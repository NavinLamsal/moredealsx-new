import RestaurantDetail from '@/components/morefood/restaurant/detail'
import FoodList from '@/components/morefood/restaurant/FoodList'
import OfferList from '@/components/morefood/restaurant/OfferList';
import { fetchResturantsIdDetails } from '@/lib/action/morefood/restaurantServerside';
import { Restaurant } from '@/lib/type/morefood/restaurant';
import React from 'react'

const Page =async ({params}:{ params: Promise<{ slug: string }>}) => {

  const { slug } = await params;

  const details: Restaurant = await fetchResturantsIdDetails(slug);
  
  return (
    <div>
      <RestaurantDetail details={details}/>
      <OfferList slug={slug} />
      <FoodList slug={slug}/>
    </div>
  )
}

export default Page
