// "use client";
// import { Button } from "@/components/ui/button";
// import PINInput from "@/components/ui/customInputs/PinInput";
// import { AlertOctagonIcon } from "lucide-react";
// import React from "react";


// interface Step2Props {
//     data: any;
//     setData: (key: string, value: any) => void;
//     sendingInformation: { [key: string]: string };
//     serverError: string;
//     onNext: () => void;
//     onBack: () => void;
//     isLoading: boolean;
// }

// const Step2Form: React.FC<Step2Props> = ({ data, setData, onNext, serverError, onBack, isLoading, sendingInformation }) => {

//     const handlePinChange = (newPin: string) => {
//         setData("new_pin", newPin);
//     };
//     const handleConfirmPinChange = (newPin: string) => {
//         setData("confirm_new_pin", newPin);
//     };


//     return (
//         <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-6">
//             {serverError && <p className="flex items-center justify-center w-full text-center text-sm text-red-600 p-2 mb-2 bg-red-200 md:col-span-2 lg:col-span-3">
//                 <AlertOctagonIcon className="mr-2 h-4 w-4" />&nbsp;{serverError}&nbsp;<AlertOctagonIcon className="ml-2 h-4 w-4 " />
//             </p>}

//             <div>
//                 <PINInput length={4} labels="New PIN" initialValue={data.new_pin} onChange={handlePinChange} className="max-w-56 mx-auto" />
//             </div>
//             {/* Confirm PIN Input */}
//             <div>
//                 <PINInput length={4} labels="Confirm New PIN" initialValue={data.confirm_pin} onChange={handleConfirmPinChange} className="max-w-56 mx-auto" />
//             </div>
//             <div className="grid grid-cols-2 gap-2">
//                 <Button type="button" variant={"outline"} onClick={onBack} >
//                     Back
//                 </Button>
//                 <Button type="submit" disabled={isLoading}>
//                     {isLoading ? "Processing..." : "Confirm"}
//                 </Button>
//             </div>
//         </form>
//     );
// };

// export default Step2Form;

"use client";
import { Button } from "@/components/ui/button";
import PINInput from "@/components/ui/customInputs/PinInput";
import { AlertOctagonIcon } from "lucide-react";
import React, { useState } from "react";

interface Step2Props {
    data: any;
    setData: (key: string, value: any) => void;
    sendingInformation: { [key: string]: string };
    serverError: string;
    onNext: () => void;
    onBack: () => void;
    isLoading: boolean;
}

const Step2Form: React.FC<Step2Props> = ({
    data,
    setData,
    onNext,
    serverError,
    onBack,
    isLoading,
    sendingInformation
}) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Reusable function for handling PIN change
    const handlePinChange = (key: string) => (newPin: string) => {
        setData(key, newPin);
        if (errors[key]) {
            setErrors((prev) => ({ ...prev, [key]: "" })); // Clear error on change
        }
    };


    return (
        <div  className="space-y-6">
            {serverError && (
                <p className="flex items-center justify-center w-full text-center text-sm text-red-600 p-2 mb-2 bg-red-200 md:col-span-2 lg:col-span-3">
                    <AlertOctagonIcon className="mr-2 h-4 w-4" />
                    &nbsp;{serverError}&nbsp;
                    <AlertOctagonIcon className="ml-2 h-4 w-4" />
                </p>
            )}

            <div>
                <PINInput
                    length={4}
                    labels="New PIN"
                    initialValue={data.new_pin}
                    onChange={handlePinChange("new_pin")}
                    className="max-w-56 mx-auto"
                />
                {errors.new_pin && <p className="text-sm text-red-600">{errors.new_pin}</p>}
            </div>

            {/* Confirm PIN Input */}
            <div>
                <PINInput
                    length={4}
                    labels="Confirm New PIN"
                    initialValue={data.confirm_new_pin}
                    onChange={handlePinChange("confirm_new_pin")}
                    className="max-w-56 mx-auto"
                />
                {errors.confirm_new_pin && (
                    <p className="text-sm text-red-600">{errors.confirm_new_pin}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-2">
                <Button type="button" variant={"outline"} onClick={onBack}>
                    Back
                </Button>
                <Button type="submit" disabled={isLoading} onClick={onNext}>
                    {isLoading ? "Processing..." : "Confirm"}
                </Button>
            </div>
        </div>
    );
};

export default Step2Form;

