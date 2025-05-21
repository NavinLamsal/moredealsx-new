"use client";

import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2Icon, User2Icon, Building2Icon, Bike } from 'lucide-react';
import React, { useState } from 'react';
import { validateRequired } from '@/lib/validation/common';
import CountrySelect from '../ui/customInputs/CountrySelect';
import { Card, CardDescription, CardTitle } from '../ui/card';
import MoreClubApiClient from '@/lib/axios/moreclub/MoreClubApiClient';
import { showToast } from '@/lib/utilities/toastService';
import { AppDispatch } from '@/lib/redux/store';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '@/lib/action/moreClub/User';

const ExtraInfoForm = ({ onFinish }: { onFinish: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    gender: '',
    userType: '',
    country: '',
  });

  const [errors, setErrors] = useState<{
    gender?: string;
    userType?: string;
    country?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleCountrySelection = (option: any) => {
    setFormData(prev => ({ ...prev, country: option.value }));
    setErrors(prev => ({ ...prev, country: validateField("country", option.value) }));
  };


  const validateField = (name: string, value: string) => {
    if (name === 'gender') return validateRequired(value, 'Gender');
    if (name === 'userType') return validateRequired(value, 'User Type');
    if (name === 'country') return validateRequired(value, 'Country');
    return '';
  };

  const validate = () => {
    const newErrors: typeof errors = {
      gender: validateField('gender', formData.gender),
      userType: validateField('userType', formData.userType),
      country: validateField('country', formData.country),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(err => !err);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!validate()) {
      setLoading(false);
      return;
    }
    try{
      const res = await MoreClubApiClient.patch(`auth/google-login-user/update/`, {
        gender: formData.gender,
        user_type: formData.userType,
        country: formData.country
      });
      dispatch(fetchUserProfile({ fetchForce: true }));
      if(res?.data?.data?.user_type === "BUSINESS"){
        localStorage.setItem("business_setup", "false");
      }
      localStorage.setItem("membership", "false");

      onFinish();  

    }catch(err:any){
      console.log(err);
      showToast( err?.response?.data.errors?.non_field_errors[0] || err?.response?.data?.message ||"Error updating your profile", "error");
    }
    
    setLoading(false);
  };

  return (
    <Card className="relative p-6 max-w-4xl max-h-[80vh] w-[90%] md:w-[70%] lg:w-[50%] overflow-y-auto">
      <CardTitle className="my-2 text-lg">Lets Get Started</CardTitle>
      <CardDescription className="text-xs">
        Please provide the following information to complete your registration
      </CardDescription>


      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2">
        {/* Gender */}
        <div>
          <label className="block font-medium mb-1">Gender</label>
          <RadioGroup
            defaultValue={formData.gender}
            className="grid grid-cols-3 gap-4"
            onValueChange={(value) => handleChange("gender", value)}
          >
            <div>
              <RadioGroupItem value="MALE" id="male" className="peer sr-only" />
              <label
                htmlFor="male"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-transparent hover:text-foreground hover:border-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:text-primary-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mars"
                >
                  <path d="M16 3h5v5" />
                  <path d="m21 3-6.75 6.75" />
                  <circle cx="10" cy="14" r="6" />
                </svg>
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
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-transparent hover:text-foreground hover:border-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:text-primary-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-venus"
                >
                  <path d="M12 15v7" />
                  <path d="M9 19h6" />
                  <circle cx="12" cy="9" r="6" />
                </svg>
                Female
              </label>
            </div>
            <div>
              <RadioGroupItem
                value="OTHER"
                id="other"
                className="peer sr-only"
              />
              <label
                htmlFor="other"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-transparent hover:text-foreground hover:border-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:text-primary-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mars-stroke"
                >
                  <path d="m14 6 4 4" />
                  <path d="M17 3h4v4" />
                  <path d="m21 3-7.75 7.75" />
                  <circle cx="9" cy="15" r="6" />
                </svg>
                Other
              </label>
            </div>
          </RadioGroup>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        {/* User Type */}
        <div>
          <label className="block font-medium mb-1">Account Type</label>
          <RadioGroup defaultValue={formData.userType} className="grid grid-cols-3 gap-4" onValueChange={(value) => handleChange("userType", value)}>
            <div>
              <RadioGroupItem value="NORMAL" id="NORMAL" className="peer sr-only" />
              <label
                htmlFor="NORMAL"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-transparent hover:text-foreground hover:border-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:text-primary-foreground"
              >
                <User2Icon fill='currentColor' />

                USER
              </label>
            </div>
            <div>
              <RadioGroupItem
                value="BUSINESS"
                id="BUSINESS"
                className="peer sr-only"
              />
              <label
                htmlFor="BUSINESS"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-transparent hover:text-foreground hover:border-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:text-primary-foreground"
              >
                <Building2Icon className='mx-2' />
                Business
              </label>
            </div>
            <div>
              <RadioGroupItem value="DELIVERY" id="DELIVERY" className="peer sr-only" />
              <label
                htmlFor="DELIVERY"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-transparent hover:text-foreground hover:border-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-primary-foreground [&:has([data-state=checked])]:text-primary-foreground"
              >
                <Bike fill='currentColor' />

                Delivery
              </label>
            </div>
          </RadioGroup>
          {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
        </div>
        <div>
          <label>Country</label>
          <div className="relative">
            <CountrySelect onChange={handleCountrySelection} initialValue={formData.country} />
          </div>
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? <Loader2Icon className="animate-spin" /> : 'Next'}
        </Button>
      </form>
    </Card>

  );
};

export default ExtraInfoForm;
