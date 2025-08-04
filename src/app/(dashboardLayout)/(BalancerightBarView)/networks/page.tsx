import { Metadata } from "next";
import NetworkList from "@/components/moreclub/NetworkList";
import { Suspense } from "react";
import PageHeadings from "@/components/ui/customTitles/PageHeadings";

export const metadata: Metadata = {
  title: "Network | MOREDEALS CLUB",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default async function TaskPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-3  flex">
      {/* <div className=" items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <BackButton />
          <h2 className="text-2xl font-bold tracking-tight">Networks</h2>
        </div>
        <p className="text-muted-foreground ml-4">
          Here&apos;s a list of your Networks!
        </p>
      </div> */}

      <PageHeadings title="Networks" description="Here's a list of your Networks!"/>
      <Suspense fallback={<div>Loading...</div>}>
        <NetworkList />
      </Suspense>
    </div>
  );
}
