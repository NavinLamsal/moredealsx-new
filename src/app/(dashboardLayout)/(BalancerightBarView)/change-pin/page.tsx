import ChangePasswordInsideForm from '@/components/form/moredealsclub/auth/forgetPassword/ChangePasswordInside'
import TransactionPinChangeForm from '@/components/form/moredealsclub/wallet/transactionPin/ChangeTransactionPin'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const Page = () => {
  return (

    <div className="h-full flex-1 flex-col space-y-8 flex">
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Change PIN</h2>

        <p className="text-muted-foreground">
          Choose a Strong PIN, Set Pin that you remember
        </p>
      </div>
     
    </div>

    <div className='grid grid-cols-1 2xl:grid-cols-2 gap-4 '>
      
      
      
      <Card className="max-w-md">
        <CardContent className='p-2 flex flex-col justify-center'>
         
          <TransactionPinChangeForm/>
     
        </CardContent>
      </Card>
    </div>
  </div>
   
  )
}

export default Page