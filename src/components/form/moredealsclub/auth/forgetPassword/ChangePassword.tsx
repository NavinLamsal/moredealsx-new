"use client"
import { Button } from '@/components/ui/button';
import PasswordField from '@/components/ui/customInputs/PasswordInput';
import { Input } from '@/components/ui/input';
import { showToast } from '@/lib/utilities/toastService';
import { removePrefix } from '@/lib/utils';
import { validateConfrimPassword, validatePassword } from '@/lib/validation/common';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const ChangePasswordForm = () => {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [storedData, setStoredData] = useState({
        email: "",
        phone: "",
        via: "",
        prefix: "",
    })
    const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string, }>({});
    const [serverErrors, setServerErrors] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUsername = localStorage.getItem("forget_username");
            if (storedUsername) {
                const parsedstoredUsername = JSON.parse(storedUsername);
                setStoredData((prev) => ({ ...prev, email: parsedstoredUsername.email, phone: parsedstoredUsername.phone_number, via: parsedstoredUsername.via, prefix: parsedstoredUsername.phone_prefix }));
            }
        }

    }, []);


    const handleChange = (field: string, value: string | boolean) => {
        setFormData({ ...formData, [field]: value });
        setErrors({ ...errors, [field]: validateField(field, value) });
    };



    const validate = async (fieldValues = formData) => {

        // Explicitly define tempErrors as a dynamic object
        const tempErrors: Record<string, string> = { ...errors };


        if ("password" in fieldValues) {
            tempErrors.password = validatePassword(fieldValues.password || "");
        }

        if ("confirmPassword" in fieldValues) {
            if (formData.password !== "") {
                tempErrors.confirmPassword = validateConfrimPassword(formData.password, fieldValues.confirmPassword || "");
            }
        }
        setErrors(tempErrors);
        return Object.values(tempErrors).every((error) => !error);
    };


    const validateField = (name: string, value: string | boolean) => {
        switch (name) {
            case "password":
                return validatePassword(value as string);
            case "confirmPassword":
                return validateConfrimPassword(formData.password, value as string);
            default:
                return "";
        }
    };


    const handleBack = async (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.removeItem("forget_username");
        localStorage.getItem("forget_code");
        window.location.href = "/auth/forgot-password/";
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!(await validate())) {

            return;
        }

        try {
            const payload = {
                code: localStorage.getItem("forget_code"),
                via: storedData.via,
                ...(storedData.via === "email"
                    ? { email: storedData.email }
                    : {
                        phone_number: removePrefix(storedData.phone, storedData.prefix),
                        phone_prefix: storedData.prefix,
                    }),
                password: formData.password,
                confirm_password: formData.confirmPassword
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}auth/reset/password/`,
                {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: { "Content-Type": "application/json" },
                }
            );
            const data = await response.json();
            if (data?.success) {
                showToast("Password Changed Successfully!", "success");

                window.location.href = "/auth/login"
            } else {
                throw new Error(data?.errors?.non_field_errors?.[0] || data?.message || "Invalid request");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Invalid request";
            setServerErrors(errorMessage);
            showToast(errorMessage, "error");
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-2'>
            <div>
                <label>Password</label>
                <PasswordField
                    name="password"
                    value={formData.password}
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
                    value={formData.confirmPassword}
                    onChange={(val) => handleChange("confirmPassword", val)}
                    placeholder="Confirm your password"
                    error={errors.confirmPassword}
                    disabled={formData.password === ""}
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

export default ChangePasswordForm
