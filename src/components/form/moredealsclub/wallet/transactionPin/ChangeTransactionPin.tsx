"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PINInput from "@/components/ui/customInputs/PinInput";
import { AlertOctagonIcon, Loader2 } from "lucide-react";
import { showToast } from "@/lib/utilities/toastService";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { useRouter } from "next/navigation";

interface TransactionPinChangeFormProps {
}

const TransactionPinChangeForm: React.FC<TransactionPinChangeFormProps> = () => {
  //    const axios = useMoredealsClient();
  const router = useRouter()
  const [oldPin, setOldPin] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [oldPinError, setOldPinError] = useState<string>("");
  const [confirmPin, setConfirmPin] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");
  const [confirmPinError, setConfirmPinError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [serverErrors, setServerError] = useState<string>("");

  const validatePin = (value: string): string => (value.length !== 4 ? "PIN must be 4 digits" : "");
  const validateConfirmPin = (value: string): string => ((value.length === 4 && value !== pin) ? "PINs do not match" : "");

  const handlePinChange = (newPin: string) => {
    setPin(newPin);
    setPinError(validatePin(newPin));
  };


  const handleOldPinChange = (newPin: string) => {
    setOldPin(newPin);
    setOldPinError(validatePin(newPin));
  };

  const handleConfirmPinChange = (newPin: string) => {
    setConfirmPin(newPin);
    setConfirmPinError(validateConfirmPin(newPin));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const oldpinValidationError = validatePin(pin);
    const pinValidationError = validatePin(pin);
    const confirmPinValidationError = validateConfirmPin(confirmPin);

    if (pinValidationError || confirmPinValidationError) {
      setPinError(pinValidationError);
      setConfirmPinError(confirmPinValidationError);
    } else {
      const data = { current_transaction_pin: oldPin, transaction_pin: pin, confirm_transaction_pin: confirmPin };

      try {
        setLoading(true);

        const res = await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}users/transaction/pin/change/`, data);
        setOldPin("");
        setPin("");
        setOldPin("");
        setLoading(false);
        showToast("PIN Change successfully", "success");
      } catch (err: any) {
        showToast("Error setting PIN", "error");
        setServerError(err?.response?.data.errors.non_field_errors[0] || err?.response?.data?.message || "Something went wrong, please try again");
        setLoading(false);
      }
    }
  };

  const handleForgetPin = async(e:React.FormEvent)=>{
    e.preventDefault();
    // api call 
    router.push("/forget-pin");
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 rounded-lg mx-auto">
      {/* <h2 className="text-xl font-semibold">Set Your Transaction PIN</h2> */}
      {serverErrors && <p className="flex items-center justify-center w-full text-center text-sm text-red-600 p-2 mb-2 bg-red-200 md:col-span-2 lg:col-span-3">
        <AlertOctagonIcon className="mr-2 h-4 w-4" />&nbsp;{serverErrors}&nbsp;<AlertOctagonIcon className="ml-2 h-4 w-4 " />
      </p>}
      <div>
        <PINInput length={4} labels="Old PIN" initialValue={oldPin} onChange={handleOldPinChange} error={oldPinError} />

      </div>

      {/* PIN Input */}
      <div>
        <PINInput length={4} labels="New PIN" initialValue={pin} onChange={handlePinChange} error={pinError} />

      </div>

      {/* Confirm PIN Input */}
      <div>

        <PINInput length={4} labels="Confirm New PIN" initialValue={confirmPin} onChange={handleConfirmPinChange} error={confirmPinError} />
      </div>

    

      {/* Buttons */} 
      <div className=" space-x-2">
      <Button variant={"link"} size={"sm"} onClick={handleForgetPin} className="text-foreground">Forget Pin ?</Button>
        {/* <DialogClose asChild> */}
        {/* <Button size="sm" variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </Button> */}
        {/* </DialogClose> */}
        <Button type="submit" size="sm" disabled={loading} className="">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Change PIN"}
        </Button>
      </div>
    </form>
  );
};

export default TransactionPinChangeForm;
