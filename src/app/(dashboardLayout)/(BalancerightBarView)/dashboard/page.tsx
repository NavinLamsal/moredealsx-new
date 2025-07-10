import { Memberships } from "@/components/Dashboard/Memberships"
import { Partners } from "@/components/Dashboard/Partners"
import Stat from "@/components/Dashboard/Stat"
import Treasurehunts from "@/components/Dashboard/treasurehunts"
import RestaurantTrendingEvents from "@/components/Events/ResturantListCarousel"
import TrendingEvents from "@/components/Events/TrendingEvent"
import BusinessSetupModal from "@/components/form/moredealsclub/BusinessRegistration/BusinessRegisterForm"
import CrmAlert from "@/components/moreclub/Crm/CrmAlert"
import OfferSection from "@/components/offers/OfferSection"
import HotDeals from "@/components/offers/restaurants/hotDeals"
import { Suspense } from "react"



export default async function Page() {
  return (
    <div className="flex-1 space-y-4  pt-6">
      <BusinessSetupModal />
      <CrmAlert/>
      <Stat />
      <Memberships />
      <Partners />
      <Suspense fallback={<div>Loading...</div>}>
            <HotDeals Dashboard={true}  title="HOT DEALS" />
            </Suspense>
            {/* <Suspense fallback={<div>Loading...</div>}>
              <OfferSection classname="min-[660px]:pl-0 min-[570px]:pl-20 min-[460px]:pl-40 pl-64" />
            </Suspense> */}
      <Suspense fallback={<div>Loading...</div>}>

      <OfferSection Dashboard={true}  />
      </Suspense>
      <Treasurehunts />
      <TrendingEvents />
      <RestaurantTrendingEvents title="Taste & Experience – Restaurant Events" dashboard={true} />
      {/* <FeaturedRestaurants /> */}
      <TrendingEvents dashboard={true}/>

      <div>
      </div>
    </div>

  )
}