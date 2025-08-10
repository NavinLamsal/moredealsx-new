import Footer from "@/layout/Footer";
import Navbar from "@/layout/navbar";
import { getMetadata } from "@/lib/action/PubilcCommon";
import { CompanyMeta } from "@/lib/type/CommonType";
import React from "react";

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const MetaDatas: CompanyMeta = await getMetadata();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer data={MetaDatas} />
    </div>
  );
}
