
"use client";
import { useFetchEvents } from "@/lib/action/moreClub/Events";
import EventCard from "../cards/moreclub/EventCard";
import AnimatedSection from "../ui/animations/FadeUpView";
import TrendingEventSkeleton from "../Skeletons/EventSkeleton";
import InfiniteList from "../lists/infiniteListing";


const RestaurantEventList = () => {
  const { fetchRestroEventsList } = useFetchEvents();

  return (
    <InfiniteList
      queryKey="restro-events-list"
      fetchFunction={fetchRestroEventsList}
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
