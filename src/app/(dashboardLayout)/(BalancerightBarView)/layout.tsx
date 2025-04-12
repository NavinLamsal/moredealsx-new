
import SmallOffers from "@/components/Dashboard/VerticalOfferCarousel";
import WalletInfo, { QuickLinks } from "@/components/moreclub/wallets/WalletInfo";
import React from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:p-4 relative w-full  min-h-screen">
      {/* Left Side - Main Content */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9 space-y-4 overflow-y-auto">
        {children}
      </div>

      {/* Right Side - Sidebar */}
      <div className="hidden lg:block lg:col-span-4 2xl:col-span-3  sticky top-20 z-40">
        <div className="sticky top-20 flex flex-col space-y-4 w-full ">
          <WalletInfo />
          <QuickLinks />
          <div className="hidden 2xl:block">
          <div className="w-full p-6">
          <SmallOffers/>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
