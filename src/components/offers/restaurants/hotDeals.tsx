"use client";
import MoreOfferCard from "@/components/cards/moreclub/morefoodoffer/MorefoodOfferCard";
import HorizontalCarousel from "@/components/carousel/horizontalCarousel";
import OfferSkeleton from "@/components/Skeletons/OfferSkeelton";
import AnimatedSection from "@/components/ui/animations/FadeUpView";
import { fetchHOTDealsList } from "@/lib/action/PublicCommonClient";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function HotDeals({
  Dashboard,
  title = "HOT DEALS",
  classname = "",
}: {
  Dashboard?: boolean;
  title?: string;
  classname?: string;
}) {
  const session = useSession();
  const country_code =
    typeof window !== "undefined" ? localStorage.getItem("country_code") : null;
  const city_code =
    typeof window !== "undefined" ? localStorage.getItem("city_code") : null;

  const {
    data: offerrs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["offers", "hotdeals", country_code , city_code],
    queryFn: async () => await fetchHOTDealsList(country_code, city_code),
    staleTime: 360000,
    enabled: !!country_code,
  });


  return (
    <section
      className={` py-20 ${Dashboard ? "w-full" : "w-11/12 mx-auto"} `}
      id="offers"
    >
      <HorizontalCarousel
        title={title}
        dashboard={Dashboard}
        center={false}
        viewAll="/hot-deals"
      >
        {isError ? (
          <p className="text-center text-red-500 py-12 bg-card w-full ">
            Failed to load offers.
          </p>
        ) : isLoading ? (
          <OfferSkeleton />
        ) : offerrs && offerrs.length === 0 ? (
          <p className="py-12 bg-card w-full  text-center">
            Hot deals are not available
          </p>
        ) : (
          offerrs.map((offer, index) => (
            <div className="flex-shrink-0 w-72" key={offer.id}>
              <AnimatedSection index={index}>
                <MoreOfferCard item={offer} />
              </AnimatedSection>
            </div>
          ))
        )}
      </HorizontalCarousel>
    </section>
  );
}
