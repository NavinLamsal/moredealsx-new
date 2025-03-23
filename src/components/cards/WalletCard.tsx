import React from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Eye, EyeClosed, EyeOffIcon } from 'lucide-react'
import { useSession } from 'next-auth/react';
import { Avatar, AvatarImage } from '../ui/avatar';


const WalletCard = () => {
    const [hideBalance, setHideBalance] = React.useState(false);
    const session = useSession();

    return (
      <Card className='my-4 max-w-xs'>
          <CardTitle className='hidden'>
              Wallet Info
          </CardTitle>
          <CardContent>
              <div className='flex flex-row flex-1 w-full items-center pt-4'>
                <Avatar>
                    <AvatarImage src={session.data?.user?.userDetails?.display_picture} alt="avatar" />
                </Avatar>
                <div className='flex flex-col mx-2'>
                  <h2  className='text-base  font-bold text-gray-800 dark:text-gray-100'> Name: {session.data?.user.first_name}&nbsp;{session.data?.user.last_name}</h2>
                  <h2 className='text-base   font-normal text-gray-800 dark:text-gray-100'>
                  <span className='font-bold'>Username :</span> {session.data?.user.username}
                  </h2>
                  <h2 className='flex flex-1 text-base  font-normal text-gray-800 dark:text-gray-100'>
                  <span className='font-bold'>Balance :</span> {hideBalance ? <span className='font-extrabold'>xxxxxx</span> : "Rs 20000"}  <span onClick={()=>setHideBalance(!hideBalance)} className='cursor-pointer mx-2'>{!hideBalance ? <EyeOffIcon/>: <Eye/>}</span> 
                  </h2>

                </div>
              </div>
          </CardContent>
        </Card>
    )
  }
  

export default WalletCard
