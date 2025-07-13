"use client"
import React, { Suspense } from 'react'
import HotDeals from '../offers/restaurants/hotDeals'
import OfferSection from '../offers/OfferSection'
import { useBusinessType } from '@/hooks/useBusinessType';
import BusinessHotDeals from '../morefood/businessView/BusinessHotDeals';
import BusinessOffersDeals from '../morefood/businessView/BusinessOffers';

const BusinessViews = () => {

  const { businessType, userType, loading } = useBusinessType();
 

  if(businessType === 'restaurant' && userType === 'BUSINESS') {
    return (
      <>
        <BusinessHotDeals Dashboard={true}/>
        <BusinessOffersDeals Dashboard={true}/>
      </>
    )
  }



  return (
    <>
    
    <Suspense fallback={<div>Loading...</div>}>
        <HotDeals Dashboard={true}  title="HOT DEALS" />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
      <OfferSection Dashboard={true}  />
      </Suspense>
    </>
  )
}

export default BusinessViews