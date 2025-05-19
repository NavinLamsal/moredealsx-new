"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge';
import { fetchUserProfile } from '@/lib/action/moreClub/User';
import { useAppSelector } from '@/lib/redux/hooks';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { useSession } from 'next-auth/react';
import React, { use, useEffect } from 'react'
import { useDispatch } from 'react-redux';

const Userheadings = () => {
    const {data: session , status} = useSession();
    const dispatch = useDispatch<AppDispatch>();
    const user = useAppSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(fetchUserProfile({ fetchForce: false }));
    })

  return (
    <div className="flex justify-between items-center ">
    <div className="flex items-center gap-2">
        <Avatar className='bg-primary text-primary-foreground'>
            <AvatarImage className='bg-primary text-primary-foreground' src={session?.user.userDetails?.display_picture} />
            <AvatarFallback className='bg-primary text-primary-foreground uppercase font-extrabold'>{session?.user.userDetails?.first_name[0]}{session?.user.userDetails?.last_name[0]}</AvatarFallback>
        </Avatar>
       
        <div>
            <div className="font-bold text-lg">{session?.user.userDetails?.first_name} {session?.user.userDetails?.last_name}</div>
            <p className='text-primary text-sm '>{user.profile?.membership.membership_name} Member</p>
        </div>
    </div>
    <div>
        {/* <button style="background-color: var(--red); color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 800; cursor: pointer;">Logout</button> */}
    </div>
</div>
  )
}

export default Userheadings