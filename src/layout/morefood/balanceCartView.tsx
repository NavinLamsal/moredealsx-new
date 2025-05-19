import SidebarCart from '@/components/morefood/cart/sidebarCart'
import { Card } from '@/components/ui/card'
import { CoinsIcon } from 'lucide-react'
import React from 'react'
import Location from '@/components/morefood/cart/location'
import DeliveryOptions from '@/components/form/morefood/DeliveryOption'

const BalanceCartView = () => {
  return (
    <Card className="p-6 w-full max-w-md rounded-xl shadow-md">

      {/* Address Section */}
      <Location/>

      
      <DeliveryOptions deliveryOptions={["delivery", "dine-here", "pickup"]} showicon={false}/>

      {/* Order Menu */}
      <SidebarCart />
    </Card>
  )
}

export default BalanceCartView



