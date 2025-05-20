"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogout?: () => void;
}

const LogoutDialog = ({ open, onOpenChange, onLogout }: LogoutDialogProps) => { 

 const handleLogout = async (onLogout?: () => void) => {
    // Remove localStorage items
    const localKeys = [
      "token",
      "business_setup",
      "membership",
      "forget_username",
      "forget_code",
      "otp_username",
    ];
    localKeys.forEach((key) => localStorage.removeItem(key));
  
    // Remove sessionStorage items
    const sessionKeys = [
      "bpms",
      "registrationData",
      "BusinessRegistrationData",
      "pin_via",
      "orderStep",
      "deliverytype",
      "receiverName",
      "mobileNumber",
      "receiverEmail",
      "note",
      "arrivalTime",
      "no_of_people",
      "location",
      "lat",
      "lon",
    ];
    sessionKeys.forEach((key) => sessionStorage.removeItem(key));
  
    // Optional callback (e.g., closing dialog or updating UI state)
    onLogout?.();
  
    // Auth sign out
    await signOut();
  };
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-[60]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to logout?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              onOpenChange(false);
              handleLogout();
            }}
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
