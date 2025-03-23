"use client";
import PaymentMethods from "@/components/payments/PaymentMethods";
import { Button } from "@/components/ui/button";
import PINInput from "@/components/ui/customInputs/PinInput";
import { AlertOctagonIcon } from "lucide-react";
import React from "react";


interface Step2Props {
    data: any;
    setData: (key: string, value: any) => void;
    serverError: string,
    pinVerification: boolean,
    onNext: () => void;
    onBack: () => void;
    isLoading: boolean;
}

const Step2Form: React.FC<Step2Props> = ({ data, setData, onNext, onBack, isLoading , serverError , pinVerification}) => {

    const handleConfirmPinChange = (newPin: string) => {
        setData("pin", newPin);
    };


    return (
        <>
        <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-6">
            <div className="p-4 bg-primary text-primary-foreground rounded-md">
                <h2 className="text-lg font-bold text-center mb-4">Confirm Transfer</h2>
                <p className="text-center">You are loading {data.loadAmount}.</p>
                {/* <p className="flex justify-between"><strong className="font-bold">Sender&nbsp;:</strong> {data.sender_name}</p>
                <p className="flex justify-between"><strong className="font-bold">Receiver&nbsp;:</strong> {data.recipient}</p> */}
                <p className="flex justify-between"><strong className="font-bold">Amount&nbsp;:</strong> {data.loadAmount}</p>
                <p className="flex justify-between"><strong className="font-bold">Method&nbsp;:</strong> {data.selectedMethod}</p>
                {/* <p className="flex justify-between"><strong className="font-bold">Remark&nbsp;:</strong> {data.remarks}</p> */}
            </div>

            {serverError && <p className="flex items-center justify-center w-full text-center text-sm text-red-600 p-2 mb-2 bg-red-200 md:col-span-2 lg:col-span-3">
            <AlertOctagonIcon className="mr-2 h-4 w-4" />&nbsp;{serverError}&nbsp;<AlertOctagonIcon className="ml-2 h-4 w-4 " />
          </p>}

            <div className="">

            <PINInput length={4} labels="Confirm PIN" initialValue={data.pin} onChange={handleConfirmPinChange}  className="max-w-56 mx-auto"/>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <Button type="button" variant={"outline"} onClick={onBack} >
                    Back
                </Button>
                <Button type="submit"  disabled={isLoading}>
                    {isLoading ? "Processing..." : "Load"}
                </Button>
            </div>
        </form>
        {pinVerification &&
        <PaymentMethods payload={{
            amount: data.loadAmount,
            order_name:"load_balance",
        } }
        method={data.selectedMethod}
        />
        }
        
        </>

        
    );
};

export default Step2Form;
