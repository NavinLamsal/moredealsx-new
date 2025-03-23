"use client";
import React, { useState } from "react";
import Step1Form from "./Step1";
import Step2Form from "./Step2";
import Step3Form from "./Step3";
import { validateRequired } from "@/lib/validation/common";


const WithDrawForm: React.FC = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<any>({
        withdrawAmount: "",
        pin: "",
        method: "",
        remarks: "",
        transaction_date: new Date().toISOString(),
        sender_name: "John Doe",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const isLoading = false; // Example loading state

    const setData = (key: string, value: any) => {
      
        setFormData((prev: any) => ({ ...prev, [key]: value }));
        setErrors((prev: any) => ({ ...prev, [key]: "" }));
    };

    const validateUsername = (value: string) =>{
        let error = "";
        error = validateRequired(value, "method");
        if(error === ""){
            try{
                error = "";
                // adjajka
            }catch{
                error = "";
                // aklla 
            }
        }
        return error
    }




    const validate = async (fieldValues = formData) => {
        const tempErrors: Record<string, string> = { ...errors };
       
        if ("withdrawAmount" in fieldValues) {
            tempErrors.withdrawAmount = validateRequired(fieldValues.withdrawAmount || "", "Amount");
        }
        if ("method" in fieldValues) {
            tempErrors.method = validateRequired(fieldValues.method || "", "Withdrawal Method"); 
        }

        setErrors(tempErrors);
        return Object.values(tempErrors).every((error) => !error);
    };

    const validatePin = async (fieldValues = formData) => {
        const tempErrors: Record<string, string> = { ...errors };
        if ("pin" in fieldValues) {
            tempErrors.pin = validateRequired(fieldValues.pin || "", "Pin");
        }
        setErrors(tempErrors);
        return Object.values(tempErrors).every((error) => !error);
    };



    const handlenext = async(nextStep: number) => {
        if (step === 0) {
            const isValid = await validate();
            if (isValid) {
                // try api call here 
                setStep(nextStep);
            }
        } else if(step === 1){
            const isValid = await validatePin();
            if (isValid) {
                // try api call here 
                setStep(nextStep);
            }
        }else{
            // setStep(nextStep);
        }

    };

    const steps = [
        {
            component: Step1Form,
            props: {
                data: formData,
                errors: errors,
                setData,
                onNext: () => handlenext(1),
                isLoading,
            },
        },
        {
            component: Step2Form,
            props: {
                data: formData,
                errors: errors,
                setData,
                onNext: () => handlenext(2),
                onBack: () => setStep(0), // ✅ Ensure onBack is defined
                isLoading,
            },
        },
        {
            component: Step3Form,
            props: {
                data: formData,
                onPrint: () => window.print(),
                onReset: () => setStep(0),
            },
        },
    ];

    const CurrentStepComponent = steps[step].component;

    return (
        <div className="grid grid-cols-1 gap-4">
            <CurrentStepComponent {...(steps[step].props as any)} />
        </div>
    );
};

export default WithDrawForm;
