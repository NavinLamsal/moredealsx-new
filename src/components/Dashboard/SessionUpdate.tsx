"use client";
import { useSession } from 'next-auth/react';
import React from 'react'
import { Button } from '../ui/button';

const SessionUpdate = () => {

const {data: session,status, update } = useSession();
 async function updatingSession() {
    if (!session) return;
    const newUser = {
        ...session.user,
        userDetails: {
          ...session.user?.userDetails,
          first_name: "John Doe",
        },
      }; 
      console.log("newUser", newUser)
      const updatedSession = await update({
        user: newUser,
      }); 
}

  return (
    <div>
      <Button onClick={updatingSession}>Update</Button>
    </div>
  )
}

export default SessionUpdate
