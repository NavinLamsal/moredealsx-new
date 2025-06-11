import EventList from "@/components/Events/EventsList";
import RestaurantEventList from "@/components/Events/RestaurantEventList";
import TrendingEvents from "@/components/Events/TrendingEvent";

import PageHeadings from "@/components/ui/customTitles/PageHeadings";

import Heading from "@/components/ui/heading";
import React from "react";

const Page = () => {
  return (
    <div className="px-4">
      {/* <TrendingEvents title="Upcoming Events"/> */}
      <PageHeadings title="Events" description="Here's a list of Events!"/>   
      <Heading title="Events You May Like" />
      <RestaurantEventList />
        
      
    </div>
  );
};

export default Page;
