'use client';

import { fetchPackages } from '@/lib/action/moreClub/pricing';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '../ui/switch';
import PricingCard from '../cards/moreclub/PricingCard';
import { useSession } from 'next-auth/react';
import PlanComparisonTable from './PricingTable';


const plan = [
  {
    id: "plan_basic",
    name: "Basic Plan",
    price: 19.99,
    currency_symbol: "$",
    description: "A starter plan for individuals and small businesses.",
    icon: "🟢",
    morefood_business_discount: 5,
    referal_percentage: 2,
    salon_business_discount: 4,
    hotel_business_discount: 3,
    marketplace_business_discount: 2,
    project_access: ["analytics", "email-marketing"],
    max_networks_list: 3,
    max_networks_bulk_mail_month: 500,
    max_networks_bulk_sms_month: 300,
  },
  {
    id: "plan_pro",
    name: "Power Saver Plan",
    price: 49.99,
    currency_symbol: "$",
    description: "For growing teams and expanding businesses.",
    icon: "🔵",
    morefood_business_discount: 10,
    referal_percentage: 4,
    salon_business_discount: 7,
    hotel_business_discount: 6,
    marketplace_business_discount: 5,
    project_access: ["analytics", "email-marketing", "crm", "campaigns"],
    max_networks_list: 10,
    max_networks_bulk_mail_month: 5000,
    max_networks_bulk_sms_month: 2000,
  },
  {
    id: "plan_enterprise",
    name: "Enterprise Plan",
    price: 99.99,
    currency_symbol: "$",
    description: "Comprehensive solution for large-scale operations.",
    icon: "🔶",
    morefood_business_discount: 20,
    referal_percentage: 8,
    salon_business_discount: 15,
    hotel_business_discount: 12,
    marketplace_business_discount: 10,
    project_access: ["analytics", "email-marketing", "crm", "campaigns", "automation", "priority-support"],
    max_networks_list: 50,
    max_networks_bulk_mail_month: null,
    max_networks_bulk_sms_month: null,
  }
];







export default function PricingSection({showComarison = true}) {
  const dispatch = useDispatch<AppDispatch>();
  const {status} = useSession();
  const [packageType, setPackageType] = useState<'BUSINESS' | 'NORMAL'>('BUSINESS');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { data: session } = useSession();
  const packages = useSelector((state: RootState) => state.pricing.packages[packageType][billingCycle]);
  useEffect(() => {
    dispatch(fetchPackages({ type: packageType, cycle: billingCycle , country_code:session?.user?.userDetails?.country?.code}));
  }, [packageType, billingCycle, dispatch]);

  return (
    <div className="max-w-8xl mx-auto p-6">
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

      <div className={`mx-auto mt-16 grid  grid-cols-1 items-center gap-6 sm:mt-20   ${packages.length === 1 ? 'md:grid-cols-1' : packages.length === 2 ?'md:grid-cols-2':'md:grid-cols-2 lg:grid-cols-3'}`}>

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
<PlanComparisonTable plans={packages}/>
  }
    </div>
  );
}
