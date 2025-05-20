
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine, RefreshCwIcon } from "lucide-react";
import { showToast } from "@/lib/utilities/toastService";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { removePrefix } from "@/lib/utils";



const OTPVerifyForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    via: "",
    prefix: "",
    otp: "",
  });

  const [serverErrors, setServerErrors] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("forget_username");
      if (storedUsername) {
        const parsedstoredUsername = JSON.parse(storedUsername);
        setFormData((prev) => ({ ...prev, email: parsedstoredUsername.email, phone: parsedstoredUsername.phone_number, via: parsedstoredUsername.via, prefix: parsedstoredUsername.phone_prefix }));
      }
    }

    // Enable "Resend OTP" after 2 minutes
    setTimeout(() => setIsResendDisabled(false), 2 * 60 * 1000);
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [resendTimer]);

  const handleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, otp: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        code: formData.otp,
        via: formData.via,
        ...(formData.via === "email"
          ? { email: formData.email }
          : {
              phone_number: removePrefix(formData.phone, formData.prefix),
              phone_prefix: formData.prefix,
            }),
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}auth/forget/password/verify/otp/`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (data?.success) {
        showToast("OTP Verified Successfully!", "success");
        localStorage.setItem("forget_code", formData.otp)
        window.location.href = "/auth/forgot-password/change-password"
      } else {
        throw new Error(data?.errors?.non_field_errors?.[0] || data?.message || "Invalid OTP");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      setServerErrors(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.removeItem("otp_username");
    window.location.href = "/register";
  };


  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Temporarily disable the resend button
    setIsResendDisabled(true);
    setResendTimer(5 * 60);
    try {
      const payload = {
        via: formData.via,
        ...(formData.via === "email"
          ? { email: formData.email }
          : {
              phone_number: removePrefix(formData.phone, formData.prefix),
              phone_prefix: formData.prefix,
            }),
      };
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}auth/forget/password/resend/otp/`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        }
      );
  
      const res = await response.json();
  
      // ✅ Ensure `res.success` is explicitly `true`
      if (res.success === true) {
        showToast("OTP Resent Successfully!", "success");
        setResendTimer(5 * 60); // Start 5-minute countdown
      } else {
        // ✅ Handle errors gracefully and show toast
        const errorMessage =
          res.errors?.non_field_errors?.[0] ||
          res.message ||
          "Failed to resend OTP. Please try again.";
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      console.error("Resend OTP Error:", err);
      const errorMessage = err?.message || "Something went wrong";
      setServerErrors(errorMessage);
      showToast(errorMessage, "error");
  
      // Re-enable resend button if there's an error
      setIsResendDisabled(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-center text-xl font-semibold mb-4">OTP Verification</h2>
      <p className="text-center text-sm text-muted-foreground">
        Enter the OTP sent to your{" "}
        {formData.via === "email" ? "Email" : `Phone Number`}{" "}
        {formData.via === "email" ? formData.email : formData.phone} to Change
        your password.
      </p>

      {serverErrors && (
        <p className="text-center text-sm text-red-600 p-2 bg-red-200">
          {serverErrors}
        </p>
      )}

      <div className="flex justify-center">
        <InputOTP maxLength={6} value={formData.otp} onChange={handleChange} className="w-full">
          {[...Array(6)].map((_, index) => (
            <InputOTPGroup key={index}>
              <InputOTPSlot index={index} />
            </InputOTPGroup>
          ))}
        </InputOTP>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={handleBack} className="flex items-center gap-2 justify-center w-full">
          <ArrowLeftFromLine size={18} />
          Go Back
        </Button>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </div>

      <div className="grid gap-2">
        <Button
          variant="outline"
          onClick={handleResend}
          className="flex items-center gap-2 justify-center w-full"
          // disabled={isResendDisabled}
        >
          <RefreshCwIcon size={18} />
          {resendTimer > 0 ? `Resend OTP in ${Math.floor(resendTimer / 60)}:${resendTimer % 60}` : "Resend OTP"}
        </Button>
      </div>
    </form>
  );
};

export default OTPVerifyForm;

