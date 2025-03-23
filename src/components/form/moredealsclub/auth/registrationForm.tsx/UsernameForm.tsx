"use client"
import { Button } from '@/components/ui/button';
import PhoneNumberInput from '@/components/ui/customInputs/PhoneNumberInput';
import { Input } from '@/components/ui/input';
import { updateField } from '@/lib/redux/slice/RegistrationSlice';
import { RootState } from '@/lib/redux/store';
import { validateRequired } from '@/lib/validation/common';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const UsernameForm = () => {

    const dispatch = useDispatch();
    const { email, phone} = useSelector((state: RootState) => state.registration);
    const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});


    const handleChange = (field: string, value: string) => {
        dispatch(updateField({ field, value }));
        setErrors({ ...errors, [field]: validateField(field, value) });
    };

    const handlePhoneNumberChange = (data: any) => {
        handleChange("phone", data.fullNumber)
      };

    const validate = async (fieldValues: Partial<{
        email: string;
        phone: string;
       
    }> = { email, phone }) => {

        // Explicitly define tempErrors as a dynamic object
        const tempErrors: Record<string, string> = { ...errors };

        if ("email" in fieldValues) {

            tempErrors.firstName = validateRequired(fieldValues.email || "", "Email");
        }

        if ("phone" in fieldValues) {
            tempErrors.lastName = validateRequired(fieldValues.phone || "", "Phone Number");
        }

        setErrors(tempErrors);
        return Object.values(tempErrors).every((error) => !error);
    };


    const validateField = (name: string, value: string) => {
        switch (name) {
            case "email":
                return validateRequired(value, "Email",);
            case "phone":
                return validateRequired(value, "Phone Number");
            
            default:
                return "";
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!(await validate())) {

            //   showToast("Please fix the errors in the form.", "error");
            return;
        }
    };


    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-2'> 
        <div>
          <label className="block font-medium mb-1">Email</label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="m@example.com"
            className={`p-2 border rounded w-full ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
      
        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <PhoneNumberInput
          onChange={handlePhoneNumberChange}
          initialValue={phone}
        />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
            <div className='grid grid-cols-2 gap-2'>
            <Button variant={"outline"} onClick={(e)=>{e.preventDefault(); console.log("back")}} className='w-full'>Back</Button>

            <Button type='submit' className='w-full'>Proceed</Button>
            </div>
        </form>
    )
}

export default UsernameForm
