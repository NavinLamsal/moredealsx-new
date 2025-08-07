"use client";
import MoreOfferCard from "@/components/cards/moreclub/morefoodoffer/MorefoodOfferCard";
import InfiniteHorizontalCarouselWithNav from "@/components/lists/InitinteHorizontalListing";
import AnimatedSection from "@/components/ui/animations/FadeUpView";
import DashboardSectionTitle from "@/components/ui/DashboardSectionTitle";
import { fetchBusinessHOTDealsList, OfferType } from "@/lib/action/PublicCommonClient";


export default function HotDeals({
  Dashboard,
  title = "HOT DEALS",
  classname = "",
}: {
  Dashboard?: boolean;
  title?: string;
  classname?: string;
}) {


  const fetchData = (page: number) => fetchBusinessHOTDealsList(page);


  return (
    <section
      className={` pt-20 ${Dashboard ? "w-full" : "w-11/12 mx-auto"} `}
      id="business-offers"
    >
      <InfiniteHorizontalCarouselWithNav
         title="Your Hot Deals"
         queryKey="business-offers-hotdeals"
          fetchFunction={fetchData}
          renderItem={(offer, index, ref) => (
            <div key={offer.id} className="flex-shrink-0 w-60 lg:w-72" ref={ref}>
              <AnimatedSection index={index}>
                <MoreOfferCard item={offer as OfferType}  />
              </AnimatedSection>
            </div>
          )}
          emptyFallback={
            <div>
               <DashboardSectionTitle title={"Your Hot Deals"} />
               
               <p className="text-center">No Offers Found</p>
            </div>
            }
        
  
/>
    </section>
  );
}
