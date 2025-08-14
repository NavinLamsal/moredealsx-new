"use client";
import React, { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneIcon, MailIcon } from "lucide-react";
import PhoneNumberInput from "@/components/ui/customInputs/PhoneNumberInput";
import { fetchUserDetails } from "@/lib/action/authAction";

import { showToast } from "@/lib/utilities/toastService";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PasswordField from "@/components/ui/customInputs/PasswordInput";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import GoogleLoginComponent from "@/components/auth/GoogleLoginComponent";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePrefix } from "@/lib/utils";
import { setTokenCookie } from "@/lib/utils/access";

export const CheckUserName = async (username: string, prefix?: string) => {
  const isEmail = (username: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
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
      payload = {
        phone_number: phoneWithoutPrefix,
        phone_prefix: prefix,
        via: "phone_number",
      };
    } else {
      return "Please enter a valid phone number";
    }
  } else {
    payload = { username };
  }
  try {
    const res = await MoreClubApiClient.post(`auth/check/user/`, payload);
    if (res.status === 200) {
      return "Username not Found";
    }
  } catch (error: any) {
    if (
      error.response.data?.errors?.non_field_errors[0] ===
      "Email already exists." ||
      error.response.data?.errors?.non_field_errors[0] ===
      "Phone number already exists."
    ) {
      return "";
    } else {
      return error.response.data?.errors?.non_field_errors[0];
    }
  }
};

const validateEmail = async (email: string) => {
  const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailpattern.test(email)) {
    return "Invalid email";
  }
  return await CheckUserName(email);
};

const validatePhoneNumber = async (phone: string, prefix?: string) => {
  if (!phone.match(/^[0-9]+$/)) return "";
  return await CheckUserName(phone, prefix);
};



