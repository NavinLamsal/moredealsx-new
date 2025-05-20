import React from "react";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });

interface SectionTitleProps {
  title: string;
  className?: string;
  white?: boolean;
  viewAll?: string
  
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className , white, viewAll}) => {
  return (
    <div className={cn("text-center mb-10", className)}>
      <h2
        className={cn(
          `text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-foreground relative inline-block uppercase ${white ? "text-white" : ""}`,
          montserrat.className
        )}
      >
        {title}
        <span className="block w-20 h-1 bg-yellow-400 mx-auto mt-2" />
      </h2>
      {viewAll && <Link href={viewAll} className="text-foreground dark:text-primary hover:underline absolute right-0 top-0">View All</Link>}
    </div>
  );
};

export default SectionTitle;
