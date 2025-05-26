// import { Package } from '@/lib/redux/slice/moreclub/Pricing';
// import { CheckIcon } from 'lucide-react';
// import React from 'react'




// const formatFeatures = (tier: Package) => {
//     return [
//         `${tier.morefood_business_discount}% Discounts on Morefood`,
//         `${tier.referal_percentage}% Referral Bonus`,
//         `${tier.salon_business_discount}% Discounts on Salons`,
//         `${tier.hotel_business_discount}% Discounts on Hotels`,
//         `${tier.marketplace_business_discount}% Discounts on Marketplace`,
//         `Up to ${tier.max_networks_list} Network Connections`,
//         `Send ${tier.max_networks_bulk_mail_month} Bulk Emails per Month`,
//         `Send ${tier.max_networks_bulk_sms_month} Bulk SMS per Month`,
//     ];
// };

// const isFeatureEnabled = (name: string) => name.toLowerCase().includes("gold");

// function classNames(...classes: (string | undefined | null | false)[]): string {
//     return classes.filter(Boolean).join(' ');
// }
// const PricingCard = ({ tier, idx, billingCycle, noOfPackage }: { tier: Package, idx: number, billingCycle: string, noOfPackage: number }) => {

//     // return (
//     //     <div
//     //         key={tier.id}
//     //         className={classNames(
//     //             isFeatureEnabled(tier.name) ? 'relative bg-[#fcc200] shadow-2xl scale-100 lg:scale-110' : 'bg-primary sm:mx-8 lg:mx-0 ',
//     //             isFeatureEnabled(tier.name)
//     //                 ? ''
//     //                 : idx === 0
//     //                     ? `rounded-t-3xl sm:rounded-b-none ${noOfPackage === 1 ? 'lg:rounded-tr-3xl lg:rounded-bl-3xl lg:rounded-tl-3xl lg:rounded-br-3xl' : 'lg:rounded-tr-none lg:rounded-bl-3xl'} `
//     //                     : `sm:rounded-t-none ${noOfPackage === 1 ? 'lg:rounded-tr-3xl lg:rounded-bl-3xl lg:rounded-tl-3xl lg:rounded-br-3xl' : 'lg:rounded-tr-none lg:rounded-bl-3xl'}lg:rounded-tr-3xl lg:rounded-bl-none`,
//     //             `rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 ${noOfPackage === 1 ? 'max-w-lg min-w-96 lg:mx-auto':""} `,
//     //         )}
//     //     >
//     //         <h3
//     //             id={tier.id}
//     //             className={classNames(isFeatureEnabled(tier.name) ? 'text-indigo-600' : 'text-red-600', 'text-base/7 font-semibold')}
//     //         >
//     //             {tier.name}
//     //         </h3>
//     //         <p className="mt-4 flex items-baseline gap-x-2">
//     //             <span
//     //                 className={classNames(
//     //                     isFeatureEnabled(tier.name) ? 'text-white' : 'text-primary-foreground',
//     //                     'text-5xl font-semibold tracking-tight',
//     //                 )}
//     //             >
//     //                 {tier.currency_symbol}{tier.price}
//     //             </span>
//     //             <span className={classNames(isFeatureEnabled(tier.name) ? 'text-white' : 'text-white', 'text-base')}>/ll{biingCycle}</span>
//     //         </p>
//     //         <p className={classNames(isFeatureEnabled(tier.name) ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
//     //             {tier?.description}
//     //         </p>

