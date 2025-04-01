"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { removeOffer, removeProduct } from '@/lib/redux/slice/morefood/productCart';
import { CartFoodItemsTypes, CartFoodOfferTypes } from '@/lib/type/morefood/restaurant';
import { LucideUtensilsCrossed, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react'




const OrderItem = ({ name, description, price, quantity, img, onDelete }: { name: string; price: string; quantity: number; img: string, description: string, onDelete: () => void }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={img} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-muted-foreground text-xs line-clamp-1 w-28">{name}</p>
        <p className='text-muted-foreground line-clamp-2 w-28' style={{ lineHeight: '8px', fontSize: "10px" }}>({description})</p>
      </div>
    </div>

    <p className="text-xs text-muted-foreground flex items-center gap-1">+ {quantity} x <span className='font-semibold text-sm'>{price}</span><Trash2 size="14" onClick={() => { onDelete() }} className="inline-block ml-1 text-destructive" /></p>
  </div>
);

const SidebarCart = () => {

  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.foodCart.items);
  const offers = useAppSelector((state) => state.foodCart.exclusiveOffers);


  const handleClick = (item: CartFoodItemsTypes) => {
    dispatch(removeProduct(item));
  };

  const handleOfferClick = (item: CartFoodOfferTypes) => {
    dispatch(removeOffer(item.id));
  };


  const itemsubtotal = items.reduce(
    (total, item) =>
      total +
      (item.price) *
      (item.quantity ?? 0),
    0
  );

  const offersubTotal = offers.reduce(
    (total, item) => total + item.price * (item.quantity ?? 0),
    0
  );

  const subtotal = itemsubtotal + offersubTotal;
  const shipping = 0;
  const total = subtotal + shipping;

  const currency_symbol =
    items && items.length > 0
      ? items[0].currency_symbol
      : offers && offers.length > 0
        ? offers[0].currency_symbol
        : "";

  const totalItem = items.reduce((total, item) => total + (item.quantity || 0), 0);
  const totalOffer = offers.reduce((total, item) => total + (item.quantity || 0), 0);
  const totalItems = totalItem + totalOffer;


  return (
    <>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Order Menu</h3>
        <div className="space-y-3 mt-3">
          {!items.length && !offers.length &&
            <div className="flex flex-wrap flex-col justify-center items-center bg-white dark:bg-inherit">
              <h2 className="text-bold text-xl">Add items into cart</h2>
              <div className="flex flex-col items-center">
                <LucideUtensilsCrossed size={60} className="text-P_icons" />
                <p className="text-xl font-bold">Hungry ?</p>
              </div>
            </div>
          }
          {items.map((item: CartFoodItemsTypes) => (
            <OrderItem name={item.name} price={`${item.currency_symbol} 
        ${item.price}`} quantity={item.quantity} img={item.image}
              description={item.description}
              onDelete={() => { handleClick(item) }}
            />
          ))}
          {offers.map((item: CartFoodOfferTypes) => (
            <OrderItem name={item.name} price={`${item.currency_symbol} 
        ${item.price}`} quantity={item.quantity} img={item.image}
              description={item.description}
              onDelete={() => { handleOfferClick(item) }}
            />
          ))}

        </div>
      </div>

      {/* Service Fee & Total */}
      <div className="mt-4 border-t pt-3">
        {/* <div className="flex justify-between text-sm">
      <span>Service</span>
      <span className="text-gray-700 font-medium">$1.00</span>
    </div> */}
        <div className="flex justify-between font-bold text-lg mt-1">
          <span>Total</span>
          <span>{currency_symbol}&nbsp;{total}</span>
        </div>
      </div>



      {/* Checkout Button */}
      {(totalItems === 0 || !totalItems) ? (
        <Button variant={"morefoodPrimary"} disabled={totalItems === 0} className="mt-4 w-full py-3 rounded-lg text-lg">
          Checkout
        </Button>
      ) :
        (
          <Link href="/morefood/checkout">
            <Button variant={"morefoodPrimary"} disabled={totalItems === 0} className="mt-4 w-full py-3 rounded-lg text-lg">
              Checkout
            </Button>
          </Link>

        )

      }

    </>
  )
}

export default SidebarCart
