"use client";
import { Suspense, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardSectionTitle from "../ui/DashboardSectionTitle";
import HorizontalCarouselWithOutTitle from "../carousel/HorizontalCarouselWithotTitle";
import AnimatedSection from "../ui/animations/FadeUpView";
import {
  fetchOfferList,
  Offer,
  OfferDealType,
  OfferType,
} from "@/lib/action/PublicCommonClient";
import SectionTitle from "../Homes/sectionTiltle";
import OfferCard from "../cards/moreclub/OfferCard";
import CategorySelector from "./OfferCategory";
import OfferSkeleton from "../Skeletons/OfferSkeelton";
import MoreOfferCard from "../cards/moreclub/morefoodoffer/MorefoodOfferCard";

const categories = [
  { title: "All", value: "All" },
  { title: "Restaurants", value: "morefood" },
  { title: "Salons", value: "moresalons" },
  { title: "Hotels", value: "moreliving" },
  { title: "Marketplace", value: "marketplace" },
];

export default function OfferSection({
  Dashboard,
  title = "ALL OFFERS IN TOWN",
  classname = "",
}: {
  Dashboard?: boolean;
  title?: string;
  classname?: string;
}) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const country =
    typeof window !== "undefined" ? localStorage.getItem("country_code") : null;

  const {
    data: offerrs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["offers", activeCategory, country],
    queryFn: async () => await fetchOfferList(activeCategory, country),
    staleTime: 360000,
    enabled: !!country,
  });


  function isMoreFoodOffers(data: OfferType[]): data is OfferType[] {
    return data.length > 0 && "restro_url" in data[0];
  }

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
      <Suspense fallback={<div>Loading...</div>}>
        <CategorySelector
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          dashboardStyle={Dashboard ? true : false}
          classname={classname}
        />
      </Suspense>

      {isLoading ? (
        <OfferSkeleton />
      ) : isError ? (
        <p className="text-center text-red-500 py-12 bg-card w-full ">
          Failed to load offers.
        </p>
      ) : (
        <>
          {offerrs && offerrs.length === 0 ? (
            <p className="py-12 bg-card w-full  text-center">
              Offers not available
            </p>
          ) : activeCategory === "morefood" && isMoreFoodOffers(offerrs) ? (
            <HorizontalCarouselWithOutTitle title="">
              {offerrs.map((offer, index) => (
                <div className="flex-shrink-0 w-72" key={offer.id}>
                  <AnimatedSection index={index}>
                    <MoreOfferCard item={offer} />
                  </AnimatedSection>
                </div>
              ))}
            </HorizontalCarouselWithOutTitle>
          ) : (
            <HorizontalCarouselWithOutTitle title="">
              {(offerrs as OfferType[]).map((offer, index) => (
                <div className="flex-shrink-0 w-72" key={offer.id}>
                  <AnimatedSection index={index}>
                    <OfferCard offer={offer} ref={null} />
                  </AnimatedSection>
                </div>
              ))}
            </HorizontalCarouselWithOutTitle>
          )}
        </>
      )}
    </section>
  );
}
