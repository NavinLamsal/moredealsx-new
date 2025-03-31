"use client";
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import {  useAppSelector } from '@/lib/redux/hooks';
import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const CartButton = () => {

      const items = useAppSelector((state) => state.foodCart.items);
      const offers = useAppSelector((state) => state.foodCart.exclusiveOffers);

      const totalItem = items.reduce((total, item) => total + (item.quantity || 0), 0);
      const totalOffer = offers.reduce((total, item) => total + (item.quantity || 0), 0);
      const totalItems = totalItem + totalOffer;

     

  if(totalItems > 0){
    return (
      <Link href={'/morefood/checkout'} className='fixed bottom-4 right-4 bg-morefoodPrimary text-white p-4 rounded-full shadow-lg flex xl:hidden items-center justify-center hover:bg-red-700 transition-all h-12 w-12'>
      <div>
        <ShoppingCartIcon  className='h-8 w-8'/>
      </div>
      
      </Link>
    )
  }else{
    return null
  }
}

export default CartButton