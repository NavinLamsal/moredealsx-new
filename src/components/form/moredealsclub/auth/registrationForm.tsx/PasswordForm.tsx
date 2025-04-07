"use client"
import { Button } from '@/components/ui/button';
import PasswordField from '@/components/ui/customInputs/PasswordInput';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { nextStep, prevStep, updateField } from '@/lib/redux/slice/RegistrationSlice';
import { RootState } from '@/lib/redux/store';
import { validateConfrimPassword, validatePassword, validateRequired } from '@/lib/validation/common';
import { Bike, Building2Icon, User2Icon } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const PasswordForm = () => {

    const dispatch = useDispatch();
    const { userType, password, confirmPassword, } = useSelector((state: RootState) => state.registration);
    const [errors, setErrors] = useState<{ userType?: string; password?: string; confirmPassword?: string, }>({});


    const handleChange = (field: string, value: string | boolean) => {
        dispatch(updateField({ field, value }));
        setErrors({ ...errors, [field]: validateField(field, value) });
    };

    const validate = async (fieldValues: Partial<{
        password: string;
        confirmPassword: string;

        userType: string;

    }> = { userType, password, confirmPassword }) => {

        // Explicitly define tempErrors as a dynamic object
        const tempErrors: Record<string, string> = { ...errors };
        if ("userType" in fieldValues) {
            tempErrors.userType = validateRequired(fieldValues.userType || "", "User Type");
        }

        if ("password" in fieldValues) {
            tempErrors.password = validatePassword(fieldValues.password || "");
        }

        if ("confirmPassword" in fieldValues) {
            if (password !== "") {
                tempErrors.confirmPassword = validateConfrimPassword(password, fieldValues.confirmPassword || "");
            }
        }
        setErrors(tempErrors);
        return Object.values(tempErrors).every((error) => !error);
    };


    const validateField = (name: string, value: string | boolean) => {
        switch (name) {
            case "userType":
                return validateRequired(value as string, "User Type");
            case "password":
                return validatePassword(value as string);
            case "confirmPassword":
                return validateConfrimPassword(password, value as string);
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
        dispatch(nextStep());
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-2'>
            <div>
                <label className="block font-medium mb-1">Account Type</label>
                <RadioGroup defaultValue={userType} className="grid grid-cols-3 gap-4" onValueChange={(value) => handleChange("userType", value)}>
                    <div>
                        <RadioGroupItem value="NORMAL" id="NORMAL" className="peer sr-only" />
                        <label
                            htmlFor="NORMAL"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-transparent hover:text-foreground hover:border-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:text-primary-foreground"
                        >
                            <User2Icon fill='currentColor' />

                            USER
                        </label>
                    </div>
                    <div>
                        <RadioGroupItem
                            value="BUSINESS"
                            id="BUSINESS"
                            className="peer sr-only"
                        />
                        <label
                            htmlFor="BUSINESS"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-transparent hover:text-foreground hover:border-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:text-primary-foreground"
                        >
                            <Building2Icon className='mx-2' />
                            Business
                        </label>
                    </div>
                    <div>
                        <RadioGroupItem value="DELIVERY" id="DELIVERY" className="peer sr-only" />
                        <label
                            htmlFor="DELIVERY"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-transparent hover:text-foreground hover:border-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:text-primary-foreground"
                        >
                            <Bike fill='currentColor' />

                            Delivery
                        </label>
                    </div>
                </RadioGroup>
                {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
            </div>
            <div>
                <label>Password</label>
                <PasswordField
                    name="password"
                    value={password}
                    onChange={(val) => handleChange("password", val)}
                    placeholder="Enter your password"
                    error={errors.password}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div >
                <label>Confirm Password</label>
                <PasswordField
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(val) => handleChange("confirmPassword", val)}
                    placeholder="Confirm your password"
                    error={errors.confirmPassword}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <Button variant={"outline"} onClick={handleBack} className='w-full'>Back</Button>
                <Button type='submit' className='w-full'>Continue</Button>
            </div>
        </form>
    )
}

export default PasswordForm
