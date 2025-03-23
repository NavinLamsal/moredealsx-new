"use client";
import { Button } from "@/components/ui/button";
import CurrencyInput from "@/components/ui/customInputs/CurrencyInput";
import UsernameInput from "@/components/ui/customInputs/UsernameInput";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertOctagonIcon } from "lucide-react";
import React, { useState } from "react";


interface Step1Props {
    data: any;
    errors: any;
    serverError: string;
    setData: (key: string, value: any) => void;
    onNext: () => void;
    isLoading: boolean;
}

const Step1Form: React.FC<Step1Props> = ({ data, errors, setData, onNext, serverError, isLoading  }) => {
    const [convertedRate, setConvertedRate] = useState<number>(0);
    const [error, setError] = useState<string>("");

    return (
        <div className="space-y-4">
            {serverError && <p className="flex items-center justify-center w-full text-center text-sm text-red-600 p-2 mb-2 bg-red-200 md:col-span-2 lg:col-span-3">
            <AlertOctagonIcon className="mr-2 h-4 w-4" />&nbsp;{serverError}&nbsp;<AlertOctagonIcon className="ml-2 h-4 w-4 " />
          </p>}
            <div>
                <label className="block text-sm font-medium  mb-1">Recipient</label>
                <UsernameInput
                    onChange={(data) => setData("recipient", data.value)}
                    initialValue={data.recipient}
                />
                {errors.recipient && <p className="text-red-500">{errors.recipient}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Transfer Amount</label>
                {/* <CurrencyInput
                    amount={data.transferAmount}
                    setAmount={(value) => {console.log("amount",value);  setData("transferAmount", value)}}
                    convertedRate={convertedRate}
                    setConvertedRate={setConvertedRate}
                    error={error}
                    setError={setError}
                /> */}
                 <Input
                                    type="text"
                                    name="transferAmount"
                                    value={data.transferAmount}
                                    onChange={(e) => setData("transferAmount", e.target.value)}
                                    placeholder="1000"
                                    className={`p-2 border rounded w-full ${errors.transferAmount ? "border-red-500" : ""}`}
                                />
                {errors.transferAmount && <p className="text-red-500">{errors.transferAmount}</p>}
            </div>


            <div>
                <label className="block text-sm font-medium  mb-1">Purpose</label>
                <Select name='occupation' onValueChange={(value) => setData("purpose", value)} defaultValue={data.purpose}>

                    <SelectTrigger>
                        <SelectValue placeholder="Select Purpose" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="Bill Sharing">Bill Sharing</SelectItem>
                        <SelectItem value="Family Expenses">Family Expenses</SelectItem>
                        <SelectItem value="Lend/Borrow">Lend/Borrow</SelectItem>
                        <SelectItem value="Personal Use">Personal Use</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                </Select>
                {errors.purpose && <p className="text-red-500">{errors.purpose}</p>}





            </div>
            {data.purpose === "Others" && (
            <div>
                <label className="block text-sm font-medium  mb-1">Remark</label>
                <Input
                    type="text"
                    value={data.remarks}
                    onChange={(e) => setData("remarks", e.target.value)}
                    className="w-full p-2  border border-gray-300 rounded-md"
                    placeholder="Enter your remark"
                />
                {errors.remarks && <p className="text-red-500">{errors.remarks}</p>}


            </div>
            )}


            <Button
                type="button"
                onClick={onNext}
                className="w-full"

                disabled={isLoading}
            >
                {isLoading ? "Processing..." : "Next"}
            </Button>
        </div>
    );
};

export default Step1Form;
