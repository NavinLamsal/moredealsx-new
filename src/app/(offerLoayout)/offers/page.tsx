"use client";

import React, { Suspense } from "react";
import AllOffersList from "@/components/offers/Offerlist";
import NavSearch from "@/layout/Support/NavSearch";
import CategorySelector from "@/components/offers/OfferCategory";
import PageHeadings from "@/components/ui/customTitles/PageHeadings";
import { useAuth } from "@/providers/auth-provider";

const offersPage = () => {

  const  {user, isLoading} = useAuth();

  const categories = [
    { title: "All", value: "All" },
    { title: "Restaurants", value: "morefood" },
    { title: "Salons", value: "moresalons" },
    { title: "Hotels", value: "moreliving" },
    { title: "Marketplace", value: "marketplace" }
  ];
  

  if (isLoading && !user) {
    return <div className="flex justify-center items-center h-[100vh]">
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center w-16 h-16">
        {/* Spinning border */}
        <div className="absolute animate-spin w-16 h-16 border-[3px] border-transparent border-t-black border-r-black dark:border-t-white dark:border-r-white rounded-full" />
        {/* Inner X */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary z-10">
          <span className="text-3xl font-extrabold text-black">x</span>
        </div>
      </div>
      {/* MOREDEALSX Label */}
      <div
        className={`mt-6 uppercase text-base font-extrabold tracking-wide text-black`}
      >
        MORE<span className="text-primary">DEALS</span>X
      </div>
    </div>
  </div>
  }

  if (!user) {
    return <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto px-4 pt-10">
        <Suspense fallback={<div>Loading...</div>}>
          <NavSearch />
          <CategorySelector
            categories={categories}
            activeCategory={"morefood"}
            UseSearchParams={true}
            dashboardStyle={false}
          />

        </Suspense>
      </div>
      <AllOffersList />

    </Suspense>
  }

  if (user) {

    return <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto px-4 pt-10">
        <Suspense fallback={<div>Loading...</div>}>
          <PageHeadings title="Offers" description="Here's a list of Offers!" />
          <CategorySelector
            categories={categories}
            activeCategory={"morefood"}
            UseSearchParams={true}
            dashboardStyle={true}
          />

        </Suspense>
      </div>
      

      <AllOffersList />

    </Suspense>
  }
}







export default offersPage;

