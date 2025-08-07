"use client";

import React, { Suspense } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/layout/app-sidebar";
import Footer from "@/layout/Footer";
import Headers from "@/layout/headers";
import Navbar from "@/layout/navbar";
import { CompanyMeta } from "@/lib/type/CommonType";
import { useAuth } from "@/providers/auth-provider";

type OfferLayoutProps = {
    children: React.ReactNode;
    metadata: CompanyMeta;
};

const OfferLayoutView: React.FC<OfferLayoutProps> = ({ children, metadata }) => {
    const { user, isLoading } = useAuth();

    // if (isLoading) {
    //     return (
    //         <>
    //             <div className="flex justify-center items-center h-[100vh]">
    //                 <div className="flex flex-col items-center justify-center">
    //                     <div className="relative flex items-center justify-center w-16 h-16">
    //                         {/* Spinning border */}
    //                         <div className="absolute animate-spin w-16 h-16 border-[3px] border-transparent border-t-black border-r-black dark:border-t-white dark:border-r-white rounded-full" />
    //                         {/* Inner X */}
    //                         <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary z-10">
    //                             <span className="text-3xl font-extrabold text-black">x</span>
    //                         </div>
    //                     </div>
    //                     {/* MOREDEALSX Label */}
    //                     <div
    //                         className={`mt-6 uppercase text-base font-extrabold tracking-wide text-black`}
    //                     >
    //                         MORE<span className="text-primary">DEALS</span>X
    //                     </div>
    //                 </div>
    //             </div>
    //         </>
    //     );
    // }

    if (!user) {
        return (
            <>
                <Navbar />
                {children}
                <Footer data={metadata} />
            </>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar metadata={metadata} />
            <SidebarInset>
                <Suspense fallback={<div>Loading...</div>}>
                    <Headers />
                </Suspense>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:p-4 relative w-full min-h-screen">
                    <div className="col-span-12 space-y-4 overflow-y-auto">
                        {children}
                    </div>
                </div>

                <Footer data={metadata} />
            </SidebarInset>
        </SidebarProvider>
    );
};

export default OfferLayoutView;