//     //         <ul
//     //             role="list"
//     //             className={classNames(
//     //                 isFeatureEnabled(tier.name) ? "text-primary" : "text-primary-foreground",
//     //                 "mt-8 space-y-3 text-sm/6 sm:mt-10"
//     //             )}
//     //         >
//     //             {formatFeatures(tier).map((feature) => (
//     //                 <li key={feature} className="flex gap-x-3">
//     //                     <CheckIcon
//     //                         aria-hidden="true"
//     //                         className={classNames(
//     //                             isFeatureEnabled(tier.name) ? "text-primary" : "text-primary-foreground",
//     //                             "h-6 w-5 flex-none"
//     //                         )}
//     //                     />
//     //                     {feature}
//     //                 </li>
//     //             ))}
//     //         </ul>
//     //         <a
//     //             href={"#"}
//     //             aria-describedby={tier.id}
//     //             className={classNames(
//     //                 isFeatureEnabled(tier.name)
//     //                     ? 'bg-red-500 text-white shadow-xs hover:bg-red-400 focus-visible:outline-red-500'
//     //                     : 'bg-red-500 text-white shadow-xs hover:bg-red-400 focus-visible:outline-red-500',
//     //                 'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
//     //             )}
//     //         >
//     //             SIGNUP FOR FREE
//     //         </a>
//     //     </div>
//     // )
//     return (
//         <div className="border border-gray-800 dark:border-gray-200 overflow-hidden hover:shadow-sm duration-300 hover:-translate-y-1 hover:shadow-black/30 dark:shadow-white/30 rounded-lg">
//             <div className="bg-black dark:bg-white text-white dark:text-black border-b-2 border-primary p-6 flex justify-start flex-col gap-3">
//                 <h3 className='text-sm mb-2'>{tier.name}</h3>
//                 <div className="text-4xl font-bold">{tier.currency_symbol}{tier.price}<span className='text-base font-normal opacity-80 ml-2'>/{billingCycle}</span></div>
//                 <p>{tier?.description}</p>
//             </div>
//             <div className="p-6">
//                 <ul
//                     role="list"
//                     className={classNames(
//                         isFeatureEnabled(tier.name) ? "text-primary" : "text-primary-foreground",
//                         "mt-8 space-y-3 text-sm/6 sm:mt-10"
//                     )}
//                 >
//                     {formatFeatures(tier).map((feature) => (
//                         <li key={feature}
//                             // className={`flex gap-x-3 ${classNames(isFeatureEnabled(tier.name)) ? '':''}`}>
//                             className={classNames(
//                                 isFeatureEnabled(tier.name) ? "text-foreground" : "text-muted-foreground",
//                                 "flex gap-x-3"
//                             )}
//                         >
//                             <CheckIcon
//                                 aria-hidden="true"
//                                 className={classNames(
//                                     isFeatureEnabled(tier.name) ? "text-primary" : "text-muted-foreground",
//                                     "h-6 w-5 flex-none"
//                                 )}
//                             />
//                             {feature}
//                         </li>
//                     ))}
//                 </ul>

//                 {/* <ul className="feature-list">
//                         <li>3-5 curated deals per week</li>
//                         <li>Public job listings</li>
//                         <li>Community forum access</li>
//                         <li className="disabled">Early deal access</li>
//                         <li className="disabled">Premium analytics</li>
//                     </ul> */}
//                 <a href="#" className="btn btn-outline">Get Started</a>
//             </div>
//         </div>
//     )
// }

// export default PricingCard

import { Button } from '@/components/ui/button';
import { Package } from '@/lib/redux/slice/moreclub/Pricing';
import { CheckIcon, XIcon } from 'lucide-react';
import React from 'react';

