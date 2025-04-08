
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneIcon, MailIcon } from "lucide-react";
import PhoneNumberInput from "@/components/ui/customInputs/PhoneNumberInput";
import { createServerPlatformAxiosInstance } from "@/lib/axios/platformBasedAxios";
import { showToast } from "@/lib/utilities/toastService";
import { removePrefix } from "@/lib/utils";
import axios from "axios";


// const CheckUserName = async (username: string) => {
//   try {
//     const res = await createServerPlatformAxiosInstance("moredealsclub",false).post(`auth/check/username/`, {
//       username: `${username}`,
//     });
//     if (res.status === 200) {
//       return "Username not found";
//     }
//   } catch (error:any) {
//     if (error.response.data?.errors?.username[0] === "Already Exists") {
//       return ""; 
//     } else {
//       return error.response.data?.errors?.username[0];
//     }
//   }
// }


export const CheckUserName = async (username: string, prefix?: string) => {
  const isEmail = (username: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
  const isPhoneNumber = (username: string) => /^[1-9]\d{9,14}$/.test(username); // Ensures 10-15 digit numbers

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
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}auth/check/user/`, payload

    );
    if (res.status === 200) {
      return "Username not Found";
    }
  } catch (error: any) {
    if (error.response.data?.errors?.non_field_errors[0] === "Email already exists." || error.response.data?.errors?.non_field_errors[0] === "Phone number already exists.") {
      return "";
    } else {
      return error.response.data?.errors?.non_field_errors[0]
    }
  }

}

const validateEmail = async (email: string) => {
  const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailpattern.test(email)) {
    return "Invalid email";
  }
  return await CheckUserName(email);
};

const validatePhoneNumber = async (phone: string, prefix: string) => {
  if (!phone.match(/^[1-9]\d{9,14}$/)) return "";
  return await CheckUserName(phone , prefix);
};


const ForgetPasswordForm: React.FC = () => {
  const [isEmailForget, setIsEmailForget] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    prefix:"",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverErrors, setServerErrors] = useState(""); // Server errors
  const [isLoading, setIsLoading] = useState(false);

  const validate = async() => {
    const tempErrors: { [key: string]: string } = {};
    if (isEmailForget) {
      tempErrors.email = await validateEmail(formData.email) || "";
    } else {
      tempErrors.phone = await validatePhoneNumber(formData.phone, formData.prefix) || "";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).every((key) => !tempErrors[key]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handlePhoneNumberChange = (data: any) => {
    setFormData({
      ...formData,
      phone: data.fullNumber,
      prefix: data.prefix
    });
       setErrors({ ...errors, phone: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!await validate()) {
      showToast("Please fix the errors in the form.", "error");
      return;
    }

    setIsLoading(true);
    const payload ={
      via: isEmailForget ? "email": "phone_number",
              ...(isEmailForget
                ? { email: formData.email }
                : {
                    phone_number: await removePrefix(formData.phone, formData.prefix),
                    phone_prefix: formData.prefix,
                  }),
    }
    console.log("payload", payload)

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}auth/forget/password/`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        }
      );
      
      const res = await response.json();
        
      if (res.success === true) {
              showToast(`${isEmailForget ? "Email": "Phone Number"} verified Successfully!`, "success");
              localStorage.setItem("forget_username", JSON.stringify(payload));
              window.location.href="/auth/forgot-password/otp-verify/"
            } else {
              // ✅ Handle errors gracefully and show toast
              const errorMessage =
                res.errors?.non_field_errors?.[0] ||
                res.message ||
                `Failed to verify ${isEmailForget ? "Email": "Phone Number"}. Please try again.`;
              throw new Error(errorMessage);
            }
    } catch (error) {
      setServerErrors(error instanceof Error ? error.message : `Invalid ${isEmailForget ? "Email": "Phone Number"}`);
      showToast(error instanceof Error ? error.message : `Invalid ${isEmailForget ? "Email": "Phone Number"}` , "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-center text-xl font-semibold mb-4">Change your account Password</h2>
      <p className="text-center text-sm text-muted-foreground">
          Enter your {isEmailForget ? "email" : "phone number"} below to Change your account password
        </p>
        {serverErrors &&
        <p className="text-center text-sm text-red-600 p-2 bg-red-200">
          {serverErrors}
        </p>
        
        }
      {isEmailForget ? (
        <div>
          <label className="block font-medium mb-1">Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="m@example.com"
            className={`p-2 border rounded w-full ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
      ) : (
        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <PhoneNumberInput
          onChange={handlePhoneNumberChange}
          initialValue={formData.phone}
        />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Searching..." : "Proceed"}
      </Button>

      <div className="text-center text-sm my-4">
        <Button
          variant="link"
          onClick={() => setIsEmailForget(!isEmailForget)}
          className="flex items-center gap-2 justify-center"
        >
          {isEmailForget ? <PhoneIcon size={18} /> : <MailIcon size={18} />}
          {isEmailForget ? "Change with Phone Number" : "Change with Email"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Don't have an account?{" "}
        <a href="/auth/registration" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/auth/login" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  );
};

export default ForgetPasswordForm;