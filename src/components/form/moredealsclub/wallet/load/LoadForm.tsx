"use client";
import React, { useState } from "react";
import Step1Form from "./Step1";
import Step2Form from "./Step2";
import Step3Form from "./Step3";
import { validateRequired } from "@/lib/validation/common";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";


const LoadForm: React.FC = () => {
    const [step, setStep] = useState(0);
    
    const [formData, setFormData] = useState<any>({
        loadAmount: "",
        selectedMethod: "",
        recipient: "",
        pin: "",
        purpose: "",
        remarks: "",
        transaction_date: new Date().toISOString(),
        sender_name: "John Doe",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [pinVerification, setPinVerification] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string>("");
    const [loadingInformation , setloadingInformation]= useState<{ [key: string]: string }>({});

    const setData = (key: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [key]: value }));
        setErrors((prev: any) => ({ ...prev, [key]: "" }));
    };

  




    const validate = async (fieldValues = formData) => {
        const tempErrors: Record<string, string> = { ...errors };

        if ("loadAmount" in fieldValues) {
            tempErrors.loadAmount = validateRequired(fieldValues.loadAmount || "", "Amount");
        }

        if ("selectedMethod" in fieldValues) {
            tempErrors.selectedMethod = validateRequired(fieldValues.selectedMethod || "", "Method Selection"); 
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
                setServerError("");
                const data = {
                    "balance": formData.loadAmount,
                    "selectedMethod": formData.selectedMethod,
                }

                // try {
                //     const res = await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}wallets/validate/user/wallet/`, data);
                //     setloadingInformation(res.data.data);
                //     setStep(nextStep);
                // } catch (err: any) {
                //     if(err.response.data.errors && !err.response.data.errors.non_field_errors){
                //         const username = err.response.data.errors.username;
                //         const transferAmount = err.response.data.errors.balance;
                //         setErrors({
                //             ...errors,
                //             recipient: username,
                //             transferAmount: transferAmount
                //         })
                //     }
                    
                //     setServerError(err?.response?.data?.errors.non_field_errors[0] || err?.response?.data?.message || "Something went wrong, please try again");
                // }
                setStep(nextStep);
            }
                }

        if(step === 1){
            const isValid = await validatePin();
            if (isValid) {
                // try api call here 
                setPinVerification(true);
                // try{
                //     const res = await handlePayment(formData.selectedMethod, formData);
                // }catch(err:any){
                //     setServerError(err?.response?.data?.errors.non_field_errors[0] || err?.response?.data?.message || "Something went wrong, please try again");
                // }
                // setStep(nextStep);
            }
        }

    };

    const steps = [
        {
            component: Step1Form,
            props: {
                data: formData,
                errors: errors,
                serverError: serverError,
                setData,
                onNext: () => handlenext(1),
                setIsLoading,
                isLoading,
            },
        },
        {
            component: Step2Form,
            props: {
                data: formData,
                errors: errors,
                serverError: serverError,
                pinVerification,
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

export default LoadForm;



export const handlePayment = async (method:string , payload:any) => {
        
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}payments/initiate/`;
        const data = {...payload , 
            gateway:method,
            website_url:"http://localhost:3000",
            return_url:`${window.location.origin}/wallet/load/success`
        };
    
        try {
          const response = await MoreClubApiClient.post(url, data);
    
          if (response.status === 200) {
            const responseData = response.data.data;
            if (data.gateway === "paypal") {
                PaypalCall(responseData);
            }else if(data.gateway === "khalti"){
                khaltiCall(responseData.payment_url);
            }
          } else {
            console.error("Failed to fetch:", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Error during fetch:", error);
        }
      };

      const PaypalCall = (data: any) => {``
        window.location.href = data;
      };


      const khaltiCall = (data: any) => {
        window.location.href = data
      };
