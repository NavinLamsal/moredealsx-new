"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import DashboardSectionTitle from "../ui/DashboardSectionTitle";
import HorizontalCarouselWithOutTitle from "../carousel/HorizontalCarouselWithotTitle";
import AnimatedSection from "../ui/animations/FadeUpView";
import { fetchOfferList } from "@/lib/action/PublicCommonClient";
import SectionTitle from "../Homes/sectionTiltle";



const offers = [
    {
        id: 1,
        title: "Luxury Dining Experience",
        desc: "5-course meal at the city's finest restaurant",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Restaurants",
        oldPrice: "$120",
        newPrice: "$75",
        badge: "Hot Deal",
    },
    {
        id: 2,
        title: "Premium Spa Package",
        desc: "Full day relaxation with massage and treatments",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Salons",
        oldPrice: "$200",
        newPrice: "$129",
        badge: "Limited",
    },
    {
        id: 3,
        title: "Weekend Getaway",
        desc: "2 nights in a 5-star hotel with breakfast",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Hotels",
        oldPrice: "$450",
        newPrice: "$299",
        badge: "Exclusive",
    },
    {
        id: 4,
        title: "Latest Smartphone",
        desc: "Flagship model with premium accessories",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Marketplace",
        oldPrice: "$999",
        newPrice: "$849",
        badge: "New",
    },
];


const categories = ["All", "Restaurants", "Salons", "Hotels", "Marketplace"];

async function fetchOffers() {
    try {
        const { data } = await MoreClubApiClient.get("/api/offers"); // Replace with actual endpoint
        return data;
    } catch (error) {
        console.error("Error fetching offers:", error);
        return [];
    }
}

export default function OfferSection({Dashboard }:{Dashboard?:boolean}) {
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const country = typeof window !== "undefined" ? localStorage.getItem("country") : null;
    const { data: offerrs = [], isLoading, isError } = useQuery({
        queryKey: ["offers", activeCategory, country],
        queryFn: async () => await fetchOfferList(country),
        staleTime: 360000,
        enabled: !!country
    });



    const filteredOffers =
        activeCategory === "All"
            ? offerrs
            : offerrs.filter((offer: any) => offer.category === activeCategory);

    return (
        <section className=" py-20  " id="offers">
             {Dashboard ?
             <DashboardSectionTitle
                 title="ALL OFFERS IN TOWN"
             />
             :
             <SectionTitle
                 title="ALL OFFERS IN TOWN"
             />
             }   


            <div className="flex mb-10 gap-4 flex-wrap">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                            "px-5 py-2 font-extrabold text-sm border-b-4 transition-all",
                            activeCategory === category
                                ? "text-yellow-400 border-yellow-400"
                                : "text-foreground border-transparent hover:text-yellow-400 hover:border-yellow-400"
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>


            {isLoading ? (
                <p className="text-center">Loading offers...</p>
            ) : isError ? (
                <p className="text-center text-red-500">Failed to load offers.</p>
            ) : (

                <>
                    {filteredOffers && filteredOffers.length === 0 && (
                        <p>Offers not available</p>
                    )}
                    <HorizontalCarouselWithOutTitle title="">

                        {filteredOffers.map((offer: any, index) => (
                            <div className="flex-shrink-0 w-72" key={offer.title}>
                                <AnimatedSection key={offer.title} index={index}>
                                    <div
                                        key={offer.id}
                                        className="bg-white dark:bg-background border   rounded-md overflow-hidden relative hover:-translate-y-2 transition-transform shadow-md hover:shadow-primary"
                                    >
                                        <span className="absolute top-3 right-3 bg-red-600 text-xs font-extrabold uppercase px-3 py-1 rounded">
                                            {offer.badge}
                                        </span>
                                        <img
                                            src={offer.image}
                                            alt={offer.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">
                                                {offer.title}
                                            </h3>
                                            <p className="text-gray-400 mb-4">{offer.desc}</p>
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="line-through text-gray-500">
                                                    {offer.oldPrice}
                                                </span>
                                                <span className="text-yellow-400 font-extrabold text-lg">
                                                    {offer.newPrice}
                                                </span>
                                            </div>
                                            <Button variant="destructive" className="w-full font-bold">
                                                Grab Deal
                                            </Button>
                                        </div>
                                    </div>


                                </AnimatedSection>

                            </div>
                        ))}

                    </HorizontalCarouselWithOutTitle>
                </>


            )}


        </section>


    );
}


