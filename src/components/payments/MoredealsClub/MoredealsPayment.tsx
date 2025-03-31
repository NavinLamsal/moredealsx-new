"use client";


import { Button } from "@/components/ui/button";
import PINInput from "@/components/ui/customInputs/PinInput";
import MoreFoodApiClient from "@/lib/axios/morefood/MoreFoodApiClient";
import { FoodOrderTypes } from "@/lib/type/morefood/restaurant";
import { showToast } from "@/lib/utilities/toastService";
import { getCountryCode } from "@/lib/utils";
import Link from "next/link";
import { FormEvent, useState } from "react";

const MoredealsPayment = ({
  amount,
  formattedOrderType,
  currency_symbol
}: {
  amount: number;
  formattedOrderType: Partial<FoodOrderTypes>;
  currency_symbol: string;
}) => {

  const [pin, setPin] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);


  const handleConfirmPinChange = (newPin: string) => {
    setPin(newPin);
  };


  const handleMoredealsPayment = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    const data = { ...formattedOrderType, pin: pin, payment_method: "moredeals" };
    try {
      const response = await MoreFoodApiClient.post(`orders/create/`, data)
      showToast("order placed", "success")
      window.location.replace(`/morefood/checkout/success/`)

    } catch (error: any) {
      setErrorMessage(error.message || "An unknown error occurred.");

    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form
      className=" p-4 rounded-lg "
      onSubmit={handleMoredealsPayment}
    >
      {/* <h2 className="text-2xl font-bold mb-4 text-center ">Enter PIN</h2> */}
      <PINInput length={4} labels="Confirm PIN" initialValue={pin} onChange={handleConfirmPinChange} className="max-w-56 mx-auto" />

      {errorMessage && (
        <p className="text-red-600 my-4 text-center">{errorMessage}</p>
      )}
      {errorMessage === "Insufficient Funds" && (
        <Link href="https://www.moredealsclub.com/wallet" target="_blank" className="w-full flex justify-center">

          <Button variant={"destructive"} type="button" className="place-self-center">

            Load Funds
          </Button>
        </Link>
      )}
      <button
        type="submit"
        className={`${isProcessing
            ? "bg-black text-white cursor-not-allowed "
            : "bg-blue-500 text-white"
          } mt-4 w-full   py-2 rounded-lg`}
      >
        {isProcessing ? "Processing..." : `Pay ${currency_symbol} ${amount}`}
      </button>
    </form>
  );
};

export default MoredealsPayment;

