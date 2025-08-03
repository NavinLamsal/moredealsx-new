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

  )
}

