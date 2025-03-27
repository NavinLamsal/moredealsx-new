"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RootState } from "@/lib/redux/store";
import { AlertOctagonIcon } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UpgradeFormDataType } from "./upgradeform";
import { Package } from "@/lib/redux/slice/moreclub/Pricing";


interface Step1Props {
    data: UpgradeFormDataType;
    errors: any;
    serverError: string;
    setData: (key: string, value: any) => void;
    onNext: () => void;
    isLoading: boolean;
}

const Step1Form: React.FC<Step1Props> = ({ data, errors, setData, onNext, serverError, isLoading }) => {

    const packages = useSelector((state: RootState) => state.pricing.packages[data.plan_type][data.plan_time]);

    return (
        <div className="space-y-4">
            {serverError && <p className="flex items-center justify-center w-full text-center text-sm text-red-600 p-2 mb-2 bg-red-200 md:col-span-2 lg:col-span-3">
                <AlertOctagonIcon className="mr-2 h-4 w-4" />&nbsp;{serverError}&nbsp;<AlertOctagonIcon className="ml-2 h-4 w-4 " />
            </p>}
            <div>
                <label className="block text-sm font-medium  mb-1">Package</label>
                <Select name='package' onValueChange={(value) => setData("package", value)} defaultValue={data.package}>

                    <SelectTrigger>
                        <SelectValue placeholder="Select Package" />
                    </SelectTrigger>

                    <SelectContent>
                        {packages.map((pack: Package, index: number) => (
                            <SelectItem value={pack.id}>{pack.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.package && <p className="text-red-500">{errors.package}</p>}
            </div>
            
            <div>
                    <label className="block font-medium mb-1">Gender</label>
                    <RadioGroup defaultValue={data.plan_time} className="grid grid-cols-2 gap-4" onValueChange={(value) => setData("plan_time", value)}>
                        <div>
                            <RadioGroupItem value="yearly" id="yearly" className="peer sr-only" />
                            <label
                                htmlFor="yearly"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:text-primary-foreground"
                            >
                                Yearly
                            </label>
                        </div>
                        <div>
                            <RadioGroupItem
                                value="monthly"
                                id="monthly"                                className="peer sr-only"
                            />
                            <label
                                htmlFor="monthly"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:text-primary-foreground"
                            >
                                Monthly
                            </label>
                        </div>
                    </RadioGroup>
                    {errors.plan_time && <p className="text-red-500 text-sm">{errors.plan_time}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1"> Amount</label>
                <Input
                    type="text"
                    name="Amount"
                    value={data.amount}
                    onChange={(e) => setData("amount", e.target.value)}
                    placeholder="1000"
                    readOnly
                    className={`p-2 border rounded w-full ${errors.amount ? "border-red-500" : ""}`}
                />
                {errors.amount && <p className="text-red-500">{errors.amount}</p>}
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
