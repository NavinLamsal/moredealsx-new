"use client";
import { Suspense, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardSectionTitle from "../ui/DashboardSectionTitle";
import HorizontalCarouselWithOutTitle from "../carousel/HorizontalCarouselWithotTitle";
import AnimatedSection from "../ui/animations/FadeUpView";
import { fetchOfferList, Offer } from "@/lib/action/PublicCommonClient";
import SectionTitle from "../Homes/sectionTiltle";
import OfferCard from "../cards/moreclub/OfferCard";
import CategorySelector from "./OfferCategory";


const categories = [
    { title: "All", value: "All" },
    { title: "Restaurants", value: "morefood" },
    { title: "Salons", value: "moresalons" },
    { title: "Hotels", value: "moreliving" },
    { title: "Marketplace", value: "marketplace" }
  ];
  

export default function OfferSection({ Dashboard , title="ALL OFFERS IN TOWN" }: { Dashboard?: boolean, title?: string }) {
    const [activeCategory, setActiveCategory] = useState<string>("All");


    const country = typeof window !== "undefined" ? localStorage.getItem("country") : null;

    const { data: offerrs = [], isLoading, isError } = useQuery({
        queryKey: ["offers", activeCategory, country],
        queryFn: async () => await fetchOfferList(activeCategory, country),
        staleTime: 360000,
        enabled: !!country
    });



    // const filteredOffers =
    //     activeCategory === "All"
    //         ? offerrs
    //         : offerrs.filter((offer: Offer) => offer.title === activeCategory);

    return (
        <section className={` py-20 ${Dashboard ? "w-full" : "w-11/12 mx-auto"} `} id="offers">
            {Dashboard ?
                <DashboardSectionTitle
                    title={title}
                    viewAll="/offers"
                />
                :
                <SectionTitle
                    title={title}
                />
            }
            <Suspense fallback={<div>Loading...</div>}>

            <CategorySelector
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                dashboardStyle={Dashboard ? true : false}
            />
            </Suspense>




            {isLoading ? (
                <p className="text-center py-12 bg-card w-full">Loading offers...</p>
            ) : isError ? (
                <p className="text-center text-red-500 py-12 bg-card w-full ">Failed to load offers.</p>
            ) : (

                <>
                    {offerrs && offerrs.length === 0 && (
                        <p className="py-12 bg-card w-full  text-center">Offers not available</p>
                    )}
                    <HorizontalCarouselWithOutTitle title="">
                        {offerrs.map((offer: Offer, index) => (
                            <div className="flex-shrink-0 w-72" key={offer.title}>
                                <AnimatedSection key={offer.title} index={index}>
                                    <OfferCard offer={offer} ref={null} />
                                </AnimatedSection>
                            </div>
                        ))}

                    </HorizontalCarouselWithOutTitle>
                </>


            )}


        </section>


    );
}


