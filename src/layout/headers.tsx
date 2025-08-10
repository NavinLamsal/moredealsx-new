"use client"

import { SidebarTrigger } from '@/components/ui/sidebar'

import React from 'react'

import { usePathname } from 'next/navigation'


import { NavUser } from './nav-user'

import { LocationDialog } from './location/LocationDialog'
import AuthNavbarContent from './AuthNavbarContent'
import { useAuth } from '@/providers/auth-provider'


const Headers = ({ teams }: {
  teams?: {
    name: string,
    logo: string
    plan: string,
  }
}) => {
  const pathname = usePathname();
  const { user: session, isLoading } = useAuth()

  const pathSegments = pathname.split('/').filter(Boolean);
  let lastSegment = pathSegments[pathSegments.length - 1] || '';
  lastSegment = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ');

  const users = {
    name: `${session?.first_name} ${session?.last_name}`,
    email: `${session?.email === '' ?
      session?.phone_prefix + ' ' + session?.phone_number :
      session?.email
      }`,
    avatar: `${session?.display_picture}`
  }

  return (
    <header className="flex h-16 lg:h-[4.5rem] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 z-50  bg-background text-foreground">
      <div className="flex items-center gap-2 px-4 justify-between w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="flex items-center " />
          {isLoading && !session ? (
            <div className="flex items-center gap-2 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div className="flex flex-col gap-2">
                <div className="w-24 h-4 bg-gray-300 rounded" />
                <div className="w-20 h-3 bg-gray-200 rounded" />
              </div>
            </div>
          ) : (
            <div className='hidden lg:flex'>

              <NavUser user={users} />
            </div>
          )}
          <LocationDialog dashboard={true} />
        </div>
        <div className='flex items-center gap-2'>
          <AuthNavbarContent />
        </div>
      </div>
    </header>
  )
}

export default Headers
