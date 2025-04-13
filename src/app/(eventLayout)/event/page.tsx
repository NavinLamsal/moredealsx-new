import EventList from "@/components/Events/EventsList";
import TrendingEvents from "@/components/Events/TrendingEvent";
import BackButton from "@/components/ui/back_button";

import Heading from "@/components/ui/heading";
import React from "react";

const Page = () => {
  return (
    <div>
      {/* <TrendingEvents title="Upcoming Events"/> */}

      <BackButton />
      <TrendingEvents title="Popular Events" />

      {/* <TrendingEvents title="Live Events"/> */}
      <Heading title="Events You May Like" />
      <EventList />
    </div>
  );
};

export default Page;
