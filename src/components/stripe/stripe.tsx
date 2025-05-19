import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { metadata } from "@/app/layout";
import Checkout from "./checkout";


if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Stripe = ({ totalAmount , currency, metadata , onfinish ,confirmation_url }: { totalAmount: number , currency:string, metadata: any ,onfinish?: () => void  ,confirmation_url: string}) => {
   

  return (
    <div>
      {totalAmount > 0 && (
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            paymentMethodCreation: "manual",
            amount: totalAmount * 100,
            currency: currency.toLowerCase(),
          }}
        >
          <Checkout totalAmount={totalAmount} metadata={metadata} onFinish={onfinish} confirmation_url={confirmation_url}/>
        </Elements>
      )}
    </div>
  );
};

export default Stripe;
