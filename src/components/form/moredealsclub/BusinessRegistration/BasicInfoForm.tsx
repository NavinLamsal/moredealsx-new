"use client"
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PhoneNumberInput from '@/components/ui/customInputs/PhoneNumberInput';
import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { nextStep, updateField } from '@/lib/redux/slice/BusinessRegistrationSlice';
import { RootState } from '@/lib/redux/store';
import { validateRequired } from '@/lib/validation/common';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


const BasicInfoForm = () => {

    const dispatch = useDispatch();
    const { BusinessName, BusinessRegistration, BusinessEmail, BusinessPhone } = useSelector((state: RootState) => state.businessRegistration);
    const [errors, setErrors] = useState<{ BusinessName?: string; BusinessRegistration?: string; BusinessEmail?: string; BusinessPhone?: string }>({});


    const handleChange = (field: string, value: string) => {
        dispatch(updateField({ field, value }));
        setErrors({ ...errors, [field]: validateField(field, value) });
    };


    const handlePhoneNumberChange = (data: any) => {
        handleChange("BusinessPhone", data.fullNumber)
    };

    const validate = async (fieldValues: Partial<{
        BusinessName: string; BusinessRegistration: string
    }> = { BusinessName, BusinessRegistration }) => {

        // Explicitly define tempErrors as a dynamic object
        const tempErrors: Record<string, string> = { ...errors };

        if ("BusinessName" in fieldValues) {

            tempErrors.BusinessName = validateRequired(fieldValues.BusinessName || "", "BusinessName");
        }

        if ("BusinessRegistration" in fieldValues) {
            tempErrors.BusinessRegistration = validateRequired(fieldValues.BusinessRegistration || "", "BusinessRegistration");
        }


        setErrors(tempErrors);
        return Object.values(tempErrors).every((error) => !error);
    };


    const validateField = (name: string, value: string) => {
        switch (name) {
            case "BusinessName":
                return validateRequired(value, "Business Name",);
            case "BusinessRegistration":
                return validateRequired(value, "Registration No.");
            default:
                return "";
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!(await validate())) {
            //   showToast("Please fix the errors in the form.", "error");
            return;
        }
        console.log(BusinessName, BusinessRegistration, BusinessEmail, BusinessPhone);
        dispatch(nextStep());


    };


    return (
        <div className="grid md:grid-cols-2 grid-cols-1 w-full">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                    <Heading title={"Register Your Business"} />
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300">Let's wrap up the registration process. Fill in your Business details and make your business profile. You will be a part of MoreDealsClub like never before!.</p>
            </CardHeader>

            <CardContent><form onSubmit={handleSubmit} className='flex flex-col gap-4 p-2'>
                <div>
                    <label className="block font-medium mb-1">Business Name</label>
                    <Input
                        type="text"
                        name="BusinessName"
                        value={BusinessName}
                        onChange={(e) => handleChange("BusinessName", e.target.value)}
                        placeholder="Business Name"
                        className={`p-2 border rounded w-full 
    `}
                    />
                    {errors.BusinessName && <p className="text-red-500 text-sm">{errors.BusinessName}</p>}
                </div>
                <div>
                    <label className="block font-medium mb-1">Registration Number</label>
                    <Input
                        type="text"
                        name="BusinessRegistration"
                        value={BusinessRegistration}
                        onChange={(e) => handleChange("BusinessRegistration", e.target.value)}
                        placeholder="Registration Number"
                        className={`p-2 border rounded w-full 
    `}
                    />
                    {errors.BusinessRegistration && <p className="text-red-500 text-sm">{errors.BusinessRegistration}</p>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Business Email</label>
                    <Input
                        type="email"
                        name="BusinessEmail"
                        value={BusinessEmail}
                        onChange={(e) => handleChange("BusinessEmail", e.target.value)}
                        placeholder="m@example.com"
                        className={`p-2 border rounded w-full ${errors.BusinessEmail ? "border-red-500" : ""}`}
                    />
                    {errors.BusinessEmail && <p className="text-red-500 text-sm">{errors.BusinessEmail}</p>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Business Contact Number</label>
                    <PhoneNumberInput
                        onChange={handlePhoneNumberChange}
                        initialValue={BusinessPhone}
                    />
                    {errors.BusinessPhone && <p className="text-red-500 text-sm">{errors.BusinessPhone}</p>}
                </div>



                <Button type='submit' className='w-full'>Proceed</Button>
            </form></CardContent>
        </div>


    )
}

export default BasicInfoForm
