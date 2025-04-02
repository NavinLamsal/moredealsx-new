import DeliveryOptions from '@/components/form/morefood/DeliveryOption'
import React from 'react'
import LocationChange from '../Checkout/LocationChange'
import RecieverInformation from '../Checkout/RecieverInformation'
import Note from '@/components/form/morefood/Note'
import CheckoutButton from '../Checkout/CheckoutButton'
import ArrivalTime from '../Checkout/Arriavaltime'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const UserInformation = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>

    <h2 className="text-xl font-semibold ">Checkout</h2>
    <Button variant={"link"} onClick={() => window.history.back()}><ArrowLeft />back</Button>
      </div>
    <DeliveryOptions 
    deliveryOptions={["delivery", "dine-here" , "pickup"]} 
    />

    {/* Delivery Address */}
    <LocationChange/>


   
    
    <RecieverInformation/>

    <ArrivalTime/>
      
    {/* Payment */}
    <div className="mt-4">
     <Note/>
    </div>
    
    {/* Continue Button */}
    <CheckoutButton/>

    </div>
  )
}

export default UserInformation
