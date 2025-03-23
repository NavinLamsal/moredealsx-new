import ForgetPasswordForm from "@/components/form/moredealsclub/auth/forgetPassword/ForgetPasswordForm";
import AuthHeaders from "@/layout/authHeaders";
import { getMetadata } from "@/lib/action/PubilcCommon";
import { CompanyMeta } from "@/lib/type/CommonType";
import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image";



export default async function LoginPage() {
 
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
        
      <div className="flex flex-col gap-4 p-6 md:p-10 ">
        <AuthHeaders/>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-96">
            <ForgetPasswordForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted  lg:block">
        <Image
          fill        
          src="/images/png/login.png"
          alt="login"
          className="absolute inset-0 h-full w-full object-cover "
        />
      </div>
    </div>
  )
}

