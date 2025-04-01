"use client"
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { useAppSelector } from '@/lib/redux/hooks';
import { prevStep } from '@/lib/redux/slice/morefood/CheckoutSlice';
import { decrementOffer, decrementProduct, incrementOffer, incrementProduct, removeOffer, removeProduct } from '@/lib/redux/slice/morefood/productCart';
import { CartFoodItemsTypes, CartFoodOfferTypes } from '@/lib/type/morefood/restaurant'
import { LucideUtensilsCrossed, X } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { useDispatch } from 'react-redux';

const CartDetails = () => {
    const items = useAppSelector((state) => state.foodCart.items);
    const offers = useAppSelector((state) => state.foodCart.exclusiveOffers);
    const restaurant_slug = useAppSelector((state) => state.foodCart.restaurant_slug);

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
        <div className='flex flex-col justify-between'>
            <div>
                <Heading title="Your Cart" />
                {!items.length && !offers.length &&
                    <div className="flex flex-wrap flex-col justify-center items-center bg-white dark:bg-inherit">
                        <h2 className="text-bold text-xl">Add items into cart</h2>
                        <div className="flex flex-col items-center">
                            <LucideUtensilsCrossed size={60} className="text-P_icons" />
                            <p className="text-xl font-bold">Hungry ?</p>
                            <Link href={`${!restaurant_slug ? `/morefood/` : `/morefood/restaurant/${restaurant_slug}`}`}>
                                <Button variant="morefoodPrimary">
                                    {!restaurant_slug ? "View Resturants" : "Add Food Items"}
                                </Button>
                            </Link>
                        </div>
                    </div>
                }

                <div className="flex flex-col  gap-4 max-h-[400px] overflow-y-auto">

                    {items.map((item: CartFoodItemsTypes) => (
                        <OrderCard item={item} type='item' key={`${item.id}-items`}
                        />
                    ))}
                    {offers.map((item: CartFoodOfferTypes) => (
                        <OrderCard item={item} type='offer' key={`${item.id}-offers`}
                        />
                    ))}
                </div>
            </div>
            <div className='mt-auto'>
                <div className="mt-4 border-b-2 pb-2 border-dashed border-card-foreground">
                    <h3 className="font-medium">Cart summary ({totalItems} item)</h3>
                </div>
                <div className="mt-4">
                    <div className="mt-2 text-sm text-card-foreground">

                        <div className="flex justify-between font-semibold mt-2"><span>Total</span><span>{currency_symbol}&nbsp;{total}</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartDetails



const OrderCard = ({ item, type }: { item: CartFoodItemsTypes | CartFoodOfferTypes, type: "item" | "offer" }) => {
    const dispatch = useDispatch();
    const carts = useAppSelector((state) => state.foodCart);
    const handleRemove = (item: CartFoodItemsTypes | CartFoodOfferTypes) => {
        if (type === 'item') {
            dispatch(removeProduct(item as CartFoodItemsTypes));
            if((carts.items.length === 1 || carts.items.length === 0) && carts.exclusiveOffers.length === 0){
                dispatch(prevStep());  
            }
        }
        if (type === 'offer') {
            dispatch(removeOffer(item.id));
            if(carts.items.length === 0 && (carts.exclusiveOffers.length === 1 || carts.exclusiveOffers.length === 0)){
                dispatch(prevStep());  
            }
        }
    };

    const handleIncrement = (
        item: CartFoodItemsTypes | CartFoodOfferTypes
    ) => {
        if (type === 'item') {
            dispatch(incrementProduct(item as CartFoodItemsTypes));
        }
        if (type === 'offer') {
            dispatch(incrementOffer(item.id));
        }
    };

    const handleDecrement = (item: CartFoodItemsTypes | CartFoodOfferTypes) => {
        if (type === 'item') {
            dispatch(decrementProduct(item as CartFoodItemsTypes));
        }
        if (type === 'offer') {
            dispatch(decrementOffer(item.id));
        }



    };



    return (
        <div
            key={item.id}
            className="mb-6 p-2 rounded-md md:rounded-lg bg-white dark:bg-gray-600  shadow-md flex justify-start"
        >
            <Image
                src={item.image ? `${item.image}` : "/Images/morefood.jpg"}
                alt={item.name}
                width={500}
                height={500}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md md:rounded-lg"
            />
            <div className="ml-2 flex w-full justify-between">
                <div className="mt-0 flex flex-col justify-between">
                    <div>
                        <h4 className="text-card-foreground text-xs ">{item.name}</h4>
                        <p className='text-muted-foreground my-1 line-clamp-3' style={{ lineHeight: '8px', fontSize: "10px" }}>{item.description}</p>

                    </div>

                    <div className="flex items-center border-gray-100">
                        <span
                            onClick={() => handleDecrement(item)}
                            className="cursor-pointer rounded-l bg-gray-100 dark:bg-gray-400 py-1 px-2 duration-100 hover:bg-S_btn hover:text-blue-50 dark:hover:bg-S_btn"
                        >
                            -
                        </span>
                        <input
                            className="h-8 w-8 border bg-white dark:bg-transparent text-center text-xs outline-none"
                            type="number"
                            name="quantity"
                            id="quantity"
                            value={item.quantity}
                            readOnly
                            min="1"
                        />
                        <span
                            onClick={() => handleIncrement(item)}
                            className="cursor-pointer rounded-r  bg-gray-100 dark:bg-gray-400  py-1 px-2  duration-100 hover:bg-S_btn hover:text-blue-50 dark:hover:bg-S_btn"
                        >
                            +
                        </span>
                    </div>
                </div>
                <div className=" justify-between sm:space-y-6  flex flex-col  sm:space-x-6 pr-1">
                    <div
                        onClick={() => handleRemove(item)}
                        className="flex items-center justify-end"
                    >
                        <X size={16} className='hover:text-destructive cursor-pointer' />
                    </div>

                    <div className="flex items-center space-x-4">
                        <p className="text-sm">
                            {item.currency_symbol}&nbsp;
                            {item.price}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
