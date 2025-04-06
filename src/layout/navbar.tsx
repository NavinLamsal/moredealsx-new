
import React from 'react'
import { LocationDialog } from './location/LocationDialog'
import Image from 'next/image'
import AuthNavbarContent from './AuthNavbarContent'

const Navbar = ({ dark_logo, light_logo }: { dark_logo: string, light_logo: string }) => {
  return (
    <div className="bg-navbar text-white py-1 px-6 ">
      <div className='max-w-8xl mx-auto flex justify-between items-center'>

        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-3">
            <Image src={dark_logo} alt={"MOREDEALSCLUB"} width={200} height={200} className='h-[4.5rem] w-auto hidden dark:inline-block' />
            <Image src={light_logo} alt={"MOREDEALSCLUB"} width={200} height={200} className='h-[4.5rem] w-auto  inline-block dark:hidden' />
          </a>
          <LocationDialog />
        </div>

        <AuthNavbarContent header={true} />
      </div>
    </div>
  )
}

export default Navbar
