"use client";

import React, { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { showToast } from "@/lib/utilities/toastService";
// import { doOTPVerifyLogin } from "@/lib/action/authAction";
import { getSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { useSearchParams } from "next/navigation";
import { UniversalTextLoading } from "../loaders/UniversalTypingLoader";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserDetails } from "@/lib/action/authAction";
import { setTokenCookie } from "@/lib/utils/access";

const GoogleLoginButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}auth/google/login/`,
          {
            access_token: tokenResponse.access_token,
          },
          {
            withCredentials: true,
          }
        );


        

        const data = response?.data?.data;
        if (
          data?.country === null ||
          data?.user_type === null ||
          data?.gender === null
        ) {
          sessionStorage.setItem("newuser", "true");
        }
        dispatch({
          type: "SET_USER",
          payload: data,
        });

        setTokenCookie("xaccess_token", data.access_token);
        setTokenCookie("xrefresh_token", data.refresh_token , 60 * 60 * 24 * 7);
        
        queryClient.refetchQueries({ queryKey: ["user"] });


        const user = await fetchUserDetails();
        const { user_type, exists_business_profile, membership, country } = user;

        if (membership === false) localStorage.setItem("membership", "false");
        else localStorage.removeItem("membership");

        if (user_type === "BUSINESS" && exists_business_profile === false) {
          localStorage.setItem("business_setup", "false");
        } else {
          localStorage.removeItem("business_setup");
        }
        setIsLoading(false);
        showToast("Login successful!", "success");
        const callbackUrl = searchParams.get("callbackUrl");
        window.location.href = callbackUrl ?? "/dashboard";
      } catch (error: any) {
        console.log("error",error.response.data.message);
        showToast(error?.response?.data?.message ||
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
    onError: (e) => {
      console.log("Login failed!", e);
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
      <div
        onClick={() => login()}
        className="flex items-center justify-center "
      >
        <div className="flex items-center gap-2 rounded-full bg-black text-yellow-400 border border-yellow-400 text-lg cursor-pointer transition-all hover:bg-yellow-400 hover:text-black hover:-translate-y-1 p-2">
          <Image
            src={"/images/svg/google.svg"}
            alt="google logo"
            width={100}
            height={100}
            className="w-5 h-5"
          />
          <p className="text-sm">Sign in with Google</p>
        </div>
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
