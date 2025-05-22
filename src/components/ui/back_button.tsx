"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Button } from "./button";

interface BackButtonProps {
  //   label?: string;
  className?: string;
  back?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({ className, back =false }) => {
  const router = useRouter();

  return (
    <Button
      variant={"outline"}
      size={back ? "sm":"icon"}
      onClick={() => router.back()}
      className={`inline-flex items-center gap-2 text-sm font-medium text-black dark:text-white   ${className}`}
    >
      <ArrowLeft className="h-3 w-3" />
     <p>{back && "Back"}</p> 
    </Button>
  );
};

export default BackButton;
