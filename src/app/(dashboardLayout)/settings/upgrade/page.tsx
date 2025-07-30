
"use client"
import UpgradeForm from '@/components/form/moredealsclub/pricing/upgradeform'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchUserProfile } from '@/lib/action/moreClub/User'
import { useAppSelector } from '@/lib/redux/hooks'
import { AppDispatch, RootState } from '@/lib/redux/store'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Page = () => {
  // const { data: session } = useSession();
  // const session = await auth()
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUserProfile({ fetchForce: false }));
  }, [dispatch]);

  if (user.isLoading) {
    return (
      <p>Loading...</p>
    )
  }

  

  

  return (

    <div className="flex justify-center items-start  min-h-screen ">
      <Card className="w-full ">
        <CardHeader className=''>
          <CardTitle className='flex items-center border-b border-primary dark:border-gray-200'><Image src={'/images/svg/send.svg'} alt={"send"} className=" h-8 w-auto mb-3 rounded-full object-cover" width={100} height={100} />Upgrade Subscription</CardTitle>
        </CardHeader>
        <CardContent >
          {user.error && <p>{user.error}</p>}
          {user.profile &&
            <UpgradeForm userType={user.profile?.user_type as 'BUSINESS' | 'NORMAL'} membershiptype={user.profile.membership} />
          }
        </CardContent>
      </Card>
    </div>


  )
}

export default Page



