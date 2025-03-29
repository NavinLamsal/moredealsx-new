import MoreFoodApiClient from '@/lib/axios/morefood/MoreFoodApiClient';
import { FoodOrderTypes } from '@/lib/type/morefood/restaurant'
import { showToast } from '@/lib/utilities/toastService';
import { getCountryCode } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

const CashOnDelivery = ({ formattedOrderType, currency_symbol, amount }: { formattedOrderType: Partial<FoodOrderTypes>, currency_symbol: string, amount: number }) => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);


    const handleCodPayment = async (e: FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        const data = { ...formattedOrderType, payment_method: "cod" };
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
            onSubmit={handleCodPayment}
        >

            {errorMessage && (
                <p className="text-red-600 my-4 text-center">{errorMessage}</p>
            )}
            <div className="xl:mt-0 mt-6 p-4 xl:pt-0 rounded-md text-base">
                <p className="font-semibold">Cash on Delivery (COD) – Hassle-Free & Secure!</p>
                <ol className="list-decimal list-outside text-muted-foreground pl-4">
                    <li>Pay only when you receive your order – no advance payment required.</li>
                    <li>Keep the exact amount ready to ensure a smooth handover.</li>
                    <li>Delivery agents cannot provide change, so please prepare accordingly.</li>
                    <li>Make sure someone is available to receive and pay for the order at the delivery address.</li>
                    <li>Frequent order cancellations or refusals may limit COD eligibility in the future.</li>
                </ol>
            </div>
            <div className="mt-4 bg-yellow-50 p-4 rounded-md text-base">
                <p className="font-semibold text-black">Stay Prepared!</p>
                <ol className="list-decimal list-outside pl-4 text-gray-600">
                    <li>Ensure cash payment is ready upon delivery.</li>
                    <li>Confirm your order details before proceeding.</li>
                    <li>For any issues, contact customer support immediately.</li>
                </ol>
            </div>


            <button
                type="submit"
                className={`${isProcessing
                        ? "bg-black text-white cursor-not-allowed "
                        : "bg-blue-500 text-white"
                    } mt-4 w-full   py-2 rounded-lg`}
            >
                {isProcessing ? "Processing..." : `Confirm order`}
            </button>
        </form>
    );

}

export default CashOnDelivery
