"use client"
import { Button } from '@/components/ui/button';
import PhoneNumberInput from '@/components/ui/customInputs/PhoneNumberInput';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { createServerPlatformAxiosInstance } from '@/lib/axios/platformBasedAxios';
import { nextStep, updateField } from '@/lib/redux/slice/RegistrationSlice';
import { RootState } from '@/lib/redux/store';
import { validateRequired } from '@/lib/validation/common';
import { Loader2Icon, Mail, Phone } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';



export const CheckUserName = async (username: string, prefix?: string) => {
    const isEmail = (username: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
    const isPhoneNumber = (username: string) => /^\+?\d{1,4}?\d{9,14}$/.test(username); // Ensures 10-15 digit numbers
  

    const removePrefix = (phone: string, prefix: string) => {
        if (phone.startsWith(prefix)) {
            return phone.slice(prefix.length); // Remove the prefix from the phone number
        }
        return phone; // Return original if prefix is not at the beginning
    };


    let payload;
    if (isEmail(username)) {
        payload = { email: username, via: "email" };
    } else if (isPhoneNumber(username)) {
        if (prefix) {
            const phoneWithoutPrefix = removePrefix(username, prefix);
            payload = { phone_number: phoneWithoutPrefix, phone_prefix: prefix, via: "phone_number" };
        } else {
            return "Please enter a valid phone number"
        }
    } else {
        payload = { username };
    }
    try {
        const res = await createServerPlatformAxiosInstance("moredealsclub", false).post(`auth/check/user/`, payload

        );
        if (res.status === 200) {
            return "";
        }
    } catch (error: any) {
        return error.response.data?.errors?.non_field_errors[0]


    }

}

const validatePhoneNumber = async (phone: string): Promise<string> => {
    let error = "";
    error = validateRequired(phone, "Phone Number");
    return error
};

const validateEmailAddress = async (email: string): Promise<string> => {
    let error = "";
    error = validateRequired(email, "Email");
    return error
};

const BasicInfoForm = () => {
    const dispatch = useDispatch();
    const { firstName, lastName, gender, userType, email, phone, phoneOnly, prefix, registerMethod } = useSelector((state: RootState) => state.registration);
    const [errors, setErrors] = useState<{ firstName?: string; lastName?: string, gender?: string, email?: string; phone?: string; registerMethod?: string }>({});
    const [loading, setLoading] = useState<boolean>(false);


    const handleChange = (field: string, value: string) => {
        dispatch(updateField({ field, value }));
        setErrors({ ...errors, [field]: validateField(field, value) });
    };

    const handlePhoneNumberChange = (data: any) => {
        handleChange("phone", data.fullNumber)
        dispatch(updateField({ field: "phoneOnly", value: data.phone }))
        dispatch(updateField({ field: "country", value: data.country }))
        dispatch(updateField({ field: "prefix", value: data.prefix }))
        dispatch(updateField({ field: "countryCode", value: data.countryCode }))
    };

    const validate = async (fieldValues: Partial<{
        firstName: string;
        lastName: string;
        gender: string;
        userType: string;
        email: string;
        phone: string;
        registerMethod: string;
    }> = { firstName, lastName, gender, userType, email, phone, registerMethod }) => {

        // Explicitly define tempErrors as a dynamic object
        const tempErrors: Record<string, string> = { ...errors };

        if ("firstName" in fieldValues) {

            tempErrors.firstName = validateRequired(fieldValues.firstName || "", "firstName");
        }

        if ("lastName" in fieldValues) {
            tempErrors.lastName = validateRequired(fieldValues.lastName || "", "lastName");
        }

        if ("gender" in fieldValues) {
            tempErrors.gender = validateRequired(fieldValues.gender || "", "gender");
        }

        if ("registerMethod" in fieldValues) {
            tempErrors.registerMethod = fieldValues.registerMethod === "" ? "Choose any one Method" : "";
        }


        if ("email" in fieldValues) {
            if (registerMethod === "EMAIL") {
                let emailErrors = "";
                emailErrors = await validateEmailAddress(fieldValues.email || "");
                if (emailErrors === "") {
                    emailErrors = await CheckUserName(email);
                }
                tempErrors.email = emailErrors;
            } else {
                tempErrors.email = "";
            }
        }

        if ("phone" in fieldValues) {
            if (registerMethod === "PHONE") {
                let errors = "";
                errors = await validatePhoneNumber(fieldValues.phone || "");
                if (errors === "") {
                    errors = await CheckUserName(fieldValues.phone || "", prefix);
                }
                tempErrors.phone = errors
            } else {
                tempErrors.phone = "";
            }
        }

        setErrors(tempErrors);
        return Object.values(tempErrors).every((error) => !error);
    };


    const validateField = async (name: string, value: string) => {
        switch (name) {
            case "firstName":
                return validateRequired(value, "First Name",);
            case "lastName":
                return validateRequired(value, "Last Name");
            case "gender":
                return validateRequired(value, "Gender");
            case "email":
                return await validateEmailAddress(value);
            case "phone":
                return await validatePhoneNumber(value);
            case "registerMethod":
                return value === "" ? "Choose any one Method" : "";
            default:
                return "";
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!(await validate())) {
            setLoading(false);
            return;
        }
        dispatch(nextStep());
        setLoading(false);

    };


    return (
        <>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-2'>
                <div className='grid grid-cols-2 gap-1'>

                    <div>
                        <label className="block font-medium mb-1">First name</label>
                        <Input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                            placeholder="John"
                            className={`p-2 border rounded w-full 
                `}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Last name</label>
                        <Input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                            placeholder="Doe"
                            className={`p-2 border rounded w-full 
                `}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-1">Register via</label>
                    <RadioGroup defaultValue={registerMethod} className="grid grid-cols-2 gap-4" onValueChange={(value) => handleChange("registerMethod", value)}>
                        <div>
                            <RadioGroupItem value="EMAIL" id="EMAIL" className="peer sr-only" />
                            <label
                                htmlFor="EMAIL"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-transparent hover:text-foreground hover:border-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:text-primary-foreground" 
                            >
                                <Mail />

                                Email
                            </label>
                        </div>
                        <div>
                            <RadioGroupItem
                                value="PHONE"
                                id="PHONE"
                                className="peer sr-only"
                            />
                            <label
                                htmlFor="PHONE"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-transparent hover:text-foreground hover:border-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:text-primary-foreground"
                            >
                                <Phone />
                                Phone
                            </label>
                        </div>
                    </RadioGroup>
                    {errors.registerMethod && <p className="text-red-500 text-sm">{errors.registerMethod}</p>}
                </div>

                {registerMethod === "EMAIL" &&
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="m@example.com"
                            className={`p-2 border rounded w-full ${errors.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                }
                {registerMethod === "PHONE" &&
                    <div>
                        <label className="block font-medium mb-1">Phone Number</label>
                        <PhoneNumberInput
                            onChange={handlePhoneNumberChange}
                            initialValue={phone}
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>
                }


                <div>
                    <label className="block font-medium mb-1">Gender</label>
                    <RadioGroup defaultValue={gender} className="grid grid-cols-3 gap-4" onValueChange={(value) => handleChange("gender", value)}>
                        <div>
                            <RadioGroupItem value="MALE" id="male" className="peer sr-only" />
                            <label
                                htmlFor="male"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-transparent hover:text-foreground hover:border-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:text-primary-foreground"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mars"><path d="M16 3h5v5" /><path d="m21 3-6.75 6.75" /><circle cx="10" cy="14" r="6" /></svg>

                                Male
                            </label>
                        </div>
                        <div>
                            <RadioGroupItem
                                value="FEMALE"
                                id="female"
                                className="peer sr-only"
                            />
                            <label
                                htmlFor="female"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-transparent hover:text-foreground hover:border-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:text-primary-foreground"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-venus"><path d="M12 15v7" /><path d="M9 19h6" /><circle cx="12" cy="9" r="6" /></svg>
                                Female
                            </label>
                        </div>
                        <div>
                            <RadioGroupItem value="OTHER" id="other" className="peer sr-only" />
                            <label
                                htmlFor="other"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-transparent hover:text-foreground hover:border-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:text-primary-foreground"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mars-stroke"><path d="m14 6 4 4" /><path d="M17 3h4v4" /><path d="m21 3-7.75 7.75" /><circle cx="9" cy="15" r="6" /></svg>
                                Other
                            </label>
                        </div>
                    </RadioGroup>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                </div>
                <Button type='submit' className='w-full' disabled={loading}>
                    {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                    Continue
                </Button>
            </form>

        </>
    )
}

export default BasicInfoForm
