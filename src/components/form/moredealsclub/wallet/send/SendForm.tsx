"use client";
import React, { useState } from "react";
import Step1Form from "./Step1";
import Step2Form from "./Step2";
import Step3Form from "./Step3";
import { validateRequired } from "@/lib/validation/common";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { showToast } from "@/lib/utilities/toastService";
import { setLoading } from "@/lib/redux/slice/CurrencySlice";


const TransferForm: React.FC = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<any>({
        transferAmount: "",
        recipient: "",
        pin: "",
        purpose: "",
        remarks: "",
        transaction_date: new Date().toISOString(),
        sender_name: "John Doe",
    });
    const [sendingInformation , setSendingInformation]= useState<{ [key: string]: string }>({});

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [serverError, setServerError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
   

    const setData = (key: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [key]: value }));
        setErrors((prev: any) => ({ ...prev, [key]: "" }));
    };

    const validateUsername = (value: string) => {
        let error = "";
        error = validateRequired(value, "Recipient");
        if (error === "") {
            try {
                error = "";
                // adjajka
            } catch {
                error = "";
                // aklla 
            }
        }
        return error
    }




    const validate = async (fieldValues = formData) => {
        const tempErrors: Record<string, string> = { ...errors };

        if ("transferAmount" in fieldValues) {
            tempErrors.transferAmount = validateRequired(fieldValues.transferAmount || "", "Amount");
        }

        if ("recipient" in fieldValues) {
            tempErrors.recipient = await validateUsername(fieldValues.recipient || "");
        }

        if ("purpose" in fieldValues) {
            tempErrors.purpose = validateRequired(fieldValues.purpose || "", "Purpose"); 
        }

        if ("remarks" in fieldValues) {
            if(formData.purpose === "Others"){
                tempErrors.remarks = validateRequired(fieldValues.remarks || "", "Remarks");
            }else{
                
                tempErrors.remarks = "";
            }
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



    const handlenext = async (nextStep: number) => {
        if (step === 0) {
            const isValid = await validate();
            if (isValid) {
                setServerError("");
                const data = {
                    "balance": formData.transferAmount,
                    "username": formData.recipient,
                }
                
                try {
                    setIsLoading(true);
                    const res = await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}wallets/validate/user/wallet/`, data);
                    setSendingInformation(res.data.data);
                    setStep(nextStep);
                } catch (err: any) {
                    if(err.response.data.errors && !err.response.data.errors.non_field_errors){
                        const username = err.response.data.errors.username;
                        const transferAmount = err.response.data.errors.balance;
                        setErrors({
                            ...errors,
                            recipient: username,
                            transferAmount: transferAmount
                        })
                    }
                    
                    setServerError(err?.response?.data?.errors.non_field_errors[0] || err?.response?.data?.message || "Something went wrong, please try again");
                }finally{
                    setIsLoading(false);
                }
            }
        }

        if (step === 1) {
            const isValid = await validatePin();
            if (isValid) {
                setServerError("");
                const data = {
                    "balance": formData.transferAmount,
                    "username": formData.recipient,
                    "remarks": formData.purpose === "Others" ? formData.remarks : formData.purpose,
                    "pin": formData.pin
                }

                try {
                    setIsLoading(true);
                    const res = await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}wallets/send/balance/`, data)
                    showToast("Transfer successful!", "success") ;
                    setSendingInformation(res.data.data);
                    setStep(nextStep);
                } catch (err: any) {
                    if(err.response.data.errors && !err.response.data.errors.non_field_errors){
                        const username = err.response.data.errors.username;
                        const transferAmount = err.response.data.errors.balance;
                        setErrors({
                            ...errors,
                            recipient: username,
                            transferAmount: transferAmount,
                            pin: err.response.data.errors.pin
                        })
                    }
                    
                    setServerError(err?.response?.data?.errors.non_field_errors[0] || err?.response?.data?.message || "Something went wrong, please try again");
                    showToast(err?.response?.data?.errors.non_field_errors[0] || err?.response?.data?.message || "Something went wrong, please try again", "error") ;
                }finally{
                    setIsLoading(false);
                }
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
                setLoading,
                isLoading,
            },
        },
        {
            component: Step2Form,
            props: {
                sendingInformation: sendingInformation,
                data: formData,
                errors: errors,
                serverError: serverError,
                setData,
                onNext: () => handlenext(2),
                onBack: () => setStep(0), // ✅ Ensure onBack is defined
                isLoading,
            },
        },
        {
            component: Step3Form,
            props: {
                sendingInformation: sendingInformation,
                data: formData,
                onPrint: () => window.print(),
                onReset: () => setStep(0),
            },
        },
    ];

    const CurrentStepComponent = steps[step].component;

    return (
        <div className={`grid grid-cols-1 ${step === 2 ? "xl:grid-cols-1" : " xl:grid-cols-2"}`}>

            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    <CurrentStepComponent {...(steps[step].props as any)} />
                </div>
            </div>

            <div className={`${step === 2 ? "hidden" : "block xl:ml-2 "}`}>
                <div className=" xl:mt-0 mt-6 p-4 xl:pt-0 rounded-md text-sm">
                    <p className="font-semibold">Terms of Use</p>
                    <ol className="list-decimal list-outside text-muted-foreground pl-4">
                        <li>Users are prohibited from using Send Money for illegal transactions.</li>
                        <li>MoreDeals Club is not liable if the receiver defaults on their promise to repay or deliver goods/services.</li>
                    </ol>
                </div>
                <div className="mt-4 bg-yellow-50 p-4 rounded-md text-sm">
                    <p className="font-semibold text-black">Stay Alert!</p>
                    <ol className="list-decimal list-outside pl-4 text-gray-600">
                        <li>Send money to trusted contacts only.</li>
                        <li>Verify requests received on social media before sending money.</li>
                        <li>Always double-check the receiver’s MoreDeals Club ID.</li>
                    </ol>
                </div>
            </div>
        </div>

    );
};

export default TransferForm;
