"use client"

import {
  BadgeCheck,
  Bell,

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

import Logout from "./Logout"

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


  return (
    
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className={`${header? 'text-black bg-slate-200' : ''} rounded-lg uppercase`}>{user.name[0]}</AvatarFallback>
              </Avatar>
              {/* <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div> */}
              {/* <ChevronsUpDown className="ml-auto size-4" /> */}
            {/* </SidebarMenuButton> */}
            {/* <>
            <div className="flex flex-1 items-center gap-3">
              <Avatar className="h-14 w-14 ">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="h-14 w-14 bg-slate-200 dark:bg-white text-black font-extrabold text-xl">{user.name[0]}</AvatarFallback>
              </Avatar>
              <span className="bg-header text-white shadow hover:bg-primary/90 rounded-md px-1 text-bold py-0.5">Business</span>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight pl-2 pt-3">
                <span className="truncate font-semibold text-lg">{user.name}</span>
                <span className="truncate text-sm">{user.email}</span>
            </div>
            
            </> */}

          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={"bottom"}
            align="end"
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
                <Sparkles />
                Upgrade
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Link href="/auth/logout">
            
            <DropdownMenuItem>
            <Logout/>
              {/* <LogOut />
              Log out */}
            </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
    
  )
}
