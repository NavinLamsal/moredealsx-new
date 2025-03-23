"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { showToast } from '@/lib/utilities/toastService';
import { removePrefix } from '@/lib/utils';
import { validateConfrimPassword, validatePassword } from '@/lib/validation/common';
import React, { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux';

const ChangePasswordForm = () => {

    const dispatch = useDispatch();
    const [formData, setFormData]= useState({
        password:"",
        confirmPassword:"",
    })
    const [storedData, setStoredData]=useState({
        email: "",
    phone: "",
    via: "",
    prefix: "",
    })
    const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string, }>({});
    const [serverErrors, setServerErrors]=useState("");
    const [isLoading, setIsLoading]= useState(false);

     useEffect(() => {
        if (typeof window !== "undefined") {
          const storedUsername = localStorage.getItem("forget_username");
          if (storedUsername) {
            setStoredData((prev) => ({ ...prev, ...JSON.parse(storedUsername) }));
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
                  password:formData.password,
                  confirm_password:formData.confirmPassword  
              };
        
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}auth/reset/password/`,
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

        // dispatch(nextStep());
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-2'>
            <div>
                <label>Password</label>
                <div className="relative">
                    <Input
                        // type={showPassword ? "text" : "password"}
                        type={"password"}
                        name="password"
                        value={formData.password}
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
                        type={"password"}
                        name="confirmPassword"
                        disabled={formData.password === ""}
                        value={formData.confirmPassword}
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

export default ChangePasswordForm
