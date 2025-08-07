import { getMetadata } from "@/lib/action/PubilcCommon";
import { CompanyMeta } from "@/lib/type/CommonType";
import type { Metadata } from "next";
import React, { Suspense } from "react";
import OfferLayoutView from "./offerlayout";
import AuthProvider from "@/providers/auth-provider";


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

    return (
        <React.Fragment>
            <AuthProvider>
            <OfferLayoutView
                metadata={MetaDatas}
            >
                {children}
            </OfferLayoutView>
            </AuthProvider>
        </React.Fragment>
    )
}
