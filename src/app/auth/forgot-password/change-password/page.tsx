import ChangePasswordForm from "@/components/form/moredealsclub/auth/forgetPassword/ChangePassword";
// import OTPVerifyForm from "@/components/form/moredealsclub/auth/forgetPassword/OTPVerify";
// import AuthHeaders from "@/layout/authHeaders";
// import Image from "next/image";
import { Suspense } from "react";



export default async function ChangePasswordPage() {

  return (
    <div className="max-w-md mx-auto  bg-white dark:bg-zinc-900 rounded-lg border border-yellow-400 shadow-xl p-8">
      <Suspense>
        <ChangePasswordForm />
      </Suspense>
    </div>


    // <div className="grid min-h-svh lg:grid-cols-2">

    //   <div className="flex flex-col gap-4 p-6 md:p-10 ">
    //     <AuthHeaders/>
    //     <div className="flex flex-1 items-center justify-center">
    //       <div className="w-full max-w-96">
    //         <ChangePasswordForm />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="relative hidden bg-muted  lg:block">
    //     <Image
    //       fill        
    //       src="/images/png/login.png"
    //       alt="login"
    //       className="absolute inset-0 h-full w-full object-cover "
    //     />
    //   </div>
    // </div>
  )
}

