"use client"

import { updateFormData } from '@/lib/redux/slice/morefood/CheckoutSlice';
import { RootState } from '@/lib/redux/store';
import { SquareChartGantt } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { OpeningHours } from '@/lib/type/morefood/restaurant';
import { useFetchRestaurant } from '@/lib/action/morefood/restaurantlist';


const ArrivalTime = () => {
    const {data:session}= useSession();
    const { fetchRestaurantOpeningHours} = useFetchRestaurant()
    const restaurant_slug = useSelector((state: RootState) => state.foodCart.restaurant_slug);
    const [isOpen, setIsOpen] = useState(false);
    const formData = useSelector((state: RootState) => state.delivery);
    const [workingHours, setWorkingHours] = useState<OpeningHours[] | null | undefined>(null);
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


    if(formData.deliverytype === "delivery" || formData.deliverytype === ""){ 
        return null; 
    }


    
  const getResturantsWorkingsHours = async () => {
   
    try {
      const res =await fetchRestaurantOpeningHours(restaurant_slug)
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const sortedOpeningHours = res.sort((a, b) => 
        daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day)
      );
      setWorkingHours(sortedOpeningHours);
    } catch (error) {
      console.error("Error in fetching Resturant details from id", error);
      setWorkingHours(null);
    }
  };

  useEffect(() => {
      getResturantsWorkingsHours();
  }, [restaurant_slug]);

  return (
    <div className="mt-4 border-b pb-4">
    <h3 className="font-medium flex items-center gap-1"><SquareChartGantt  className='mr-2'  />{formData.deliverytype === "delivery"
          ? "Delivery Time"
          : formData.deliverytype === "packed"
            ? "Pick-Up Time"
            : formData.deliverytype === "dine-here"
              ? "Dine-In Time"
              : <span className='text-muted-foreground'>Select a Delivery Option</span>}</h3>
    
   
    <div className="mt-2 space-y-2 flex justify-between items-end">
     <div className=' flex flex-col gap-3'>
    
     <CalendarSelect workingHours={workingHours}/>

    </div>   
    
      
      
    
    </div>
    </div>
  )
}

export default ArrivalTime



const CalendarSelect = ({ workingHours }: { workingHours: OpeningHours[] | null | undefined }) => {

  
const formData = useSelector((state: RootState) => state.delivery);
const dispatch = useDispatch();
   
const [startDate, setStartDate] = useState<Date | null>(
  formData.arrivalTime
    ? new Date(formData.arrivalTime)
    : null
);


const isDateSelectable = (date: Date) => {
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
  const workingDay = workingHours?.find((day) => day.day === dayOfWeek);
  return workingDay !== undefined && workingDay.is_open;
};
  

  
  

//  const minTime = new Date();
//  minTime.setTime(minTime.getTime() + 30  * 1000); 

//   const maxTime = new Date();
//   maxTime.setHours(20);
//   maxTime.setMinutes(30);
    

     const handleChange = (
       date:Date | null
     ) => {
         if (date !== null) {   
           setStartDate(date);
           console.log(date);
            const updatedFormData = { ...formData, arrivalTime: date.toISOString() };
            dispatch(updateFormData(updatedFormData));
         }
     };
    
  return (
    <div>
      <label
        htmlFor="arrivalTime"
        className="block text-sm font-medium text-gray-700 dark:text-gray-100"
      >
        <p>
          <span className="text-red-500">*</span> Arrival Time
        </p>
      </label>

      <DatePicker
        selected={startDate}
        onChange={(date) => handleChange(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={10}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={new Date(new Date().getTime() + 30 * 60 * 1000)}
        // filterDate={isDateSelectable}
        customInput={
          <input
            type="text"
            className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-red-500 focus:border-red-500"
          />
        }
        wrapperClassName="w-full px-4 py-2 h-12"
      />
    </div>
  );
}

// export default CalendarSelect;




