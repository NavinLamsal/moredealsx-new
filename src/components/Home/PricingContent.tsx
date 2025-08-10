'use client';

import { fetchPackages } from '@/lib/action/moreClub/pricing';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '../ui/switch';
import PricingCard from '../cards/moreclub/PricingCard';

import PlanComparisonTable from './PricingTable';
import { useAuth } from '@/providers/auth-provider';






export default function PricingSection({ showComarison = true }) {
  const dispatch = useDispatch<AppDispatch>();

  const [packageType, setPackageType] = useState<'BUSINESS' | 'NORMAL'>('BUSINESS');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { user: session, isLoading } = useAuth();
  const packages = useSelector((state: RootState) => state.pricing.packages[packageType][billingCycle]);
  useEffect(() => {
    if (!session || isLoading) return;
    dispatch(fetchPackages({ type: packageType, cycle: billingCycle, country_code: session?.country?.code }));
  }, [packageType, billingCycle, dispatch, session]);

  return (
    <div className="max-w-8xl mx-auto p-6">
      {/* Toggle Buttons */}
      <div className="flex justify-between items-center mb-6">
        {!isLoading && <div>Loading...</div>}
        {isLoading && !session &&
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
        {session  && <span></span>}
        <div className="flex items-center space-x-2">
          <span className="text-sm">{billingCycle === "monthly" ? "Monthly" : "Yearly"}</span>
          <Switch
            checked={billingCycle === "yearly"}
            onCheckedChange={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
          />
        </div>
      </div>

      {/* Pricing Cards */}
      {/* <div className={`mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl ${packages.length === 1 ? 'lg:grid-cols-1' : 'lg:grid-cols-2'}`}>

        {plan.map((tier, tierIdx) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            idx={tierIdx}
            billingCycle={billingCycle}
            noOfPackage={packages.length}

          />
        ))}
      </div> */}

      <div className={`mx-auto mt-16 grid  grid-cols-1 items-center gap-6 sm:mt-20   ${packages.length === 1 ? 'md:grid-cols-1' : packages.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>

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
      {showComarison &&
        <PlanComparisonTable plans={packages} />
      }
    </div>
  );
}
