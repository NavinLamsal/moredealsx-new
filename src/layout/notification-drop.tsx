import NotificationList from '@/components/notification/NotificationList'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Bell } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NotificationDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"icon"} ><Bell /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[350px] bg-background" side={"bottom"}
            align="end" >
      <Card className="w-[350px] bg-background">
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          <h2 className='flex justify-between'>Notification</h2><Link href={'/dashboard/notification'}>
          <Button  variant={"link"}>View All</Button>
          </Link></CardTitle>
        
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
      <NotificationList/>
      </CardContent>

    </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotificationDropDown
