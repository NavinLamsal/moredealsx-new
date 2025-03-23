
import  LoginForm  from "@/components/form/moredealsclub/LoginForm"
import AuthHeaders from "@/layout/authHeaders";
import { getMetadata } from "@/lib/action/PubilcCommon";
import { CompanyMeta } from "@/lib/type/CommonType";
import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image";
import { Suspense } from "react";



export default async function LoginPage() {
  const MetaDatas : CompanyMeta = await getMetadata();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 ">
          <AuthHeaders/>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs sm:max-w-96">
            <Suspense fallback={<div>Loading...</div>}>

            <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          fill        
          src="/images/png/login.png"
          alt="login"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

