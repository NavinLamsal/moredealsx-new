import { Memberships } from "@/components/Dashboard/Memberships"
import { Partners } from "@/components/Dashboard/Partners"
import Stat from "@/components/Dashboard/Stat"
import Treasurehunts from "@/components/Dashboard/treasurehunts"
import TrendingEvents from "@/components/Events/TrendingEvent"
import BusinessSetupModal from "@/components/form/moredealsclub/BusinessRegistration/BusinessRegisterForm"
import OfferSection from "@/components/offers/OfferSection"
import { Suspense } from "react"



export default async function Page() {
  return (
    <div className="flex-1 space-y-4  pt-6">
      <BusinessSetupModal />
      <Stat />
      <Memberships />
      <Partners />
      <Suspense fallback={<div>Loading...</div>}>

      <OfferSection Dashboard={true} />
      </Suspense>
      <Treasurehunts />
      <TrendingEvents />
      <div>
      </div>
    </div>

  )
}