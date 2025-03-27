import { Package } from '@/lib/redux/slice/moreclub/Pricing';
import { CheckIcon } from 'lucide-react';
import React from 'react'




const formatFeatures = (tier: Package) => {
    return [
        `${tier.morefood_business_discount}% Discounts on Morefood`,
        `${tier.referal_percentage}% Referral Bonus`,
        `${tier.salon_business_discount}% Discounts on Salons`,
        `${tier.hotel_business_discount}% Discounts on Hotels`,
        `${tier.marketplace_business_discount}% Discounts on Marketplace`,
        `Up to ${tier.max_networks_list} Network Connections`,
        `Send ${tier.max_networks_bulk_mail_month} Bulk Emails per Month`,
        `Send ${tier.max_networks_bulk_sms_month} Bulk SMS per Month`,
    ];
};

const isFeatureEnabled = (name: string) => name.toLowerCase().includes("gold");

function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}
const PricingCard = ({ tier, idx, billingCycle , noOfPackage}: { tier: Package, idx: number, billingCycle: string , noOfPackage: number}) => {
   
    return (
        <div
            key={tier.id}
            className={classNames(
                isFeatureEnabled(tier.name) ? 'relative bg-[#fcc200] shadow-2xl scale-100 lg:scale-110' : 'bg-primary sm:mx-8 lg:mx-0 ',
                isFeatureEnabled(tier.name)
                    ? ''
                    : idx === 0
                        ? `rounded-t-3xl sm:rounded-b-none ${noOfPackage === 1 ? 'lg:rounded-tr-3xl lg:rounded-bl-3xl lg:rounded-tl-3xl lg:rounded-br-3xl' : 'lg:rounded-tr-none lg:rounded-bl-3xl'} `
                        : `sm:rounded-t-none ${noOfPackage === 1 ? 'lg:rounded-tr-3xl lg:rounded-bl-3xl lg:rounded-tl-3xl lg:rounded-br-3xl' : 'lg:rounded-tr-none lg:rounded-bl-3xl'}lg:rounded-tr-3xl lg:rounded-bl-none`,
                `rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 ${noOfPackage === 1 ? 'max-w-lg min-w-96 lg:mx-auto':""} `,
            )}
        >
            <h3
                id={tier.id}
                className={classNames(isFeatureEnabled(tier.name) ? 'text-indigo-600' : 'text-red-600', 'text-base/7 font-semibold')}
            >
                {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
                <span
                    className={classNames(
                        isFeatureEnabled(tier.name) ? 'text-white' : 'text-primary-foreground',
                        'text-5xl font-semibold tracking-tight',
                    )}
                >
                    {tier.currency_symbol}{tier.price}
                </span>
                <span className={classNames(isFeatureEnabled(tier.name) ? 'text-white' : 'text-white', 'text-base')}>/{billingCycle}</span>
            </p>
            <p className={classNames(isFeatureEnabled(tier.name) ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
                {tier?.description}
            </p>

            <ul
                role="list"
                className={classNames(
                    isFeatureEnabled(tier.name) ? "text-primary" : "text-primary-foreground",
                    "mt-8 space-y-3 text-sm/6 sm:mt-10"
                )}
            >
                {formatFeatures(tier).map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                            aria-hidden="true"
                            className={classNames(
                                isFeatureEnabled(tier.name) ? "text-primary" : "text-primary-foreground",
                                "h-6 w-5 flex-none"
                            )}
                        />
                        {feature}
                    </li>
                ))}
            </ul>
            <a
                href={"#"}
                aria-describedby={tier.id}
                className={classNames(
                    isFeatureEnabled(tier.name)
                        ? 'bg-red-500 text-white shadow-xs hover:bg-red-400 focus-visible:outline-red-500'
                        : 'bg-red-500 text-white shadow-xs hover:bg-red-400 focus-visible:outline-red-500',
                    'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
                )}
            >
                SIGNUP FOR FREE
            </a>
        </div>
    )
}

export default PricingCard
