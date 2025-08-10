"use client"
import React, { Suspense } from 'react'
import HotDeals from '../offers/restaurants/hotDeals'
import OfferSection from '../offers/OfferSection'
import { useBusinessType } from '@/hooks/useBusinessType';
import BusinessHotDeals from '../morefood/businessView/BusinessHotDeals';
import BusinessOffersDeals from '../morefood/businessView/BusinessOffers';
import { useAuth } from '@/providers/auth-provider';

const BusinessViews = () => {

  const { businessType, userType, loading } = useBusinessType();

  if(loading) {
    return <div>Loading...</div>
  }
 


  if(businessType === 'restaurant' && userType === 'BUSINESS') {
    return (
      <>
        <BusinessHotDeals Dashboard={true}/>
      
        <BusinessOffersDeals Dashboard={true}/>

      <Suspense fallback={<div>Loading...</div>}>
        <OfferSection Dashboard={true}  defaultTab={"All"}/>
      </Suspense>

      </>
    )
  }



  return (
    <>
    
    <Suspense fallback={<div>Loading...</div>}>
        <HotDeals Dashboard={true}  title="HOT DEALS" />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
      <OfferSection Dashboard={true}  defaultTab={"morefood"}  />
      </Suspense>
    </>
  )
}

export default BusinessViews