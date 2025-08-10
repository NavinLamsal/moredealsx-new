"use client";
import React, { useEffect, useState } from "react";
import MenuDropdown from "./MenuDropdown";
import { ModeToggle } from "@/components/ui/themeToggle";
import NotificationDropDown from "./notification-drop";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import MobileMenuDropdown from "./mobilemenudropdown";
import { useAuth } from "@/providers/auth-provider";
import { getCookie } from "cookies-next/client";

const AuthNavbarContent = ({ header }: { header?: boolean }) => {
  const { user, isLoading } = useAuth();


  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button variant="outline" className="text-white sm:block hidden">
          Loading...
        </Button>
      </div>
    );
  }


 if (!user) {
    return (
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Link href={"/auth/login"}>
          <Button variant="outline" className="text-white sm:block hidden">
            Login
          </Button>
          <LogIn
            color="white"
            strokeWidth={1.5}
            size={28}
            className="sm:hidden block"
          />
        </Link>
        <Link href={"/auth/register"}>
          <Button variant="default" className="hidden sm:block">
            Register
          </Button>
        </Link>
      </div>
    );
  } else {
    const users = {
      name: `${user?.first_name} ${user?.last_name}`,
      email: `${
        user?.email === ""
          ? user?.phone_prefix +
            " " +
            user?.phone_number
          : user?.email
      }`,
      avatar: `${user?.display_picture}`,
    };

    return (
      <div className="flex items-center gap-2">
       
        
        {
          <div className="hidden lg:flex gap-2 items-center">
            <NotificationDropDown header={header} />
            <ModeToggle />
            <MenuDropdown header={header} />
          </div>
        }
        <div className="flex lg:hidden gap-2 items-center">
          <MobileMenuDropdown header={header} />
        </div>
      </div>
    );
  }
};

export default AuthNavbarContent;
