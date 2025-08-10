"use client";
import { Suspense, useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardSectionTitle from "../ui/DashboardSectionTitle";
import HorizontalCarouselWithOutTitle from "../carousel/HorizontalCarouselWithotTitle";
import AnimatedSection from "../ui/animations/FadeUpView";
import {
  fetchOfferList,
  OfferType,
} from "@/lib/action/PublicCommonClient";
import SectionTitle from "../Homes/sectionTiltle";
import OfferCard from "../cards/moreclub/OfferCard";
import CategorySelector from "./OfferCategory";
import OfferSkeleton from "../Skeletons/OfferSkeelton";
import MoreOfferCard from "../cards/moreclub/morefoodoffer/MorefoodOfferCard";
import { useBusinessType } from "@/hooks/useBusinessType"; // your hook path
import ComingSoon from "../cards/ComingSoon";

const baseCategories = [
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
  const { businessType, loading: businessLoading } = useBusinessType();

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

  // Filter categories based on businessType
  const filteredCategories = useMemo(() => {
    if (businessLoading) return baseCategories;
    return baseCategories.filter((cat) => {
      if (businessType === "restaurant" && cat.value === "morefood") return false;
      if (businessType === "hotel" && cat.value === "moreliving") return false;
      return true;
    });
  }, [businessType, businessLoading]);

  // useEffect(() => {
  //   // If current active category is not allowed, reset it
  //   const isCategoryAllowed = filteredCategories.some(
  //     (cat) => cat.value === activeCategory
  //   );

  //   if (!isCategoryAllowed) {
  //     setActiveCategory("All");
  //   }
  // }, [filteredCategories, activeCategory]);

  useEffect(() => {
    const isCategoryAllowed = filteredCategories.some(
      (cat) => cat.value === activeCategory
    );

    if (!isCategoryAllowed) {
      setActiveCategory("All");
      return;
    }

    // Apply logic ONLY if activeCategory is "All" and has no offers
    if (
      activeCategory === "All" &&
      !isLoading &&
      !isError &&
      offerrs.length === 0
    ) {
      const currentIndex = filteredCategories.findIndex(
        (cat) => cat.value === "All"
      );

      // Check the next category in the list
      const nextCategory = filteredCategories[currentIndex + 1];

      if (nextCategory) {
        fetchOfferList(nextCategory.value, country).then((nextOffers) => {
          // Only switch if the next one has offers
          if (nextOffers.length > 0) {
            setActiveCategory(nextCategory.value);
          } else {
            // else do nothing and let it show ComingSoon or message
          }
        });
      }
    }
  }, [filteredCategories, activeCategory, isLoading, isError, offerrs.length]);





  function isMoreFoodOffers(data: OfferType[]): data is OfferType[] {
    return data.length > 0 && "domain_name" in data[0];
  }



  return (
    <section
      className={`pb-20 ${Dashboard ? "w-full" : "w-11/12 mx-auto"}`}
      id="offers"
    >
      {Dashboard ? (
        <DashboardSectionTitle title={title} viewAll="/offers" />
      ) : (
        <SectionTitle title={title} />
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <CategorySelector
          categories={filteredCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          dashboardStyle={Dashboard ?? false}
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
          {offerrs.length === 0 ? (
            <p className="py-12 bg-card w-full text-center">
              {(activeCategory === "All" || activeCategory === "morefood")
                ? "No offers found."
                : <ComingSoon />}
            </p>
          ) : activeCategory === "morefood" && isMoreFoodOffers(offerrs) ? (
            <HorizontalCarouselWithOutTitle title="">
              {offerrs.map((offer, index) => (
                <div className="flex-shrink-0 w-72" key={offer.id}>
                  <AnimatedSection index={index}>
                    <MoreOfferCard item={offer} isOffer={true} />
                  </AnimatedSection>
                </div>
              ))}
            </HorizontalCarouselWithOutTitle>
          ) : (
            <HorizontalCarouselWithOutTitle title="">
              {(offerrs as OfferType[]).map((offer, index) => (
                <div className="flex-shrink-0 w-72" key={offer.id}>
                  <AnimatedSection index={index}>
                    <OfferCard offer={offer} ref={null} isOffer={true} />
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

