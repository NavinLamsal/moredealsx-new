
import UserLayout from "@/layout/pageLayouts/UserLayout";
import React from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:p-4 relative w-full  min-h-screen">
        <div className="col-span-12 lg:col-span-12 2xl:col-span-12 space-y-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </UserLayout>
  );
}
