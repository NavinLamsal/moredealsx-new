


import { Metadata } from "next"
import NetworkList from "@/components/moreclub/NetworkList"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Network | MOREDEALS CLUB",
  description: "A task and issue tracker build using Tanstack Table.",
}

export default async function TaskPage() {


  return (
      
      <div className="h-full flex-1 flex-col space-y-8 p-3 lg:p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Networks</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your Networks!
            </p>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
        <NetworkList/>
        </Suspense>
      </div>
  )
}
