import Footer from "@/layout/Footer";
import Navbar from "@/layout/navbar";
import { getMetadata } from "@/lib/action/PubilcCommon";
import { CompanyMeta } from "@/lib/type/CommonType";
import type { Metadata } from "next";
import React from "react";


export default async function  LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const MetaDatas : CompanyMeta = await getMetadata();

  return (
        <React.Fragment>
         <Navbar dark_logo={MetaDatas.white_logo} light_logo={MetaDatas.white_logo}/> 
        {children}
        <Footer data={MetaDatas}/>
        
        </React.Fragment>
  );
}
