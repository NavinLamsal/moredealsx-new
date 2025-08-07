"use client"

import {
  BadgeCheck,
  Bell,

  BookDashed,

  Home,

  Menu,

  Settings,

  Settings2,

  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"

import { useDispatch } from "react-redux"
import { AppDispatch, RootState } from "@/lib/redux/store"
import { useAppSelector } from "@/lib/redux/hooks"
import { useEffect } from "react"
import { fetchUserProfile } from "@/lib/action/moreClub/User"
import LogoutTrigger from "@/components/auth/logouts/logouttrigger"

export function NavUser({
  user,
  header
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
  header?: boolean
}) {
  const dispatch = useDispatch<AppDispatch>();
  const users = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUserProfile({ fetchForce: false }));
  })


  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>

        <div className="flex items-center gap-2">
          <Avatar className='bg-primary text-primary-foreground'>
            <AvatarImage className='bg-primary text-primary-foreground' src={user.avatar} />
            <AvatarFallback className='bg-primary text-primary-foreground uppercase font-extrabold'>{user.name[0]}</AvatarFallback>
          </Avatar>

          <div>
            <div className="font-bold text-lg">{user.name}</div>
            <p className='text-primary text-sm '>{users.profile?.membership?.membership_name ?? ""} Member</p>
          </div>
        </div>

      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={"bottom"}
        align="start"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/dashboard" className="w-full flex flex-1 gap-2">
              <Home />
              Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/settings/upgrade" className="w-full flex flex-1 gap-2">
              <Sparkles />
              Upgrade
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/dashboard/profile" className="w-full flex flex-1 gap-2">
              <BadgeCheck />
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/settings" className="w-full flex flex-1 gap-2">
              <Settings />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutTrigger triggerType="dropdown" />
        </DropdownMenuItem>

        {/* <LogOut />
              Log out */}

      </DropdownMenuContent>
    </DropdownMenu>

  )
}
