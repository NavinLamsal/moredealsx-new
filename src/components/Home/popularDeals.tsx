import { getBusinessList } from '@/lib/action/PubilcCommon';
import { BusinessListType } from '@/lib/type/CommonType';
import React from 'react';
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
        ))}
      </div>
    </div>
  );
}
