"use client"
import { Button } from '@/components/ui/button';
import CustomDatePicker from '@/components/ui/customInputs/DatePicker';
import PhoneNumberInput from '@/components/ui/customInputs/PhoneNumberInput';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { fetchUserProfile } from '@/lib/action/moreClub/User';
import MoreClubApiClient from '@/lib/axios/moreclub/MoreClubApiClient';
import useMoredealsClient from '@/lib/axios/moredealsClient';
import { createServerPlatformAxiosInstance } from '@/lib/axios/platformBasedAxios';
import { AppDispatch } from '@/lib/redux/store';
import { showToast } from '@/lib/utilities/toastService';
import { removeEmptyStrings } from '@/lib/utils';
import { validateRequired } from '@/lib/validation/common';
import { Loader2Icon, Mail, Phone } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';




export const CheckUserName = async (username: string, prefix?: string) => {
  const isEmail = (username: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
  const isPhoneNumber = (username: string) => /^[1-9]\d{9,14}$/.test(username); // Ensures 10-15 digit numbers

  const removePrefix = (phone: string, prefix: string) => {
    if (phone.startsWith(prefix)) {
      return phone.slice(prefix.length); // Remove the prefix from the phone number
    }
    return phone; // Return original if prefix is not at the beginning
  };


  let payload;
  if (isEmail(username)) {
    payload = { email: username, via: "email" };
  } else if (isPhoneNumber(username)) {
    if (prefix) {
      const phoneWithoutPrefix = removePrefix(username, prefix);
      payload = { phone_number: phoneWithoutPrefix, phone_prefix: prefix, via: "phone_number" };
    } else {
      return "Please enter a valid phone number"
    }
  } else {
    payload = { username };
  }
  try {
    const res = await createServerPlatformAxiosInstance("moredealsclub", false).post(`auth/check/user/`, payload

    );
    if (res.status === 200) {
      return "";
    }
  } catch (error: any) {
    return error.response.data?.errors?.non_field_errors[0]


  }

}

const validatePhoneNumber = async (phone: string): Promise<string> => {
  let error = "";
  error = validateRequired(phone, "Phone Number");
  return error
};

const validateEmailAddress = async (email: string): Promise<string> => {
  let error = "";
  error = validateRequired(email, "Email");
  return error
};

const PersonalInformation = ({ userdata }: { userdata: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {data:session, update} = useSession();
  const initialFormData = {
    firstName: userdata.first_name ?? "",
    lastName: userdata.last_name ?? "",
    gender: userdata.gender ?? "",
    secondaryEmail: userdata.user_profile.secondary_email ?? "",
    secondaryPhone: userdata.user_profile.secondary_phone_number ?? "",
    dob: userdata.user_profile.date_of_birth ?? "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const[hasChanged , setHasChanged]=useState(false)
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string, gender?: string, secondaryEmail?: string; secondaryPhone?: string;  dob?: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange =async (field: string, value: string) => {

    setFormData((prev) => {
      const updatedData = { ...prev, [field]: value };
      setHasChanged(JSON.stringify(updatedData) !== JSON.stringify(initialFormData));
      return updatedData;
    });
    setErrors({ ...errors, [field]: await validateField(field, value) });
  };

  const handlePhoneNumberChange = (data: any) => {
    handleChange("secondaryPhone", data.fullNumber)
  };

  const validate = async (fieldValues = formData) => {

    // Explicitly define tempErrors as a dynamic object
    const tempErrors: Record<string, string> = { ...errors };

    if ("firstName" in fieldValues) {

      tempErrors.firstName = validateRequired(fieldValues.firstName || "", "firstName");
    }

    if ("lastName" in fieldValues) {
      tempErrors.lastName = validateRequired(fieldValues.lastName || "", "lastName");
    }

    if ("gender" in fieldValues) {
      tempErrors.gender = validateRequired(fieldValues.gender || "", "gender");
    }


    if ("secondaryEmail" in fieldValues) {
      if(fieldValues.secondaryEmail !== ""){
        let emailErrors = "";
        emailErrors = await validateEmailAddress(fieldValues.secondaryEmail || "");
        if (emailErrors === "") {
          emailErrors = await CheckUserName(fieldValues.secondaryEmail);
        }
        tempErrors.secondaryEmail = emailErrors;
      }else{
        tempErrors.secondaryEmail = "";
      }
    }

    if ("secondaryPhone" in fieldValues) {
      if(fieldValues.secondaryPhone !== ""){
        let errors = "";
        errors = await validatePhoneNumber(fieldValues.secondaryPhone || "");
        // if (errors === "") {
        //   errors = await CheckUserName(fieldValues.secondaryPhone || "");
        // }
  
        tempErrors.secondaryPhone = errors
      }else{
        tempErrors.secondaryPhone = "";
      }

    }
    if ("dob" in fieldValues) {
      tempErrors.dob = validateRequired(fieldValues.dob || "", "Date of Birth");
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => !error);
  };


  const validateField = async (name: string, value: string) => {
    switch (name) {
      case "firstName":
        return validateRequired(value, "First Name",);
      case "lastName":
        return validateRequired(value, "Last Name");
      case "gender":
        return validateRequired(value, "Gender");
      case "secondaryEmail":
        if(value !== ""){
          return await validateEmailAddress(value);
        }else{
          return ""
        }
      case "secondaryPhone":
        if(value !== ""){
          return await validatePhoneNumber(value);
        }else{
          return ""
        }
      case "dob":
        return validateRequired(value, "Date of Birth");
      default:
        return "";
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!(await validate())) {
      setLoading(false);
      return;
    }
     try{
        const data = {
          first_name:formData.firstName ,
          last_name: formData.lastName,
          gender: formData.gender ,
          user_profile:{
            date_of_birth:formData.dob,
            secondary_email:formData.secondaryEmail,
            secondary_phone_number: formData.secondaryPhone
          }
        }
        const cleanedData = removeEmptyStrings(data)

            const res = await MoreClubApiClient.patch(`users/details/me/` ,cleanedData,
            )  
            dispatch(fetchUserProfile({ fetchForce: true }));   
            update({userDetails: res.data.data }) 
            showToast("Your changes are updated", "success");
          }catch(err:any){  
            showToast("error uploading your changes", "error")
          }

    setLoading(false);

  };


  return (
    <>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-2 pb-2 max-w-lg lg:max-w-2xl xl:max-w-3xl'>
      <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
      <p className='text-muted-foreground'>Your personal details help us tailor your experience and ensure smooth communication. Make sure everything here is accurate and up to date.</p>

        <div className='grid grid-cols-2 gap-1'>
          <div>
            <label className="block font-medium mb-1">First name</label>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="John"
              className={`p-2 border rounded w-full 
                `}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Last name</label>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Doe"
              className={`p-2 border rounded w-full 
                `}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <Input
            type="email"
            name="secondaryEmail"
            value={formData.secondaryEmail}
            onChange={(e) => handleChange("secondaryEmail", e.target.value)}
            placeholder="m@example.com"
            className={`p-2 border rounded w-full ${errors.secondaryEmail ? "border-red-500" : ""}`}
          />
          {errors.secondaryEmail && <p className="text-red-500 text-sm">{errors.secondaryEmail}</p>}
        </div>
        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <PhoneNumberInput
            onChange={handlePhoneNumberChange}
            initialValue={formData.secondaryPhone}
          />
          {errors.secondaryPhone && <p className="text-red-500 text-sm">{errors.secondaryPhone}</p>}
        </div>



        <div>
          <label className="block font-medium mb-1">Gender</label>
          <RadioGroup defaultValue={formData.gender} className="grid grid-cols-3 gap-4" onValueChange={(value) => handleChange("gender", value)}>
            <div>
              <RadioGroupItem value="MALE" id="male" className="peer sr-only" />
              <label
                htmlFor="male"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mars"><path d="M16 3h5v5" /><path d="m21 3-6.75 6.75" /><circle cx="10" cy="14" r="6" /></svg>

                Male
              </label>
            </div>
            <div>
              <RadioGroupItem
                value="FEMALE"
                id="female"
                className="peer sr-only"
              />
              <label
                htmlFor="female"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-venus"><path d="M12 15v7" /><path d="M9 19h6" /><circle cx="12" cy="9" r="6" /></svg>
                Female
              </label>
            </div>
            <div>
              <RadioGroupItem value="OTHER" id="other" className="peer sr-only" />
              <label
                htmlFor="other"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mars-stroke"><path d="m14 6 4 4" /><path d="M17 3h4v4" /><path d="m21 3-7.75 7.75" /><circle cx="9" cy="15" r="6" /></svg>
                Other
              </label>
            </div>
          </RadioGroup>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-sm">Date of Birth</label>
          <CustomDatePicker name="dob" value={formData.dob} onChange={handleChange} placeHolder={"Date of Birth"} />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        {hasChanged && 
        <Button type='submit' className='w-full' disabled={loading}>
          {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
        
        }
      </form>

    </>
  )
}

export default PersonalInformation
