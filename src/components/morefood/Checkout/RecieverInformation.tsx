"use client"
import ReceiverDetail from '@/components/form/morefood/ReceiverDetail'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { setFieldError, updateFormData } from '@/lib/redux/slice/morefood/CheckoutSlice';
import { RootState } from '@/lib/redux/store';
import { CheckoutFormTypes } from '@/lib/type/morefood/restaurant';
import { validateRequired } from '@/lib/validation/common';
import { set } from 'lodash';
import { Phone, SquareChartGantt, User, UserRound } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const RecieverInformation = () => {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const formData = useSelector((state: RootState) => state.delivery);
  const { receiverName, mobileNumber } = useSelector((state: RootState) => state.delivery);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>(formData.errors || {});
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      if (formData.receiverName === "") {
        const updatedFormData = { ...formData, "receiverName": `${session.user.userDetails.first_name} ${session.user.userDetails.last_name}` };
        dispatch(updateFormData(updatedFormData));
      }
      if (formData.mobileNumber === "") {
        if (session.user.userDetails.phone_number !== null) {
          const updatedFormData = { ...formData, "mobileNumber": `${session.user.userDetails.phone_prefix}${session.user.userDetails.phone_number}` };
          dispatch(updateFormData(updatedFormData));
        }
      }
    }
  }, [session]);


    const validate = async (fieldValues: Partial<{
            receiverName: string;
            mobileNumber: string;
                
            }> = { receiverName, mobileNumber }) => {
        
                // Explicitly define tempErrors as a dynamic object
                const tempErrors: Record<string, string> = { ...errors };
        
                if ("receiverName" in fieldValues) {
        
                    tempErrors.firstName = validateRequired(fieldValues.receiverName || "", "Receiver Name");
                }
        
                if ("mobileNumber" in fieldValues) {
                    tempErrors.mobileNumber = validateRequired(fieldValues.mobileNumber || "", "Mobile Number");
                }
        
                setErrors(tempErrors);
                return Object.values(tempErrors).every((error) => !error);
            };
  
        const handleSubmit = async(e: React.FormEvent) => {
          e.preventDefault();
          if (!(await validate())) {
              return;
          }
         setIsOpen(false);
        };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    dispatch(updateFormData(updatedFormData));
    setErrors({ ...errors, [name]: "" });
    dispatch(setFieldError({ field: name as keyof CheckoutFormTypes, message: "" }));
  };

  return (
    <div className="mt-4 border-b pb-4">
      <div className='flex items-center justify-between'>
        <h3 className="font-medium flex items-center  gap-1"><SquareChartGantt className='mr-2' />Reciever Information


        </h3>
        {!isOpen ? <Button size={"sm"} variant={"morefoodOutline"} onClick={() => setIsOpen(true)}>Edit</Button>
      : 
      <Button size={"sm"} variant={"morefoodPrimary"} onClick={handleSubmit}>Save</Button>  
      }
      </div>

      <p>{formData.errors.receiverName}</p>



      <div className="mt-2 space-y-2 flex justify-between items-end">
        <div className=' flex flex-col gap-3'>
          <p className='flex items-center ml-6'><UserRound size={16} fill='currentColor' className='mr-2 ' />
            {isOpen ? <Input
              type="text"
              name="receiverName"
              id="receiverName"
              readOnly={!isOpen}
              value={formData.receiverName}
              onChange={handleChange}
              className={`  ${formData.errors.receiverName ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}  `}
            /> : `${formData.receiverName}`}</p>
          {formData.errors.receiverName &&
            <p className='text-destructive text-sm'>{formData.errors.receiverName}</p>
          }
          <p className='flex items-center ml-6'><Phone size={16} fill='currentColor' className='mr-2' />{isOpen ? <Input
            type="text"
            name="mobileNumber"
            id="mobileNumber"
            readOnly={!isOpen}
            value={formData.mobileNumber}
            onChange={handleChange}

            className={`  ${formData.errors.mobileNumber ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}  `}
          /> : `${formData.mobileNumber}`}</p>
          {formData.errors.mobileNumber && <p className='text-destructive text-sm'>{formData.errors.mobileNumber}</p>}
        </div>
      </div>



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
  )
}

export default RecieverInformation
