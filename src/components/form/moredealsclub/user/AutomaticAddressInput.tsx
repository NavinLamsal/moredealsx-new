// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Loader2 } from "lucide-react";
// import AutoCompleteInput from "@/components/MapBox/AutoCompleteMapInput";
// import { ChangeEvent } from "react";

// // Define Address Type (Only Required Fields)
// interface Address {
//     address: string;
//     city: string;
//     house_no: string;
//     street: string;
//     zip_code: string;
// }

// interface AddressFormProps {
//     address: Address;
//     onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
//     setAddress: (address: Address) => void;
//     loading?: boolean;
// }

// export default function AddressForm({ address, onSubmit, setAddress, loading = false }: AddressFormProps) {
//     // Handle Manual Input Changes
//     const handleManualInputChange = (event: ChangeEvent<HTMLInputElement>,) => { 
//         setAddress({
//             ...address,
//             [event.target.id]: event.target.value, // ✅ Ensuring TypeScript knows the structure
//     });
//     };

//     return (
//         <form className="flex flex-col gap-4 p-4" onSubmit={onSubmit}>
//             <div>
//                 <label htmlFor="address" className="block text-sm font-medium">Address</label>
//                 <AutoCompleteInput
//                     setAddress={setAddress}
//                     handleManualInputChange={handleManualInputChange}
//                     streetAndNumber={address.address}
//                 />
//             </div>

//             <div>
//                 <label htmlFor="city" className="block text-sm font-medium">City</label>
//                 <Input
//                     type="text"
//                     id="city"
//                     placeholder="City"
//                     value={address.city}
//                     onChange={(event) => handleManualInputChange(event)}
//                 />
//             </div>

//             <div>
//                 <label htmlFor="street" className="block text-sm font-medium">Street</label>
//                 <Input
//                     type="text"
//                     id="street"
//                     placeholder="Street"
//                     value={address.street}
//                     onChange={(event) => handleManualInputChange(event)}
//                 />
//             </div>

//             <div>
//                 <label htmlFor="zip_code" className="block text-sm font-medium">ZIP Code</label>
//                 <Input
//                     type="text"
//                     id="zip_code"
//                     placeholder="ZIP Code"
//                     value={address.zip_code}
//                     onChange={(event) => handleManualInputChange(event)}
//                 />
//             </div>

//             <div>
//                 <label htmlFor="house_no" className="block text-sm font-medium">House No (optional)</label>
//                 <Input
//                     type="text"
//                     id="house_no"
//                     placeholder="House No"
//                     value={address.house_no}
//                     onChange={(event) => handleManualInputChange(event)}
//                 />
//             </div>

//             <Button type="submit" className="w-full" disabled={loading}>
//                 {loading && <Loader2 className="animate-spin w-5 h-5 mr-2" />}
//                 Save Changes
//             </Button>
//         </form>
//     );
// }
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import AutoCompleteInput from "@/components/MapBox/AutoCompleteMapInput";

// Define Address Type (Only Required Fields)
interface Address {
    address: string;
    city: string;
    house_no: string;
    street: string;
    zip_code: string;
}

interface AddressFormProps {
    address: Address;
    onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>; // ✅ `onSubmit` must be async
    setAddress: (address: Address) => void;
    loading?: boolean;
    buttonText?: string;
}

export default function AddressForm({ address, onSubmit, buttonText = "Save Changes", setAddress, loading = false }: AddressFormProps) {
    const [initialAddress] = useState<Address>(address);
    const [isUpdated, setIsUpdated] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formError, setFormError] = useState<string | null>(null); // ✅ Global form error state

    // ✅ Validation Function
    const validateField = (name: keyof Address, value: string) => {
        switch (name) {
            case "address":
            case "city":
            case "street":
                return value.trim() === "" ? `${name} is required` : "";
            case "zip_code":
                return /^\d{4,6}$/.test(value) ? "" : "ZIP Code must be 4-6 digits";
            default:
                return "";
        }
    };

    // ✅ Handle Input Changes + Validation
    const handleManualInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        const newAddress = { ...address, [id]: value };
        setAddress(newAddress);
        setIsUpdated(JSON.stringify(initialAddress) !== JSON.stringify(newAddress));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: validateField(id as keyof Address, value),
        }));
    };

    // ✅ Handle Form Submission (Await `onSubmit`)
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError(null); // Reset any previous errors

        // Validate all fields
        const newErrors: Record<string, string> = {};
        (Object.keys(address) as (keyof Address)[]).forEach((key) => {
            const error = validateField(key, address[key]);
            if (error) newErrors[key] = error;
        });

        // If errors exist, do not submit
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }


        try {
            await onSubmit(e); // ✅ Await the onSubmit function
            setIsUpdated(false); // ✅ Reset update status only if successful
            
        } catch (error) {
            console.error("Form submission error:", error);
            setFormError("An error occurred while submitting. Please try again."); // ✅ Show global form error
        }
    };

    // ✅ Check if Form is Valid
    const isFormValid = isUpdated && Object.values(errors).every((error) => error === "");

    return (
        <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
            {formError && <p className="text-red-500 text-sm">{formError}</p>} {/* ✅ Show global form error */}

            <div>
                <label htmlFor="address" className="block text-sm font-medium">Address</label>
                <AutoCompleteInput
                    setAddress={setAddress}
                    handleManualInputChange={handleManualInputChange}
                    streetAndNumber={address.address}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            <div>
                <label htmlFor="city" className="block text-sm font-medium">City</label>
                <Input type="text" id="city" placeholder="City" value={address.city} onChange={handleManualInputChange} />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>

            <div>
                <label htmlFor="street" className="block text-sm font-medium">Street</label>
                <Input type="text" id="street" placeholder="Street" value={address.street} onChange={handleManualInputChange} />
                {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
            </div>

            <div>
                <label htmlFor="zip_code" className="block text-sm font-medium">ZIP Code</label>
                <Input type="text" id="zip_code" placeholder="ZIP Code" value={address.zip_code} onChange={handleManualInputChange} />
                {errors.zip_code && <p className="text-red-500 text-sm">{errors.zip_code}</p>}
            </div>

            <div>
                <label htmlFor="house_no" className="block text-sm font-medium">House No (optional)</label>
                <Input type="text" id="house_no" placeholder="House No" value={address.house_no} onChange={handleManualInputChange} />
            </div>

            {/* ✅ Show Submit Button Only if Form is Valid */}
            {isUpdated && (
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="animate-spin w-5 h-5 mr-2" />}
                    {buttonText}
                </Button>
            )}
        </form>
    );
}
