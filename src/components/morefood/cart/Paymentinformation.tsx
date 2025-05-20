import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import PaymentSections from "./PaymentSections"; // Component that handles actual payment process UI
import PaymenSelections from "@/components/payments/PaymentSelection";

type Props = {
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
  confirmation_url: string
  onfinish?: () => void
};

const paymentOptions = [
  {
    id: "Stripe",
    label: "Stripe",
    lightIcon: "/images/png/stripePrimary.png",
    darkIcon: "/images/png/stripeWhite.png",
    isTextOnly: false,
  },
  // {
  //   id: "MoreDeals",
  //   label: "More Deals",
  //   lightIcon: "/images/png/moredeals.png",
  //   darkIcon: "/images/png/MembersClubWhite.png",
  //   isTextOnly: false,
  // },
  // {
  //   id: "COD",
  //   label: "Cash on Delivery",
  //   isTextOnly: true,
  // },
];

const PaymentInformation = ({ amount, currency, metadata , onfinish , confirmation_url}: Props) => {
  
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  const handlePaymentChange = (paymentId: string) => {
    setSelectedPayment(paymentId);
    // If needed, trigger analytics, update local state, etc.
  };

  return (
    <div className="p-6 rounded-lg w-full">
      <h3 className="text-2xl font-semibold mb-4 flex justify-between">
        Payment Options
      </h3>

      <div className="flex flex-wrap gap-4">
        {paymentOptions.map((option) => (
          <div className="group" key={option.id}>
            <input
              type="radio"
              name="payment"
              id={option.id}
              className="hidden"
              onChange={() => handlePaymentChange(option.id)}
              checked={selectedPayment === option.id}
            />
            <label
              htmlFor={option.id}
              className={`flex flex-col items-center p-4 w-36 h-24 justify-center shadow-lg rounded-lg cursor-pointer border transition-all
                ${
                  selectedPayment === option.id
                    ? "border-2 bg-morefoodPrimary border-morefoodPrimary text-white hover:bg-red-400 hover:border-red-400"
                    : "border-2 bg-transparent border-foreground hover:bg-morefoodPrimary hover:text-morefoodPrimary-foreground"
                }`}
            >
              {option.isTextOnly ? (
                <p
                  className={`text-center font-semibold ${
                    selectedPayment === option.id
                      ? "text-white"
                      : "text-foreground"
                  }`}
                >
                  {option.label}
                </p>
              ) : (
                <>
                  <Image
                    src={option.lightIcon || ""}
                    alt={option.label}
                    width={500}
                    height={500}
                    className="w-24 h-16 object-contain dark:hidden block"
                  />
                  <Image
                    src={option.darkIcon || ""}
                    alt={option.label}
                    width={500}
                    height={500}
                    className="w-24 h-16 object-contain dark:block hidden"
                  />
                </>
              )}
            </label>
          </div>
        ))}
      </div>

      {/* Payment-specific form/processor */}
      {selectedPayment && (
        <PaymenSelections
          selectedPayment={selectedPayment}
          amount={amount}
          currency={currency}
          metadata={metadata}
          confirmation_url={confirmation_url}
          onfinish={onfinish}
        />
      )}
    </div>
  );
};

export default PaymentInformation;
