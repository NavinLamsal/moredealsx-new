"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const MapComponent = dynamic(
    () => import("@/components/MapBox/MapboxNavigationComponent"),
    { ssr: false })

const EventsMap = ({lat ,lng}:{lat:string,lng:string}) => {
  return (
    <div>
      <MapComponent lat={lat} lng={lng} />
    </div>
  )
}

export default EventsMap
