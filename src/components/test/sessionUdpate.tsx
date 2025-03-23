"use client"
import React from 'react'
import { Button } from '../ui/button'
import { handleUpdateSession } from '@/lib/action/updatesession';

const SessionUdpate = () => {
   const  handlesessionUpdate = async () => {
       await handleUpdateSession();
   } 

  return (
    <div>
      <Button onClick={handlesessionUpdate}>
        update session
      </Button>
    </div>
  )
}

export default SessionUdpate
