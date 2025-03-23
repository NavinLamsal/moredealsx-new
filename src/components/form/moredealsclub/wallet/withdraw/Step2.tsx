"use client";
import { Button } from "@/components/ui/button";
import PINInput from "@/components/ui/customInputs/PinInput";
import React from "react";


interface Step2Props {
    data: any;
    setData: (key: string, value: any) => void;
    onNext: () => void;
    onBack: () => void;
    isLoading: boolean;
}

const Step2Form: React.FC<Step2Props> = ({ data, setData, onNext, onBack, isLoading }) => {

    const handleConfirmPinChange = (newPin: string) => {
        setData("pin", newPin);
    };


    return (
        <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-6">
            <div className="p-4 bg-primary text-primary-foreground rounded-md">
                <h2 className="text-lg font-bold text-center mb-4">Confirm Withdrawal</h2>
                <p className="text-center">You are sending {data.withdrawAmount} to {data.recipient}.</p>
                <p className="flex justify-between"><strong className="font-bold">Amount&nbsp;:</strong> {data.withdrawAmount}</p>
                <p className="flex justify-between"><strong className="font-bold">Method&nbsp;:</strong> {data.method}</p>
            </div>

            <div className="place-content-center">

            <PINInput length={4} labels="Confirm PIN" initialValue={data.pin} onChange={handleConfirmPinChange} />
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
