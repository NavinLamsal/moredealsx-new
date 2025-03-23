import BusinessProfileCard from '@/components/settings/BusinessProfileCard'

import { Button } from '@/components/ui/button'

import { Edit2, } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className='p-4 '>
    
    <div className='flex flex-row justify-between'>
        <h1 className='text-3xl font-bold'>Business Profile</h1>
        <Link href={'/business/profile/update'}>
            <Button size={"icon"}><Edit2 className=''/></Button>
        </Link>
    </div>

      <BusinessProfileCard/>
    </div>
  )
}

export default Page
