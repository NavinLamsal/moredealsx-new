"use client";

import React from "react";
import MenuDropdown from "./MenuDropdown";
import { ModeToggle } from "@/components/ui/themeToggle";
import NotificationDropDown from "./notification-drop";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import MobileMenuDropdown from "./mobilemenudropdown";

const AuthNavbarContent = ({ header }: { header?: boolean }) => {
  const { data: session } = useSession();

  if (!session) {
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
      name: `${session?.user?.userDetails?.first_name} ${session?.user?.userDetails?.last_name}`,
      email: `${
        session?.user?.userDetails?.email === ""
          ? session?.user?.userDetails?.phone_prefix +
            " " +
            session?.user?.userDetails?.phone_number
          : session?.user?.userDetails?.email
      }`,
      avatar: `${session?.user?.userDetails?.display_picture}`,
    };

    return (
      <div className="flex items-center gap-2">
       
        
        {
          <div className="hidden lg:flex gap-2 items-center">
            <NotificationDropDown header={header} />
            <ModeToggle />
           
          </div>
        }
          <MobileMenuDropdown header={header} />
      </div>
    );
  }
};

export default AuthNavbarContent;
