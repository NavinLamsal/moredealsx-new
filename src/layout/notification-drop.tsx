import NotificationList from '@/components/notification/NotificationList'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Bell } from 'lucide-react'
import React from 'react'

const NotificationDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"icon"} ><Bell /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[350px]" side={"bottom"}
            align="end">
      <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Notification</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
      <NotificationList/>
        {/* <NotificationCard notification={{
            id: 2,
            title: "Project Deployed",
            message: "Your project has been deployed successfully.",
            time: "2023-06-01T10:00:00Z",
            isUnread: true
        }}
        
        />
         <NotificationCard notification={{
            id: 3,
            title: "Project Deployed",
            message: "Your project has been deployed successfully.",
            time: "2023-06-01T10:00:00Z",
            isUnread: true
        }}
        
        />
         <NotificationCard notification={{
            id: 1,
            title: "Project Deployed",
            message: "Your project has been deployed successfully.",
            time: "2023-06-01T10:00:00Z",
            isUnread: true
        }}
        
        /> */}
      </CardContent>

    </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotificationDropDown
