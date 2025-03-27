
import BusinessPage from '@/components/form/moredealsclub/business/BusinessUpdate';
import React, { Suspense } from 'react'

const UpdateProfilePage = async() => {


  return (
    <div className='px-2 sm:px-4 md:px-6'>
      <Suspense fallback={<div>Loading...</div>}>
      <BusinessPage />

      </Suspense>
    </div>
  )
}

export default UpdateProfilePage
