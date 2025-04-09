import { auth } from "@/auth";
import { Header } from "@/components/Home/Hero";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/layout/app-sidebar";
import Footer from "@/layout/Footer";
import Headers from "@/layout/headers";
import { getMetadata } from "@/lib/action/PubilcCommon";
import { CompanyMeta } from "@/lib/type/CommonType";
import type { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard |MOREDEALSX ",
  description: "Luxury redefined. Exclusive club. Personalized service, bespoke experiences, unmatched amenities. Elevate your lifestyle. Join today",
};
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const MetaDatas: CompanyMeta = await getMetadata();

  const teams=
    {
      name: "MOREDEALS CLUB",
      logo: MetaDatas.white_logo,
      plan: "",
    }

   

  return (
    <SidebarProvider>
      <AppSidebar metadata={MetaDatas} />
      <SidebarInset  >
        <Suspense fallback={<div>Loading...</div>}>
          <Headers />
        </Suspense>
        <div className="relative flex min-h-svh flex-1 flex-col gap-4 p-1 lg:p-4 pt-0">

        {children}
        </div>
        <Footer data={MetaDatas} />
      </SidebarInset>
    </SidebarProvider>

  );
}
