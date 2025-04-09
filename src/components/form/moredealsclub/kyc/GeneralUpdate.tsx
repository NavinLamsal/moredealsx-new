"use client"
import { Button } from '@/components/ui/button';
import CustomDatePicker from '@/components/ui/customInputs/DatePicker';
import PhoneNumberInput from '@/components/ui/customInputs/PhoneNumberInput';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import useMoredealsClient from '@/lib/axios/moredealsClient';
import { showToast } from '@/lib/utilities/toastService';
import { removeEmptyStrings } from '@/lib/utils';
import { validateRequired } from '@/lib/validation/common';
import { CalendarIcon, Loader2Icon, MailIcon, Paperclip, PhoneIcon, PinIcon, User } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react'
import ImageUploadDropBox from '@/components/ui/customInputs/ImageUploads';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AutoCompleteInput from '@/components/MapBox/AutoCompleteMapInput';
import { KYCProps } from '@/lib/type/moreclub/User';
import KycDetail from '@/components/moreclub/profile/kycDetail';


interface Address {
    address: string;
    city: string;
    house_no: string;
    region?: string
    street: string;
    zip_code: string;
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

const Generalupdate = ({ userdata }: { userdata?: KYCProps }) => {
    const axios = useMoredealsClient();
    const initialFormData = {
        fatherName: userdata?.father_name ?? "",
        mothername: userdata?.mother_name ?? "",
        spousename: userdata?.spouse_name ?? "",
        gender: userdata?.gender ?? "",
        secondaryEmail: userdata?.secondary_email ?? "",
        secondaryPhone: userdata?.secondary_phone_number ?? "",

        dob: userdata?.date_of_birth ?? "",

        maritialStatus: userdata?.marital_status ?? "",
        occupation: userdata?.occupation ?? "",




    };

    const [formData, setFormData] = useState(initialFormData);


    const [hasChanged, setHasChanged] = useState(false)
    const [errors, setErrors] = useState<{ fatherName?: string, spousename?: string, gender?: string, secondaryEmail?: string; secondaryPhone?: string; dob?: string; maritialStatus?: string, occupation?: string }>({});
    const [loading, setLoading] = useState<boolean>(false);



    const handleChange = (field: string, value: string) => {

        setFormData((prev) => {
            const updatedData = { ...prev, [field]: value };
            setHasChanged(JSON.stringify(updatedData) !== JSON.stringify(initialFormData));
            return updatedData;
        });
        setErrors({ ...errors, [field]: validateField(field, value) });
    };

    const handlePhoneNumberChange = (data: any) => {
        handleChange("secondaryPhone", data.fullNumber)
    };



    const validate = async (fieldValues = formData) => {

        // Explicitly define tempErrors as a dynamic object
        const tempErrors: Record<string, string> = { ...errors };

        if ("fatherName" in fieldValues) {
            tempErrors.fatherName = validateRequired(fieldValues.fatherName || "", "fatherName");
        }

        if ("spousename" in fieldValues) {
            if (formData.maritialStatus === "married") {

                tempErrors.spousename = validateRequired(fieldValues.spousename || "", "spousename");
            } else {
                tempErrors.spousename = "";
            }
        }

        if ("mothername" in fieldValues) {
            tempErrors.mothername = ""
        }

        if ("occupation" in fieldValues) {
            tempErrors.occupation = validateRequired(fieldValues.occupation || "", "occupation");
        }
        if ("maritialStatus" in fieldValues) {
            tempErrors.maritialStatus = validateRequired(fieldValues.maritialStatus || "", "Maritial status");
        }
        if ("dob" in fieldValues) {
            tempErrors.dob = validateRequired(fieldValues.dob || "", "Date of Birth");
        }
        if ("secondaryEmail" in fieldValues) {
            if (fieldValues.secondaryEmail !== "") {
                tempErrors.secondaryEmail = await validateEmailAddress(fieldValues.secondaryEmail || "");
            } else {
                tempErrors.secondaryEmail = "";
            }
        }
        if ("secondaryPhone" in fieldValues) {
            if (fieldValues.secondaryPhone !== "") {
                tempErrors.secondaryPhone = await validatePhoneNumber(fieldValues.secondaryPhone || "");
            } else {
                tempErrors.secondaryPhone = "";
            }
        }




        setErrors(tempErrors);

        return Object.values(tempErrors).every((error) => !error);
    };


    const validateField = async (name: string, value: string) => {
        switch (name) {
            case "fatherName":
                return validateRequired(value, "First Name");
            case "spousename":
                return formData.maritialStatus === "married" ? validateRequired(value, "Spouse Name") : "";
            case "mothername":
                return validateRequired(value, "Last Name");
            case "maritialStatus":
                return validateRequired(value, "Maritial Status");
            case "occupation":
                return validateRequired(value, "Occupation");
            case "dob":
                return validateRequired(value, "Date of Birth");
            case "mothername":
                return "";
            case "secondaryEmail":
                if (value !== "") {
                    return await validateEmailAddress(value);
                } else {
                    return ""
                }
            case "secondaryPhone":
                if (value !== "") {
                    return await validatePhoneNumber(value);
                } else {
                    return ""
                }
            case "dob":
                return validateRequired(value, "Date of Birth");
            default:
                return "";
        }
    };


    const handleAddressChange = (newAddress: Address) => {

        console.log("newAddress", newAddress)
        // Update only address fields in formData
        setFormData((prev) => {
            const updatedData = {
                ...prev,
                address: newAddress.address,
                city: newAddress.city,
                house_no: newAddress.house_no,
                street: newAddress.street,
                region: newAddress.region,
                zip_code: newAddress.zip_code,
            };

            setHasChanged(JSON.stringify(updatedData) !== JSON.stringify(initialFormData));
            return updatedData;
        });

        // Validate address fields
        setErrors((prevErrors) => ({
            ...prevErrors,
            address: validateRequired(newAddress.address, "Address"),
            city: validateRequired(newAddress.city, "City"),
            house_no: validateRequired(newAddress.house_no, "House No."),
            street: validateRequired(newAddress.street, "Street"),
            zip_code: validateRequired(newAddress.zip_code, "Zip Code"),
        }));
    }

    const handleManualInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;

        setFormData((prev) => {
            const updatedData = { ...prev, [id]: value };
            setHasChanged(JSON.stringify(updatedData) !== JSON.stringify(initialFormData));
            return updatedData;
        });

        setErrors({ ...errors, [id]: validateField(id, value) });
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!(await validate())) {
            setLoading(false);
            return;
        }


