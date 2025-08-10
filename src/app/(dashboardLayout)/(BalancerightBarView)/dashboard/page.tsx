"use client"
import BusinessViews from "@/components/Dashboard/BusinessView"
import { Memberships } from "@/components/Dashboard/Memberships"
import { Partners } from "@/components/Dashboard/Partners"
import Stat from "@/components/Dashboard/Stat"
import Treasurehunts from "@/components/Dashboard/treasurehunts"
import RestaurantTrendingEvents from "@/components/Events/ResturantListCarousel"
import TrendingEvents from "@/components/Events/TrendingEvent"
import BusinessSetupModal from "@/components/form/moredealsclub/BusinessRegistration/BusinessRegisterForm"
import CrmAlert from "@/components/moreclub/Crm/CrmAlert"
// import OfferSection from "@/components/offers/OfferSection"
// import HotDeals from "@/components/offers/restaurants/hotDeals"
// import { Suspense } from "react"



export default function Page() {
  return (
    <div className="flex-1 space-y-4  pt-6">
      <BusinessSetupModal />
      <CrmAlert/>
      <Stat />
      <Memberships />
      <Partners />
      <BusinessViews/>
      {/* <OfferSection Dashboard={true}  /> */}
      <Treasurehunts />
      <TrendingEvents />
      <RestaurantTrendingEvents title="Taste & Experience – Restaurant Events" dashboard={true} />
      {/* <FeaturedRestaurants /> */}
      {/* <TrendingEvents dashboard={true}/> */}

      <div>
      </div>
    </div>

  )
}