const formatFeatures = (tier: Package) => {
  return [
    {
      label:
        tier.morefood_business_discount
          ? `${tier.morefood_business_discount}% Discounts on Morefood`
          : `Discounts on Morefood not available`,
      enabled: tier.morefood_business_discount != null,
    },
    {
      label:
        tier.morefood_referral_precentage
          ? `${tier.morefood_referral_precentage}% Referral Bonus on Morefood`
          : `Referral on Morefood not available`,
      enabled: tier.morefood_referral_precentage != null,
    },
    {
      label:
        tier.salon_business_discount
          ? `${tier.salon_business_discount}% Discounts on Salons`
          : `Discounts on Salons not available`,
      enabled: tier.salon_business_discount != null,
    },
    {
      label:
        tier.salon_referral_precentage
          ? `${tier.salon_referral_precentage}% Referral Bonus on Salons`
          : `Referral on Salons not available`,
      enabled: tier.salon_referral_precentage != null,
    },
    {
      label:
        tier.hotel_business_discount
          ? `${tier.hotel_business_discount}% Discounts on Hotels`
          : `Discounts on Hotels not available`,
      enabled: tier.hotel_business_discount != null,
    },
    {
      label:
        tier.hotel_referral_precentage
          ? `${tier.hotel_referral_precentage}% Referral Bonus on Hotels`
          : `Referral on Hotels not available`,
      enabled: tier.hotel_referral_precentage != null,
    },
    {
      label:
        tier.marketplace_business_discount
          ? `${tier.marketplace_business_discount}% Discounts on Marketplace`
          : `Discounts on Marketplace not available`,
      enabled: tier.marketplace_business_discount != null,
    },
    {
      label:
        tier.marketplace_referral_precentage
          ? `${tier.marketplace_referral_precentage}% Referral Bonus on Marketplace`
          : `Referral on Marketplace not available`,
      enabled: tier.marketplace_referral_precentage != null,
    },
    // {
    //   label:
    //     tier.max_networks_list
    //       ? `Up to ${tier.max_networks_list} Network Connections`
    //       : `Network Connections not available`,
    //   enabled: tier.max_networks_list != null,
    // },
    // {
    //   label:
    //     tier.max_networks_bulk_mail_month
    //       ? `Send ${tier.max_networks_bulk_mail_month} Bulk Emails per Month`
    //       : `Bulk Emails not available`,
    //   enabled: tier.max_networks_bulk_mail_month != null,
    // },
    // {
    //   label:
    //     tier.max_networks_bulk_sms_month
    //       ? `Send ${tier.max_networks_bulk_sms_month} Bulk SMS per Month`
    //       : `Bulk SMS not available`,
    //   enabled: tier.max_networks_bulk_sms_month != null,
    // },
  ];
};




const isFeatureEnabled = (name: string) => name.toLowerCase().includes("gold");

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

const PricingCard = ({
  tier,
  idx,
  billingCycle,
  noOfPackage,
  subscribe
}: {
  tier: Package;
  idx: number;
  billingCycle: string;
  noOfPackage: number;
  subscribe?: boolean
}) => {
  return (
    <div className="border border-gray-800 dark:border-gray-200 overflow-hidden hover:shadow-sm duration-300 hover:-translate-y-1 hover:shadow-black/30 dark:shadow-white/30 rounded-lg">
      <div className="bg-black dark:bg-white text-white dark:text-black border-b-2 border-primary p-6 flex justify-start flex-col gap-3">
        <h3 className="text-sm mb-2">{tier.name}</h3>
        <div className="text-4xl font-bold">
          {tier.currency_symbol}
          {billingCycle === "yearly" ? tier.yearly_price : tier.price}
          <span className="text-base font-normal opacity-80 ml-2">
            /{billingCycle}
          </span>
        </div>
        {/* <p>{tier?.description}</p> */}

        {tier.name.includes("Power Saver") &&
          <div>
            <span className='inline-flex px-3 py-1 text-xs font-semibold text-white  rounded-full bg-destructive'>RECOMMENDED</span>
          </div>

        }
      </div>

      <div className="p-6">
        <ul
          role="list"
          className="mt-8 space-y-3 text-sm/6 sm:mt-10"
        >
          {formatFeatures(tier).map(({ label, enabled }) => (
            <li
              key={label}
              className={classNames(
                enabled ? "text-foreground" : "text-muted-foreground ",
                "flex gap-x-3 items-center"
              )}
            >
              {enabled ? (
                <CheckIcon
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
              ) : (
                <XIcon
                  className="h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
              )}
              {label}
            </li>
          ))}
        </ul>


       {subscribe ? 
       <Button className='bg-green-500 text-white w-full mt-4 py-5 h-12 font-bold'>Subscribed</Button>
      :
      <>
      <Button variant={tier.name.includes("Power Saver") ? "default" : "outline"} className='border-black dark:border-white w-full mt-4 py-5 h-12 font-bold'>
        {tier.name.includes("Power Saver") ? "Start 30-day Trial" : tier.name.includes("custom") ? "Contact Sales" : "Get Started"}
      </Button>
      {tier.name.includes("Power Saver") &&
        <p className='text-center mt-4 text-sm '>or {tier.currency_symbol}
          {billingCycle === "yearly" ? tier.yearly_price : tier.price}/{billingCycle} (save 34%)</p>}
      
      </>
    }

      </div>
    </div>
  );
};

export default PricingCard;
