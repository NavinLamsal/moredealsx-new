"use client";

import HorizontalCarousel from "../carousel/horizontalCarousel";
import { useQuery } from "@tanstack/react-query";
import { CardSkeleton } from "../Skeletons/CardSkeleton";
import AnimatedSection from "../ui/animations/FadeUpView";
import { useFetchEvents } from "@/lib/action/moreClub/Events";
import EventCard from "../cards/moreclub/EventCard";


const Events= [
  {
    date: 'JUN 24',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Summer Beats Festival 2025',
    location: 'Central Park, NYC',
    link: '/event/summer-beats',
  },
  {
    date: 'JUL 10',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Open Air Art Exhibition',
    location: 'Downtown LA, California',
    link: '/event/open-art-exhibition',
  },
  {
    date: 'AUG 05',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Gourmet Street Food Carnival',
    location: 'Riverfront Plaza, Chicago',
    link: '/event/food-carnival',
  },
  {
    date: 'SEP 12',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Tech Innovation Expo 2025',
    location: 'Silicon Valley, CA',
    link: '/event/tech-expo',
  },
  {
    date: 'OCT 31',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Fright Night Halloween Bash',
    location: 'Times Square, NYC',
    link: '/event/fright-night',
  },
];




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
