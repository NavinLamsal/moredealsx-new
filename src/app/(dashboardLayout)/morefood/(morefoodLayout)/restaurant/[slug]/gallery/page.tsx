import PhotoGallery from '@/components/morefood/restaurant/Gallery';
import GlobalRestaurantTab from '@/components/morefood/restaurant/GlobalRestaurantTab';
import React, { Suspense } from 'react'

const Gallery = async({params }:{ params: Promise<{ slug: string }>}) => {
    const { slug } = await params;
  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
        <GlobalRestaurantTab slug={slug}/>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
        <PhotoGallery/>
        </Suspense>
        </div>
  )
}

export default Gallery