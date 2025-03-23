"use client"
import ReceiverDetail from '@/components/form/morefood/ReceiverDetail'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { RootState } from '@/lib/redux/store';
import { Phone, User, UserRound } from 'lucide-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const RecieverInformation = () => {
     const [isOpen, setIsOpen] = useState(false);
    const formData = useSelector((state: RootState) => state.delivery);

  return (
    <div className="mt-4 border-b pb-4">
    <h3 className="font-medium flex items-center gap-1"><User fill='currentColor' className='mr-2'  />Reciever Information</h3>
    <div className="mt-2 space-y-2 flex justify-between items-end">
     <div className=' flex flex-col gap-3'>
    <p className='flex items-center ml-6'><UserRound size={16} fill='currentColor' className='mr-2' /> {formData.receiverName}</p> 
    <p className='flex items-center ml-6'><Phone size={16} fill='currentColor' className='mr-2' />{formData.mobileNumber}</p>   
    </div>   
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"morefoodOutline"}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="border-none p-0">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl rounded-xl p-6 shadow-lg">
            <div className="text-xl font-semibold">What is your exact location?</div>
            <p className="mt-2 text-gray-600">
              Specifying your location enables more accurate search results, seamless order tracking, and personalized recommendations.
            </p>
            <ReceiverDetail/>
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
      {/* <div className="flex justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
        <div>
          <span className="text-green-600 font-medium">Priority</span>
          <p className="text-gray-500 text-sm">20-35 min - Delivered directly to you</p>
        </div>
        <span className="text-gray-600">+$3.99</span>
      </div>
      <div className="flex justify-between p-3 border rounded-lg bg-gray-200">
        <div>
          <span className="font-medium">Standard</span>
          <p className="text-gray-500 text-sm">25-40 min</p>
        </div>
      </div>
      <div className="flex justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
        <div>
          <span className="font-medium">Schedule</span>
          <p className="text-gray-500 text-sm">Choose a time</p>
        </div>
      </div> */}
    </div>
    </div>
  )
}

export default RecieverInformation
