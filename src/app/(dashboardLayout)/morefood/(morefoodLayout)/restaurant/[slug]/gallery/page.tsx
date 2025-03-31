import PhotoGallery from '@/components/morefood/restaurant/gallery/Gallery';
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
        <PhotoGallery slug={slug}/>
        </Suspense>
        </div>
  )
}

export default Gallery