const LoginForm: React.FC = () => {
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    phone_prefix: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverErrors, setServerErrors] = useState(""); // Server errors
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const formDatas = new FormData();
      formDatas.append("password", formData.password);
      formDatas.append("via", isEmailLogin ? "email" : "phone_number");
      if (!isEmailLogin) {
        formDatas.append("phone_prefix", formData.phone_prefix);
        formDatas.append("phone_number", removePrefix(formData.phone, formData.phone_prefix));
      } else {
        formDatas.append("email", formData.email);
      }
  
      const res = await api.post(`auth/login/`, formDatas);
      console.log("Login response:", res.data);

      return res.data;
    },
  
    onSuccess: async (res: any) => {
      console.log("Login success:", res);
      if (!res?.success) {
        throw new Error(res?.error || "Invalid credentials");
      }
      
      setTokenCookie("xaccess_token", res?.data.access_token);
      setTokenCookie("xrefresh_token", res?.data.refresh_token);

      
      queryClient.refetchQueries({ queryKey: ["user"] });

      
      const user = await fetchUserDetails(); // same as session?.user.userDetails
      const { user_type, exists_business_profile, membership, country } = user;
  
      // Save additional user states if needed
      if (membership === false) localStorage.setItem("membership", "false");
      else localStorage.removeItem("membership");
  
      if (user_type === "BUSINESS" && exists_business_profile === false) {
        localStorage.setItem("business_setup", "false");
      } else {
        localStorage.removeItem("business_setup");
      }
      setIsLoading(false);
      showToast("Login successful!", "success");
      // const callbackUrl = searchParams.get("callbackUrl");
      // window.location.href = callbackUrl ?? "/dashboard";
    },
  
    onError: (error: any) => {
      console.error("Login error:", error);
      const message = error.response.data.errors.non_field_errors[0] ||error.response.data.message || "Login failed!";
      setServerErrors(message);
      showToast(message, "error");
      setIsLoading(false);
    },
  });
  

  const validate = async () => {
    const tempErrors: { [key: string]: string } = {};
    if (isEmailLogin) {
      tempErrors.email = (await validateEmail(formData.email)) || "";
    } else {
      tempErrors.phone =
        (await validatePhoneNumber(formData.phone, formData.phone_prefix)) ||
        "";
    }

    tempErrors.password = "";
    // tempErrors.password = validatePassword(formData.password) || "";

    setErrors(tempErrors);
    return Object.keys(tempErrors).every((key) => !tempErrors[key]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const handlePassword = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handlePhoneNumberChange = (data: any) => {
    setFormData({
      ...formData,
      phone: data.fullNumber,
      phone_prefix: data.prefix,
    });
    setErrors({ ...errors, phone: "" });
  };




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    if (!(await validate())) {
      showToast("Please fix the errors in the form.", "error");
      setIsLoading(false);
      return;
    }
    loginMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-center text-2xl font-semibold text-primary mb-4">
        MEMBER LOGIN
      </h2>
      <p className="text-center text-sm text-muted-foreground">
        Access your exclusive deals and savings
      </p>
      <p className="text-center text-sm text-muted-foreground">
        Enter your {isEmailLogin ? "email" : "phone number"} below to login to
        your account
      </p>
      {serverErrors && (
        <p className="text-center text-sm text-red-600 p-2 bg-red-200">
          {serverErrors}
        </p>
      )}
         <div className="flex justify-center gap-4">
           <Suspense fallback={<div>Loading...</div>}>
            <GoogleLoginComponent />
          </Suspense> 
          {/* <button
            type="button"
            className="w-10 h-10 rounded-full bg-black text-yellow-400 border border-yellow-400 flex items-center justify-center text-lg cursor-pointer transition-all hover:bg-yellow-400 hover:text-black hover:-translate-y-1"
          >
            F
          </button> */}
        </div>

        <div className="my-8 text-center">
        <p className="relative text-gray-400 mb-4 before:absolute before:top-1/2 before:left-0 before:w-1/4 sm:before:w-1/4 before:h-px before:bg-gray-700 after:absolute after:top-1/2 after:right-0 after:w-1/4 sm:after:w-1/4 after:h-px after:bg-gray-700">
          or continue with
        </p>
       
      </div>


      {isEmailLogin ? (
        <div>
          <label className="block font-medium mb-1">Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="m@example.com"
            className={`p-2 border rounded w-full ${errors.email ? "border-red-500" : ""
              }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
      ) : (
        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <PhoneNumberInput
            onChange={handlePhoneNumberChange}
            initialValue={formData.phone}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
      )}

      <div>
        <div className="flex items-center">
          <label htmlFor="password">Password</label>
        </div>
        <PasswordField
          name="password"
          value={formData.password}
          onChange={(val) => handlePassword("password", val)}
          placeholder="Enter your password"
          error={errors.password}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <p className="w-full flex">
        <Link
          href="/auth/forgot-password"
          className="ml-auto text-foreground text-sm underline-offset-4 hover:underline text-right w-full"
        >
          Forgot your password?
        </Link>
      </p>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login to your account"}
      </Button>

      <div className="text-center text-sm my-4">
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            setIsEmailLogin(!isEmailLogin);
          }}
          className="flex items-center gap-2 justify-center w-full"
        >
          {isEmailLogin ? <PhoneIcon size={18} /> : <MailIcon size={18} />}
          {isEmailLogin ? "Login with Phone Number" : "Login with Email"}
        </Button>
      </div>
      

      <div className="mt-8 p-6 bg-yellow-500/25 border-l-2 border-primary rounded-s-sm">
        <h3 className="text-primary font-semibold mb-2">
          MOREDEALSX MEMBER BENEFITS
        </h3>
        <p className="text-muted-foreground text-xs">
          {" "}
          As a member, you get access to exclusive deals, premium discounts, and
          golden ticket offers across restaurants, salons, hotels and more.
        </p>
      </div>

      <div className="text-center text-sm text-foreground">
        Don't have an account?{" "}
        <Link
          href="/auth/register"
          className="underline underline-offset-4 text-primary"
        >
          Register here
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
