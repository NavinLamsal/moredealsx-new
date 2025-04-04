import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  variant?: "default" | "danger" | "success" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}

const variantStyles = {
  default: "bg-violet-600/25 text-primary hover:bg-violet-600/35 hover:text-primary",
  danger: "text-red-600 bg-red-600/25 hover:bg-red-500 hover:text-white",
  success: "text-green-600 bg-green-600/25 hover:bg-green-500 hover:text-white",
  warning: "text-yellow-600 bg-yellow-500/25 hover:bg-yellow-500 hover:text-white",
  info: "text-blue-600 bg-blue-600/25 hover:bg-blue-500 hover:text-white",
};

const sizeStyles = {
  sm: "py-0.5 px-2 text-xs",
  md: "py-1 px-3.5 text-sm",
  lg: "py-1.5 px-4 text-base",
};

export const Badge = ({ variant = "default", size = "md", children, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        "cursor-pointer rounded-sm font-bold inline",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};
