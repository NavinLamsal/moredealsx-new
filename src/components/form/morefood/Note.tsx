"use client"
import { updateFormData } from '@/lib/redux/slice/morefood/CheckoutSlice';
import { RootState } from '@/lib/redux/store';
import { NotebookPen } from 'lucide-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Note = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.delivery);
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        dispatch(updateFormData(updatedFormData));
        setErrors({ ...errors, [name]: "" });
      };


  return (
    <form className="space-y-6" >
        
        <div>
          <h3 className="font-medium flex items-center gap-2">
         <NotebookPen />
          Note
      </h3>
          <textarea
            name="note"
            id="note"
            value={formData.note}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-red-500 focus:border-red-500"
          ></textarea>
        </div>
        
        <div className='flex justify-end w-full items-center gap-2'>
        </div>
      </form>
  )
}

export default Note
