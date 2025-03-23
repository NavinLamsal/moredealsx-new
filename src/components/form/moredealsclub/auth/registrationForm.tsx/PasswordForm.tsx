"use client"
import { Button } from '@/components/ui/button';
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
                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-1.5 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
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
                            className="flex flex-col  items-center justify-center rounded-md border-2 border-muted bg-popover p-1.5 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <Building2Icon className='mx-2' />
                            Business
                        </label>
                    </div>
                    <div>
                        <RadioGroupItem value="DELIVERY" id="DELIVERY" className="peer sr-only" />
                        <label
                            htmlFor="DELIVERY"
                            className="flex flex-col  items-center justify-center rounded-md border-2 border-muted bg-popover p-1.5 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
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
                <div className="relative">
                    <Input
                        // type={showPassword ? "text" : "password"}
                        type={password}
                        name="password"
                        value={password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        placeholder="Enter your password"
                        className={`p-2 border rounded w-full ${errors.password ? "border-red-500" : ""}`}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-2"
                    // onClick={() => setShowPassword(!showPassword)}
                    >
                        {/* {showPassword ? "Hide" : "Show"} */}
                    </Button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div >
                <label>Confirm Password</label>
                <div className="relative">
                    <Input
                        // type={showPassword ? "text" : "password"}
                        type={password}
                        name="confirmPassword"
                        disabled={password === ""}
                        value={confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                        placeholder="Confirm password"
                        className={`p-2 border rounded w-full ${errors.confirmPassword ? "border-red-500" : ""}`}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-2"
                    // onClick={() => setShowPassword(!showPassword)}
                    >
                        {/* {showPassword ? "Hide" : "Show"} */}
                    </Button>
                </div>
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
