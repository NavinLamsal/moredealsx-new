"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import PINInput from "@/components/ui/customInputs/PinInput";
import { Loader2 } from "lucide-react";
import { createServerPlatformAxiosInstance } from "@/lib/axios/platformBasedAxios";
import { showToast } from "@/lib/utilities/toastService";
import useMoredealsClient from "@/lib/axios/moredealsClient";

interface TransactionPinFormProps {
  onPinSet?: (pin: string) => void;
  onCancel: () => void;
  onFinish: () => void;
}

const TransactionPinForm: React.FC<TransactionPinFormProps> = ({ onPinSet, onCancel , onFinish}) => {
   const axios = useMoredealsClient();
  const [pin, setPin] = useState<string>("");
  const [confirmPin, setConfirmPin] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");
  const [confirmPinError, setConfirmPinError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validatePin = (value: string): string => (value.length !== 4 ? "PIN must be 4 digits" : "");
  const validateConfirmPin = (value: string): string => ( (value.length ===4 && value !== pin) ? "PINs do not match" : "");

  const handlePinChange = (newPin: string) => {
    setPin(newPin);
    // setPinError(validatePin(newPin));
  };

  const handleConfirmPinChange = (newPin: string) => {
    setConfirmPin(newPin);
    setConfirmPinError(validateConfirmPin(newPin));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pinValidationError = validatePin(pin);
    const confirmPinValidationError = validateConfirmPin(confirmPin);

    if (pinValidationError || confirmPinValidationError) {
      setPinError(pinValidationError);
      setConfirmPinError(confirmPinValidationError);
    } else {
      const data = { transaction_pin:pin, confirm_transaction_pin: confirmPin };
      
      try {
        setLoading(true);

        const res =  await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}users/transaction/pin/set/`, data);
        if (res.status === 200) {
          showToast("PIN set successfully", "success");
          onFinish();
          setLoading(false);
        }
      } catch (err) {
        showToast("Error setting PIN", "error");
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 rounded-lg w-full max-w-xs mx-auto">
      {/* <h2 className="text-xl font-semibold">Set Your Transaction PIN</h2> */}

      {/* PIN Input */}
      <div>
        <PINInput length={4} labels="Set PIN" initialValue={pin} onChange={handlePinChange} error={pinError} />
        
      </div>

      {/* Confirm PIN Input */}
      <div>
        
        <PINInput length={4} labels="Confirm PIN" initialValue={confirmPin} onChange={handleConfirmPinChange} error={confirmPinError} />
      </div>

      {/* Buttons */}
      <div className="w-full space-x-2">
        {/* <DialogClose asChild> */}
          {/* <Button size="sm" variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </Button> */}
        {/* </DialogClose> */}
        <Button type="submit" size="sm" disabled={loading} className="w-full">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Set PIN"}
        </Button>
      </div>
    </form>
  );
};

export default TransactionPinForm;
