
import OTPVerifyForm from "@/components/form/moredealsclub/OTPVerifyForm";

import { Suspense } from "react";



export default async function OtpVerifyPage() {
 
  return (
  
       <div className="max-w-md mx-auto  bg-white dark:bg-zinc-900 rounded-lg border border-yellow-400 shadow-xl p-8">
            <Suspense>
            <OTPVerifyForm />
            </Suspense>
      
          </div>
       
        
     
  )
}

