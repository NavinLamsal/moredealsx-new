import ChangePasswordInsideForm from '@/components/form/moredealsclub/auth/forgetPassword/ChangePasswordInside'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const Page = () => {
  return (

    <div className="h-full flex-1 flex-col space-y-8 flex">
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Change Password</h2>

        <p className="text-muted-foreground">
          Choose a Strong password, with least 8 characters , with at least one lowercase letter, one uppercase letter, one number and one special character
        </p>
      </div>
     
    </div>

    <div className='grid grid-cols-1 2xl:grid-cols-2 gap-4 '>
      
      
      
      <Card className="max-w-lg">
        <CardContent className='p-2'>
         
          <ChangePasswordInsideForm/>
     
        </CardContent>
      </Card>
    </div>
  </div>
   
  )
}

export default Page