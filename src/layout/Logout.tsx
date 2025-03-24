"use client"
// import { doLogout } from "@/app/actions/authAction";
import React from "react";

import { LogOut } from "lucide-react";
import { signOut } from "@/auth";
import { doLogout } from "@/lib/action/authAction";

const Logout = () => {
  const handleLogout = async () => {
     const currentHost = window.location.origin;
     await doLogout();
  }

  return (
    <div className="w-full ">
     
      <button
       
        onClick={handleLogout}
        className="flex items-center gap-2"
      >
       <LogOut size={16}/> LogOut
      </button>
     
    </div>
  );
};

export default Logout;
