import { Restaurant } from '@/lib/type/morefood/restaurant'
import React, { Suspense } from 'react'
import AddressSection from './addressSection'
import { ContainerSkeleton } from '@/components/MapBox/Skeletons'
import OpeningHours from './OpeningHours'

const Overview = ({details}:{details:Restaurant}) => {
  return (
    <>
    
     

      

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 container px-0  mx-0  mb-5">
        
           
            <Suspense fallback={<ContainerSkeleton />}>
            <OpeningHours id={details.slug}/>
            </Suspense>

            <div className="col-span-1">
              <AddressSection details={details} />
            </div>
        
     
      </div>
    </>
  )
}

export default Overview
