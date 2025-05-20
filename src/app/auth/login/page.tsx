
// pages/login.tsx
"use client";
import LoginForm from "@/components/form/moredealsclub/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {


  return (


    <div className="max-w-md mx-auto  bg-white dark:bg-zinc-900 rounded-lg border border-yellow-400 shadow-xl p-8">
      <Suspense>
        <LoginForm />
      </Suspense>

    </div>

  );
}
