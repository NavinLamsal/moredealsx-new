import DeliveryOptions from '@/components/form/morefood/DeliveryOption'
import React from 'react'
import LocationChange from '../Checkout/LocationChange'
import RecieverInformation from '../Checkout/RecieverInformation'
import Note from '@/components/form/morefood/Note'
import CheckoutButton from '../Checkout/CheckoutButton'
import ArrivalTime from '../Checkout/Arriavaltime'

const UserInformation = () => {
  return (
    <div>
    <h2 className="text-xl font-semibold">Checkout</h2>
    <DeliveryOptions 
    deliveryOptions={["delivery", "pickup", "dine-here"]} 
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
