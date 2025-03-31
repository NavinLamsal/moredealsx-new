"use client"
import { useFetchRestaurant } from '@/lib/action/morefood/restaurantlist';
import { useQuery } from '@tanstack/react-query';
import React, { forwardRef } from 'react'

import { getTimeOfDay } from '@/lib/utils';
import { CardSkeleton } from '@/components/Skeletons/CardSkeleton';
import { CategoryListType } from '@/lib/type/morefood/restaurant';
import Image from 'next/image';
import Link from 'next/link';
import HorizontalCarouselWithOutTitle from '@/components/carousel/HorizontalCarouselWithotTitle';
import FadeFromLeft from '@/components/ui/animations/FadefromLeft';
import CategoryCard from '@/components/cards/morefood/CategoryCard';




const CategoriesTopList = ({activepath}:{activepath:string}) => {




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
    <div className="">
      <HorizontalCarouselWithOutTitle title="Choose Your Craving">
      {data.map((category, index) => (
        <div className="flex-shrink-0 w-20" key={category.name}>
         {/* <FadeFromLeft key={category.name} index={index}> */}
         <CategoryCard 
            key={index} 
            {...category}
            active={category.slug === activepath} 
            />
            
          {/* </FadeFromLeft> */}
          
        </div>
))}

      </HorizontalCarouselWithOutTitle>
    </div>
  );
};

export default CategoriesTopList;

// type CategoryCardProps = CategoryListType
// const CategoryCard = forwardRef<HTMLDivElement, CategoryCardProps>(({ name, icon, slug ,active }, ref) => {
//     return (
//         <Link href={`/morefood/category/${slug}?title=category`}  >
//             <div ref={ref} className="flex flex-col  items-center active:scale-75 transition-transform duration-150   ">
//                 <Image src={icon} alt={name} width={50} height={50} className={`size-12 ${active ? 
//                     "bg-primary":"bg-morefoodPrimary"
//                 } p-4 rounded-full`} />
//                 <span className="text-sm mt-1 font-medium">{name}</span>
//             </div>
//         </Link>
//     )
// });
