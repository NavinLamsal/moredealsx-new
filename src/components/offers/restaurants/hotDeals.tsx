"use client";

import MoreOfferCard from "@/components/cards/moreclub/morefoodoffer/MorefoodOfferCard";
import HorizontalCarouselWithOutTitle from "@/components/carousel/HorizontalCarouselWithotTitle";
import SectionTitle from "@/components/Homes/sectionTiltle";
import OfferSkeleton from "@/components/Skeletons/OfferSkeelton";
import AnimatedSection from "@/components/ui/animations/FadeUpView";
import DashboardSectionTitle from "@/components/ui/DashboardSectionTitle";
import { fetchHOTDealsList } from "@/lib/action/PublicCommonClient";
import { useQuery } from "@tanstack/react-query";



export default function HotDeals({
    Dashboard,
    title = "HOT DEALS",
    classname = "",
}: {
    Dashboard?: boolean;
    title?: string;
    classname?: string;
}) {




    const country =
        typeof window !== "undefined" ? localStorage.getItem("country") : null;

    const {
        data: offerrs = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["offers", "hotdeals", country],
        queryFn: async () => await fetchHOTDealsList(country),
        staleTime: 360000,
        enabled: !!country,
    });


   

    return (
        <section
            className={` py-20 ${Dashboard ? "w-full" : "w-11/12 mx-auto"} `}
            id="offers"
        >
            {Dashboard ? (
                <DashboardSectionTitle title={title} viewAll="/offers" />
            ) : (
                <SectionTitle title={title} />
            )}


            {isLoading ? (
                <OfferSkeleton />
            ) : isError ? (
                <p className="text-center text-red-500 py-12 bg-card w-full ">
                    Failed to load offers.
                </p>
            ) : (
                <>
                    {offerrs && offerrs.length === 0 && (
                        <p className="py-12 bg-card w-full  text-center">
                           Hot deals are not available
                        </p>
                    )}


                    <HorizontalCarouselWithOutTitle title="">
                        {offerrs.map((offer, index) => (
                            <div className="flex-shrink-0 w-72" key={offer.id}>
                                <AnimatedSection index={index}>
                                    <MoreOfferCard item={offer} />
                                </AnimatedSection>
                            </div>
                        ))}
                    </HorizontalCarouselWithOutTitle>




                </>
            )}
        </section>
    );
}
