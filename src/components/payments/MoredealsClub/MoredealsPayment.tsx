"use client";


import { Button } from "@/components/ui/button";
import PINInput from "@/components/ui/customInputs/PinInput";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { FoodOrderTypes } from "@/lib/type/morefood/restaurant";
import { showToast } from "@/lib/utilities/toastService";
import { AlertOctagonIcon } from "lucide-react";
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
      setErrorMessage("")
      const response = await MoreClubApiClient.post(`orders/create/`, data)
      showToast("order placed", "success")
      window.location.replace(`/morefood/checkout/success/`)

    } catch (error: any) {
      setErrorMessage(error?.response?.data?.errors?.non_field_errors || error.message || "An unknown error occurred.");

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

      {errorMessage && <p className="flex items-center justify-center w-full text-center text-sm text-red-600 p-2 my-2 bg-red-200 md:col-span-2 lg:col-span-3 rounded-md">
            <AlertOctagonIcon className="mr-2 h-4 w-4" />&nbsp;{errorMessage}&nbsp;<AlertOctagonIcon className="ml-2 h-4 w-4 " />
          </p>}

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

