import EventList from "@/components/Events/EventsList";
import TrendingEvents from "@/components/Events/TrendingEvent";
import BackButton from "@/components/ui/back_button";

import Heading from "@/components/ui/heading";
import React from "react";

const Page = () => {
  return (
    <div>
      {/* <TrendingEvents title="Upcoming Events"/> */}
      <div className="flex items-center space-x-2">
        <BackButton />
        <h2 className="text-2xl font-bold tracking-tight">Events</h2>
      </div>
      <p className="text-muted-foreground ml-10 mb-4">
        Here&apos;s a list of Events!
      </p>
      <TrendingEvents title="Popular Events" />

      {/* <TrendingEvents title="Live Events"/> */}
      <Heading title="Events You May Like" />
      <EventList />
    </div>
  );
};

export default Page;
