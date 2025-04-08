"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Step1Form from "./Step1";
import Step2Form from "./Step2";

import { validateRequired } from "@/lib/validation/common";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { showToast } from "@/lib/utilities/toastService";
import { setLoading } from "@/lib/redux/slice/CurrencySlice";
import { useRouter } from "next/navigation";

const PinForgetSetForm: React.FC = () => {
  const { data: session } = useSession();
  const router =useRouter()
  

  const userDetails = session?.user?.userDetails;

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    otp_value: "",
    email: userDetails?.email ?? "",
    phone_number: userDetails?.phone_number ?? "",
    prefix: userDetails?.phone_prefix ?? "",
    via: typeof window !== "undefined" ? sessionStorage.getItem("pin_via") : userDetails?.email ? "email" : "phone_number",
    new_pin: "",
    confirm_new_pin: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sync session data on login
  useEffect(() => {
    if (userDetails) {
      setFormData((prev) => ({
        ...prev,
        email: userDetails.email ?? "",
        phone_number: userDetails.phone_number ?? "",
        prefix: userDetails.phone_prefix ?? "",
        via: userDetails.email ? "email" : "phone_number",
      }));
    }
  }, [userDetails]);

  const setData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateOtpStep = () => {
    const tempErrors: Record<string, string> = {};
    // Check if OTP is required
    tempErrors.otp_value = validateRequired(formData.otp_value, "OTP");
    // Check if OTP length is exactly 6 characters
    if (formData.otp_value && formData.otp_value.length !== 6) {
        tempErrors.otp_value = "OTP must be exactly 6 digits";
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every((e) => !e); // Returns true if no errors
};

  const validatePinStep = () => {
    const tempErrors: Record<string, string> = {};
    tempErrors.new_pin = validateRequired(formData.new_pin, "New PIN");
    tempErrors.confirm_new_pin = validateRequired(formData.confirm_new_pin, "Confirm PIN");
    setErrors(tempErrors);
    return Object.values(tempErrors).every((e) => !e);
  };

  const handlenext = async (nextStep: number) => {
    if (step === 0) {
      if (!validateOtpStep()) return;
          try{
            const res =await  MoreClubApiClient.post('users/transaction/pin/verify/', {
              otp:formData.otp_value
            }) 
            showToast(res.data.message || "OTP verified Successfully")
            setStep(nextStep);
          }catch(err:any){
            showToast(err?.response?.data?.message || err?.response.data.message || "Something went wrong")
            setServerError(err?.response?.data?.message || err?.response.data.message || "Something went wrong")
          } 
    }

    if (step === 1) {
      if (!validatePinStep()) return;

      const payload = {
        otp: formData.otp_value,
        transaction_pin: formData.new_pin,
        confirm_transaction_pin: formData.confirm_new_pin,
      };

      setIsLoading(true);
      try {
        await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}users/transaction/pin/reset/`, payload);
        showToast("PIN changed successfully!", "success");
        // setStep(nextStep);
        sessionStorage.removeItem("pin_via")
        router.push("/dashboard")
      } catch (err: any) {
        const message =
          err?.response?.data?.errors?.non_field_errors?.[0] ||
          err?.response?.data?.message ||
          "Something went wrong, please try again";

        setServerError(message);
        showToast(message, "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const steps = [
    {
      component: Step1Form,
      props: {
        data: formData,
        errors,
        serverError,
        setData,
        onNext: () => handlenext(1),
        setLoading,
        isLoading,
      },
    },
    {
      component: Step2Form,
      props: {
        data: formData,
        errors,
        serverError,
        setData,
        onNext: () => handlenext(2),
        onBack: () => setStep(0),
        isLoading,
      },
    },
  ];

  const CurrentStepComponent = steps[step].component;

  return (
    <div className="grid grid-cols-1">
      <div className="space-y-4 max-w-sm mx-auto">
        <div className="grid grid-cols-1 gap-4">
          <CurrentStepComponent {...(steps[step].props as any)} />
        </div>
      </div>
    </div>
  );
};

export default PinForgetSetForm;

