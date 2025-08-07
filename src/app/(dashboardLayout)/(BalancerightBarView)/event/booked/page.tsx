"use client";
import BoookedEventList from "@/components/Events/BookedEventsList";
import PageHeadings from "@/components/ui/customTitles/PageHeadings";
import { SidebarNav } from "@/layout/Tabnav";
import React, { useState } from "react";

const Page = () => {
  const sidebarNavItems = [
    {
      title: "Upcoming",
      component: <BoookedEventList type="upcoming_events" />,
    },
    { title: "Past", component: <BoookedEventList type="past_events" /> },
  ];

  const [activeTab, setActiveTab] = useState(sidebarNavItems[0].title);

  return (
    <div>
      
        <PageHeadings title="Events" description="Here's a list of your Booked Events!"/>


      <div className="flex flex-col space-y-8 mt-2 ">
        {/* Sidebar Navigation */}

        <aside className="pb-4 border-b-2 border-primary lg:max-w-2xl xl:max-w-4xl">
          <SidebarNav
            items={sidebarNavItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </aside>

        {/* Dynamic Content Based on Active Tab */}
        <div className="flex-1 py-4 px-2">
          {sidebarNavItems.find((item) => item.title === activeTab)?.component}
        </div>
      </div>
      {/* <BoookedEventList/> */}
    </div>
  );
};

export default Page;
