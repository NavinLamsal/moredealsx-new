
import React from 'react'

import Stripe from '../stripe/stripe';


type Props = {
    amount: number;
    currency: string;
    metadata?: Record<string, any>;
    selectedPayment: string
    confirmation_url: string
    onfinish?: () => void
};

const PaymenSelections = ({ amount, currency, metadata, selectedPayment ,confirmation_url, onfinish }: Props) => {

    return (
        <>
            {selectedPayment === "Stripe" && (
                <div className="pt-4 mt-4 border-t">
                    <h4 className="font-semibold py-3">Stripe Payment Form</h4>
                    <Stripe
                    totalAmount={amount}
                    currency={currency}
                    metadata={metadata}
                    confirmation_url={confirmation_url}
                    onfinish={onfinish}
                  />
                </div>
            )}
            
           

        </>
    )
}

export default PaymenSelections