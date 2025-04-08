"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PINInput from "@/components/ui/customInputs/PinInput";
import { AlertOctagonIcon, Loader2, MailIcon, PhoneCall } from "lucide-react";
import { showToast } from "@/lib/utilities/toastService";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
// import { useRouter } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";

interface TransactionPinChangeFormProps {
}

const TransactionPinChangeForm: React.FC<TransactionPinChangeFormProps> = () => {
  //    const axios = useMoredealsClient();
  const router = useRouter()
  const { data: session } = useSession();

  const [oldPin, setOldPin] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [oldPinError, setOldPinError] = useState<string>("");
  const [confirmPin, setConfirmPin] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");
  const [confirmPinError, setConfirmPinError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [serverErrors, setServerError] = useState<string>("");
  const [forgetDialog, setForgetDialog] = useState<boolean>(false)

  const [via, setVia] = useState(session?.user.userDetails?.email ? "email" : "phone_number");

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

  const handleForgetPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgetDialog(true)
  }

  const handleCloseDialog = () => {
    setForgetDialog(false)
  }

  const handleSendOtp =async({payload}:{payload:any}) =>{
    try{
      sessionStorage.setItem("pin_via", payload.via)
      const res =await  MoreClubApiClient.post('users/transaction/pin/forgot/', payload) 
      showToast(res.data.message || "OTP send Successfully")
      router.push("/forget-pin");
    }catch(err:any){
      showToast(err?.response?.data?.message || err?.response.data.message || "Something went wrong")
    } 
  }

  const handleProceed = async(e:React.FormEvent)=>{
    e.preventDefault();
    if((session?.user.userDetails?.email && session?.user?.userDetails?.phone_number) ){
      const payload = {
        via:via
      }
      await handleSendOtp({payload})
      
    }else if(session?.user.userDetails.email){
      const payload = {
        via:"email",
      }
      await handleSendOtp({payload})

    }else if(session?.user.userDetails.phone_number){
      const payload = {
        via:"phone_number"
      }
      await handleSendOtp({payload})

    }else{
      setForgetDialog(false)
    }
      
  }

  return (
    <>
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
          <Dialog open={forgetDialog} onOpenChange={handleCloseDialog}>
            <DialogTrigger asChild>
              <Button variant={"link"} size={"sm"} onClick={handleForgetPin} className="text-foreground">Forget Pin ?</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center">Are you sure you Forget the Pin?</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col justify-center space-x-2 pt-6 space-y-4">
                
                {/* {session?.user.userDetails.email && session.user.userDetails.phone_number && */}
                  <div>
                    <label className="block font-medium mb-1 text-center">Change with</label>
                    <RadioGroup defaultValue={via} className={`grid  ${(session?.user.userDetails.email && session.user.userDetails.phone_number) ? `grid-cols-2`: `grid-cols-1 justify-center items-center` } gap-4`} onValueChange={(value) => setVia(value)}
                      disabled
                    >
                      {session?.user.userDetails.email &&
                      <div className="flex justify-center">
                        <RadioGroupItem value="email" id="email" className="peer sr-only" />
                        <label
                          htmlFor="email"
                          className="flex flex-col w-32 items-center justify-center rounded-md border-2 border-muted bg-popover p-1.5 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white [&:has([data-state=checked])]:text-white [&:has([data-state=checked])]:bg-primary"
                        >
                          <MailIcon  />
                          Email
                        </label>
                      </div>
                      }
                      {session?.user.userDetails.phone_number && 
                      <div className="flex justify-center">
                        <RadioGroupItem
                          value="phone_number"
                          id="phone_number"
                          className="peer sr-only"
                        />
                        <label
                          htmlFor="phone_number"
                          className="flex flex-col w-32 items-center justify-center rounded-md border-2 border-muted bg-popover p-1.5 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white [&:has([data-state=checked])]:text-white [&:has([data-state=checked])]:bg-primary"
                        >
                          <PhoneCall className='mx-2' />
                          Phone Number
                        </label>
                      </div>
                      }

                    </RadioGroup>
                  </div>
                {/* } */}

        
                <div className="grid grid-cols-2 gap-2">
                <DialogClose asChild>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
              
                  <Button variant={"destructive"} onClick={handleProceed}>Proceed</Button>
         
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button type="submit" size="sm" disabled={loading} className="">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Change PIN"}
          </Button>
        </div>
      </form>

    </>

  );
};

export default TransactionPinChangeForm;
