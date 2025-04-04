import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { BellDot } from 'lucide-react'
import React, { forwardRef } from 'react'
import moment from 'moment'


interface NotificationCardProp {
  id: number,

  title: string, message: string, time: string, isUnread: boolean,

}

interface NotificationCardProps {
  notification: NotificationCardProp;
  }

const NotificationCard = forwardRef<HTMLDivElement, NotificationCardProps>(({ notification }, ref) => {
  return (
    <div key={notification.id} className={`flex items-center justify-between space-x-4 p-2 rounded-md ${notification.isUnread ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground'}  shadow-md`}>
    <div className="flex items-center space-x-4">
      <Avatar>
        <BellDot fill='currentColor'/>
      </Avatar>
      <div>
        <p className="text-sm font-medium">{notification.title}</p>
        <p className="text-xs ">{notification.message}</p>
      </div>
    </div>
    <span className="text-xs text-muted-foreground">
      {moment.utc(notification.time).local().fromNow()}
    </span>
  </div>
  )
})

export default NotificationCard
