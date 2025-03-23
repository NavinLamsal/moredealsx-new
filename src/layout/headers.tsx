"use client"

import { SidebarTrigger } from '@/components/ui/sidebar'
import { ModeToggle } from '@/components/ui/themeToggle'
import React from 'react'
import NotificationDropDown from './notification-drop'
import { usePathname } from 'next/navigation'
import BalanceViewer from '@/components/moreclub/wallets/BalanceViewer'

import { NavUser } from './nav-user'
import { useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'

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
    <header className="flex h-16 lg:h-[4.5rem] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 z-50 bg-card text-card-foreground">
      <div className="flex items-center gap-2 px-4 justify-between w-full">
        <div className="flex items-center gap-2">
          {/* <div className="flex  items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <Image src={teams.logo} alt={teams.name} width={200} height={200} className='h-[4.5rem] w-auto' />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {teams.name}
            </span>
            <span className="truncate text-xs">{teams.plan}</span>
          </div> */}
           <SidebarTrigger className="flex items-center " />
           {/* <Input placeholder="Search" className="h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring" /> */}
          {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              {pathname !== '/dashboard' && (
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage >{lastSegment}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb> */}
        </div>
        <div className="flex items-center gap-2">
          <BalanceViewer />
          <ModeToggle />
          <NotificationDropDown />
         <NavUser user={users}/>
        </div>
      </div>
    </header>
  )
}

export default Headers
