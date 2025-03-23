
"use client";
import React, { useState } from "react";
import PINInput from "../ui/customInputs/PinInput";
import { Button } from "../ui/button";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { showToast } from "@/lib/utilities/toastService";
import { useQueryClient } from "@tanstack/react-query";

const BookingAction = ({ slug, type, setShowDialog ,setShowSheet}: { slug: string ,type:string, setShowSheet: React.Dispatch<React.SetStateAction<boolean>>, setShowDialog: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [pin, setPin] = useState("");
    const [pinError, setPinError] = useState("")
    const [serverError, setServerError] = useState("")

    const queryClient = useQueryClient();


    const handleConfirmPinChange = (newPin: string) => {
        setPin(newPin);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!pin) {
            setPinError("PIN is required")
            return;
        }
        if (pin && pin.length !== 4) {
            pin.length !== 4 ? setPinError("PIN is required") : setPinError("");
            return;
        }

        try {
            const res = await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}events/${slug}/book/`, { pin: pin })
            showToast(res.data.message, "success");
            queryClient.invalidateQueries({ queryKey: ["Event Booking Details", slug] });
            if(type === "dialog"){
                setShowDialog(false)
            }else{
                if(type === "sheet"){
                setShowSheet(false)
            }
            }

        } catch (err: any) {
            if (err.response.data.errors && err.response.data.errors?.pin) {
                setPinError(err.response.data.errors?.pin)
            } else {
                showToast(err.response.data.message || "Something went wrong", "error")
                setServerError(err.response.data.message || "Something went wrong")
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-6  rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Enter your transaction pin to purchase event ticket!</h2>

            <p className="text-justify text-xs">To enhance security and verify your identity, we require you to enter your transaction PIN before proceeding. Please provide your PIN to continue with the current process.</p>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                {serverError &&
                    <p className="text-center text-sm text-red-600 p-2 bg-red-200">
                        {serverError}
                    </p>

                }
                <PINInput length={4} labels="Confirm PIN" initialValue={pin} onChange={handleConfirmPinChange} className="max-w-56 mx-auto" />
                {pinError && <p className="text-sm text-red-500 text-center">{pinError}</p>}
                {/* Submit Button */}
                <Button
                    variant={"default"}
                    type="submit"
                    className="w-full "
                >
                    Book Now
                </Button>
            </form>
        </div>
    );
};

export default BookingAction;
