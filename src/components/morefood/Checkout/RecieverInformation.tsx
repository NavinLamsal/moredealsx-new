"use client"
import ReceiverDetail from '@/components/form/morefood/ReceiverDetail'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { updateFormData } from '@/lib/redux/slice/morefood/CheckoutSlice';
import { RootState } from '@/lib/redux/store';
import { Phone, SquareChartGantt, User, UserRound } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const RecieverInformation = () => {
    const {data:session}= useSession();

    const [isOpen, setIsOpen] = useState(false);
    const formData = useSelector((state: RootState) => state.delivery);
    const dispatch = useDispatch();

    useEffect(() => {
      if (session) {
        if(formData.receiverName === ""){
          const updatedFormData = { ...formData, "receiverName": `${session.user.userDetails.first_name} ${session.user.userDetails.last_name}` };
          dispatch(updateFormData(updatedFormData));
        }
        if(formData.mobileNumber === ""){
          if(session.user.userDetails.phone_number !== null){
          const updatedFormData = { ...formData, "mobileNumber": `${session.user.userDetails.phone_prefix}${session.user.userDetails.phone_number}` };
          dispatch(updateFormData(updatedFormData));
        }
      }
      }
    }, [session]);

  return (
    <div className="mt-4 border-b pb-4">
    <h3 className="font-medium flex items-center gap-1"><SquareChartGantt  className='mr-2'  />Reciever Information</h3>
    <div className="mt-2 space-y-2 flex justify-between items-end">
     <div className=' flex flex-col gap-3'>
    <p className='flex items-center ml-6'><UserRound size={16} fill='currentColor' className='mr-2 ' /> 
    {formData.receiverName === "" ? <span className='text-muted-foreground'>Receiver name is Required</span> : `${formData.receiverName}`}</p> 
    <p className='flex items-center ml-6'><Phone size={16} fill='currentColor' className='mr-2' />{formData.mobileNumber === "" ? <span className='text-muted-foreground'>Phone Number is Required</span> : `${formData.mobileNumber}`}</p>   
    </div>   
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"morefoodOutline"}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="border-none p-0">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl rounded-xl p-6 shadow-lg">
            <div className="text-xl font-semibold">Who will be receiving the Order?</div>
            <p className="my-2 text-gray-600">
              Specifying reciver name and phone number enables, seamless order tracking for you. Please Provide the correct details
            </p>
            <ReceiverDetail onSubmit={() => setIsOpen(false)}/>
            
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
