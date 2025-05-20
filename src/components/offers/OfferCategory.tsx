'use client'

import React from "react";
import { cn } from "@/lib/utils"; // adjust path as needed
import { useSearchParams, useRouter } from "next/navigation";

interface CategorySelectorProps {
  categories: {title: string, value: string}[];
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  UseSearchParams?: boolean;
  searchParamKey?: string;
  dashboardStyle?: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  UseSearchParams = false,
  searchParamKey = "category",
  dashboardStyle = false,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (category: string) => {
    if (UseSearchParams) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set(searchParamKey, category);
      router.push(`?${newParams.toString()}`);
    } else {
      onCategoryChange?.(category);
    }
  };

  const selectedCategory = UseSearchParams
    ? searchParams.get(searchParamKey) ?? categories[0]
    : activeCategory;

  return (
  
    <div
  className={cn(
    "w-full overflow-x-auto mb-10",
    !dashboardStyle && "flex justify-center" // center scroll container if not dashboard
  )}
>
  <div
    className={cn(
      "inline-flex gap-4 px-2", // no wrapping, horizontally scrollable
      dashboardStyle ? "justify-start" : "justify-center"
    )}
  >
    {categories.map((category) => (
      <button
        key={category.value}
        onClick={() => handleClick(category.value)}
        className={cn(
          "px-5 py-2 font-extrabold text-sm border-b-4 transition-all whitespace-nowrap",
          selectedCategory === category.value
            ? "text-yellow-400 border-yellow-400"
            :  "text-foreground border-transparent hover:text-yellow-400 hover:border-yellow-400"
        )}
      >
        {category.title}
      </button>
    ))}
  </div>
</div>


  );
};

export default CategorySelector;
