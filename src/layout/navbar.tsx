import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import CityChooser from './cityChooser'

const Navbar = () => {
  return (
    <div className="bg-gray-900 text-white py-3 px-6 ">
      <div className='max-w-8xl mx-auto flex justify-between items-center'>

    <div className="flex items-center gap-4">
      <h1 className="text-2xl font-bold text-primary">MoreDealsClub</h1>
      <CityChooser/>
    </div>

    <div className='flex gap-3'>
      <Link href={'/auth/login'}>
      <Button variant="outline" className="text-white">
        Login
      </Button>
      
      </Link>
      <Link href={'/auth/register'}>
      <Button variant="default" className="hidden sm:block">
        Register
      </Button>
      </Link>

    </div>
      </div>
    </div>
  )
}

export default Navbar
