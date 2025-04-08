"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import AddressForm from "./AddressInformation";
import GeneralInformationForm from "./GeneralInfromation";
import PersonalInformationForm from "./PersonalInformation";
import { buttonVariants } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useAppSelector } from "@/lib/redux/hooks";
import { fetchUserProfile } from "@/lib/action/moreClub/User";

export default function SettingsPage() {

  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state: RootState) => state.user);

    useEffect(() => {
      dispatch(fetchUserProfile({ fetchForce: false }));
    }, []);

  const sidebarNavItems = [
    { title: "General", component: <GeneralInformationForm userdata={user.profile} /> },
    { title: "Personal", component: <PersonalInformationForm userdata={user.profile} /> },
    { title: "Address", component: <AddressForm userData={user.profile} /> },
  ];

  // ✅ State to track the active section
  const [activeTab, setActiveTab] = useState(sidebarNavItems[0].title);

  if (user.isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="space-y-0.5 mb-4">
        <Heading title="Profile" />
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-4 lg:space-y-0 ">
        {/* Sidebar Navigation */}
        <aside className="mx-4 lg:w-1/5 lg:bg-slate-50 dark:lg:bg-card p-4 border-b-2 border-primary lg:border-none">
          <SidebarNav items={sidebarNavItems} activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>

        {/* Dynamic Content Based on Active Tab */}
        <div className="flex-1 pb-10 px-6 lg:max-w-2xl xl:max-w-4xl">
          {sidebarNavItems.find((item) => item.title === activeTab)?.component}
        </div>
      </div>
    </div>
  );
}

// Sidebar Navigation Component
interface SidebarNavProps {
  items: { title: string; component: React.ReactNode }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function SidebarNav({ items, activeTab, setActiveTab }: SidebarNavProps) {
  
  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {items.map((item) => (
        <button
          key={item.title}
          onClick={() => setActiveTab(item.title)}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            activeTab === item.title
              ? "bg-primary text-primary-foreground dark:bg-purple-800"
              : "bg-slate-50 bg-card lg:bg-inherit hover:bg-primary hover:underline hover:text-primary-foreground",
            "justify-start w-full text-center lg:text-left px-4 py-2 "
          )}
        >
          {item.title}
        </button>
      ))}
    </nav>
  );
}
