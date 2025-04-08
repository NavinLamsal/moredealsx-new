"use client";

import React, { Suspense } from "react";

import SuportPageContent from "@/components/support/SuportPageContent";

const SupportPage = () => {
 
   return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
    <SuportPageContent/>
    </Suspense>
    </>
  );
};

export default SupportPage;

