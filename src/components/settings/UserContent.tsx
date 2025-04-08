"use client"
import { useAppSelector } from '@/lib/redux/hooks';
import { AppDispatch, RootState } from '@/lib/redux/store';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '@/lib/action/moreClub/User';
import ProfileCard from './ProfileCard';

const UserContent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useAppSelector((state: RootState) => state.user);
     useEffect(() => {
            dispatch(fetchUserProfile({ fetchForce: false }));
        }, [dispatch]);

        if(user.isLoading ){
            return (
                <p>Loading...</p>
            )
        }

  return ( <ProfileCard/>
  )
}

export default UserContent
