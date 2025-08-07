"use client";

import { useState, useEffect } from "react";
import { foodCategories } from "@/lib/dummydata/categories";
import HorizontalCarousel from "../carousel/horizontalCarousel";
import AnimatedSection from "../ui/animations/FadeUpView";
import CategoryCard from "../cards/morefood/CategoryCard";

const CategoriesList = () => {
  // Comment out unused code
  // const daytime = getTimeOfDay();
  // const { fetchCategoryList } = useFetchRestaurant();
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["Global Category Menu", daytime],
  //   queryFn: () => fetchCategoryList(daytime),
  //   staleTime: 60000,
  // });

  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for a better user experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-6 grid-cols-3 gap-4 mt-4 p-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center animate-pulse">
            <div className="size-20 bg-gray-200 rounded-full mb-2" />
            <div className="w-16 h-4 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 my-4">
      <HorizontalCarousel title="Choose Your Craving" dashboard={true}>
        {foodCategories.map((category, index) => (
          <div className="flex-shrink-0 w-28" key={category.name}>
            <AnimatedSection key={category.name} index={index}>
              <CategoryCard key={index} {...category} />
            </AnimatedSection>
          </div>
        ))}
      </HorizontalCarousel>
    </div>
  );
};

export default CategoriesList;
