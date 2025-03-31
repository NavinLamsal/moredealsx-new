import { getBusinessList } from '@/lib/action/PubilcCommon';
import { BusinessListType } from '@/lib/type/CommonType';
import Image from 'next/image';
import React from 'react';
import Heading from '../ui/heading';
import PlatformCard from '../moreclub/PlatformCard';
import AnimatedSection from '../ui/animations/FadeUpView';

export default async function DealsSection() {

    const categories = await getBusinessList();

  return (
    <div className="p-6 container mx-auto">
      {/* <Heading title="Onboard with our platforms" /> */}
      <h2 className='text-xl  font-semibold text-gray-800 dark:text-gray-100 text-center mb-10'>Onboard with our platforms </h2>
      <div className="flex flex-1 flex-wrap justify-center items-center gap-20">
        {categories && categories.map((category : BusinessListType, index: number) => (
           <AnimatedSection key={category.id} index={index}>
             <PlatformCard name={category.name} icon={category.banner} slug={category.name} />
           </AnimatedSection>
          // <div
          //   key={index}
          //   className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
          // >
          //   <Image src={category.image} alt={category.name} className="w-16 h-16 mb-3 rounded-full object-cover" width={100} height={100}/>
          //   <h3 className="text-lg font-medium text-gray-700">{category.name}</h3>
          //   <p className="text-sm text-gray-500">{"20+"} partners</p>
          // </div>
        ))}
      </div>
    </div>
  );
}
