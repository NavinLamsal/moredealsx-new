"use client"
import BalanceViewer from '@/components/moreclub/wallets/BalanceViewer'
import React from 'react'
import MenuDropdown from './MenuDropdown'
import { ModeToggle } from '@/components/ui/themeToggle'
import NotificationDropDown from './notification-drop'
import { NavUser } from './nav-user'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const AuthNavbarContent = ({header}:{header?:boolean}) => {
    const {data:session} = useSession();

    if (!session) {
        return (
            <div className="flex items-center gap-2">
                <ModeToggle />
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

        )
    } else {

        const users = {
            name: `${session?.user?.userDetails?.first_name} ${session?.user?.userDetails?.last_name}`,
            email: `${session?.user?.userDetails?.email === '' ?
                session?.user?.userDetails?.phone_prefix + ' ' + session?.user?.userDetails?.phone_number :
                session?.user?.userDetails?.email
                }`,
            avatar: `${session?.user?.userDetails?.display_picture}`
        }


        return (
            <div className="flex items-center gap-2">

                <NotificationDropDown header={header}/>
                {<div className='hidden lg:flex gap-2 items-center'>
                    <ModeToggle />
                    <MenuDropdown header={header}/>
                </div>}
               
            </div>
        )
    }


}

export default AuthNavbarContent