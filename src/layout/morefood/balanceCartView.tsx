import { WalletDetail } from '@/components/moreclub/wallets/WalletInfo'
import SidebarCart from '@/components/morefood/cart/sidebarCart'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CoinsIcon, ShoppingCart } from 'lucide-react'
import React from 'react'
import { LocationDialog } from '../Setloaction'
import Location from '@/components/morefood/cart/location'

const BalanceCartView = () => {
  return (
    <Card className="p-6 w-full max-w-md rounded-xl shadow-md">
      {/* Balance Section */}
      <div className="bg-morefoodPrimary p-4 rounded-lg text-primary-foreground flex flex-col justify-start items-start">
        <h3 className="text-lg text-start font-bold"><CoinsIcon className="inline-block mr-2" />Your Balance</h3>
        <WalletDetail onlyBalance={true} />
      </div>

      {/* Address Section */}
      <Location/>

      {/* Order Menu */}
      <SidebarCart />
    </Card>
  )
}

export default BalanceCartView



