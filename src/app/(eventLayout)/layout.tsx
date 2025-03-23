// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import DashboardLayout from "@/components/layouts/DashboardLayout";
// import LandingLayout from "@/components/layouts/LandingLayout";
import { auth } from "@/auth";
import { Header } from "@/components/Home/Hero";
import WalletInfo, { QuickLinks } from "@/components/moreclub/wallets/WalletInfo";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/layout/app-sidebar";
import Footer from "@/layout/Footer";
import Headers from "@/layout/headers";
import { getMetadata } from "@/lib/action/PubilcCommon";
import { CompanyMeta } from "@/lib/type/CommonType";
import type { Metadata } from "next";
import React, { Suspense } from "react";

// 🔹 Global Metadata for All Event Pages
export const metadata: Metadata = {
    title: "Exclusive Events | MoreClub",
    description: "Join our exclusive events with MoreClub. Book your spot now!",
    openGraph: {
        title: "Exclusive Events",
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

export default async function EventLayout({ children }: { children: React.ReactNode }) {
    const MetaDatas: CompanyMeta = await getMetadata();
    const session = await auth();
    const isAuthenticated = !!session;

    return isAuthenticated ? <SidebarProvider>
        <AppSidebar metadata={MetaDatas} />
        <SidebarInset  >
            <Suspense fallback={<div>Loading...</div>}>
                <Headers />
            </Suspense>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:p-4 relative w-full ">
                    {/* Left Side - Main Content */}
                    <div className="col-span-12 lg:col-span-8 2xl:col-span-9 space-y-4 overflow-y-auto">
                        {children}
                    </div>

                    {/* Right Side - Sidebar */}
                    <div className="hidden lg:grid lg:col-span-4 2xl:col-span-3 ">
                        <div className="sticky top-20 grid space-y-4 w-full">

                            <WalletInfo />
                            <QuickLinks />
                        </div>
                    </div>
                </div>
            </div>
            <Footer data={MetaDatas} />
        </SidebarInset>
    </SidebarProvider> :
        <React.Fragment>
            <Header logo={MetaDatas.white_logo} />
            {children}
            <Footer data={MetaDatas} />
        </React.Fragment>
}
