
import { auth } from '@/auth'
import BusinessPage from '@/components/form/moredealsclub/business/BusinessUpdate';
import React, { Suspense } from 'react'

const UpdateProfilePage = async() => {
    const session = await auth();

  return (
    <div className='px-2 sm:px-4 md:px-6'>
      <Suspense fallback={<div>Loading...</div>}>
      <BusinessPage userdata={session?.user?.businessDetails}/>

      </Suspense>
    </div>
  )
}

export default UpdateProfilePage
