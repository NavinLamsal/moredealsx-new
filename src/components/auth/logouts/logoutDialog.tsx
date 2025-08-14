"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { clearStorage } from "./logoutFunction";



interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogout?: () => void;
}



const LogoutDialog = ({ open, onOpenChange, onLogout }: LogoutDialogProps) => {
  const { logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    // Clear localStorage
    // const localKeys = [
    //   "token",
    //   "business_setup",
    //   "membership",
    //   "forget_username",
    //   "forget_code",
    //   "otp_username",
    // ];
    // localKeys.forEach((key) => localStorage.removeItem(key));

    // // Clear sessionStorage
    // const sessionKeys = [
    //   "bpms",
    //   "registrationData",
    //   "BusinessRegistrationData",
    //   "pin_via",
    //   "orderStep",
    //   "deliverytype",
    //   "receiverName",
    //   "mobileNumber",
    //   "receiverEmail",
    //   "note",
    //   "arrivalTime",
    //   "no_of_people",
    //   "location",
    //   "lat",
    //   "lon",
    // ];
    // sessionKeys.forEach((key) => sessionStorage.removeItem(key));
    clearStorage();

    // Optional callback
    onLogout?.();

    // Trigger logout mutation
    logout?.mutate(undefined, {
      onSuccess: () => {
        setIsLoading(false);
        onOpenChange(false);
        router.push("/auth/login");
      },
    });
  };

  return (
    <Dialog
      open={open}
      // Disable open state change when loading
      onOpenChange={(val) => {
        if (!isLoading) {
          onOpenChange(val);
        }
      }}
    >
      <DialogContent
        className="z-[60]"
        onInteractOutside={(e) => isLoading && e.preventDefault()}
        onEscapeKeyDown={(e) => isLoading && e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Are you sure you want to logout?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleLogout();
            }}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
