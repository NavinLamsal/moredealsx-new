import ForgetPasswordForm from "@/components/form/moredealsclub/auth/forgetPassword/ForgetPasswordForm";
import OTPVerifyForm from "@/components/form/moredealsclub/OTPVerifyForm";
import AuthHeaders from "@/layout/authHeaders";
import Image from "next/image";
import { Suspense } from "react";



export default async function OtpVerifyPage() {
 
  return (
    // <div className="grid min-h-svh lg:grid-cols-2">
       <div className="max-w-md mx-auto  bg-white dark:bg-zinc-900 rounded-lg border border-yellow-400 shadow-xl p-8">
            <Suspense>
            <OTPVerifyForm />
            </Suspense>
      
          </div>
       
        
     
  )
}

