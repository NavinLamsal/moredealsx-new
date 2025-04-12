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
import { useQueryClient } from '@tanstack/react-query';


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

const GeneralInformation = ({ userdata }: { userdata?: any }) => {
    const axios = useMoredealsClient();
    const queryClient = useQueryClient();
    const initialFormData = {
        fatherName: "",
        mothername: "",
        spousename: "",
        gender: "",

        secondaryEmail: "",
        secondaryPhone: "",

        dob: "",

        maritialStatus: "",
        occupation: "",


        address: "",
        city: "",
        house_no: "",
        street: "",
        zip_code: "",


        documentType: "",
        documentNumber: "",
        documentIssueDate: "",
        documentFront: "",
        documentBack: "",
    };

    const [formData, setFormData] = useState(initialFormData);


    const [hasChanged, setHasChanged] = useState(false)
    const [errors, setErrors] = useState<{ fatherName?: string, spousename?: string, gender?: string, dob?: string; maritialStatus?: string, secondaryEmail?: string, secondaryPhone?: string, occupation?: string, documentType?: string, documentNumber?: string, documentIssueDate?: string, documentFront?: string, documentBack?: string, address?: string, city?: string, house_no?: string, street?: string, zip_code?: string }>({});
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (field: string, file: File | null) => {
        if (file === null) return;
        setFormData((prev) => ({ ...prev, [field]: file }));
    };

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
            tempErrors.fatherName = validateRequired(fieldValues.fatherName || "", "Father Name");
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

        if ("occupation" in fieldValues) {
            tempErrors.occupation = validateRequired(fieldValues.occupation || "", "occupation");
        }
        if ("maritialStatus" in fieldValues) {
            tempErrors.maritialStatus = validateRequired(fieldValues.maritialStatus || "", "Maritial status");
        }

        if ("address" in fieldValues) {
            tempErrors.address = validateRequired(fieldValues.address || "", "Address");
        }
        if ("city" in fieldValues) {
            tempErrors.city = validateRequired(fieldValues.city || "", "City");
        }

        if ("street" in fieldValues) {
            tempErrors.street = validateRequired(fieldValues.street || "", "Street");
        }
        if ("zip_code" in fieldValues) {
            tempErrors.zip_code = validateRequired(fieldValues.zip_code || "", "Zip Code");
        }
        if ("house_no" in fieldValues) {
            tempErrors.house_no = "";
        }

        if ("documentType" in fieldValues) {
            tempErrors.documentType = validateRequired(fieldValues.documentType || "", "Document Type");
        }
        if ("documentNumber" in fieldValues) {
            tempErrors.documentNumber = validateRequired(fieldValues.documentNumber || "", "Document Number");
        }
        if ("documentIssueDate" in fieldValues) {
            tempErrors.documentIssueDate = validateRequired(fieldValues.documentIssueDate || "", "Document Issue Date");
        }


        setErrors(tempErrors);
        return Object.values(tempErrors).every((error) => !error);
    };


    const validateField = async (name: string, value: string) => {
        switch (name) {
            case "fatherName":
                return validateRequired(value, "Father Name");
            case "spousename":
                return formData.maritialStatus === "married" ? validateRequired(value, "Spouse Name") : "";
            case "mothername":
                return validateRequired(value, "Mother Name");
            case "maritialStatus":
                return validateRequired(value, "Maritial Status");
            case "occupation":
                return validateRequired(value, "Occupation");
            case "documentType":
                return validateRequired(value, "Document Type");
            case "documentNumber":
                return validateRequired(value, "Document Number");
            case "documentIssueDate":
                return validateRequired(value, "Document Issue Date");
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
            case "address":
                return validateRequired(value, "Address");
            case "city":
                return validateRequired(value, "City");
            case "street":
                return validateRequired(value, "Street");
            case "zip_code":
                return validateRequired(value, "Zip Code");
            case "house_no":
                return "";
            case "mothername":
                return "";
            default:
                return "";
        }
    };


    const handleAddressChange = (newAddress: Address) => {

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
                agreed_to_terms: true,
                date_format: "AD",
                document_back: formData.documentBack,
                document_front: formData.documentFront,
                document_id: formData.documentNumber,
                document_type: formData.documentType,
                issue_date: formData.documentIssueDate,
                kyc_user_profile: {
                    secondary_email: formData.secondaryEmail,
                    secondary_phone_number: formData.secondaryPhone,
                    date_of_birth: formData.dob,
                    address: formData.address,
                    city: formData.city,
                    house_no: formData.house_no,
                    street: formData.street,
                    zip_code: formData.zip_code
                },
                marital_status: formData.maritialStatus,
                occupation: formData.occupation
            }

            const cleanedData = removeEmptyStrings(data)

            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}kyc/details/`, cleanedData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            queryClient.invalidateQueries({ queryKey: ["kyc Detail"] });
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
                <p className='text-muted-foreground'>Your personal details help us tailor your experience and ensure smooth communication. Make sure everything here is accurate and up to date.</p>

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
                        <CustomDatePicker name="dob" value={formData.dob} onChange={handleChange} placeHolder={"Date of Birth"} />
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
                            className={`p-2 border rounded w-full ${errors.secondaryEmail ? "border-red-500" : ""}`}
                        />
                        {errors.secondaryEmail && <p className="text-red-500 text-sm">{errors.secondaryEmail}</p>}
                    </div>



                    <div>
                        <label className="flex items-center gap-2 font-medium mb-1"> <PhoneIcon size={16} className='text-xs mr-1' /> Secondary Phone Number</label>
                        <PhoneNumberInput
                            onChange={handlePhoneNumberChange}
                            initialValue={formData.secondaryPhone}
                        />
                        {errors.secondaryPhone && <p className="text-red-500 text-sm">{errors.secondaryPhone}</p>}
                    </div>

                </div>


                {/* //address  */}
                <div className='my-8'>
                    <h2 className="text-2xl font-bold mb-2 flex items-center"><PinIcon className="mr-2" /> Address Information</h2>
                    <p className='text-muted-foreground '>Your address helps us provide location-based services and ensure accurate delivery or support when needed. Please keep this information current.</p>

                    <div className='my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 '>

                        <div>
                            <label htmlFor="address" className="flex items-center gap-2 font-medium mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17.94" height="14" viewBox="0 0 41 32">
                                    <g fill="currentColor">
                                        <path d="M9.239 31.927c.009.006.021.003.03.009A.5.5 0 0 0 9.5 32a.5.5 0 0 0 .132-.018L20.5 29.016l10.868 2.966A.5.5 0 0 0 31.5 32a.5.5 0 0 0 .23-.065c.01-.005.021-.003.03-.009l9-5.5a.5.5 0 0 0 .22-.563l-4.984-17.5a.5.5 0 0 0-.726-.3l-4.962 2.784a.501.501 0 0 0 .491.872l4.409-2.475l4.707 16.526l-8.015 4.899l-1.904-15.231a.5.5 0 0 0-.993.124l1.907 15.259L21 28.116v-2.73a.5.5 0 0 0-1 0v2.73l-9.911 2.705l1.907-15.259a.5.5 0 1 0-.993-.124L9.1 30.669l-8.015-4.898L5.792 9.246l4.409 2.475a.501.501 0 0 0 .491-.872L5.729 8.064a.496.496 0 0 0-.725.3L.02 25.864a.5.5 0 0 0 .22.563z" />
                                        <path d="M20.161 23.368a.5.5 0 0 0 .675.003C21.169 23.068 29 15.882 29 8.5C29 3.733 25.267 0 20.5 0S12 3.733 12 8.5c0 7.254 7.828 14.56 8.161 14.868M20.5 1C24.775 1 28 4.224 28 8.5c0 6.097-5.993 12.337-7.497 13.807C19.002 20.82 13 14.498 13 8.5C13 4.224 16.225 1 20.5 1" />
                                        <path d="M25 8.5C25 6.019 22.981 4 20.5 4S16 6.019 16 8.5s2.019 4.5 4.5 4.5S25 10.981 25 8.5M20.5 12c-1.93 0-3.5-1.57-3.5-3.5S18.57 5 20.5 5S24 6.57 24 8.5S22.43 12 20.5 12" />
                                    </g>
                                </svg>

                                Address</label>
                            <AutoCompleteInput
                                setAddress={handleAddressChange}
                                handleManualInputChange={handleManualInputChange}
                                streetAndNumber={formData.address}
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                        </div>

                        <div>
                            <label htmlFor="city" className="flex items-center gap-2 font-medium mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64">
                                    <path fill="currentColor" d="M58.25 19.813v-4.688a1.874 1.874 0 0 0-1.875-1.875h-2.813V2.938a.937.937 0 1 0-1.875 0V9.07a5.6 5.6 0 0 0-5.474-1.17a6.57 6.57 0 0 0-4.839-2.149A6.52 6.52 0 0 0 35.45 9.51a4.694 4.694 0 0 0-4.389 4.678a4.693 4.693 0 0 0 4.688 4.688H47v.938a3.76 3.76 0 0 0-3.75 3.75v6.563h-7.5c-1.664 0-2.813.829-2.813 2.567v-10.71c0-1.046-.597-2.505-1.326-3.243l-6.723-6.812a1.856 1.856 0 0 0-2.57-.067a7.45 7.45 0 0 0-4.381-1.425a7.52 7.52 0 0 0-5.132 2.039a6.3 6.3 0 0 0-1.431-.164a6.59 6.59 0 0 0-6.016 3.942A4.7 4.7 0 0 0 2 20.75a4.693 4.693 0 0 0 4.688 4.688h7.5v8.438H5.75A3.76 3.76 0 0 0 2 37.626V62h32.813V35.719c0-.498.339-.906.751-.906h.375c.412 0 .749.408.749.906V62H39.5V35.719c0-.498.339-.906.751-.906h.375c.412 0 .749.408.749.906V62H62V23.563a3.76 3.76 0 0 0-3.75-3.75M10.906 56.375a.94.94 0 0 1-.938.938H7.156a.94.94 0 0 1-.938-.938V54.5a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938H7.156a.94.94 0 0 1-.938-.938V47a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938H7.156a.94.94 0 0 1-.938-.938V39.5a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zM6.688 23.563a2.814 2.814 0 0 1 0-5.626h.096a4.686 4.686 0 0 1 4.592-3.75c.72 0 1.394.176 2.003.465a5.61 5.61 0 0 1 4.56-2.34c1.121 0 2.161.331 3.038.896l-5.462 5.533c-.729.738-1.326 2.197-1.326 3.243v1.578H6.688zm23.437 32.812a.94.94 0 0 1-.938.938h-11.25a.94.94 0 0 1-.938-.938V54.5a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938h-11.25a.94.94 0 0 1-.938-.938V47a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938h-11.25a.94.94 0 0 1-.938-.938V39.5a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938h-11.25a.94.94 0 0 1-.938-.938V32a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938h-11.25a.94.94 0 0 1-.938-.938V24.5a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938zM35.75 17a2.814 2.814 0 0 1 0-5.626c.359 0 .697.073 1.013.196c.356-2.234 2.279-3.946 4.612-3.946a4.68 4.68 0 0 1 4.235 2.706a3.7 3.7 0 0 1 2.328-.83a3.75 3.75 0 0 1 3.75 3.75h-2.813A1.876 1.876 0 0 0 47 15.125V17zm15.469 41.25a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.563a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938V43.25a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.563a.94.94 0 0 1-.938.938h-2.813A.94.94 0 0 1 46.53 32v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm7.5 32.812a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.563a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938V43.25a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.563a.94.94 0 0 1-.938.938h-2.813A.94.94 0 0 1 54.03 32v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938z" />
                                </svg>
                                City</label>
                            <Input type="text" id="city" placeholder="City" value={formData.city} onChange={handleManualInputChange} />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                        </div>

                        <div>
                            <label htmlFor="street" className="flex items-center gap-2 font-medium mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                    <path fill="currentColor" fill-rule="evenodd" d="M6.25 0H3.5a.5.5 0 0 0-.487.388l-3 13A.5.5 0 0 0 .5 14h5.75v-2.154a.75.75 0 0 1 1.5 0V14h5.75a.5.5 0 0 0 .487-.612l-3-13A.5.5 0 0 0 10.5 0H7.75v2.154a.75.75 0 0 1-1.5 0zM7 5.173a.75.75 0 0 1 .75.75v2.154a.75.75 0 0 1-1.5 0V5.923a.75.75 0 0 1 .75-.75" clip-rule="evenodd" />
                                </svg>
                                Street</label>
                            <Input type="text" id="street" placeholder="Street" value={formData.street} onChange={handleManualInputChange} />
                            {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
                        </div>

                        <div>
                            <label htmlFor="zip_code" className="flex items-center gap-2 font-medium mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M3.77 21q-.31 0-.54-.23T3 20.23v-6.46q0-.31.23-.54t.54-.23H7V8q0-2.083 1.458-3.542Q9.917 3 12 3h4q2.083 0 3.542 1.458Q21 5.917 21 8v12.5q0 .213-.144.356t-.357.144t-.356-.144T20 20.5V18h-5v2.23q0 .31-.23.54t-.54.23zM9 16.85l-4.336-2.47q-.222-.128-.443.004q-.221.133-.221.383q0 .118.059.222t.162.159l4.375 2.504q.18.106.401.106q.22 0 .407-.106l4.375-2.504q.103-.057.162-.164t.059-.222q0-.248-.221-.379t-.442-.002zm6 .15h5V8q0-1.65-1.175-2.825T16 4h-4q-1.65 0-2.825 1.175T8 8v5h6.23q.31 0 .54.23t.23.54zm-4-7.5q-.213 0-.356-.144t-.144-.357t.144-.356T11 8.5h6q.213 0 .356.144t.144.357t-.144.356T17 9.5z" />
                                </svg>

                                ZIP Code</label>
                            <Input type="text" id="zip_code" placeholder="ZIP Code" value={formData.zip_code} onChange={handleManualInputChange} />
                            {errors.zip_code && <p className="text-red-500 text-sm">{errors.zip_code}</p>}
                        </div>

                        <div>
                            <label htmlFor="house_no" className="flex items-center gap-2 font-medium mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M5 20v-9.15L2.2 13L1 11.4L12 3l4 3.05V4h3v4.35l4 3.05l-1.2 1.6l-2.8-2.15V20h-6v-6h-2v6zm2-2h2v-6h6v6h2V9.325l-5-3.8l-5 3.8zm3-7.975h4q0-.8-.6-1.313T12 8.2t-1.4.513t-.6 1.312M9 18v-6h6v6v-6H9z" />
                                </svg>

                                House No (optional)</label>
                            <Input type="text" id="house_no" placeholder="House No" value={formData.house_no} onChange={handleManualInputChange} />
                        </div>
                    </div>
                </div>

                <div className='space-y-4'>
                    <h2 className="text-2xl font-bold mb-2 flex"><Paperclip className='mr-2' /> Supporting Document</h2>
                    <p className='text-muted-foreground'>This Documents will be used to verify your details. Make sure everything here is accurate and up to date.</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
                        <div>
                            <label className="flex items-center gap-2  font-medium mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" fill-rule="evenodd" d="M14.25 2.5a.25.25 0 0 0-.25-.25H7A2.75 2.75 0 0 0 4.25 5v14A2.75 2.75 0 0 0 7 21.75h10A2.75 2.75 0 0 0 19.75 19V9.147a.25.25 0 0 0-.25-.25H15a.75.75 0 0 1-.75-.75zm.75 9.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5zm0 4a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5z" clip-rule="evenodd" />
                                    <path fill="currentColor" d="M15.75 2.824c0-.184.193-.301.336-.186q.182.147.323.342l3.013 4.197c.068.096-.006.22-.124.22H16a.25.25 0 0 1-.25-.25z" />
                                </svg>
                                Document Type</label>
                            <Select name='documentType' onValueChange={(value) => handleChange("documentType", value)} defaultValue={formData.documentType}>

                                <SelectTrigger>
                                    <SelectValue placeholder="Select occupation" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="national_id">National ID</SelectItem>
                                    <SelectItem value="passport">Passport</SelectItem>
                                    <SelectItem value="driver_license">Driving License</SelectItem>
                                </SelectContent>
                            </Select>


                            {errors.documentType && <p className="text-red-500 text-sm">{errors.documentType}</p>}
                        </div>
                        <div>
                            <label className="flex items-center gap-2 font-medium mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M17.744 1.996a2.25 2.25 0 0 1 2.245 2.096l.005.154v15.498a2.25 2.25 0 0 1-2.096 2.245l-.154.005h-11.5A2.25 2.25 0 0 1 4 19.898l-.005-.154V4.246A2.25 2.25 0 0 1 6.09 2.001l.154-.005zm0 1.5h-11.5a.75.75 0 0 0-.743.648l-.007.102v15.498c0 .38.282.694.648.743l.102.007h11.5a.75.75 0 0 0 .743-.648l.007-.102V4.246a.75.75 0 0 0-.648-.743zM13.018 16.02a.75.75 0 0 1-.623-.858l.104-.66h-1.481l-.142.895a.75.75 0 1 1-1.481-.235l.104-.66h-.75a.75.75 0 0 1 0-1.5h.988l.237-1.5H9.25a.75.75 0 0 1 0-1.5h.963l.2-1.26a.75.75 0 0 1 1.48.235L11.73 10h1.482l.2-1.259a.75.75 0 0 1 1.48.235L14.73 10h.52a.75.75 0 0 1 0 1.5h-.757l-.238 1.5h.494a.75.75 0 0 1 0 1.5h-.731l-.142.896a.75.75 0 0 1-.858.623M11.493 11.5l-.238 1.5h1.482l.237-1.5z" />
                                </svg>
                                {formData.documentType === " "
                                    ? "Document"
                                    : formData.documentType.replace("_", " ").charAt(0).toUpperCase() + formData.documentType.replace("_", " ").slice(1)
                                } Number</label>
                            <Input
                                type="text"
                                name="documentNumber"
                                value={formData.documentNumber}
                                onChange={(e) => handleChange("documentNumber", e.target.value)}
                                placeholder="John"
                                className={`p-2 border rounded w-full 
                `}
                            />
                            {errors.documentNumber && <p className="text-red-500 text-sm">{errors.documentNumber}</p>}
                        </div>
                        <div>
                            <label className="flex items-center gap-2 font-medium mb-1"> <CalendarIcon size={16} className='text-xs mr-1' />   {formData.documentType === " "
                                ? ""
                                : formData.documentType.replace("_", " ").charAt(0).toUpperCase() + formData.documentType.replace("_", " ").slice(1)
                            } Issue Date</label>
                            <CustomDatePicker name="documentIssueDate" value={formData.documentIssueDate} onChange={handleChange} placeHolder={"Issue Date"} />
                            {errors.dob && <p className="text-red-500 text-sm">{errors.documentIssueDate}</p>}
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3' >
                        <div>
                            <label className="block text-sm">Front side {formData.documentType === " "
                                ? ""
                                : "of " + formData.documentType.replace("_", " ").charAt(0).toUpperCase() + formData.documentType.replace("_", " ").slice(1)
                            }</label>
                            <ImageUploadDropBox
                                onChange={(file: File | null) => handleFileChange("documentFront", file)}
                                initialImage={typeof formData.documentFront === "string" && formData.documentFront !== "" ? formData.documentFront : undefined}
                            />
                        </div>
                        <div>
                            <label className="block text-sm">Back Side {formData.documentType === " "
                                ? ""
                                : "of " + formData.documentType.replace("_", " ").charAt(0).toUpperCase() + formData.documentType.replace("_", " ").slice(1)
                            }</label>
                            <ImageUploadDropBox
                                onChange={(file: File | null) => handleFileChange("documentBack", file)}
                                initialImage={typeof formData.documentBack === "string" && formData.documentBack !== "" ? formData.documentBack : undefined}
                            />
                        </div>
                    </div>
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

export default GeneralInformation
