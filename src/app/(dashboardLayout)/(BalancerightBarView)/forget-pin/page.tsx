import PinForgetSetForm from '@/components/form/moredealsclub/wallet/transactionPin/ForgetPinSet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const Page = () => {
  return (
    <div className="flex justify-center items-start  min-h-screen  max-w-md mx-auto lg:mx-0 mt-10 lg:mt-0">
      <Card className="w-full ">
        <CardHeader className=''>
          <CardTitle className='flex items-center border-b border-primary dark:border-gray-200'>Reset Pin</CardTitle>
        </CardHeader>
        <CardContent >          
            <PinForgetSetForm/>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page