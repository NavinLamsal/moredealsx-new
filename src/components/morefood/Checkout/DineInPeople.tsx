// "use client"
// import ReceiverDetail from '@/components/form/morefood/ReceiverDetail'
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input';
// import { setFieldError, updateFormData } from '@/lib/redux/slice/morefood/CheckoutSlice';
// import { RootState } from '@/lib/redux/store';
// import { CheckoutFormTypes } from '@/lib/type/morefood/restaurant';
// import { validateRequired } from '@/lib/validation/common';
// import { set } from 'lodash';
// import { Phone, SquareChartGantt, User, UserRound } from 'lucide-react';
// import { useSession } from 'next-auth/react';
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';

// const DineIn = () => {
//   const { data: session } = useSession();

//   const [isOpen, setIsOpen] = useState(false);
//   const formData = useSelector((state: RootState) => state.delivery);
//   const {  no_of_people } = useSelector((state: RootState) => state.delivery);
//   const [errors, setErrors] = React.useState<{ [key: string]: string }>(formData.errors || {});
//   const dispatch = useDispatch();


//   if(formData.deliverytype === "delivery" || formData.deliverytype === ""){ 
//     return null; 
//  }


//   useEffect(() => {
//     if (session) {
//       if (formData.receiverName === "") {
//         const updatedFormData = { ...formData, "receiverName": `${session.user.userDetails.first_name} ${session.user.userDetails.last_name}` };
//         dispatch(updateFormData(updatedFormData));
//       }
//       if (formData.mobileNumber === "") {
//         if (session.user.userDetails.phone_number !== null) {
//           const updatedFormData = { ...formData, "mobileNumber": `${session.user.userDetails.phone_prefix}${session.user.userDetails.phone_number}` };
//           dispatch(updateFormData(updatedFormData));
//         }
//       }
//     }
//   }, [session]);


//     const validate = async (fieldValues: Partial<{
//         no_of_people: string;
           
                
//             }> = { no_of_people}) => {
        
//                 // Explicitly define tempErrors as a dynamic object
//                 const tempErrors: Record<string, string> = { ...errors };
        
//                 if ("no_of_people" in fieldValues) {
        
//                     tempErrors.firstName = validateRequired(fieldValues.no_of_people || "", "No of people");
//                 }
        
                
        
//                 setErrors(tempErrors);
//                 return Object.values(tempErrors).every((error) => !error);
//             };
  
//         const handleSubmit = async(e: React.FormEvent) => {
//           e.preventDefault();
//           if (!(await validate())) {
//               return;
//           }
//          setIsOpen(false);
//         };


//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     const updatedFormData = { ...formData, [name]: value };
//     dispatch(updateFormData(updatedFormData));
//     setErrors({ ...errors, [name]: "" });
//     dispatch(setFieldError({ field: name as keyof CheckoutFormTypes, message: "" }));
//   };

//   return (
//     <div className="mt-4 border-b pb-4">

//       <div className="mt-2 space-y-2 flex justify-between items-end">
//         <div className=' flex flex-col gap-3'>
//             <h3 className="font-medium flex items-center gap-1"><SquareChartGantt  className='mr-2'  />No of people for Dine in</h3>
//           <p className='flex items-center ml-6'><UserRound size={16} fill='currentColor' className='mr-2 ' />
//          <Input
//               type="text"
//               name="no_of_people"
//               id="no_of_people"
              
//               value={formData.no_of_people}
//               onChange={handleChange}
//               className={`  ${formData.errors.receiverName ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}  `}
//             /> </p>
//           {formData.errors.no_of_people &&
//             <p className='text-destructive text-sm'>{formData.errors.no_of_people}</p>
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DineIn


"use client";

import { Input } from '@/components/ui/input';
import { SquareChartGantt, UserRound } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, setFieldError } from '@/lib/redux/slice/morefood/CheckoutSlice';
import { RootState } from '@/lib/redux/store';
import { CheckoutFormTypes } from '@/lib/type/morefood/restaurant';
import { validateRequired } from '@/lib/validation/common';

const DineIn = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const formData = useSelector((state: RootState) => state.delivery);
  const { deliverytype, receiverName, mobileNumber, no_of_people, errors: formErrors = {} } = formData;

  const [errors, setErrors] = useState<{ [key: string]: string }>(formErrors);

  // If it's not dine-in, return early
  if (deliverytype !== "dine-here") return null;

  // Pre-fill user details
  useEffect(() => {
    if (!session) return;

    const { userDetails } = session.user;

    const updates: Partial<CheckoutFormTypes> = {};

    if (!receiverName && userDetails?.first_name && userDetails?.last_name) {
      updates.receiverName = `${userDetails.first_name} ${userDetails.last_name}`;
    }

    if (!mobileNumber && userDetails?.phone_number) {
      updates.mobileNumber = `${userDetails.phone_prefix}${userDetails.phone_number}`;
    }

    if (Object.keys(updates).length > 0) {
      dispatch(updateFormData({ ...formData, ...updates }));
    }
  }, [session]);

  const validate = (fields: Partial<Pick<CheckoutFormTypes, "no_of_people">> = { no_of_people }) => {
    const temp: Record<string, string> = { ...errors };

    if ("no_of_people" in fields) {
      temp.no_of_people = validateRequired(fields.no_of_people || "", "No of people");
    }

    setErrors(temp);
    return Object.values(temp).every(err => !err);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch(updateFormData({ ...formData, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
    dispatch(setFieldError({ field: name as keyof CheckoutFormTypes, message: "" }));
  };

  return (
    <div className="mt-4 border-b pb-4">
      <div className="mt-2 flex justify-between items-end">
        <div className="flex flex-col gap-3">
          <h3 className="font-medium flex items-center gap-1">
            <SquareChartGantt className="mr-2" />
            No of people for Dine in
          </h3>

          <div className="flex items-center ml-6">
            <UserRound size={16} fill="currentColor" className="mr-2" />
            <Input
              type="text"
              name="no_of_people"
              id="no_of_people"
              value={no_of_people}
              onChange={handleChange}
              className={formErrors.no_of_people ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}
            />
          </div>

          {formErrors.no_of_people && (
            <p className="text-destructive text-sm">{formErrors.no_of_people}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DineIn;
