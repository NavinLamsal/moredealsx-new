"use client";
import HorizontalCarousel from "../carousel/horizontalCarousel";
import { useQuery } from "@tanstack/react-query";
import AnimatedSection from "../ui/animations/FadeUpView";
import { useFetchEvents } from "@/lib/action/moreClub/Events";
import EventCard from "../cards/moreclub/EventCard";
import TrendingEventSkeleton from "../Skeletons/EventSkeleton";




const RestaurantTrendingEvents = ({title = "Trending Events" , dashboard =true}: {title?: string , dashboard?: boolean}) => {
  const country = typeof window !== "undefined" ? localStorage.getItem("country_code") : null;
    const { fetchRestroEventsList} = useFetchEvents()
 

   const { data, error, isLoading } = useQuery({
     queryKey: ["Restro Events" ,country, 1],
     queryFn: () => fetchRestroEventsList(country!, 1),
     staleTime: 36000,
     enabled: Boolean(country),
   });

   if (isLoading) {
     return (
       <div>
        <TrendingEventSkeleton/>
       </div>
     );
   }

   if (error) {
     return <div>Error: {error?.message}</div>;
   }

   if (!data || data.data.length === 0) {
     return null;
   }


  return (
    <div className="">
      {/* <HorizontalCarousel title={title}>
      {data.data.map((event, index) => (
        <div className="flex-shrink-0 w-48 lg:w-60" key={event.id}>
         <AnimatedSection key={event.id} index={index}>
         <EventCard
            key={index}
            event={event}
            ref={null} 
          />
          </AnimatedSection>
          
        </div>
     ))} */}
     <HorizontalCarousel title={title} dashboard={dashboard} center={false} viewAll="/event/restaurant/">
      {data?.data.map((event, index) => (
        <div className="flex-shrink-0 w-72" key={event.id}>
         <AnimatedSection key={event.name} index={index}>
         <EventCard
            key={index}
            {...event}
            domain_name={event.domain_name}
            platform="morefood"
            ref={null} 
          />
          </AnimatedSection>
          
        </div>
     ))}

      </HorizontalCarousel>
    </div>
  );
};

export default RestaurantTrendingEvents;
