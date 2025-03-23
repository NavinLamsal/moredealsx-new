"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";


interface Step1Props {
    data: any;
    errors: any;
    setData: (key: string, value: any) => void;
    onNext: () => void;
    isLoading: boolean;
}

const Step1Form: React.FC<Step1Props> = ({ data, errors, setData, onNext, isLoading }) => {

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1"> Amount</label>
                <Input
                    type="text"
                    name="withdrawAmount"
                    value={data.withdrawAmount}
                    onChange={(e) => setData("withdrawAmount", e.target.value)}
                    placeholder="1000"
                    className={`p-2 border rounded w-full ${errors.withdrawAmount ? "border-red-500" : ""}`}
                />
                {errors.withdrawAmount && <p className="text-red-500">{errors.withdrawAmount}</p>}
            </div>
           

            <div>
                <label className="block text-sm font-medium  mb-1">Method</label>
                <Select name='occupation' onValueChange={(value) => setData("method", value)} defaultValue={data.method}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Method" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Paypal">Paypal</SelectItem>
                        <SelectItem value="Swish">Swish</SelectItem>
                        <SelectItem value="Card">Card</SelectItem>
                    </SelectContent>
                </Select>
                {errors.method && <p className="text-red-500">{errors.method}</p>}
            </div>
           

        
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
