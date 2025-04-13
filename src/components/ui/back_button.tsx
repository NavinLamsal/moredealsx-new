"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Button } from "./button";

interface BackButtonProps {
  //   label?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const router = useRouter();

  return (
    <Button
      variant={"ghost"}
      onClick={() => router.back()}
      className={`inline-flex items-center gap-2 text-sm font-medium text-primary   ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {/* {label} */}
    </Button>
  );
};

export default BackButton;
