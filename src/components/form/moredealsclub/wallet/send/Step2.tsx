"use client";
import { Button } from "@/components/ui/button";
import PINInput from "@/components/ui/customInputs/PinInput";
import { AlertOctagonIcon } from "lucide-react";
import React from "react";


interface Step2Props {
    data: any;
    setData: (key: string, value: any) => void;
    sendingInformation: { [key: string]: string };
    serverError: string;
    onNext: () => void;
    onBack: () => void;
    isLoading: boolean;
}

const Step2Form: React.FC<Step2Props> = ({ data, setData, onNext, serverError, onBack, isLoading , sendingInformation }) => {

    const handleConfirmPinChange = (newPin: string) => {
        setData("pin", newPin);
    };


    return (
        <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-6">
            
            <div className="p-4 bg-primary text-primary-foreground rounded-md space-y-3">
                <h2 className="text-lg font-bold text-center mb-4">Confirm Transfer</h2>
                <p className="text-center bg-card text-card-foreground p-5 rounded-md mb-2">You are sending <br/><strong>{sendingInformation.sender_currency_symbol}</strong>  <span className="font-bold text-2xl">{sendingInformation.send_amount}</span><br/> to {sendingInformation.receiver_name}.</p>
                <p className="flex justify-between"><strong className="font-bold">Sender&nbsp;:</strong> {sendingInformation.sender_name}</p>
                <p className="flex justify-between"><strong className="font-bold">Receiver&nbsp;:</strong> {sendingInformation.receiver_name}</p>
                <p className="flex justify-between"><strong className="font-bold">Sending Amount&nbsp;:</strong> {sendingInformation.sender_currency_symbol}{sendingInformation.send_amount}</p>
                <p className="flex justify-between"><strong className="font-bold">Receiving Amount&nbsp;:</strong> {sendingInformation.sender_currency_symbol}{sendingInformation.receive_amount}</p>
                <p className="flex justify-between"><strong className="font-bold">Purpose&nbsp;:</strong> {data.purpose}</p>
                {data.purpose === "Others" && <p className="flex justify-between"><strong className="font-bold">Remark&nbsp;:</strong> {data.remarks}</p>}
                
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
                    {isLoading ? "Processing..." : "Confirm"}
                </Button>
            </div>
        </form>
    );
};

export default Step2Form;
