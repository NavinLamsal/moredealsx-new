import DeliveryOptions from '@/components/form/morefood/DeliveryOption'
import React from 'react'
import LocationChange from '../Checkout/LocationChange'
import RecieverInformation from '../Checkout/RecieverInformation'
import Note from '@/components/form/morefood/Note'
import CheckoutButton from '../Checkout/CheckoutButton'

const UserInformation = () => {
  return (
    <div>
    <h2 className="text-xl font-semibold">Checkout</h2>
    <DeliveryOptions 
    deliveryOptions={["delivery", "packed", "dine-here"]} 
    />

    {/* Delivery Address */}
    <LocationChange/>
   
    
    <RecieverInformation/>
      
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
