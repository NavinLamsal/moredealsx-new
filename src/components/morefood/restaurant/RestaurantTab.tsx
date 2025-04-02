"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Restaurant } from "@/lib/type/morefood/restaurant";
import React, { Suspense } from "react";
import Overview from "./overview";
import { useSearchParams, useRouter } from "next/navigation";
import HomeReview from "./review/homeReview";
import { ContainerSkeleton } from "@/components/MapBox/Skeletons";
import OpeningHours from "./OpeningHours";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const RestaurantTab = ({ details }: { details: Restaurant }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activetab = searchParams?.get("tab") || "review";

  const tablist = [
    {
      id: "3",
      value: "review",
      name: "Reviews",
      content: <HomeReview slug={details.slug} rating={details.restaurant_rating} totalReview={details.review_count ? details.review_count : 0} postitveReview={details.positive_review_count} negativeReview={details.negative_review_count} />,
    },
    {
      id: "1",
      value: "overview",
      name: "About",
      content: <Overview details={details} />,
    },
    {
      id: "2",
      value: "gallery",
      name: "Gallery",
      link: `/morefood/restaurant/${details.slug}/gallery`,
      content: <Card className="h-40 flex items-center justify-center"><Loader2 size={24} className="animate-spin duration-1000" /></Card>,
    },
    {
      id: "4",
      value: "opening",
      name: "Availability",
      content: <Suspense fallback={<ContainerSkeleton />}>
        <OpeningHours id={details.slug} />
      </Suspense>,
    },
  ];

  return (
    <Tabs defaultValue={activetab} className="mx-auto w-full max-w-5xl bg-card">
      {/* Tab List */}
      <TabsList className="w-full flex items-center justify-start border-b border-muted-foreground dark:border-gray-700 bg-inherit rounded-none overflow-x-auto hide-scroll-bar">
        {tablist.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.value}
            className="relative px-4 py-1 text-sm sm:text-base font-medium text-muted-foreground hover:text-morefoodPrimary transition-all duration-300 
              data-[state=active]:border-b-4 data-[state=active]:shadow-none data-[state=active]:bg-transparent  data-[state=active]:text-morefoodPrimary rounded-none data-[state=active]:border-morefoodPrimary data-[state=active]:dark:bg-transparent data-[state=active]:dark:text-white"
            onClick={(e) => {
              if (item.link) {
                e.preventDefault(); // Prevent default tab switch
                router.push(item.link);
              }
            }}
          >
            {item.name}
            {/* Active Tab Underline */}
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-transparent transition-all duration-300 data-[state=active]:bg-morefoodPrimary"></span>
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tab Content */}
      {tablist.map(
        (item) =>
        (
          <TabsContent key={item.id} value={item.value} className="py-2">
            {item.content}
          </TabsContent>
        )
      )}
    </Tabs>
  );
};

export default RestaurantTab;

