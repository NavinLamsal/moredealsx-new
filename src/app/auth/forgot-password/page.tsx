import ForgetPasswordForm from "@/components/form/moredealsclub/auth/forgetPassword/ForgetPasswordForm";
import AuthHeaders from "@/layout/authHeaders";
import { getMetadata } from "@/lib/action/PubilcCommon";
import { CompanyMeta } from "@/lib/type/CommonType";
import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image";
import { Suspense } from "react";



export default async function LoginPage() {
 
  return (

     <div className="max-w-md mx-auto  bg-white dark:bg-zinc-900 rounded-lg border border-yellow-400 shadow-xl p-8">
                <Suspense>
                <ForgetPasswordForm />
                </Suspense>
          
              </div>
   
  )
}

