
import UserLayout from "@/layout/pageLayouts/UserLayout";
import React from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserLayout>
          {children}
    </UserLayout>
  );
}
