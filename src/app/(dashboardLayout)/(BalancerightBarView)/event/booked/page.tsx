"use client";
// import BoookedEventList from "@/components/Events/BookedEventsList";
import BackButton from "@/components/ui/back_button";
import Heading from "@/components/ui/heading";
import { SidebarNav } from "@/layout/Tabnav";
import React, { useState } from "react";

const Page = () => {
  // const sidebarNavItems = [
  //   {
  //     title: "Upcoming",
  //     component: <BoookedEventList type="upcoming_events" />,
  //   },
  //   { title: "Past", component: <BoookedEventList type="past_events" /> },
  // ];

  // const [activeTab, setActiveTab] = useState(sidebarNavItems[0].title);

  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-4">
        <BackButton />
        <Heading title="Your Booked Events" />
      </div>

      <div className="flex flex-col space-y-8 ">
        {/* Sidebar Navigation */}

        <aside className="pb-4 border-b-2 border-primary lg:max-w-2xl xl:max-w-4xl">
          {/* <SidebarNav
            items={sidebarNavItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          /> */}
        </aside>

        {/* Dynamic Content Based on Active Tab */}
        <div className="flex-1 py-4 px-2">
          {/* {sidebarNavItems.find((item) => item.title === activeTab)?.component} */}
        </div>
      </div>
      {/* <BoookedEventList/> */}
    </div>
  );
};

export default Page;
