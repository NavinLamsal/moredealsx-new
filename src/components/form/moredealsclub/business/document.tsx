// "use client"
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button } from '@/components/ui/button';
// import { prevStep } from '@/lib/redux/slice/BusinessRegistrationSlice';
// import ImageUploadDropBox from '@/components/ui/customInputs/ImageUploads';
// import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import Heading from '@/components/ui/heading';
// import { RootState } from '@/lib/redux/store';
// import { Loader2 } from 'lucide-react';
// import useMoredealsClient from '@/lib/axios/moredealsClient';
// import { showToast } from '@/lib/utilities/toastService';

// const BusinessDocumentsUploadForm = ({businessData}:{businessData:any}) => {
//     const dispatch = useDispatch();
//     const axios = useMoredealsClient()
//     const [formData, setFormData] = useState<{ BusinessDocument: File | null; TaxDocument: File | null }>({
//         BusinessDocument: null,
//         TaxDocument: null
//     })
//     const { BusinessName, BusinessRegistration, BusinessEmail, BusinessPhone, BusinessLocation, lat, lng, } = useSelector((state: RootState) => state.businessRegistration);
//     const [loading, setLoading] = useState(false);
//     const [errors, setErrors] = useState<{ BusinessDocument?: string; TaxDocument?: string }>({});

//     // Update the Redux state with the new file using updateFile dispatch
//     const handleFileChange = (field: string, file: File | null) => {
//         if (file === null) return
//         setFormData({ ...formData, [field]: file });
//         setErrors({ ...errors, [field]: validateField(field, file) });
//     };

//     // Validate that a file is selected for the provided field
//     const validateField = (field: string, file: File | null): string => {
//         if (!file) {
//             return field === 'BusinessDocument'
//                 ? 'Business Document is required.'
//                 : 'Tax Document is required.';
//         }
//         return "";
//     };

//     // Validate both fields before form submission
//     const validate = (): boolean => {
//         const tempErrors: Record<string, string> = {};
//         tempErrors.BusinessDocument = validateField('BusinessDocument', formData.BusinessDocument);
//         tempErrors.TaxDocument = validateField('TaxDocument', formData.TaxDocument);
//         setErrors(tempErrors);
//         return Object.values(tempErrors).every(error => error === "");
//     };

//     const handleBack = async (e: React.FormEvent) => {
//         e.preventDefault();
//         dispatch(prevStep());
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!validate()) {
//             // Optionally, display a toast or error message
//             return;
//         }
//         const combinedFormData = {
//             business_name: BusinessName,
//             business_registration_number: BusinessRegistration,
//             business_email: BusinessEmail,
//             business_phone: BusinessPhone,
//             business_address: BusinessLocation,
//             lat: lat,
//             lng: lng,
//             business_documents: formData.BusinessDocument,
//             business_tax_documents: formData.TaxDocument,
//         };
//         try {
//             setLoading(true);
//             const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}business/profile/`, combinedFormData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             }
//             );
//             showToast("Business profile created successfully", "success");
//             sessionStorage.removeItem("BusinessRegistrationData");
//         } catch (err: any) {
//             showToast(`${err.response?.data?.errors?.non_field_errors[0] || err.response?.data?.message || "Error creating business profile"}`, "error");
//             console.log(err);
//         } finally {
//             setLoading(false);

//         }
//     };

//     return (
//         <div className="grid  w-full">
//             <CardHeader>
//                 <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
//                     <Heading title={"Business Documents for verification"} />
//                 </CardTitle>
//                 <p className="text-gray-600 dark:text-gray-300">{"Upload your Business Documents for verification."}</p>
//             </CardHeader>

//             <CardContent className=""> <form onSubmit={handleSubmit} className="grid md:grid-cols-2 grid-cols-1 w-full gap-4 p-2">
//                 <div>
//                     <label className="block font-medium mb-1">Upload Business Document</label>
//                     <ImageUploadDropBox
//                         onChange={(file: File | null) => handleFileChange("BusinessDocument", file)}
//                         initialImage={formData.BusinessDocument ? URL.createObjectURL(formData.BusinessDocument) : undefined}
//                     />
//                     {errors.BusinessDocument && <p className="text-red-500 text-sm">{errors.BusinessDocument}</p>}
//                 </div>

//                 <div>
//                     <label className="block font-medium mb-1">Upload Tax Document</label>
//                     <ImageUploadDropBox
//                         onChange={(file: File | null) => handleFileChange("TaxDocument", file)}
//                         initialImage={formData.TaxDocument ? URL.createObjectURL(formData.TaxDocument) : undefined}
//                     />
//                     {errors.TaxDocument && <p className="text-red-500 text-sm">{errors.TaxDocument}</p>}
//                 </div>

//                 <div className='col-span-full grid grid-cols-2 gap-2'>
//                     <Button variant={"outline"} onClick={handleBack} className='w-full'>Back</Button>
//                     <Button type='submit' className='w-full'>{loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />} Submit</Button>
//                 </div>
//             </form></CardContent>
//         </div>



//     );
// };

// export default BusinessDocumentsUploadForm;


"use client"


import Heading from '@/components/ui/heading';

import React from 'react'
import TaxDocumentUpload from './TaxDocumentUpload';
import BusinessLogoUpload from './BussinessLogoUpdate';
import BusinessDocumentUpload from './BusinessRegistrationUpload';



const BasicInfoForm = ({ businessData }: { businessData: any }) => {
  
  


    return (
        <div className="grid grid-cols-1 gap-3 w-full max-w-lg">
            <div>
                <Heading title={"Business Profile"} />
                <p className="text-gray-600 dark:text-gray-300 mb-4">Let's wrap up the registration process. Fill in your Business details and make your business profile. You will be a part of MoreDealsClub like never before!.</p>
            </div>
            <div className='flex flex-col space-y-4 max-w-lg'>
            <BusinessLogoUpload initialLogoUrl={businessData?.business_logo} />
            <BusinessDocumentUpload initialDocumentUrl={businessData?.business_documents} />
            <TaxDocumentUpload initialTaxUrl={businessData?.business_tax_documents} />

            </div>
        </div>


    )
}

export default BasicInfoForm

