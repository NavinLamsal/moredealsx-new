
import { getMetadata } from "@/lib/action/PubilcCommon";
import { CompanyMeta } from "@/lib/type/CommonType";
import AuthProvider from "@/providers/auth-provider";
import type { Metadata } from "next";
import React from "react";
import OfferLayoutView from "../(offerLoayout)/offerlayout";

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
