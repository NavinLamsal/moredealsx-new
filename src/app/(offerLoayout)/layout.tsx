
import { auth } from "@/auth";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/layout/app-sidebar";
import Footer from "@/layout/Footer";
import Headers from "@/layout/headers";
import Navbar from "@/layout/navbar";
import { getMetadata } from "@/lib/action/PubilcCommon";
import { CompanyMeta } from "@/lib/type/CommonType";
import type { Metadata } from "next";
import React, { Suspense } from "react";

// 🔹 Global Metadata for All Event Pages
export const metadata: Metadata = {
    title: "Exclusive Offers | MoreDealsX",
    description: "Join our exclusive events with MoreClub. Book your spot now!",
    openGraph: {
        title: "Exclusive Offers",
        description: "Discover amazing events and book your spot.",
        images: [
            {
                url: "https://example.com/event-thumbnail.jpg",
                width: 1200,
                height: 630,
                alt: "Event Thumbnail",
            },
        ],
    },
};

export default async function OfferLayout({ children }: { children: React.ReactNode }) {
    const MetaDatas: CompanyMeta = await getMetadata();
    const session = await auth();
    const isAuthenticated = !!session;

    return isAuthenticated ? <SidebarProvider>
        <AppSidebar metadata={MetaDatas} />
        <SidebarInset  >
            <Suspense fallback={<div>Loading...</div>}>
                <Headers />
            </Suspense>
          
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:p-4 relative w-full  min-h-screen">
                  {/* Left Side - Main Content */}
                  <div className="col-span-12 lg:col-span-12 2xl:col-span-12 space-y-4 overflow-y-auto">
                    {children}
                  </div>
            
                  {/* Right Side - Sidebar */}
                  {/* <div className="hidden lg:block lg:col-span-4 2xl:col-span-3 h-screen sticky top-20 z-40">
                    <div className="sticky top-20 flex flex-col space-y-4 w-full">
                      <WalletInfo />
                      <QuickLinks />
                    </div>
                  </div> */}
                </div>
            <Footer data={MetaDatas} />
        </SidebarInset>
    </SidebarProvider> :
        <React.Fragment>
            <Navbar/> 
            
            {children}
            <Footer data={MetaDatas} />
        </React.Fragment>
}
