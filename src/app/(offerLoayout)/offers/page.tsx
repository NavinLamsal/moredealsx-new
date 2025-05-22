"use client";

import React, { Suspense } from "react";

import AllOffersList from "@/components/offers/Offerlist";
import NavSearch from "@/layout/Support/NavSearch";
import CategorySelector from "@/components/offers/OfferCategory";
import { useSession } from "next-auth/react";
import PageHeadings from "@/components/ui/customTitles/PageHeadings";

const offersPage = () => {

  const { data: Sesssion, status } = useSession()

  const categories = [
    { title: "All", value: "All" },
    { title: "Restaurants", value: "morefood" },
    { title: "Salons", value: "moresalons" },
    { title: "Hotels", value: "moreliving" },
    { title: "Marketplace", value: "marketplace" }
  ];
  

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    return <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto px-4 pt-10">
        <Suspense fallback={<div>Loading...</div>}>
          <NavSearch />
          <CategorySelector
            categories={categories}
            activeCategory={"All"}
            UseSearchParams={true}
            dashboardStyle={false}
          />

        </Suspense>
      </div>
      <AllOffersList />

    </Suspense>
  }

  if (status === "authenticated") {

    return <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto px-4 pt-10">
        <Suspense fallback={<div>Loading...</div>}>
          <PageHeadings title="Offers" description="Here's a list of Offers!" />
          <CategorySelector
            categories={categories}
            activeCategory={"All"}
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

