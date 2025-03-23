import { auth } from '@/auth'
import BasicInfoForm from '@/components/form/moredealsclub/user/BasicInfoForm'
import React from 'react'

const UpdateProfilePage = async() => {
    const session = await auth();

  return (
    <div className='px-2 sm:px-4 md:px-6'>
      <BasicInfoForm userdata={session?.user.userDetails}/>
    </div>
  )
}

export default UpdateProfilePage
