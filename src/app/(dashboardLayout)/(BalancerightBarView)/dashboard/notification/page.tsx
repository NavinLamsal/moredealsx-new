import NotificationList from '@/components/notification/NotificationList'
import { Card, CardContent } from '@/components/ui/card'
import React, { Suspense } from 'react'

const Page = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Notification</h2>

          <p className="text-muted-foreground">
            Here&apos;s a list of your Notifications!
          </p>
        </div>
       
      </div>

      <div className='grid grid-cols-1 2xl:grid-cols-2 gap-4 '>
        <Card className="max-w-lg">
          <CardContent className='p-2'>
            <Suspense fallback={<div>Loading...</div>}>
            <NotificationList/>
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Page