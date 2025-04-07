// "use client";
// import React, { useEffect, useState } from "react";

// import { validateRequired } from "@/lib/validation/common";
// import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
// import { showToast } from "@/lib/utilities/toastService";
// import { setLoading } from "@/lib/redux/slice/CurrencySlice";
// import Step1Form from "./Step1";
// import Step2Form from "./Step2";
// import { useSession } from "next-auth/react";


// const PinForgetSetForm: React.FC = () => {
//     const { data: session } = useSession();

//     const [step, setStep] = useState(0);
//     const [formData, setFormData] = useState<any>({
//         otp_value: "",
//         email: session?.user?.userDetails?.email ?? "",
//         phone_number: session?.user?.userDetails?.phone_number ?? "",
//         prefix: session?.user?.userDetails?.phone_prefix ?? "",
//         via: session?.user?.userDetails?.email ? "email" : "phone_number",
//         new_pin: "",
//         confirm_new_pin: "",
//     });


//     const [errors, setErrors] = useState<{ [key: string]: string }>({});
//     const [serverError, setServerError] = useState<string>("");
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         if (session) {
//             setFormData({
//                 ...formData, email: session?.user?.userDetails?.email ?? "",
//                 phone_number: session?.user?.userDetails?.phone_number ?? "",
//                 prefix: session?.user?.userDetails?.phone_prefix ?? "",
//                 via: session?.user?.userDetails?.email ? "email" : "phone_number",
//             })
//         }

//     }, [session])


//     const setData = (key: string, value: any) => {
//         setFormData((prev: any) => ({ ...prev, [key]: value }));
//         setErrors((prev: any) => ({ ...prev, [key]: "" }));
//     };

//     const validateUsername = (value: string) => {
//         let error = "";
//         error = validateRequired(value, "Recipient");
//         if (error === "") {
//             try {
//                 error = "";
//                 // adjajka
//             } catch {
//                 error = "";
//                 // aklla 
//             }
//         }
//         return error
//     }




//     const validate = async (fieldValues = formData) => {
//         const tempErrors: Record<string, string> = { ...errors };

//         if ("otp_value" in fieldValues) {
//             tempErrors.opt_value = validateRequired(fieldValues.opt_value || "", "OTP");
//         }
//         console.log("error", tempErrors)
//         setErrors(tempErrors);
//         return Object.values(tempErrors).every((error) => !error);
//     };

//     const validatePin = async (fieldValues = formData) => {
//         const tempErrors: Record<string, string> = { ...errors };
//         if ("pin" in fieldValues) {
//             tempErrors.pin = validateRequired(fieldValues.pin || "", "Pin");
//         }
//         if ("new_pin" in fieldValues) {
//             tempErrors.recipient = await validateUsername(fieldValues.recipient || "");
//         }

//         setErrors(tempErrors);
//         return Object.values(tempErrors).every((error) => !error);
//     };



//     const handlenext = async (nextStep: number) => {
//         if (step === 0) {
//             const isValid = await validate();
//             if (isValid) {
//                 // setServerError("");
//                 // const data = {
//                 //     "balance": formData.transferAmount,
//                 //     "username": formData.recipient,
//                 // }
//                 // try {
//                 //     const res = await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}wallets/validate/user/wallet/`, data);
//                 //     setStep(nextStep);
//                 // } catch (err: any) {
//                 //     if (err.response.data.errors && !err.response.data.errors.non_field_errors) {
//                 //         const username = err.response.data.errors.username;
//                 //         const transferAmount = err.response.data.errors.balance;
//                 //         setErrors({
//                 //             ...errors,
//                 //             recipient: username,
//                 //             transferAmount: transferAmount
//                 //         })
//                 //     }

//                 //     setServerError(err?.response?.data?.errors.non_field_errors[0] || err?.response?.data?.message || "Something went wrong, please try again");
//                 // }
//                 setStep(nextStep)
//             }
//         }

//         if (step === 1) {
//             const isValid = await validatePin();
//             if (isValid) {
//                 setServerError("");
//                 const data = {
//                     "otp_value": formData.otp_value,
//                     "newPin": formData.new_pin,
//                     "confirmPin": formData.confirm_new_pin,
//                 }

//                 try {
//                     const res = await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}forgetpin/`, data)
//                     showToast("change Successfully!", "success");

//                     setStep(nextStep);
//                 } catch (err: any) {
                    

//                     setServerError(err?.response?.data?.errors.non_field_errors[0] || err?.response?.data?.message || "Something went wrong, please try again");
//                     showToast(err?.response?.data?.errors.non_field_errors[0] || err?.response?.data?.message || "Something went wrong, please try again", "error");
//                 }
//             }
//         }

//     };

//     const steps = [
//         {
//             component: Step1Form,
//             props: {
//                 data: formData,
//                 errors: errors,
//                 serverError: serverError,
//                 setData,
//                 onNext: () => handlenext(1),
//                 setLoading,
//                 isLoading,
//             },
//         },
//         {
//             component: Step2Form,
//             props: {
//                 data: formData,
//                 errors: errors,
//                 serverError: serverError,
//                 setData,
//                 onNext: () => handlenext(2),
//                 onBack: () => setStep(0), // ✅ Ensure onBack is defined
//                 isLoading,
//             },
//         },
//     ];

//     const CurrentStepComponent = steps[step].component;

//     return (
//         <div className={`grid grid-cols-1`}>

//             <div className="space-y-4 max-w-sm mx-auto">
//                 <div className="grid grid-cols-1 gap-4">
//                     <CurrentStepComponent {...(steps[step].props as any)} />
//                 </div>
//             </div>

//             {/* <div className={`${step === 2 ? "hidden" : "block xl:ml-2 "}`}>
//                 <div className=" xl:mt-0 mt-6 p-4 xl:pt-0 rounded-md text-sm">
//                     <p className="font-semibold">Terms of Use</p>
//                     <ol className="list-decimal list-outside text-muted-foreground pl-4">
//                         <li>Users are prohibited from using Send Money for illegal transactions.</li>
//                         <li>MoreDeals Club is not liable if the receiver defaults on their promise to repay or deliver goods/services.</li>
//                     </ol>
//                 </div>
//                 <div className="mt-4 bg-yellow-50 p-4 rounded-md text-sm">
//                     <p className="font-semibold text-black">Stay Alert!</p>
//                     <ol className="list-decimal list-outside pl-4 text-gray-600">
//                         <li>Send money to trusted contacts only.</li>
//                         <li>Verify requests received on social media before sending money.</li>
//                         <li>Always double-check the receiver’s MoreDeals Club ID.</li>
//                     </ol>
//                 </div>
//             </div> */}
//         </div>

//     );
// };

// export default PinForgetSetForm;


"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Step1Form from "./Step1";
import Step2Form from "./Step2";

import { validateRequired } from "@/lib/validation/common";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { showToast } from "@/lib/utilities/toastService";
import { setLoading } from "@/lib/redux/slice/CurrencySlice";

const PinForgetSetForm: React.FC = () => {
  const { data: session } = useSession();

  const userDetails = session?.user?.userDetails;

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    otp_value: "",
    email: userDetails?.email ?? "",
    phone_number: userDetails?.phone_number ?? "",
    prefix: userDetails?.phone_prefix ?? "",
    via: userDetails?.email ? "email" : "phone_number",
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
      setStep(nextStep);
    }

    if (step === 1) {
      if (!validatePinStep()) return;

      const payload = {
        otp_value: formData.otp_value,
        newPin: formData.new_pin,
        confirmPin: formData.confirm_new_pin,
      };

      setIsLoading(true);
      try {
        await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}forgetpin/`, payload);
        showToast("PIN changed successfully!", "success");
        setStep(nextStep);
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

