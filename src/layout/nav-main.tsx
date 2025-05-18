"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

export function NavMain({
  title,
  items,
}: {
  title: string,
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    darkImage:string,
    lightImage:string
    items?: {
      title: string
      url: string
      darkImage:string,
      lightImage:string
    }[]
  }[]
}) {
  const pathname = usePathname(); // Get the current pathname
  const isAnySubItemActive = (items: { url: string }[] = [], pathname: string): boolean => {
    return items.some((subItem) => subItem.url === pathname);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <React.Fragment key={item.title}>
            {item?.items ? (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={isAnySubItemActive(item.items, pathname)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild className="">
                    <SidebarMenuButton tooltip={item.title} size={"lg"}
                     className={`flex items-center px-3 py-4 mb-2 h-14 rounded-md hover:bg-[#ffd7001a] hover:border-l-2 hover:border-primary hover:text-foreground ${isAnySubItemActive(item.items, pathname) ? "bg-[#ffd7001a] border-l-2 border-primary" : ""}`}
                    >
                      {/* {item.icon && <item.icon className="text-xl"/>} */}
                      <Avatar className="flex items-center h-7 w-7">
                    <AvatarImage src={item.lightImage} className="h-7 w-7 block dark:hidden" />
                    <AvatarImage src={item.darkImage} className="h-7 w-7 hidden dark:block" />
                    <AvatarFallback >{item.title[0]}</AvatarFallback>
                  </Avatar>
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild className={`hover:bg-[#ffd7001a] hover:border-l-2  hover:border-primary hover:text-foreground ${pathname === subItem.url ? "bg-[#ffd7001a] border-primary" : ""}`}>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (

              <SidebarMenuButton asChild tooltip={item.title}  key={item.title } size={"lg"} className={`flex items-center px-3 py-4 mb-2 h-14  rounded-md hover:bg-[#ffd7001a] hover:border-l-2 hover:border-primary hover:text-foreground ${pathname === item.url ? "bg-[#ffd7001a] border-l-2 border-primary" : ""}`}>
                <Link href={item.url} className="font-semibold flex items-center">
                  <Avatar className="flex items-center h-7 w-7">
                    <AvatarImage src={item.lightImage} className="h-7 w-7 block dark:hidden" />
                    <AvatarImage src={item.darkImage} className="h-7 w-7 hidden dark:block" />
                    <AvatarFallback >{item.title[0]}</AvatarFallback>
                  </Avatar>
                  {/* {item.icon && <item.icon className="text-xl"/>} */}
                  <span>{item.title}</span></Link>
              </SidebarMenuButton>
            )}
          </React.Fragment>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
