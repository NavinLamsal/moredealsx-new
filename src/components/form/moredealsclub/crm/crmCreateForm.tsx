"use client";
import { Button } from '@/components/ui/button';
import PasswordField from '@/components/ui/customInputs/PasswordInput';
import PhoneNumberInput from '@/components/ui/customInputs/PhoneNumberInput';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MoreClubApiClient from '@/lib/axios/moreclub/MoreClubApiClient';
import { showToast } from '@/lib/utilities/toastService';
import { removeEmptyStrings, removePrefix } from '@/lib/utils';
import { validateRequired } from '@/lib/validation/common';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


const platformOptions: Record<string, string> = {
  restaurant: `${process.env.NEXT_PUBLIC_API_URL}business/create/domain/`,
  hotel: `${process.env.NEXT_PUBLIC_API_URL}crm/moreliving/domain/`,
};

const CRMCreateForm = ({ businessData }: { businessData: any }) => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [formData, setFormData] = useState({
    username: session?.user.userDetails?.username || "",
    business_name: businessData?.business_name || "",
    business_email: businessData?.business_email || "",
    business_phone: businessData?.business_phone || "",
    domain: "",
    platform:"restaurant",
    email: session?.user.userDetails?.email || "",
    phone: session?.user.userDetails?.phone_number
      ? `${session?.user.userDetails?.phone_prefix}${session?.user.userDetails?.phone_number}`
      : "",
    prefix: session?.user.userDetails?.phone_prefix || "",
    password: ""
  });


  const [errors, setErrors] = useState<{
    domain?: string;
    username?: string;
    business_name?: string;
    business_email?: string
    business_phone?: string,
    email?: string;
    phone?: string;
    prefix?: string
    password?: string;
    platform?:string
  }>({});
  const [loading, setLoading] = useState<boolean>(false);


  const handlePassword = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  const handlePhoneNumberChange = (data: any) => {
    handleChange("secondaryPhone", data.fullNumber)
  };


  // Update Redux store for interactive fields (if needed)
  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: validateRequired(value, field) }));
  };


  const validate = async (fieldValues = formData) => {

    // Explicitly define tempErrors as a dynamic object
    const tempErrors: Record<string, string> = { ...errors };

    if ("business_name" in fieldValues) {

      tempErrors.business_name = validateRequired(fieldValues.business_name || "", "Business Name");
    }

    if ("business_email" in fieldValues) {
      tempErrors.business_email = validateRequired(fieldValues.business_email || "", "Business Email");
    }

    if ("business_phone" in fieldValues) {
      tempErrors.business_phone = validateRequired(fieldValues.business_phone || "", "Business  Phone");
    }

    if ("domain" in fieldValues) {
      tempErrors.domain = validateRequired(fieldValues.domain || "", "Sub Domain name");
    }

    if ("password" in fieldValues) {
      tempErrors.password = validateRequired(fieldValues.password || "", "password");
    }
    if ("platform" in fieldValues) {
      tempErrors.platform = validateRequired(fieldValues.platform || "", "Platform");
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => !error);
  };


  const verifyDomain = async () => {
    try{
      const res = await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_API_URL}business/domain/verify/`,{domain_name: formData.domain});
      const data = res.data;
      setErrors({ ...errors, domain: "" });
      return true
    }catch(err:any){
      const errormessage= err?.response?.data?.errors?.non_field_errors?.[0] || err?.response?.data?.message || "Something went wrong, please try again";
      setErrors({ ...errors, domain: errormessage });
      return false
    } 
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // If you need further validation, add it here.

    if (!(await validate())) {
      setLoading(false);
      return;
    }

    if (!(await verifyDomain())) {
      setLoading(false);
      return;
    }

    


    const data = {
      username: formData.username,
      business_name: formData.business_name,
      business_email: formData.business_email,
      business_phone: formData.business_phone,
      domain_name: formData.domain,
      ...(session?.user.userDetails?.email ? { email: formData.email , phone_number: null, phone_prefix: null }
        : {
          email:null,
          phone_number: removePrefix(formData.phone, formData.prefix),
          phone_prefix: formData.prefix,
        }
      ),

      password: formData.password
    }
  const cleanedData = removeEmptyStrings(data)
    try {
      const url = platformOptions[formData.platform] as string
      const res = await MoreClubApiClient.post(url, cleanedData)
      showToast("CRM Created Successfully", "success");

      const updateData = {
        ...session?.user.userDetails,
        crm_link: {
            restro_link: res.data.data.domain
          }
      }
      
      update({userDetails: updateData }) 
      router.push("/business/crm/manage")

    } catch (err: any) {
      showToast("Error creating CRM", "error")
    }
  

  setLoading(false);
};

return (
  <>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2 pb-2">

      <h3 className='my-4 font-bold text-lg'>Business Details</h3>
      <div className='grid md:grid-cols-2 gap-2'>
        <div>
          <label className="block font-medium mb-1">Business Name</label>
          <Input
            type="text"
            name="business_name"
            value={formData.business_name}
            onChange={(e) => handleChange("business_name", e.target.value)}
            placeholder="m@example.com"
            className={`p-2 border rounded w-full ${errors.business_name ? "border-red-500" : ""}`}
          />
          {errors.business_name && <p className="text-red-500 text-sm">{errors.business_name}</p>}
        </div>
        <div>
          <label className="block font-medium mb-1">Business Email</label>
          <Input
            type="email"
            name="business_email"
            value={formData.business_email}
            onChange={(e) => handleChange("business_email", e.target.value)}
            placeholder="m@example.com"
            className={`p-2 border rounded w-full ${errors.business_email ? "border-red-500" : ""}`}
          />
          {errors.business_email && <p className="text-red-500 text-sm">{errors.business_email}</p>}
        </div>
        <div>
          <label className="block font-medium mb-1">Business Contact Number</label>
          <PhoneNumberInput
            onChange={handlePhoneNumberChange}
            initialValue={formData.business_phone}
          />
          {errors.business_phone && <p className="text-red-500 text-sm">{errors.business_phone}</p>}
        </div>
        <div>
          <label className="block font-medium mb-1">Domain</label>
          <Input
            type="text"
            name="domain"
            value={formData.domain}
            onChange={(e) => handleChange("domain", e.target.value)}
            placeholder="subdomain.moredealsx.com"
            className={`p-2 border  rounded w-full ${errors.domain ? "border-red-500" : ""} `}
          />
          {errors.domain && <p className="text-red-500 text-sm">{errors.domain}</p>}
        </div>
        <div>
                <label className="block text-sm font-medium  mb-1">Platform</label>
                <Select name='occupation' onValueChange={(value) => handleChange("platform", value)} defaultValue={formData.platform}>

                    <SelectTrigger>
                        <SelectValue placeholder="Select Platform" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="restaurant">Restaurant (MOREFOOD)</SelectItem>
                        <SelectItem value="hotel">Hotel (MORELIVING)</SelectItem>
                    </SelectContent>
                </Select>
                {errors.platform && <p className="text-red-500">{errors.platform}</p>}





            </div>
      </div>

      <h3 className='my-4 font-bold text-lg'>CRM Login Credentials</h3>
      <div className='grid md:grid-cols-2 gap-2'>
        {formData.email !== "" && (
          <div>
            <label className="block font-medium mb-1">Login Email</label>
            <Input
              type="email"
              name="email"
              disabled
              value={formData.email}
              placeholder="m@example.com"
              className={`p-2 border  rounded w-full ${errors.email ? "border-red-500" : ""} `}
              readOnly
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        )}
        {formData.phone !== "" && (

          <div>
            <label className="block font-medium mb-1">Login Phone Number</label>
            <PhoneNumberInput
              onChange={handlePhoneNumberChange}
              initialValue={formData.phone}
              disabled={true}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
        )}
        <div>
          <div className="flex items-center">
            <label htmlFor="password">Password</label>
          </div>
          <PasswordField
            name="password"
            value={formData.password}
            onChange={(val) => handlePassword("password", val)}
            placeholder="Enter your password"
            error={errors.password}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

      </div>

      <div className="grid w-full ">
        <Button type="submit" disabled={loading} className='font-bold text-lg'>
          {loading && <Loader2 className="animate-spin w-5 h-5 mr-2" />} Create CRM
        </Button>
      </div>



    </form>
  </>
);
};

export default CRMCreateForm;
