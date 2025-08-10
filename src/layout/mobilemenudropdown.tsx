import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect } from 'react'
import Menu from './menu'
import { DropdownMenu,DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/redux/store'
import { useAppSelector } from '@/lib/redux/hooks'
import { fetchUserProfile } from '@/lib/action/moreClub/User'

const MobileMenuDropdown = ({header}:{header?:boolean}) => {
    const dispatch = useDispatch<AppDispatch>();
     const users = useAppSelector((state: RootState) => state.user);
    
      useEffect(() => {
        dispatch(fetchUserProfile({ fetchForce: false }));
      })
    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant="outline" size="icon"> */}
            <Avatar className='bg-primary text-primary-foreground'>
                        <AvatarImage className='bg-primary text-primary-foreground' src={users?.profile?.display_picture?? '/images/png/user.png'} />
                        <AvatarFallback className='bg-primary text-primary-foreground uppercase font-extrabold'>{users.profile?.first_name[0]}{users.profile?.last_name[0]}</AvatarFallback>
                      </Avatar>
          {/* <LayoutDashboard className={header? 'text-white' : 'text-black dark:text-white'} /> */}
        {/* </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-[350px] max-h-[500px] overflow-hidden  " 
        side="bottom" align="end"
      >
        <Card className="w-full dark:bg-background">
          <CardHeader>
            <CardTitle>Menu</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[400px] hide-scroll-bar overflow-y-auto ">
            <div className="flex items-center gap-2">
          <Avatar className='bg-primary text-primary-foreground'>
            <AvatarImage className='bg-primary text-primary-foreground' src={users?.profile?.display_picture?? '/images/png/user.png'} />
            <AvatarFallback className='bg-primary text-primary-foreground uppercase font-extrabold'>{users?.profile?.first_name[0]}{users?.profile?.last_name[0]}</AvatarFallback>
          </Avatar>

          <div>
            <div className="font-bold text-lg">{users?.profile?.first_name}&nbsp;{users?.profile?.last_name}</div>
            <p className='text-primary text-sm '>{users.profile?.membership?.membership_name ?? ""} Member</p>
          </div>
        </div>

            <Menu />
          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MobileMenuDropdown
