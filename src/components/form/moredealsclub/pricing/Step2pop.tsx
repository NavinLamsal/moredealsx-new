"use client";
import PaymentInformation from "@/components/morefood/cart/Paymentinformation";
import { Button } from "@/components/ui/button";

import { AlertOctagonIcon } from "lucide-react";
import React from "react";


interface Step2Props {
    data: any;
    setData: (key: string, value: any) => void;
    purchasingInformation: { [key: string]: string };
    serverError: string;
    onNext: () => void;
    onBack: () => void;
    isLoading: boolean;
}

const Step2PopForm: React.FC<Step2Props> = ({ data, setData, onNext, serverError, onBack, isLoading, purchasingInformation }) => {


    return (
        <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-6">

            <div className="p-4 bg-primary text-primary-foreground rounded-md space-y-3">
                <h2 className="text-lg font-bold text-center mb-4">Confirm Subscription</h2>

                <p className="flex justify-between"><strong className="font-bold">Membership&nbsp;:</strong> {purchasingInformation.membership_name}</p>
                <p className="flex justify-between"><strong className="font-bold">Subscription Time&nbsp;:</strong> {purchasingInformation.plan_time}</p>
                <p className="flex justify-between"><strong className="font-bold">Amount&nbsp;:</strong> {purchasingInformation.currency_symbol}{purchasingInformation.price}</p>
                <p className="flex justify-between"><strong className="font-bold">Validity&nbsp;:</strong> {purchasingInformation.validity_up_to}</p>
            </div>
            {serverError && <p className="flex items-center justify-center w-full text-center text-sm text-red-600 p-2 mb-2 bg-red-200 md:col-span-2 lg:col-span-3">
                <AlertOctagonIcon className="mr-2 h-4 w-4" />&nbsp;{serverError}&nbsp;<AlertOctagonIcon className="ml-2 h-4 w-4 " />
            </p>}

            <PaymentInformation amount={data.amount} currency={"USD"} metadata={{
                "payment_type": "membership",
                "membership_type_id": data.package,
                "package_time": data.plan_time,
                "currency_code": data.currency_code,
                "payer_detail": `{\"user_id\": \"${data.user_id}\", \"email\": \"${data.email}\", \"phone_number\": \"${data.phone_number}\"}`,
                "payment_method": "stripe"
            }}

                confirmation_url={`subscriptions/upgrade/`}



                onfinish={() => onNext()}

            />




            <div className="grid grid-cols-1 gap-2">
                <Button type="button" variant={"outline"} onClick={onBack} >
                    Back
                </Button>
            </div>
        </form>
    );
};

export default Step2PopForm;
