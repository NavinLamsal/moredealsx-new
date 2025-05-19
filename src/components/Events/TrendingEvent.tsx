"use client";
import HorizontalCarousel from "../carousel/horizontalCarousel";
import { useQuery } from "@tanstack/react-query";
import { CardSkeleton } from "../Skeletons/CardSkeleton";
import AnimatedSection from "../ui/animations/FadeUpView";
import { useFetchEvents } from "@/lib/action/moreClub/Events";
import EventCard from "../cards/moreclub/EventCard";




const TrendingEvents = ({title = "Trending Events"}: {title?: string}) => {

    const { fetchPopularEventsList} = useFetchEvents()
 

   const { data, error, isLoading } = useQuery({
     queryKey: ["Events" , 1],
     queryFn: () => fetchPopularEventsList(1),
     staleTime: 36000,
   });

   if (isLoading) {
     return (
       <div>
         <CardSkeleton />
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
    <div className="p-1 lg:p-4">
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
     <HorizontalCarousel title={title} dashboard={true} center={true}>
      {data.data.map((event, index) => (
        <div className="flex-shrink-0 w-72" key={event.id}>
         <AnimatedSection key={event.name} index={index}>
         <EventCard
            key={index}
            {...event}
            ref={null} 
          />
          </AnimatedSection>
          
        </div>
     ))}

      </HorizontalCarousel>
    </div>
  );
};

export default TrendingEvents;
