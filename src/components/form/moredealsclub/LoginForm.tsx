
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneIcon, MailIcon } from "lucide-react";
import PhoneNumberInput from "@/components/ui/customInputs/PhoneNumberInput";
import { doCredentialLogin } from "@/lib/action/authAction";
import { createServerPlatformAxiosInstance } from "@/lib/axios/platformBasedAxios";
import { showToast } from "@/lib/utilities/toastService";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getSession } from "next-auth/react";


// const CheckUserName = async (username: string) => {
//   try {
//     const res = await createServerPlatformAxiosInstance("moredealsclub",false).post(`auth/check/user/`, {
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
    const res = await createServerPlatformAxiosInstance("moredealsclub", false).post(`auth/check/user/`, payload

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

const validatePhoneNumber = async (phone: string, prefix?: string) => {
  if (!phone.match(/^[0-9]+$/)) return "";
  return await CheckUserName(phone , prefix);
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
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();

  const validate = async () => {
    const tempErrors: { [key: string]: string } = {};
    if (isEmailLogin) {
      tempErrors.email = await validateEmail(formData.email) || "";
    } else {
      tempErrors.phone = await validatePhoneNumber(formData.phone, formData.phone_prefix) || "";
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

  const handlePhoneNumberChange = (data: any) => {
    setFormData({
      ...formData,
      phone: data.fullNumber,
      phone_prefix: data.prefix
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
    try {
      const formDatas = new FormData();
      formDatas.append("password", formData.password);
      formDatas.append("via", isEmailLogin ? "email" : "phone_number")
      if (!isEmailLogin) {
        formDatas.append("phone_prefix", formData.phone_prefix)
        formDatas.append("phone_number", formData.phone)
      } else {
        formDatas.append("email", formData.email)
      }
      const response = await doCredentialLogin(formDatas);

      if (response?.success) {
        showToast("Login successful!", "success");
        const session = await getSession();
        if(session?.user?.userDetails?.is_pin_set === false){
          localStorage.setItem("pinset", "false");
        }

        if(session?.user?.userDetails?.user_type ==="BUSINESS"){
          if(session.user.userDetails?.exists_business_profile === false){
            localStorage.setItem("business_setup", "false");
          }
        }
        
        const callbackUrl = searchParams.get("callbackUrl");
        window.location.href = callbackUrl ?? "/dashboard";
      } else {
        throw new Error(response.error || "Invalid credentials");
      }
    } catch (error) {
      setServerErrors(error instanceof Error ? error.message : "Login failed");
      showToast(error instanceof Error ? error.message : "Login failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-center text-xl font-semibold mb-4">Login to Your Account</h2>
      <p className="text-center text-sm text-muted-foreground">
        Enter your {isEmailLogin ? "email" : "phone number"} below to login to your account
      </p>
      {serverErrors &&
        <p className="text-center text-sm text-red-600 p-2 bg-red-200">
          {serverErrors}
        </p>

      }
      {isEmailLogin ? (
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

      <div>
        {/* <label className="block font-medium mb-1">Password</label> */}
        <div className="flex items-center">
          <label htmlFor="password">Password</label>
        </div>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`p-2 border rounded w-full ${errors.password ? "border-red-500" : ""}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <p className="w-full flex">
        <Link
          href="/auth/forgot-password"
          className="ml-auto text-sm underline-offset-4 hover:underline text-right w-full"
        >
          Forgot your password?
        </Link>

      </p>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>

      <div className="text-center text-sm my-4">
        <Button
          variant="outline"
          onClick={(e) => { e.preventDefault(); setIsEmailLogin(!isEmailLogin) }}
          className="flex items-center gap-2 justify-center w-full"
        >
          {isEmailLogin ? <PhoneIcon size={18} /> : <MailIcon size={18} />}
          {isEmailLogin ? "Login with Phone Number" : "Login with Email"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link href="/auth/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
