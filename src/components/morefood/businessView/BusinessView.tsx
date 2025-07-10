import React from 'react'
import BusinessRestaurantList from '../BusinessRestaurants'
import BusinessHotDeals from './BusinessHotDeals'
import BusinessOffersDeals from './BusinessOffers'
import BusinessEvents from './BusinessEvents'
import DashboardSectionTitle from '@/components/ui/DashboardSectionTitle'

const BusinessView = () => {
  return (
    <div>
      <DashboardSectionTitle title={"Restaurants"} />
      <BusinessRestaurantList/>
      <BusinessHotDeals Dashboard={true}/>
      <BusinessOffersDeals Dashboard={true}/>
      <DashboardSectionTitle title={"Events"} />
      <BusinessEvents/>

    </div>
  )
}

export default BusinessView