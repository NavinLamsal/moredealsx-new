"use client"
import PricingSection from '@/components/Home/PricingContent';
import SectionTitle from '@/components/Homes/sectionTiltle'
import { fetchPackages } from '@/lib/action/moreClub/pricing';
import { AppDispatch } from '@/lib/redux/store';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const PricingPage = () => {
  const  { data: session } = useSession();

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if(!session) return;
    dispatch(fetchPackages({ type: "BUSINESS", cycle: "monthly",  country_code:session.user.userDetails.country.code }));
    dispatch(fetchPackages({ type: "NORMAL", cycle: "yearly", country_code:session.user.userDetails.country.code }));
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