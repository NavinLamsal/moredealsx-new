"use client"
import Moredeals from '@/components/payments/MoredealsClub/MoredealsPayment';
import { Button } from '@/components/ui/button';
import { prevStep } from '@/lib/redux/slice/morefood/CheckoutSlice';
import { ArrowBigLeft, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

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
                        ? "border-2 bg-green-500 border-green-500 dark:border-green-500 hover:bg-P_text dark:hover:bg-P_text"
                        : "border-2 bg-white dark:bg-dark-primary border-black dark:border-gray-500 hover:bg-P_text dark:hover:bg-P_text"
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
                        ? "border-2 bg-green-500 border-green-500 dark:border-green-500 hover:bg-P_text dark:hover:bg-P_text"
                        : "border-2 bg-white dark:bg-dark-primary border-black dark:border-gray-500 hover:bg-P_text dark:hover:bg-P_text"
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
                      className="w-24 h-16 object-cover dark:block hidden"
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
                      selectedPayment === "MoreDeals"
                        ? "border-2 bg-green-500 border-green-500 dark:border-green-500 hover:bg-P_text dark:hover:bg-P_text"
                        : "border-2 bg-white dark:bg-dark-primary border-black dark:border-gray-500 hover:bg-P_text dark:hover:bg-P_text"
                    }`}
                  >
                    <div className='w-24 h-16 font-bold flex flex-wrap items-center justify-center'>
                      <p>Cash on Delivery</p>
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
              {/* Conditional Form Rendering */}
              {selectedPayment === "Stripe" && (
                <div className="pt-4 mt-4 border-t">
                  <h4 className="font-semibold py-3">Stripe Payment Form</h4>
                  {/* <Stripe
                    currency_code={currency_code}
                    currency_symbol={currency_symbol}
                  /> */}
                </div>
              )}
              {/* {selectedPayment === "MoreDeals" &&
                !session?.data?.user?.accessToken && (
                  <div className="p-4 mt-4 border-t">
                    <LoginCTA/>
                  </div>
                )} */}
              {selectedPayment === "MoreDeals" &&
                // session?.data?.user?.accessToken && (
                  <div className="pt-4 mt-4 border-t">
                    <h4 className="font-semibold py-2">Pay via More Deals</h4>
                    {/* Add More Deals-specific form elements here */}
                    <Moredeals
                      paymentfor= {"morefood"}
                    />
                  </div>
                }
              {/* {selectedPayment !== "Stripe" &&
                selectedPayment !== "MoreDeals" && <SmallCTA />} */}
            </div>
  )
}

export default Paymentinformation



// "use client"
// import React, { useEffect, useState } from "react"
// import Stripe from "../payment/Stripe";
// import { UserInfo } from "./Stepper";
// import Image from "next/image";
// import Moredeals from "../payment/MoreDeals";


// import {useSession } from "next-auth/react";

// import { useAppSelector } from "@/lib/store/hooks";
// import PaymentFoodSummary from "./PaymentFoodSummary";
// import CheckoutTotalSummary from "./CheckoutTotalSummary";
// import SmallCTA from "../ui/SmallCTA";
// import LoginCTA from "../ui/LoginCTA";

// const PaymentPage = ({userInfo  }:{userInfo:UserInfo}) => {
//   const [selectedPayment, setSelectedPayment] = useState("");
//   const session = useSession();
//     const items = useAppSelector((state) => state.products.items);
//     const offers = useAppSelector((state) => state.products.exclusiveOffers);
//     const stationItem = useAppSelector((state) => state.products.StationItem);

//      const currency_symbol =
//        items && items.length > 0
//          ? items[0].currency_symbol
//          : offers && offers.length > 0
//          ? offers[0].currency_symbol
//          : stationItem && stationItem.length > 0
//          ? stationItem[0].currency_symbol
//           : "";
  
//     const currency_code =
//       items && items.length > 0
//         ? items[0].currency_code
//         : offers && offers.length > 0
//         ? offers[0].currency_code
//         : stationItem && stationItem.length > 0
//         ? stationItem[0].currency_code
//         : "";
  

//   const handlePaymentChange = (paymentId: React.SetStateAction<string>) => {
//     setSelectedPayment(paymentId);
//   };

//   return (
//     <div className="bg-white dark:bg-inherit px-2 mt-2">
//       <div className="mx-auto max-w-6xl justify-center md:flex md:space-x-4">
//         <div className="rounded-xl md:w-[60%] h-full px-1 md:px-4">
//           <div className="max-w-xl">
//             {/* Right Column for Payment Options */}
//             <div className="bg-white dark:bg-zinc-800 p-6 shadow-lg rounded-lg w-full">
//               <h3 className="text-2xl font-semibold mb-4">Payment Options</h3>
//               <div className="space-y-0 flex space-x-8 ">
//                 {/* Stripe Payment Option */}
//                 <div className="group">
//                   <input
//                     type="radio"
//                     name="payment"
//                     id="Stripe1"
//                     className="hidden"
//                     onChange={() => handlePaymentChange("Stripe")}
//                   />
//                   <label
//                     htmlFor="Stripe1"
//                     className={`flex flex-col items-center p-4 w-full shadow-lg rounded-lg cursor-pointer border     ${
//                       selectedPayment === "Stripe"
//                         ? "border-2 bg-green-500 border-green-500 dark:border-green-500 hover:bg-P_text dark:hover:bg-P_text"
//                         : "border-2 bg-white dark:bg-dark-primary border-black dark:border-gray-500 hover:bg-P_text dark:hover:bg-P_text"
//                     }`}
//                   >
//                     <Image
//                       src="/Images/cards.png"
//                       alt="Stripe"
//                       width={500}
//                       height={500}
//                       className="w-24 h-16 object-fit  dark:hidden block"
//                     />
//                     <Image
//                       src="/Images/cards.png"
//                       alt="More Deals"
//                       width={500}
//                       height={500}
//                       className="w-24 h-16 object-cover dark:block hidden"
//                     />
//                   </label>
//                 </div>
//                 {/* More Deals Payment Option */}
//                 <div className="group">
//                   <input
//                     type="radio"
//                     name="payment"
//                     id="Stripe2"
//                     className="hidden"
//                     onChange={() => handlePaymentChange("MoreDeals")}
//                   />
//                   <label
//                     htmlFor="Stripe2"
//                     className={`flex flex-col items-center p-4 w-full shadow-lg rounded-lg cursor-pointer border     ${
//                       selectedPayment === "MoreDeals"
//                         ? "border-2 bg-green-500 border-green-500 dark:border-green-500 hover:bg-P_text dark:hover:bg-P_text"
//                         : "border-2 bg-white dark:bg-dark-primary border-black dark:border-gray-500 hover:bg-P_text dark:hover:bg-P_text"
//                     }`}
//                   >
//                     <Image
//                       src="/Images/moredeals.png"
//                       alt="More Deals"
//                       width={500}
//                       height={500}
//                       className="w-24 h-16 object-cover dark:hidden block"
//                     />
//                     <Image
//                       src="/Images/MembersClubWhite.png"
//                       alt="More Deals"
//                       width={500}
//                       height={500}
//                       className="w-24 h-16 object-cover dark:block hidden"
//                     />
//                   </label>
//                 </div>
//               </div>
//               {/* Conditional Form Rendering */}
//               {selectedPayment === "Stripe" && (
//                 <div className="pt-4 mt-4 border-t">
//                   <h4 className="font-semibold py-3">Stripe Payment Form</h4>
//                   <Stripe
//                     currency_code={currency_code}
//                     currency_symbol={currency_symbol}
//                   />
//                   {/* Add Stripe-specific form elements here */}
//                 </div>
//               )}
//               {selectedPayment === "MoreDeals" &&
//                 !session?.data?.user?.accessToken && (
//                   <div className="p-4 mt-4 border-t">
//                     <LoginCTA/>
//                   </div>
//                 )}
//               {selectedPayment === "MoreDeals" &&
//                 session?.data?.user?.accessToken && (
//                   <div className="pt-4 mt-4 border-t">
//                     <h4 className="font-semibold py-2">Pay via More Deals</h4>
//                     {/* Add More Deals-specific form elements here */}
//                     <Moredeals
//                       currency_code={currency_code}
//                       currency_symbol={currency_symbol}
//                     />
//                   </div>
//                 )}
//               {selectedPayment !== "Stripe" &&
//                 selectedPayment !== "MoreDeals" && <SmallCTA />}
//             </div>
//           </div>
//         </div>
//         <div className="hidden md:block mt-10 h-full rounded-lg border bg-white dark:bg-dark-secondary dark:border-dark-secondary px-4 shadow-md md:mt-1 md:w-1/3 overflow-y-auto">
//           <div className="">
//             <p className="text-lg font-bold ">Order summary</p>
//             <div className="w-full h-full max-h-60 overflow-y-scroll ">
//               <PaymentFoodSummary />
//             </div>

//             {/* total section  */}
//             <CheckoutTotalSummary />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
