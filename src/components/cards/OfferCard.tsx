import { Offer } from '@/lib/action/PublicCommonClient'
import { getOfferStatus } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { forwardRef } from 'react'

type OfferCardProps = { offer: Offer }

const OfferCard = forwardRef<HTMLDivElement, OfferCardProps>(({ offer }, ref) => {
    const { statusText, badgeColor  } = getOfferStatus(offer.from_date, offer.to_date)
   
    return (
        <div className="w-full px-4" ref={ref}>
            <div className="max-w-[370px] mx-auto mb-10">
                <div className="rounded overflow-hidden relative">
                    <Image
                        src={offer.banner}
                        alt={offer.title}
                        width={370}
                        height={200}
                        className="w-full h-48 object-cover brightness-75"
                    />
                    <div className="absolute bottom-2 right-2 z-10 flex flex-col items-end gap-2">
                        <span className={`${badgeColor} text-white text-xs font-semibold py-1 px-3 rounded`}>
                            {statusText}
                        </span>
                    </div>
                </div>
                <div className="p-5">
                    {/* Offer Title */}
                    <h3 className="mt-3">
                        <Link
                            href={`/offers/${offer.slug}`}
                            className="text-xl sm:text-2xl font-semibold text-card-foreground hover:text-primary transition duration-300"
                        >
                            {offer.title}
                        </Link>
                    </h3>

                    {/* Offer Description */}
                    <p className="text-gray-700 text-sm mt-2">{offer.short_description}</p>
                </div>
            </div>
        </div>
    )
});

export default OfferCard;
