// "use client";
// import { Button } from "@/components/ui/button";
// import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
// import { showToast } from "@/lib/utilities/toastService";
// import { maskEmail, removePrefix } from "@/lib/utils";
// import { AlertOctagonIcon, ArrowLeftFromLine, RefreshCwIcon } from "lucide-react";
// import React, { useState } from "react";


// interface Step1Props {
//     data: any;
//     errors: any;
//     serverError: string;
//     setData: (key: string, value: any) => void;
//     onNext: () => void;
//     isLoading: boolean;
// }

// const Step1Form: React.FC<Step1Props> = ({ data, errors, setData, onNext, serverError, isLoading  }) => {

// const [isResendDisabled, setIsResendDisabled] = useState(true);
//   const [resendTimer, setResendTimer] = useState(0);

//     const handleChange = (value: string) => {
//         console.log("otp value", value)
//         setData( "otp_value", value );
//       };

//         const handleResend = async (e: React.FormEvent) => {
//           e.preventDefault();
        
//           // Temporarily disable the resend button
//           setIsResendDisabled(true);
//           setResendTimer(5 * 60);
//           try {
//             const payload = {
//               via: data.via,
//               ...(data.via === "email"
//                 ? { email: data.email }
//                 : {
//                     phone_number: removePrefix(data.phone, data.prefix),
//                     phone_prefix: data.prefix,
//                   }),
//             };
        
//             const response = await fetch(
//               `${process.env.NEXT_PUBLIC_BASE_URL}auth/register/resend/otp/`,
//               {
//                 method: "POST",
//                 body: JSON.stringify(payload),
//                 headers: { "Content-Type": "application/json" },
//               }
//             );
        
//             const res = await response.json();
        
//             // ✅ Ensure `res.success` is explicitly `true`
//             if (res.success === true) {
//               showToast("OTP Resent Successfully!", "success");
//               setResendTimer(5 * 60); // Start 5-minute countdown
//             } else {
//               // ✅ Handle errors gracefully and show toast
//               const errorMessage =
//                 res.errors?.non_field_errors?.[0] ||
//                 res.message ||
//                 "Failed to resend OTP. Please try again.";
//               throw new Error(errorMessage);
//             }
//           } catch (err: any) {
//             console.error("Resend OTP Error:", err);
//             const errorMessage = err?.message || "Something went wrong";
//             // setServerErrors(errorMessage);
//             showToast(errorMessage, "error");
        
//             // Re-enable resend button if there's an error
//             setIsResendDisabled(false);
//           }
//         };

//     return (
//         <div className="space-y-4">
//             {serverError && <p className="flex items-center justify-center w-full text-center text-sm text-red-600 p-2 mb-2 bg-red-200 md:col-span-2 lg:col-span-3">
//             <AlertOctagonIcon className="mr-2 h-4 w-4" />&nbsp;{serverError}&nbsp;<AlertOctagonIcon className="ml-2 h-4 w-4 " />
//           </p>}
//           <p className="text-center text-sm text-muted-foreground">
//         Enter the OTP sent to your{" "}
//         {data.via === "email" ? "Email" : `Phone Number`}{" "}
//         {data.via === "email" ? maskEmail(data.email) : data.phone} to verify
//         your account. 
//       </p>


//       <div className="flex justify-center">
//         <InputOTP maxLength={6} value={data.otp_value} onChange={handleChange} className="w-full">
//           {[...Array(6)].map((_, index) => (
//             <InputOTPGroup key={index}>
//               <InputOTPSlot index={index} />
//             </InputOTPGroup>
//           ))}
//         </InputOTP>
//       </div>

//       <div className="grid grid-cols-2 gap-2">
//         <Button
//           variant="outline"
//           onClick={handleResend}
//           className="flex items-center gap-2 justify-center w-full"
//           // disabled={isResendDisabled}
//         >
//           <RefreshCwIcon size={18} />
//           {resendTimer > 0 ? `Resend OTP in ${Math.floor(resendTimer / 60)}:${resendTimer % 60}` : "Resend OTP"}
//         </Button>
//         <Button
//                 type="button"
//                 onClick={onNext}
//                 className="w-full"

//                 disabled={isLoading}
//             >
//                 {isLoading ? "Verifying..." : "Verify"}
//             </Button>
//       </div>

      


//             {/* <Button
//                 type="button"
//                 onClick={onNext}
//                 className="w-full"

//                 disabled={isLoading}
//             >
//                 {isLoading ? "Processing..." : "Next"}
//             </Button> */}
//         </div>
//     );
// };

// export default Step1Form;


"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { AlertOctagonIcon, RefreshCwIcon } from "lucide-react";

import { showToast } from "@/lib/utilities/toastService";
import { maskEmail, removePrefix } from "@/lib/utils";

interface Step1Props {
  data: any;
  errors: any;
  serverError: string;
  setData: (key: string, value: any) => void;
  onNext: () => void;
  isLoading: boolean;
}

const Step1Form: React.FC<Step1Props> = ({
  data,
  errors,
  setData,
  onNext,
  serverError,
  isLoading,
}) => {
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const handleChange = (value: string) => {
    setData("otp_value", value);
  };

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload =
        data.via === "email"
          ? { via: "email", email: data.email }
          : {
              via: "phone_number",
              phone_number: removePrefix(data.phone, data.prefix),
              phone_prefix: data.prefix,
            };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}auth/register/resend/otp/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const res = await response.json();

      if (res.success) {
        showToast("OTP resent successfully!", "success");
        setResendTimer(5 * 60); // 5 minutes
      } else {
        throw new Error(
          res.errors?.non_field_errors?.[0] || res.message || "Failed to resend OTP"
        );
      }
    } catch (err: any) {
      showToast(err.message || "Something went wrong", "error");
    }
  };

  const renderMaskedContact = () =>
    data.via === "email" ? maskEmail(data.email) : data.phone;

  console.log("error", errors)

  return (
    <div className="space-y-4">
      {serverError && (
        <p className="flex items-center justify-center text-center text-sm text-red-600 p-2 bg-red-200">
          <AlertOctagonIcon className="mr-2 h-4 w-4" />
          {serverError}
          <AlertOctagonIcon className="ml-2 h-4 w-4" />
        </p>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Enter the OTP sent to your{" "}
        <span className="font-medium">{data.via === "email" ? "Email" : "Phone Number"}</span>{" "}
        <span className="text-black">{renderMaskedContact()}</span> to verify your account.
      </p>

      <div className="flex justify-center">
        <InputOTP maxLength={6} value={data.otp_value} onChange={handleChange} className="w-full">
          {Array.from({ length: 6 }).map((_, index) => (
            <InputOTPGroup key={index}>
              <InputOTPSlot index={index} />
            </InputOTPGroup>
          ))}
        </InputOTP>
      </div>
        {errors.otp_value && <p className="text-red-500 text-center">{errors.otp_value}</p> }

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          onClick={handleResend}
          disabled={resendTimer > 0}
          className="flex items-center justify-center gap-2 w-full"
        >
          <RefreshCwIcon size={18} />
          {resendTimer > 0
            ? `Resend in ${Math.floor(resendTimer / 60)
                .toString()
                .padStart(2, "0")}:${(resendTimer % 60).toString().padStart(2, "0")}`
            : "Resend OTP"}
        </Button>

        <Button
          type="button"
          onClick={onNext}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </div>
  );
};

export default Step1Form;
