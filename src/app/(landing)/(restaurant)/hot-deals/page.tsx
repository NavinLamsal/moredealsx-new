import React from "react";
import SectionTitle from "@/components/Homes/sectionTiltle";
import HotDealsList from "@/components/morefood/HotDealsList";

export default async function Page() {
  return (
    <div className="sm:p-10 p-4">
      <div className="flex items-center justify-between space-x-2">
        <SectionTitle title="Hot Deals" className="mx-auto" />
      </div>

      <HotDealsList />
    </div>
  );
}
