"use client"
import { Button } from '@/components/ui/button';
import { prevStep } from '@/lib/redux/slice/morefood/CheckoutSlice';
import {  ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import PaymentSections from './PaymentSections';

const Paymentinformation = () => {
  const dispatch = useDispatch();
    const [selectedPayment, setSelectedPayment] = useState("");

    const handlePaymentChange = (paymentId: React.SetStateAction<string>) => {
        setSelectedPayment(paymentId);
      };


  return (
    <div className=" p-6  rounded-lg w-full">
              <h3 className="text-2xl font-semibold mb-4 flex justify-between">Payment Options

                <Button variant={"ghost"} onClick={(e) => {e.preventDefault(); dispatch(prevStep())}}> <ArrowLeft/> Back</Button>
              </h3>
              <div className="space-y-0 flex space-x-8 ">
                {/* Stripe Payment Option */}
                <div className="group">
                  <input
                    type="radio"
                    name="payment"
                    id="Stripe1"
                    className="hidden"
                    onChange={() => handlePaymentChange("Stripe")}
                  />
                  <label
                    htmlFor="Stripe1"
                    className={`flex flex-col items-center p-4 w-full shadow-lg rounded-lg cursor-pointer border     ${
                      selectedPayment === "Stripe"
                        ? "border-2 bg-morefoodPrimary border-morefoodPrimary  hover:bg-red-400 hover:border-red-400 hover:text-white "
                        : "border-2 bg-transparent border-foreground hover:bg-morefoodPrimary hover:text-morefoodPrimary-foreground"
                    }`}
                  >
                    <Image
                      src="/images/png/stripePrimary.png"
                      alt="Stripe"
                      width={500}
                      height={500}
                      className="w-24 h-16 object-fit  dark:hidden block"
                    />
                    <Image
                      src="/Images/stripeWhite.png"
                      alt="More Deals"
                      width={500}
                      height={500}
                      className="w-24 h-16 object-cover dark:block hidden"
                    />
                  </label>
                </div>
                {/* More Deals Payment Option */}
                <div className="group">
                  <input
                    type="radio"
                    name="payment"
                    id="moredeals"
                    className="hidden"
                    onChange={() => handlePaymentChange("MoreDeals")}
                  />
                  <label
                    htmlFor="moredeals"
                    className={`flex flex-col items-center p-4 w-full shadow-lg rounded-lg cursor-pointer border     ${
                      selectedPayment === "MoreDeals"
                        ? "border-2 bg-morefoodPrimary border-morefoodPrimary  hover:bg-red-400 hover:border-red-400 hover:text-white "
                        : "border-2 bg-transparent border-foreground hover:bg-morefoodPrimary hover:text-morefoodPrimary-foreground"
                    }`}
                  >
                    <Image
                      src="/images/png/moredeals.png"
                      alt="More Deals"
                      width={500}
                      height={500}
                      className="w-24 h-16 object-cover dark:hidden block"
                    />
                    <Image
                      src="/images/png/MembersClubWhite.png"
                      alt="More Deals"
                      width={500}
                      height={500}
                      className="w-24 h-16 object-cover dark:block hidden hover:hidden"
                    />
                  </label>

                </div>

                <div className="group">
                  <input
                    type="radio"
                    name="payment"
                    id="cod"
                    className="hidden"
                    onChange={() => handlePaymentChange("COD")}
                  />
                  <label
                    htmlFor="cod"
                    className={`flex flex-col items-center p-4 w-full shadow-lg rounded-lg cursor-pointer border     ${
                      selectedPayment === "COD"
                        ? "border-2 bg-morefoodPrimary border-morefoodPrimary  hover:bg-red-400 hover:border-red-400 hover:text-white "
                        : "border-2 bg-transparent border-foreground hover:bg-morefoodPrimary hover:text-morefoodPrimary-foreground"
                    }`}
                  >
                    <div className='w-24 h-16 font-bold flex flex-wrap items-center justify-center'>
                      <p className={`${
                      selectedPayment === "COD"
                        ? "text-morefoodPrimary-foreground   hover:text-white "
                        : "text-foreground"}`}>Cash on Delivery</p>
                    </div>
                    {/* <Image
                      src="/images/png/moredeals.png"
                      alt="More Deals"
                      width={500}
                      height={500}
                      className="w-24 h-16 object-cover dark:hidden block"
                    />
                    <Image
                      src="/images/png/MembersClubWhite.png"
                      alt="More Deals"
                      width={500}
                      height={500}
                      className="w-24 h-16 object-cover dark:block hidden"
                    /> */}
                  </label>
                </div>
              </div>
              <PaymentSections selectedPayment={selectedPayment} />
              
            </div>
  )
}

export default Paymentinformation
