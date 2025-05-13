
// import  LoginForm  from "@/components/form/moredealsclub/LoginForm"
// import AuthHeaders from "@/layout/authHeaders";
// import { getMetadata } from "@/lib/action/PubilcCommon";
// import { CompanyMeta } from "@/lib/type/CommonType";
// import { GalleryVerticalEnd } from "lucide-react"
// import Image from "next/image";
// import { Suspense } from "react";



// export default async function LoginPage() {
//   const MetaDatas : CompanyMeta = await getMetadata();
//   return (
//     <div className="grid min-h-svh lg:grid-cols-2">
//       <div className="flex flex-col gap-4 p-6 md:p-10 ">
//           <AuthHeaders/>
//         <div className="flex flex-1 items-center justify-center">
//           <div className="w-full max-w-xs sm:max-w-96">
//             <Suspense fallback={<div>Loading...</div>}>

//             <LoginForm />
//             </Suspense>
//           </div>
//         </div>
//       </div>
//       <div className="relative hidden bg-muted lg:block">
//         <Image
//           fill        
//           src="/images/png/login.png"
//           alt="login"
//           className="absolute inset-0 h-full w-full object-cover"
//         />
//       </div>
//     </div>
//   )
// }


// pages/login.tsx
"use client";
import LoginForm from "@/components/form/moredealsclub/LoginForm";
import { Suspense, useEffect, useState } from "react";

type Particle = {
  id: number;
  size: number;
  left: string;
  top: string;
  duration: number;
};

export default function LoginPage() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = 30;
    const generatedParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 3 + 2;
      const left = `${Math.random() * 100}vw`;
      const top = `${Math.random() * 100}vh`;
      const duration = Math.random() * 20 + 10;

      generatedParticles.push({
        id: i,
        size,
        left,
        top,
        duration,
      });
    }

    setParticles(generatedParticles);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-yellow-400 rounded-full z-0"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            top: p.top,
            animation: `float ${p.duration}s linear infinite`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-200 transform rotate-45 shadow-lg relative mr-4">
            <div className="absolute inset-2 bg-black"></div>
            <div className="absolute inset-[20%] bg-gradient-to-br from-yellow-400 to-yellow-200"></div>
          </div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-md">
            MOREDEALSX
          </h1>
        </div>

        {/* Login Box */}
        <div className="max-w-md mx-auto  bg-white dark:bg-zinc-900 rounded-lg border border-yellow-400 shadow-xl p-8">
          <Suspense>
          <LoginForm />
          </Suspense>
          
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-30px) scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
