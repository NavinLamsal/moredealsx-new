"use client"

import * as React from "react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: string
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  

  return (
    <SidebarMenu className="flex">
      <SidebarMenuItem className="bg-card text-card-foreground">
            <div className="flex items-center gap-2 ">
                      <div className="flex  items-center justify-center rounded-lg text-sidebar-primary-foreground">
                        {/* <activeTeam.logo className="size-4" /> */}
                        <Image src={activeTeam.logo} alt={activeTeam.name} width={200} height={200} className='h-[4.5rem] w-auto' />
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {activeTeam.name}
                        </span>
                        <span className="truncate text-xs">{activeTeam.plan}</span>
                      </div>
                      
                     
                    </div>         
          </SidebarMenuItem>
    </SidebarMenu>
  )
}
