"use client"
import { UniversalTextLoading } from '@/components/loaders/UniversalTypingLoader';
import { Button } from '@/components/ui/button';
import CountrySelect from '@/components/ui/customInputs/CountrySelect';
import CurrencySelect from '@/components/ui/customInputs/CurrencySelectInput';
import { prevStep, updateField } from '@/lib/redux/slice/RegistrationSlice';
import { RootState } from '@/lib/redux/store';
import { removePrefix } from '@/lib/utils';
import { validateRequired } from '@/lib/validation/common';
import { useSearchParams } from 'next/navigation';

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const CurrencyForm = () => {
    const searchParams = useSearchParams();
    const breferalcode = searchParams.get("bpms");
    const ureferalcode = searchParams.get("referral");
    const dispatch = useDispatch();
    const { firstName, lastName, email, phone, phoneOnly, prefix, countryCode, country, gender, userType, password, agreeToTerms, currency, registerMethod } = useSelector((state: RootState) => state.registration);
    const [errors, setErrors] = useState<{ country?: string; currency?: string; agreeToTerms?: string, }>({});
    const [loading, setLoading] = useState<boolean>(false);


    const handleSelection = (option: any) => {
        dispatch(updateField({ field: "currency", value: option.value }));
        setErrors({ ...errors, currency: validateField("currency", option.value) });
    };


    const handleCountrySelection = (option: any) => {
        dispatch(updateField({ field: "country", value: option.value }));
        setErrors({ ...errors, country: validateField("country", option.value) });
    };



    const handleChange = (field: string, value: string | boolean) => {
        dispatch(updateField({ field, value }));
        setErrors({ ...errors, [field]: validateField(field, value) });
    };

    const validate = async (fieldValues: Partial<{
        country: string;
        agreeToTerms: boolean;
        currency: string;

    }> = { currency, agreeToTerms }) => {

        // Explicitly define tempErrors as a dynamic object
        const tempErrors: Record<string, string> = { ...errors };
        if ("country" in fieldValues) {
            tempErrors.userType = validateRequired(fieldValues.country || "", "Country");
        }

        if ("currency" in fieldValues) {
            tempErrors.userType = validateRequired(fieldValues.currency || "", "Currency");
        }

        if ("agreeToTerms" in fieldValues) {
            tempErrors.agreeToTerms = fieldValues.agreeToTerms ? "" : "You need to Agree our Terms and Conditions";
        }
        setErrors(tempErrors);
        return Object.values(tempErrors).every((error) => !error);
    };


    const validateField = (name: string, value: string | boolean) => {
        switch (name) {
            case "country":
                return validateRequired(value as string, "Country")
            case "currency":
                return validateRequired(value as string, "Currency");
            case "agreeToTerms":
                return value ? "" : "You need to Agree our Terms and Conditions";
            default:
                return "";
        }
    };


    const handleBack = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(prevStep());
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!(await validate())) {
            return;
        }
        setLoading(true);

        const combinedFormData = {
            first_name: firstName,
            last_name: lastName,
            ...(registerMethod === "EMAIL"
                ? { email: email }
                : {
                    phone_number: removePrefix(phone, prefix),
                    phone_prefix: prefix,
                }
            ),
            password: password,
            user_type: userType,
            gender: gender,
            country: country,
            // country_code: countryCode, (Commented out as per your original code)
            currency: currency,
        };


        try {
            // let url = ""
            // if (registerMethod === "EMAIL") {
            //     url = `${process.env.NEXT_PUBLIC_BASE_URL}auth/register/by-email/`;
            // } else if (registerMethod === "PHONE") {
            //     url = `${process.env.NEXT_PUBLIC_BASE_URL}auth/register/by-phonenumber/`;
            // } else {
            //     return;
            // }
            let baseUrl = "";
            if (registerMethod === "EMAIL") {
                baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}auth/register/by-email/`;
            } else if (registerMethod === "PHONE") {
                baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}auth/register/by-phonenumber/`;
            } else {
                return;
            }

            // Create a URL object to handle query params easily
            const urlObj = new URL(baseUrl);

            // Append query params if available
            if (breferalcode) urlObj.searchParams.append("bpms", breferalcode);
            if (ureferalcode) urlObj.searchParams.append("referral", ureferalcode);

            const url = urlObj.toString();
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(combinedFormData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();

            if (data.success) {
                if (registerMethod === "EMAIL") {
                    localStorage.setItem("otp_username", JSON.stringify({ email, via: "email" }));
                } else if (registerMethod === "PHONE") {
                    localStorage.setItem(
                        "otp_username",
                        JSON.stringify({ phone, prefix, via: "phone_number" })
                    );
                }

                window.location.replace("/auth/otp-verify")
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);

        }


    };

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-2'>
                <div>
                    <label>Country</label>
                    <div className="relative">
                        <CountrySelect onChange={handleCountrySelection} initialValue={country} />
                    </div>
                    {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                </div>

                <div>
                    <label>Currency</label>
                    <div className="relative">
                        <CurrencySelect onChange={handleSelection} initialValue={currency} country={country} />
                    </div>
                    {errors.currency && <p className="text-red-500 text-sm">{errors.currency}</p>}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={agreeToTerms} // ✅ Corrected to use `checked` for boolean value
                        onChange={(e) => handleChange("agreeToTerms", e.target.checked)} // ✅ Pass boolean value instead of string
                        className={`h-5 w-5 border rounded focus:ring-2 focus:ring-primary ${errors.agreeToTerms ? "border-red-500 ring-red-500" : "border-gray-300 focus:ring-primary"}`}
                    />
                    <label htmlFor="agreeToTerms" className={`text-sm ${errors.agreeToTerms ? "text-red-500" : "text-gray-700  dark:text-gray-300"}`}>
                        I agree to the <a href="#" className={`  underline ${errors.agreeToTerms ? "text-orange-500" : "text-primary"}`}>Terms and Conditions</a>
                    </label>
                </div>

                <div className='grid grid-cols-2 gap-2'>
                    <Button variant={"outline"} onClick={handleBack} className='w-full'>Back</Button>
                    <Button type='submit' className='w-full'>Continue</Button>
                </div>
            </form>
            {loading &&

                <UniversalTextLoading messages={["Creating your account", "Creating Wallet for you...", "Almost finishing Up...", "Finishing Up..."]} pauseTime={10000} speed={200} />

            }

        </>

    )
}

export default CurrencyForm
