"use client";

import React, { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { showToast } from "@/lib/utilities/toastService";
import { doOTPVerifyLogin } from "@/lib/action/authAction";
import { getSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { useSearchParams } from "next/navigation";
import { UniversalTextLoading } from "../loaders/UniversalTypingLoader";
import Image from "next/image";

const GoogleLoginButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}auth/google/login/`,
          {
            access_token: tokenResponse.access_token,
          }
        );

        const data = response?.data?.data;
        if (
          data?.user_details.country === null ||
          data?.user_details.user_type === null ||
          data?.user_details.gender === null
        ) {
          sessionStorage.setItem("newuser", "true");
        }

        try {
          const formData = new FormData();
          formData.append("token", data?.access);
          formData.append("refresh", data?.refresh);

          const loginResponse = await doOTPVerifyLogin(formData);
          if (loginResponse?.success) {
            showToast("Login successful!", "success");
            const session = await getSession();
            if (session?.user?.userDetails?.membership === false) {
              localStorage.setItem("membership", "false");
            } else {
              localStorage.removeItem("membership");
            }

            if (
              session?.user?.userDetails?.user_type === "BUSINESS" &&
              session?.user?.userDetails?.exists_business_profile === false
            ) {
              localStorage.setItem("business_setup", "false");
            } else {
              localStorage.removeItem("business_setup");
            }

            const callbackUrl = searchParams.get("callbackUrl");
            window.location.href = callbackUrl ?? "/dashboard";
          } else {
            throw new Error("Invalid credentials");
          }
        } catch {
          throw new Error(
            "Your account is verified, but login failed. Please try again."
          );
        }
      } catch (error: any) {
        showToast(
          error?.response?.data?.non_field_errors[0] ||
            error.response?.data?.message ||
            error?.message ||
            "Google login failed. Please try again.",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      alert("Google login failed. Please try again.");
    },
    flow: "implicit", // or 'auth-code' if your backend supports the authorization code flow
  });

  return (
    <>
      {/* <button
        type="button"
        className="w-10 h-10 rounded-full bg-black text-yellow-400 border border-yellow-400 flex items-center justify-center text-lg cursor-pointer transition-all hover:bg-yellow-400 hover:text-black hover:-translate-y-1"
        onClick={() => login()}
      >
        G
      </button> */}
      <div className="w-10 h-10 rounded-full bg-black text-yellow-400 border border-yellow-400 flex items-center justify-center text-lg cursor-pointer transition-all hover:bg-yellow-400 hover:text-black hover:-translate-y-1"
      onClick = {() => login()}
      >
        <Image
          src={"/images/svg/google.svg"}
          alt="google logo"
          width={100}
          height={100}
          className="w-5 h-5"
        />
      </div>

      {isLoading && (
        <UniversalTextLoading
          messages={[
            "Logging you into your account...",
            "Verifying your identity...",
            "Setting up your session...",
            "Preparing your dashboard...",
            "Almost there...",
          ]}
          pauseTime={10000}
          speed={200}
        />
      )}
    </>
  );
};

const GoogleLoginComponent: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID!}>
      <GoogleLoginButton />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
