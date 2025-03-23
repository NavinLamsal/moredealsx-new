"use client"
import { Button } from '@/components/ui/button';
import CustomDatePicker from '@/components/ui/customInputs/DatePicker';
import { Input } from '@/components/ui/input';
import useMoredealsClient from '@/lib/axios/moredealsClient';
import { showToast } from '@/lib/utilities/toastService';
import { removeEmptyStrings } from '@/lib/utils';
import { validateRequired } from '@/lib/validation/common';
import { CalendarIcon, Loader2Icon, Paperclip } from 'lucide-react';
import React, { useState } from 'react'
import ImageUploadDropBox from '@/components/ui/customInputs/ImageUploads';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { KYCProps } from '@/lib/type/moreclub/User';





const DocumentForm = ({ userdata }: { userdata?: KYCProps }) => {
    const axios = useMoredealsClient();
    const initialFormData = {
        documentType: userdata?.document_type ?? "",
        documentNumber: userdata?.document_id ?? "",
        documentIssueDate: userdata?.issue_date ?? "",
        documentFront: userdata?.document_front ?? "",
        documentBack: userdata?.document_back ?? "",
    };

    const [formData, setFormData] = useState(initialFormData);


    const [hasChanged, setHasChanged] = useState(false)
    const [errors, setErrors] = useState<{ documentType?: string, documentNumber?: string, documentIssueDate?: string, documentFront?: string, documentBack?: string, }>({});
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (field: string, file: File | null) => {
        if (file === null) return;
        setFormData((prev) => {
            const updatedData = { ...prev, [field]: file };
            setHasChanged(JSON.stringify(updatedData) !== JSON.stringify(initialFormData));
            return updatedData;
        });
    };

    const handleChange = (field: string, value: string) => {

        setFormData((prev) => {
            const updatedData = { ...prev, [field]: value };
            setHasChanged(JSON.stringify(updatedData) !== JSON.stringify(initialFormData));
            return updatedData;
        });
        setErrors({ ...errors, [field]: validateField(field, value) });
    };


    const validate = async (fieldValues = formData) => {
        // Explicitly define tempErrors as a dynamic object
        const tempErrors: Record<string, string> = { ...errors };


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

            case "documentType":
                return validateRequired(value, "Document Type");
            case "documentNumber":
                return validateRequired(value, "Document Number");
            case "documentIssueDate":
                return validateRequired(value, "Document Issue Date");
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


        try {

            const data = {
                date_format: "AD",
                document_back: formData.documentBack,
                document_front: formData.documentFront,
                document_id: formData.documentNumber,
                document_type: formData.documentType,
                issue_date: formData.documentIssueDate,
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
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-2 pb-2 max-w-xl lg:max-w-3xl xl:max-w-4xl'>
             <div className='space-y-4'>
                    <h2 className="text-2xl font-bold mb-2 flex"><Paperclip className='mr-2' /> Supporting Document</h2>
                    <p className='text-muted-foreground'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat voluptatibus nobis est laborum sed.</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
                        <div>
                            <label className="flex items-center gap-2  font-medium mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" fill-rule="evenodd" d="M14.25 2.5a.25.25 0 0 0-.25-.25H7A2.75 2.75 0 0 0 4.25 5v14A2.75 2.75 0 0 0 7 21.75h10A2.75 2.75 0 0 0 19.75 19V9.147a.25.25 0 0 0-.25-.25H15a.75.75 0 0 1-.75-.75zm.75 9.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5zm0 4a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5z" clip-rule="evenodd" />
                                    <path fill="currentColor" d="M15.75 2.824c0-.184.193-.301.336-.186q.182.147.323.342l3.013 4.197c.068.096-.006.22-.124.22H16a.25.25 0 0 1-.25-.25z" />
                                </svg>
                                Document Type</label>
                            <Select name='documentType' onValueChange={(value) => handleChange("documentType", value)} defaultValue={formData.documentType} 
                                disabled={userdata?.is_verified}
                                >

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
                                disabled={userdata?.is_verified}
                                className={`p-2 border rounded w-full 
                `}
                            />
                            {errors.documentNumber && <p className="text-red-500 text-sm">{errors.documentNumber}</p>}
                        </div>
                        <div>
                            <label className="flex items-center gap-2 mb-2 text-sm"> <CalendarIcon size={16} className='text-xs mr-1' />   {formData.documentType === " "
                                    ? ""
                                    : formData.documentType.replace("_", " ").charAt(0).toUpperCase() + formData.documentType.replace("_", " ").slice(1)
                                } Issue Date</label>
                            <CustomDatePicker name="documentIssueDate" value={formData.documentIssueDate} onChange={handleChange} placeHolder={"Issue Date"}  disabled={userdata?.is_verified} />
                            {errors.documentIssueDate && <p className="text-red-500 text-sm">{errors.documentIssueDate}</p>}
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
                                disabled={userdata?.is_verified}
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
                                disabled={userdata?.is_verified}
                            />
                        </div>
                    </div>
                </div>

            {hasChanged &&
                <Button type='submit' className='w-full' disabled={loading}>
                    {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                    Update
                </Button>

            }
        </form>
    )
}

export default DocumentForm
