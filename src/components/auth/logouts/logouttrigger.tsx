"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import LogoutDialog from "./logoutDialog";
import { setCookie } from "cookies-next/client";
import { LogOut } from "lucide-react";

interface LogoutTriggerProps {
  triggerType?: "button" | "dropdown";
  label?: string;
  className?: string;
}

const LogoutTrigger = ({
  triggerType = "button",
  label = "Logout",
  className,
}: LogoutTriggerProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    console.log("Logout Trigger Clicked");
    setCookie("accessToken", "7", )
    setOpen(true);
  };

  if (triggerType === "dropdown") {
    // Used inside a dropdown menu (DropdownMenuItem)
    return (
      <>
        <div onClick={handleClick} className="cursor-pointer flex items-center gap-2 py-2 pl-2"><LogOut size={20}/> {label}</div>
        <LogoutDialog open={open} onOpenChange={setOpen} />
      </>
    );
  }

  return (
    <>
      <Button className={className} onClick={handleClick}>
        {label}
      </Button>
      <LogoutDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export default LogoutTrigger;
