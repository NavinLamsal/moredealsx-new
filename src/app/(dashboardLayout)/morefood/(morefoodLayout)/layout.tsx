import { getMetadata } from "@/lib/action/PubilcCommon";
import { CompanyMeta } from "@/lib/type/CommonType";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "MoreFood |MOREDEALSX ",
  description: "Luxury redefined. Exclusive club. Personalized service, bespoke experiences, unmatched amenities. Elevate your lifestyle. Join today",
};


export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const MetaDatas: CompanyMeta = await getMetadata();

  const teams = {
    name: "MOREDEALS CLUB",
    logo: MetaDatas.white_logo,
    plan: "",
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4  w-full relative min-h-screen">
      {/* Left Side - Main Content */}
      {/* <div className="col-span-12 xl:col-span-8 2xl:col-span-9 space-y-4"> */}
      <div className="col-span-12  space-y-4">
        {children}
        {/* <CartButton/> */}
      </div>

      {/* Right Side - Sidebar */}
      {/* <div className="hidden xl:block xl:col-span-4 2xl:col-span-3 h-screen sticky top-20 z-40">
        <div className="space-y-4 w-full">
         <BalanceCartView/>
        </div>
      </div> */}
    </div>
  );
}
