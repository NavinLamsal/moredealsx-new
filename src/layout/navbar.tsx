import { Button } from '@/components/ui/button'
import React from 'react'

const Navbar = () => {
  return (
    <div className="bg-gray-900 text-white py-3 px-6 ">
      <div className='max-w-8xl mx-auto flex justify-between items-center'>

    <div className="flex items-center gap-4">
      <h1 className="text-2xl font-bold text-primary">MoreDealsClub</h1>
     
    </div>

    <div className='flex gap-3'>
      <Button variant="outline" className="text-white">
        Login
      </Button>
      <Button variant="default" className="">
        Register
      </Button>
    </div>
      </div>
    </div>
  )
}

export default Navbar
