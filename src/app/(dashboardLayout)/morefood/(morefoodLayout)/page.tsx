import AllRestaurantList from '@/components/morefood/AllRestaurant'
import CategoriesList from '@/components/morefood/CategoriesList'
import FeaturedRestaurants from '@/components/morefood/FeaturedRestaurant'
import Offers from '@/components/morefood/home/offer'
import PopularCombos from '@/components/morefood/PopularCombos'
import PopularRestaurant from '@/components/morefood/PopularRestaurant'
import TodaysOffer from '@/components/morefood/TodaysOffer'
import Heading from '@/components/ui/heading'
import React from 'react'

const Page = () => {
  return (
   <>
   
   <Offers />
   <TodaysOffer/>
   <CategoriesList/>
   <FeaturedRestaurants/>
   <PopularRestaurant />
   <PopularCombos/>
   <Heading title="All Restaurants" />
   <AllRestaurantList/>
   </>
   

  )
}

export default Page



