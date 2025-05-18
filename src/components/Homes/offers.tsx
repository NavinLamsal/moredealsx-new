"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import SectionTitle from "./sectionTiltle";
import { fetchOfferList } from "@/lib/action/PublicCommonClient";



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

// async function fetchOffers() {
//     try{
//         const { data } = await MoreClubApiClient.get("/api/offers"); // Replace with actual endpoint
//         return data;
//     }catch(error){
//         console.error("Error fetching offers:", error);
//         return [];
//     }
//   }

export default function OfferSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const country = typeof window !== "undefined" ? localStorage.getItem("country") : null;
  
  const { data: offerrs = [], isLoading, isError } = useQuery({
    queryKey: ["offer list", country],
    queryFn: async () => await fetchOfferList(country),
    staleTime: 360000,
    enabled: !!country
  });

  // if (isLoading) {
  //   return <OfferCarousel offers={Offerlist} />
  
  // }

  // if (isError) {
  //   return <OfferCarousel offers={Offerlist} />
  // }



  // const { data: offerrs = [], isLoading, isError } = useQuery({
    
  //   queryKey: ["offers", activeCategory],
  //   queryFn: fetchOffers,
  // });

//   const filteredOffers =
//     activeCategory === "All"
//       ? offers
//       : offers.filter((offer) => offer.category === activeCategory);

  const filteredOffers =
    activeCategory === "All"
      ? offerrs
      : offerrs.filter((offer: any) => offer.category === activeCategory);

  return (
    <section className=" py-20  w-11/12 mx-auto" id="offers">
      <div className="container mx-auto px-4">
      <SectionTitle
        title="ALL OFFERS IN TOWN"  
      />
        

        <div className="flex justify-center mb-10 gap-4 flex-wrap">
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {filteredOffers.map((offer:any) => (
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
            ))}
          </div>
        )}
        </div>
      
    </section>
  );
}
