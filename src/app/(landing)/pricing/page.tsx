"use client"
import PricingSection from '@/components/Home/PricingContent';
import SectionTitle from '@/components/Homes/sectionTiltle'
import { fetchPackages } from '@/lib/action/moreClub/pricing';
import { AppDispatch } from '@/lib/redux/store';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const PricingPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchPackages({ type: "BUSINESS", cycle: "monthly" }));
    dispatch(fetchPackages({ type: "BUSINESS", cycle: "yearly" }));
    dispatch(fetchPackages({ type: "NORMAL", cycle: "yearly" }));
    dispatch(fetchPackages({ type: "NORMAL", cycle: "monthly" }));
  }, [ dispatch]);


  return (
    <div>
      <div className='my-10'>
      <SectionTitle
        title="Choose Your Savings Plan"
      />
      <p className='max-w-3xl mx-auto text-base text-center'>Select the tier that matches your business needs and start maximizing your procurement savings today.</p>
      </div>

      <PricingSection />


    </div>
  )
}

export default PricingPage