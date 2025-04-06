"use client";

import React, { Suspense } from "react";

import AllOffersList from "@/components/offers/Offerlist";
import NavSearch from "@/layout/Support/NavSearch";

const offersPage = () => {
 
   return (
    <Suspense fallback={<div>Loading...</div>}>
    <NavSearch/>
    <AllOffersList/>

    </Suspense>
  );
};

export default offersPage;

