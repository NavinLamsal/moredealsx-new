"use client"
// import { doLogout } from "@/app/actions/authAction";
import React from "react";

import { LogOut } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";


const Logout = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const handleLogout = async () => {

    logout?.mutate(undefined, {
      onSuccess: () => router.push("/authlogin"),
    })
  }

  return (
    <div className="w-full ">
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 w-full"
      >
        <LogOut size={16} /> LogOut
      </button>
    </div>
  );
};

export default Logout;
