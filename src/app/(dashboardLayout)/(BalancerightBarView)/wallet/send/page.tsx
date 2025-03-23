import TransferForm from '@/components/form/moredealsclub/wallet/send/SendForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const Page = () => {
  return (
    
      <div className="flex justify-center items-start  min-h-screen ">
      <Card className="w-full ">
        <CardHeader className=''>
          <CardTitle className='flex items-center border-b border-primary dark:border-gray-200'><Image src={'/images/svg/send.svg'} alt={"send"} className=" h-8 w-auto mb-3 rounded-full object-cover" width={100} height={100} />Send Money</CardTitle>
        </CardHeader>
        <CardContent >          
            <TransferForm/>
        </CardContent>
      </Card>
    </div>
     
  
  )
}

export default Page



