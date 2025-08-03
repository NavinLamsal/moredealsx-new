"use client"

import { SidebarTrigger } from '@/components/ui/sidebar'

import React from 'react'

import { usePathname } from 'next/navigation'


import { NavUser } from './nav-user'
import { useSession } from 'next-auth/react'

import { LocationDialog } from './location/LocationDialog'
import AuthNavbarContent from './AuthNavbarContent'


const Headers = ({teams}:{teams?:{
  name: string,
  logo: string
  plan: string,
}}) => {
  const pathname = usePathname();
  const session = useSession();
  const pathSegments = pathname.split('/').filter(Boolean);
  let lastSegment = pathSegments[pathSegments.length - 1] || '';
  lastSegment = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ');

  const users= {
    name: `${session.data?.user?.userDetails?.first_name} ${session.data?.user?.userDetails?.last_name}`,
    email: `${session.data?.user?.userDetails?.email === '' ? 
     session.data?.user?.userDetails?.phone_prefix +' '+ session.data?.user?.userDetails?.phone_number:
      session.data?.user?.userDetails?.email
    }`,
    avatar: `${session.data?.user?.userDetails?.display_picture}`    }

  return (
    <header className="flex h-16 lg:h-[4.5rem] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 z-50  bg-background text-foreground">
      <div className="flex items-center gap-2 px-4 justify-between w-full">
        <div className="flex items-center gap-2">
        <SidebarTrigger className="flex items-center " />
           <NavUser user={users}/>
           <LocationDialog dashboard={true}/>
        </div>
        <div className='flex items-center gap-2'>
        <AuthNavbarContent />
        </div>
      </div>
    </header>
  )
}

export default Headers
