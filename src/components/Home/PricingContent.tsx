'use client';

import { fetchPackages } from '@/lib/action/moreClub/pricing';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '../ui/switch';
import PricingCard from '../cards/moreclub/PricingCard';
import { useSession } from 'next-auth/react';









export default function PricingSection() {
  const dispatch = useDispatch<AppDispatch>();
  const {status} = useSession();
  const [packageType, setPackageType] = useState<'BUSINESS' | 'NORMAL'>('BUSINESS');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const packages = useSelector((state: RootState) => state.pricing.packages[packageType][billingCycle]);
  useEffect(() => {
    dispatch(fetchPackages({ type: packageType, cycle: billingCycle }));
  }, [packageType, billingCycle, dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Toggle Buttons */}
      <div className="flex justify-between items-center mb-6">
        {status === "loading" && <div>Loading...</div>}
        {status === "unauthenticated" && 
        <div className="space-x-4">
        <button
          className={`px-4 py-2 rounded-md ${packageType === 'BUSINESS' ? 'bg-gray-900 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setPackageType('BUSINESS')}
        >
          Business
        </button>
        <button
          className={`px-4 py-2 rounded-md ${packageType === 'NORMAL' ? 'bg-gray-900 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setPackageType('NORMAL')}
        >
          Normal
        </button>
      </div>
        }
        {status === "authenticated" && <span></span>}
        <div className="flex items-center space-x-2">
          <span className="text-sm">{billingCycle === "monthly" ? "Monthly" : "Yearly"}</span>
          <Switch
            checked={billingCycle === "yearly"}
            onCheckedChange={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
          />
        </div>
      </div>

      {/* Pricing Cards */}
      <div className={`mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl ${packages.length === 1 ? 'lg:grid-cols-1' : 'lg:grid-cols-2'}`}>

        {packages.map((tier, tierIdx) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            idx={tierIdx}
            billingCycle={billingCycle}
            noOfPackage={packages.length}

          />
        ))}
      </div>
    </div>
  );
}
