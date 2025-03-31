"use client"
import { useFetchRestaurant } from '@/lib/action/morefood/restaurantlist';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { CardSkeleton } from '../Skeletons/CardSkeleton';
import HorizontalCarousel from '../carousel/horizontalCarousel';
import CategoryCard from '../cards/morefood/CategoryCard';
import AnimatedSection from '../ui/animations/FadeUpView';
import { getTimeOfDay } from '@/lib/utils';




const CategoriesList = () => {
   const daytime =  getTimeOfDay()
   const { fetchCategoryList} = useFetchRestaurant()
   const { data, error, isLoading } = useQuery({
     queryKey: ["Global Category Menu", daytime],
     queryFn: () => fetchCategoryList(daytime),
     staleTime: 60000,
   });

   if (isLoading) {
     return (
       <div>
         <CardSkeleton />
       </div>
     );
   }

   if (error) {
     return <div>Error: {error?.message}</div>;
   }

   if (!data || data.length === 0) {
     return null;
   }


  return (
    <div className="p-4 ">
      <HorizontalCarousel title="Choose Your Craving">
      {data.map((category, index) => (
    //   {menuCategories.map((category , index)=>(
        <div className="flex-shrink-0 w-28" key={category.name}>
         <AnimatedSection key={category.name} index={index}>
         <CategoryCard 
            key={index} 
            {...category} 
            />
          </AnimatedSection>
          
        </div>
))}

      </HorizontalCarousel>
    </div>
  );
};

export default CategoriesList;
