import BusinessLayout from "@/layout/pageLayouts/BusinessLayout";
import React from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BusinessLayout>
          {children}
    </BusinessLayout>
  );
}
