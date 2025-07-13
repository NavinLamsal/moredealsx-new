


"use client";
import EventCard from "@/components/cards/moreclub/EventCard";
import InfiniteList from "@/components/lists/infiniteListing";
import TrendingEventSkeleton from "@/components/Skeletons/EventSkeleton";
import AnimatedSection from "@/components/ui/animations/FadeUpView";
import { useFetchEvents } from "@/lib/action/moreClub/Events";


const RestaurantEventList = () => {

  const country = typeof window !== "undefined" ? localStorage.getItem("country_code") : null;
  const { fetchRestroBusinessEventsList } = useFetchEvents();
  const fetchWithCountry = (page: number) => fetchRestroBusinessEventsList(country!, page);

  return (
    <InfiniteList
      queryKey="business-events-list"
      fetchFunction={fetchWithCountry}
      loadingFallback={<TrendingEventSkeleton />}
      emptyFallback={<p className="text-center">No Events Found</p>}
      renderItem={(event, index, ref) => (
        <div key={event.id} className="flex-shrink-0 w-60 lg:w-72" ref={ref}>
          <AnimatedSection index={index}>
            <EventCard {...event} platform="morefood" />
          </AnimatedSection>
        </div>
      )}
    />
  );
};

export default RestaurantEventList;
