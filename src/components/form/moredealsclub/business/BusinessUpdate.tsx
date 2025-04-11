"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import BasicInfoForm from "./basicInfo";
import BusinessDocumentsUploadForm from "./document";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchBusinessData, fetchBusinessQRInfo } from "@/lib/action/moreClub/Business";
import { useAppSelector } from "@/lib/redux/hooks";
import BusinessTypes from "./BusinessTypes";

export default function BusinessPage() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const business = useAppSelector((state: RootState) => state.business);

  useEffect(() => {
    dispatch(fetchBusinessData({ fetchForce: false }));
    dispatch(fetchBusinessQRInfo({ fetchForce: false }));
  }, []);

  const tab = searchParams.get("tab");

  // Memoized Sidebar Items
  const sidebarNavItems = useMemo(
    () => [
      { title: "General Information", component: <BasicInfoForm businessData={business.businessProfile} /> },
      { title: "Documents", component: <BusinessDocumentsUploadForm businessData={business.businessProfile} /> },
      { title: "Discounts", component: <BusinessTypes /> },
    ],
    [business.businessProfile]
  );

  // State for active tab
  const [activeTab, setActiveTab] = useState(tab ?? sidebarNavItems[0].title);

  const handleTabChange = useCallback((tab: string) => setActiveTab(tab), []);

  if (business.isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="space-y-0.5 mb-4">
        <Heading title="Business Profile" />
        <p className="text-sm text-muted-foreground">
          This is how others will see your Business on the site.
        </p>
      </div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-4 lg:space-y-0">
        {/* Sidebar Navigation */}
        <aside className="mx-4 lg:w-1/5 lg:bg-slate-50 dark:lg:bg-card p-4 border-b-2 border-primary lg:border-none">
          <SidebarNav items={sidebarNavItems} activeTab={activeTab} setActiveTab={handleTabChange} />
        </aside>

        {/* Dynamic Content Based on Active Tab */}
        <div className="flex-1 pb-10 px-6 lg:px-0 lg:max-w-2xl xl:max-w-3xl">
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
      {items.map((item) => {
        const isActive = activeTab === item.title;
        return (
          <button
            key={item.title}
            onClick={() => setActiveTab(item.title)}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              isActive
                ? "bg-primary text-primary-foreground dark:bg-purple-800"
                : "bg-slate-50 bg-card lg:bg-inherit hover:bg-primary hover:underline hover:text-primary-foreground",
              "justify-start w-full text-center lg:text-left px-4 py-2"
            )}
          >
            {item.title}
          </button>
        );
      })}
    </nav>
  );
}

