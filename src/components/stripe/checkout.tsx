"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";




const Checkout = ({
  buttonText = "Pay",
  totalAmount,
  metadata,
  confirmation_url,
  onFinish
}: {
buttonText?:string
  totalAmount: number;
  metadata: any;
  confirmation_url: string;
  onFinish?: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentIntent, setPaymentIntent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // const dispatch = useDispatch();
 
 

  const fetchCountryCodeAndPaymentIntent = useCallback(async () => {
    console.log("metadata", metadata);

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ metadata }),
      });
  
      const data = await response.json();
      setClientSecret(data.data.clientSecret);
      setPaymentIntent(data.data.paymentIntent);
    } catch (error: any) {
      setErrorMessage(`Error fetching client secret: ${error.message}`);
    }
  }, [metadata]); 
  

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchCountryCodeAndPaymentIntent();
    }
  }, [fetchCountryCodeAndPaymentIntent]);

  // useEffect(() => {
  //   fetchCountryCodeAndPaymentIntent();
  // }, [fetchCountryCodeAndPaymentIntent]);

  

  const handlePaymentSubmit = async (event: React.FormEvent<HTMLElement>) => {
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
        const payload = {
          payment_method_id: paymentMethod?.id,
          payment_intent_id: paymentIntent,
          ...metadata
          // membership_type: metadata?.membership_type_id,
          // plan_time: metadata?.package_time,
        }
        const res = await MoreClubApiClient.post(`${confirmation_url}`, {
          ...payload         
          
        });
       
        onFinish?.();

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
    // <form onSubmit={handlePaymentSubmit} className="bg-card p-4 rounded-md">
    <div>
      {clientSecret && <PaymentElement />}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <button
        disabled={!stripe || loading}
        onClick={handlePaymentSubmit}
        className=" w-full py-3 mt-4 bg-primary text-primary-foreground rounded-md font-bold disabled:opacity-50"
      >
        {loading ? "Processing..." : `${buttonText}  ${totalAmount}`}
      </button>
    </div>
  );
};

export default Checkout;
