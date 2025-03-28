"use client";
import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";




const Checkout = ({
  buttonText = "Pay",
  totalAmount,
  metadata
}: {
buttonText?:string
  totalAmount: number;
  metadata: any;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentIntent, setPaymentIntent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // const dispatch = useDispatch();
 


   useEffect(() => {
     const fetchCountryCodeAndPaymentIntent = async () => {
       try {
       
           const response = await fetch("/api/create-payment-intent", {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
               
             },
             body: JSON.stringify({
               totalAmount,
               metadata
             }),
           });

           const data = await response.json();
           setClientSecret(data.data.clientSecret);
           setPaymentIntent(data.data.paymentIntent);
       } catch (error: any) {
         setErrorMessage(`Error fetching client secret: ${error.message}`);
       }
     };

     fetchCountryCodeAndPaymentIntent();
   }, [totalAmount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    
    
    if (!stripe || !elements) {
      setErrorMessage("Stripe or elements not loaded.");
      setLoading(false);
      return;
    }
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error , paymentMethod } = await stripe.createPaymentMethod({
      elements,
    });

    try {
        // api call 

    } catch (error: any) {

      setErrorMessage(error.message || "An unknown error occurred.");
       
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card p-4 rounded-md">
      {clientSecret && <PaymentElement />}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <button
        disabled={!stripe || loading}
        className="text-white w-full py-3 mt-4 bg-black rounded-md font-bold disabled:opacity-50"
      >
        {loading ? "Processing..." : `${buttonText}  ${totalAmount}`}
      </button>
    </form>
  );
};

export default Checkout;
