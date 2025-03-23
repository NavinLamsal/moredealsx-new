import EventList from '@/components/Events/EventsList'
import TrendingEvents from '@/components/Events/TrendingEvent'
import Heading from '@/components/ui/heading'
import React from 'react'

const Page = () => {
  return (
    <div>
     
     
      {/* <TrendingEvents title="Upcoming Events"/> */}
      <TrendingEvents title="Popular Events"/>
      {/* <TrendingEvents title="Live Events"/> */}
      <Heading title="Events You May Like" />
      <EventList/>
    </div>
  )
}

export default Page
