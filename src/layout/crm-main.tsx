"use client"

import {

  type LucideIcon,
} from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"

export function NavCRM({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
    darkImage:string,
    lightImage:string
  }[]
}) {
   const pathname = usePathname(); 

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>CRM</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name} >
            <SidebarMenuButton asChild size={"lg"} isActive={pathname.includes(item.url)}>
              <a href={`${item.url}login-crm`} target="_blank">
              <Avatar className="flex items-center h-7 w-7">
                    <AvatarImage src={item.lightImage} className="h-7 w-7 block dark:hidden" />
                    <AvatarImage src={item.darkImage} className="h-7 w-7 hidden dark:block" />
                    <AvatarFallback >{item.name[0]}</AvatarFallback>
                  </Avatar>
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