        try {
            const data = {
                father_name: formData.fatherName,
                mother_name: formData.mothername,
                spouse_name: formData.spousename,
                kyc_user_profile: {
                    secondary_email: formData.secondaryEmail,
                    secondary_phone_number: formData.secondaryPhone,
                    date_of_birth: formData.dob,

                },
                marital_status: formData.maritialStatus,
                occupation: formData.occupation
            }


            const cleanedData = removeEmptyStrings(data)

            const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}kyc/details/`, cleanedData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )

            showToast("Your changes are updated", "success");
        } catch (err: any) {
            showToast("error uploading your changes", "error")
        }

        setLoading(false);

    };


    return (
        <>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-2 pb-2 max-w-xl lg:max-w-3xl xl:max-w-4xl'>
                <h2 className="text-2xl font-bold mb-2 flex items-center"><User className='mr-2' fill='currentColor' /> Personal Information</h2>
                <p className='text-muted-foreground'>Your personal details help us tailor your experience and ensure smooth communication. Make sure everything here is accurate and up to date</p>

                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
                    <div>
                        <label className="flex items-center gap-1 font-medium mb-1"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.18 15.296c-1.258.738-4.555 2.243-2.547 4.126c.982.92 2.074 1.578 3.448 1.578h7.838c1.374 0 2.467-.658 3.447-1.578c2.009-1.883-1.288-3.389-2.546-4.126a9.61 9.61 0 0 0-9.64 0M14 7a4 4 0 1 1-8 0a4 4 0 0 1 8 0m2.761-3.724c.805-.457 1.507-.273 1.929.02c.173.12.26.181.31.181s.137-.06.31-.18c.422-.294 1.124-.478 1.929-.02c1.056.599 1.294 2.577-1.14 4.246C19.633 7.841 19.401 8 19 8s-.634-.159-1.098-.477c-2.436-1.669-2.197-3.647-1.14-4.247" color="currentColor" />
                        </svg>Marital Status</label>
                        <Select name='maritialStatus' onValueChange={(value) => handleChange("maritialStatus", value)} defaultValue={formData.maritialStatus}>

                            <SelectTrigger>
                                <SelectValue placeholder="Select marital status" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="married">Married</SelectItem>
                                <SelectItem value="divorced">Divorced</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.maritialStatus && <p className="text-red-500 text-sm">{errors.maritialStatus}</p>}
                    </div>
                    <div>
                        <label className="flex items-center gap-2 font-medium mb-1"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 15c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4M8 9a4 4 0 0 0 4 4a4 4 0 0 0 4-4m-4.5-7c-.3 0-.5.21-.5.5v3h-1V3s-2.25.86-2.25 3.75c0 0-.75.14-.75 1.25h10c-.05-1.11-.75-1.25-.75-1.25C16.25 3.86 14 3 14 3v2.5h-1v-3c0-.29-.19-.5-.5-.5z" />
                        </svg>Occupation</label>
                        <Select name='occupation' onValueChange={(value) => handleChange("occupation", value)} defaultValue={formData.occupation}>

                            <SelectTrigger>
                                <SelectValue placeholder="Select occupation" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="employed">Employed</SelectItem>
                                <SelectItem value="self-employed">Self Employed</SelectItem>
                                <SelectItem value="unemployed">Unemployed</SelectItem>
                                <SelectItem value="retired">Retired</SelectItem>
                            </SelectContent>
                        </Select>

                        {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation}</p>}
                    </div>
                    <div>
                        <label className="flex items-center gap-1 font-medium mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48">
                                <path fill="currentColor" d="M28 8a4 4 0 1 1-8 0a4 4 0 0 1 8 0M18 18.82c-.217.513-.41 1.19-.564 1.995C17.03 22.931 17 25.273 17 26a2 2 0 1 1-4 0c0-.773.026-3.431.508-5.94c.238-1.236.616-2.607 1.265-3.717c.651-1.115 1.822-2.343 3.671-2.343h11.112c1.849 0 3.02 1.228 3.671 2.343c.649 1.11 1.027 2.48 1.265 3.717c.482 2.509.508 5.167.508 5.94a2 2 0 1 1-4 0c0-.727-.03-3.069-.436-5.185c-.155-.805-.347-1.482-.564-1.994V42a2 2 0 0 1-3.994.153l-1-13A2 2 0 0 1 25 29h-2q0 .076-.006.153l-1 13A2 2 0 0 1 18 42z"></path>
                            </svg>
                            Father Name</label>
                        <Input
                            type="text"
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={(e) => handleChange("fatherName", e.target.value)}
                            placeholder="John"
                            disabled={userdata?.is_verified}
                            className={`p-2 border rounded w-full 
                `}
                        />
                        {errors.fatherName && <p className="text-red-500 text-sm">{errors.fatherName}</p>}
                    </div>
                    <div>
                        <label className="flex items-center gap-1 font-medium mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 14 14">
                                <path fill="currentColor" fillRule="evenodd" d="M9.066 2.066a2.066 2.066 0 1 1-4.132 0a2.066 2.066 0 0 1 4.132 0M8.498 13.6l.39-1.944h1.522c.246 0 .448-.2.47-.456a.3.3 0 0 0-.007-.09a36 36 0 0 1-.206-1.076C10.242 7.686 9.75 4.975 7 4.975s-3.242 2.711-3.667 5.058c-.067.372-.133.735-.206 1.076a.3.3 0 0 0-.007.09a.484.484 0 0 0 .47.456h1.521l.391 1.944a.5.5 0 0 0 .49.401h2.016a.5.5 0 0 0 .49-.401Z" clipRule="evenodd"></path>
                            </svg>
                            Mother Name (Optional)</label>
                        <Input
                            type="text"
                            name="mothername"
                            value={formData.mothername}
                            onChange={(e) => handleChange("mothername", e.target.value)}
                            placeholder="Peter"
                            disabled={userdata?.is_verified}
                            className={`p-2 border rounded w-full 
                `}
                        />

                    </div>
                    {formData.maritialStatus === "married" &&
                        <div>
                            <label className="flex items-center gap-1 font-medium mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M7.5 2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2M6 7h3a2 2 0 0 1 2 2v5.5H9.5V22h-4v-7.5H4V9a2 2 0 0 1 2-2m10.5-5a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2M15 7h3a2 2 0 0 1 2 2v5.5h-1.5V22h-4v-7.5H13V9a2 2 0 0 1 2-2"></path>
                                </svg>
                                Spouse Name {formData.maritialStatus !== "married" && "(Optional)"}</label>
                            <Input
                                type="text"
                                name="spousename"
                                value={formData.spousename}
                                onChange={(e) => handleChange("spousename", e.target.value)}
                                placeholder="Doe"

                                className={`p-2 border rounded w-full 
                `}
                            />
                            {errors.spousename && <p className="text-red-500 text-sm">{errors.spousename}</p>}
                        </div>
                    }
                    <div>
                        <label className="flex items-center gap-2 font-medium mb-1"><CalendarIcon size={16} className='text-xs mr-1' />Date of Birth</label>
                        <CustomDatePicker name="dob" value={formData.dob} onChange={handleChange} placeHolder={"Date of Birth"} disabled={userdata?.is_verified} />
                        {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
                    </div>
                    <div>
                        <label className="flex items-center gap-2 font-medium mb-1"><MailIcon size={16} className='text-xs mr-1' /> Secondary Email</label>
                        <Input
                            type="email"
                            name="secondaryEmail"
                            value={formData.secondaryEmail}
                            onChange={(e) => handleChange("secondaryEmail", e.target.value)}
                            placeholder="m@example.com"
                            disabled={userdata?.is_verified}
                            className={`p-2 border rounded w-full ${errors.secondaryEmail ? "border-red-500" : ""}`}
                        />
                        {errors.secondaryEmail && <p className="text-red-500 text-sm">{errors.secondaryEmail}</p>}
                    </div>



                    <div>
                        <label className="flex items-center gap-2 font-medium mb-1"> <PhoneIcon size={16} className='text-xs mr-1' /> Secondary Phone Number</label>
                        <PhoneNumberInput
                            onChange={handlePhoneNumberChange}
                            initialValue={formData.secondaryPhone}
                            disabled={userdata?.is_verified}
                        />
                        {errors.secondaryPhone && <p className="text-red-500 text-sm">{errors.secondaryPhone}</p>}
                    </div>

                </div>





                {hasChanged &&
                    <Button type='submit' className='w-full' disabled={loading}>
                        {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                        Update
                    </Button>

                }
            </form>

        </>
    )
}

export default Generalupdate
