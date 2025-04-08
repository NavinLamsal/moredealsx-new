
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { AlertOctagonIcon, RefreshCwIcon } from "lucide-react";

import { showToast } from "@/lib/utilities/toastService";
import { maskEmail, removePrefix } from "@/lib/utils";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";

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



      const res = await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}users/transaction/pin/resend/`, {
        via: data.via
      });
      showToast(res.data.message || "Otp resend Successfully", "success");

    } catch (err: any) {
      const message =
        err?.response?.data?.errors?.non_field_errors?.[0] ||
        err?.response?.data?.message ||
        "Something went wrong, please try again";

      showToast(message, "error");
    }
  };

  const renderMaskedContact = () =>
    data.via === "email" ? maskEmail(data.email) : data.phone;


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
      {errors.otp_value && <p className="text-red-500 text-center">{errors.otp_value}</p>}

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
