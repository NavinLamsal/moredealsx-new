"use client";
import { Button } from '@/components/ui/button';
import ImageUploadDropBox from '@/components/ui/customInputs/ImageUploads';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { fetchUserProfile } from '@/lib/action/moreClub/User';
import MoreClubApiClient from '@/lib/axios/moreclub/MoreClubApiClient';
import { nextStep, updateField } from '@/lib/redux/slice/RegistrationSlice';
import { AppDispatch } from '@/lib/redux/store';
import { showToast } from '@/lib/utilities/toastService';
import { validateRequired } from '@/lib/validation/common';
import { Bike, Building2Icon, Loader2Icon, User2Icon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const GeneralInformationForm = ({ userdata }: { userdata: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {data:session, update} = useSession();
  const [formData, setFormData] = useState({
    username: userdata?.username || "",
    userType: userdata?.user_type || "",
    email: userdata?.email || "",
    phone: userdata?.phone_number
      ? `${userdata?.phone_prefix}${userdata?.phone_number}`
      : "",
    prefix: userdata?.phone_prefix || "",
    phoneOnly: userdata?.phone_number || "",
    profile: userdata?.display_picture || "",
    displaypicture: null as File | null, // interactive field for new upload
  });

  const [errors, setErrors] = useState<{
    username?: string;
    userType?: string;
    email?: string;
    phone?: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);


  // Update Redux store for interactive fields (if needed)
  const handleChange = (field: string, value: string) => {
    
    dispatch(updateField({ field, value }));
    setErrors((prev) => ({ ...prev, [field]: validateRequired(value, field) }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    if (file === null) return;
    // Update local state for the interactive image field
    setFormData((prev) => ({ ...prev, [field]: file }));
    // Optionally dispatch to Redux if needed:
    // dispatch(updateField({ field, value: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // If you need further validation, add it here.
    dispatch(nextStep());

    if(formData.displaypicture){
      const data ={
        display_picture: formData.displaypicture
      }

      try{
        const res = await MoreClubApiClient.patch(`users/details/me/` ,data,
          {headers:{
            "Content-Type":"multipart/form-data"
          }
        }
        )
        dispatch(fetchUserProfile({ fetchForce: true }));
        update({userDetails: res.data.data }) 
        showToast("Profile Picture Updated Successfully", "success");
      }catch(err:any){  
        showToast("error uploading profile picture", "error")
      }
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2 pb-2 max-w-lg lg:max-w-2xl xl:max-w-3xl">
        <h2 className="text-2xl font-bold mb-2">General Information</h2>
        <p className='text-muted-foreground'>Keep your profile up to date so others can recognize you easily and reach out when needed. Your general information helps personalize your experience on the platform.</p>
        <div >
          <label className="block font-medium mb-1 ">Profile Picture</label>
          <ImageUploadDropBox
            onChange={(file: File | null) => handleFileChange("displaypicture", file)}
            // If profile exists and no new file is uploaded, show the existing image.
            initialImage={typeof formData.profile === "string" && formData.profile !== "" ? formData.profile : undefined}
          />
        </div>
        {formData.email !== "" && (
          <div>
            <label className="block font-medium mb-1">Primary Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              placeholder="m@example.com"
              className={`p-2 border rounded w-full ${errors.email ? "border-red-500" : ""} max-w-xs`}
              readOnly
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        )}
        {formData.phone !== "" && (
          <div>
            <label className="block font-medium mb-1">Primary Phone Number</label>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              placeholder="+1 234 567 890"
              className={`p-2 border rounded w-full ${errors.phone ? "border-red-500" : ""} max-w-xs`}
              disabled
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
        )}
        <div>
          <label className="block font-medium mb-1">Account Type</label>
          <RadioGroup
  defaultValue={formData.userType}
  className="grid grid-cols-3 gap-4"
  disabled
>
  {formData.userType === "NORMAL" && (
    <div>
      <RadioGroupItem value="NORMAL" id="NORMAL" className="peer sr-only" />
      <label
        htmlFor="NORMAL"
        className="flex flex-col items-center justify-center rounded-md border-2 border-muted  p-1.5 text-white bg-primary"
      >
        <User2Icon fill="currentColor" />
        USER
      </label>
    </div>
  )}

  {formData.userType === "BUSINESS" && (
    <div>
      <RadioGroupItem value="BUSINESS" id="BUSINESS" className="peer sr-only" />
      <label
        htmlFor="BUSINESS"
        className="flex flex-col items-center justify-center rounded-md border-2 border-muted  p-1.5 text-white bg-primary"
      >
        <Building2Icon className="mx-2" />
        Business
      </label>
    </div>
  )}

  {formData.userType === "DELIVERY" && (
    <div>
      <RadioGroupItem value="DELIVERY" id="DELIVERY" className="peer sr-only" />
      <label
        htmlFor="DELIVERY"
        className="flex flex-col items-center justify-center rounded-md border-2 border-muted  p-1.5 text-white bg-primary"
      >
        <Bike fill="currentColor" />
        Delivery
      </label>
    </div>
  )}
</RadioGroup>


          {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
        </div>
        
        {formData.displaypicture &&
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        }
      </form>
    </>
  );
};

export default GeneralInformationForm;
