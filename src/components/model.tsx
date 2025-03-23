"use client";
import React, { ReactNode } from "react";
import { Dialog, DialogContent, DialogOverlay } from "./ui/dialog";
import { useRouter } from "next/navigation";

const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const onHandleChange = () => {
    router.back();
  };
  return (
    <Dialog onOpenChange={onHandleChange} defaultOpen={true} open={true}>
      <DialogOverlay>
        <DialogContent className="overflow-y-hidden">{children}</DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default Modal;