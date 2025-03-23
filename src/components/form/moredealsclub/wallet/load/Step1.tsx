"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import usePaymentMethods from "@/lib/action/paymentMethod";
import { AlertOctagonIcon, Loader2 } from "lucide-react";
import Image from "next/image";

import React from "react";


interface Step1Props {
    data: any;
    errors: any;
    setData: (key: string, value: any) => void;
    serverError: string;
    onNext: () => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}

const Step1Form: React.FC<Step1Props> = ({ data, errors, setData, onNext, isLoading, setIsLoading, serverError }) => {
    

    const { data: paymentMethods, isLoading :paymentsLoading, error: paymentMethodsError  } = usePaymentMethods("NP");


   
   

    return (
        <div className="space-y-4">
            {serverError && <p className="flex items-center justify-center w-full text-center text-sm text-red-600 p-2 mb-2 bg-red-200 md:col-span-2 lg:col-span-3">
            <AlertOctagonIcon className="mr-2 h-4 w-4" />&nbsp;{serverError}&nbsp;<AlertOctagonIcon className="ml-2 h-4 w-4 " />
          </p>}
            <div>
                <label className="block text-sm font-medium mb-1">Load Amount</label>
                <Input
                    type="text"
                    name="LoadAmount"
                    value={data.loadAmount}
                    onChange={(e) => setData("loadAmount", e.target.value)}
                    placeholder="1000"
                    className={`p-2 border rounded w-full ${errors.loadAmount ? "border-red-500" : ""}`}
                />
                {errors.loadAmount && <p className="text-red-500">{errors.loadAmount}</p>}
            </div>
            

            <div>
                <label className="block text-sm font-medium  mb-1">Load Method</label>
            {paymentsLoading && 
                <Loader2 className="h-10 w-10 animate-spin"/>
                }
                {paymentMethodsError && 
                <p className="text-destructive">{paymentMethodsError?.message ?? "Oops error getting load Method"} </p>
                }
            <RadioGroup defaultValue={data.selectedMethod} className="grid grid-cols-3 gap-4" onValueChange={(value) =>  setData("selectedMethod", value)}
                    >
                {paymentMethods && paymentMethods.length > 0 && paymentMethods.map((method: any) => (
                      <div>
                        <RadioGroupItem value={method.code} id={method.code} className="peer sr-only" />
                        <label
                          htmlFor={method.code}
                          className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-1.5 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white [&:has([data-state=checked])]:text-white [&:has([data-state=checked])]:bg-primary"
                        >
                          {method?.icon ? 
                        <Image
                          src={method?.icon}
                          alt={method.name}
                          width={150}
                          height={150}
                          className="h-20 w-auto  object-contain"
                        />
                        :
                        <span className="h-20 w-20 flex justify-center items-center font-bold group-active:text-white">
                            {method.name.toUpperCase()}
                        </span>

                    }
                        </label>
                      </div>


                ))}
            </RadioGroup>
            {errors.selectedMethod && <p className="text-red-500">{errors.selectedMethod}</p>}
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
