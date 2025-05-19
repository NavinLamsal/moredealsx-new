"use client";

import React, { Suspense } from "react";

import AllOffersList from "@/components/offers/Offerlist";
import NavSearch from "@/layout/Support/NavSearch";
import CategorySelector from "@/components/offers/OfferCategory";

const offersPage = () => {

  
const categories = [
  { title: "All", value: "All" },
  { title: "Restaurants", value: "morefood" },
  { title: "Salons", value: "moresalons" },
  { title: "Hotels", value: "moreliving" },
  { title: "Marketplace", value: "marketplace" }
];

 
   return (
    <Suspense fallback={<div>Loading...</div>}>
    <NavSearch/>
    <div className="container mx-auto px-4 pt-10">
      <Suspense fallback={<div>Loading...</div>}>
    <CategorySelector
      categories={categories}
      activeCategory={"All"}
      UseSearchParams={true}
      dashboardStyle={false}
    /> 

      </Suspense>
    </div>
    <AllOffersList/>

    </Suspense>
  );
};

export default offersPage;

