"use client";


import { Button } from "@/components/ui/button";
import PINInput from "@/components/ui/customInputs/PinInput";
import { getCountryCode } from "@/lib/utils";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

const PaymentForms = ({
  amount,
  formattedData,
  currency_symbol
}: {
  amount: number;
  formattedData: any;
  currency_symbol: string;
  }) => {

    const [pin ,setPin]= useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);


  const handleConfirmPinChange = (newPin: string) => {
    setPin(newPin);
};

  

 
  const handleMoredealsPayment = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    const pinvalue = pin
    const countrycode = await getCountryCode();
    const data ={ ...formattedData, pin: pinvalue }
    try {
        const response = await fetch(`/api/moredeals`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Country-Code": countrycode,
            },
            body: JSON.stringify({ formattedData, country_code: countrycode }),
          });
    
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
        className={`${
          isProcessing
            ? "bg-black text-white cursor-not-allowed "
            : "bg-blue-500 text-white"
        } mt-4 w-full   py-2 rounded-lg`}
      >
        {isProcessing ? "Processing..." : `Pay ${currency_symbol} ${amount}`}
      </button>
    </form>
  );
};

export default PaymentForms;
