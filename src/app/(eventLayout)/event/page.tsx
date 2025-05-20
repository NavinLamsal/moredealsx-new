import EventList from "@/components/Events/EventsList";
import TrendingEvents from "@/components/Events/TrendingEvent";
import BackButton from "@/components/ui/back_button";
import PageHeadings from "@/components/ui/customTitles/PageHeadings";

import Heading from "@/components/ui/heading";
import React from "react";

const Page = () => {
  return (
    <div className="px-4">
      {/* <TrendingEvents title="Upcoming Events"/> */}
      <PageHeadings title="Events" description="Here's a list of Events!"/>   

      <TrendingEvents title="Popular Events" />

      {/* <TrendingEvents title="Live Events"/> */}
      <Heading title="Events You May Like" />
      <EventList />
        
      
    </div>
  );
};

export default Page;
