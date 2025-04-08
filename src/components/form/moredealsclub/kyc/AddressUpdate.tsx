"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useMoredealsClient from '@/lib/axios/moredealsClient';
import { showToast } from '@/lib/utilities/toastService';
import { removeEmptyStrings } from '@/lib/utils';
import { validateRequired } from '@/lib/validation/common';
import { Loader2Icon, PinIcon, } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react'
import AutoCompleteInput from '@/components/MapBox/AutoCompleteMapInput';
import { KYCProps } from '@/lib/type/moreclub/User';


interface Address {
    address: string;
    city: string;
    house_no: string;
    region?: string
    street: string;
    zip_code: string;
}

const Addressupdate = ({ userdata }: { userdata?: KYCProps }) => {
    const axios = useMoredealsClient();
    const initialFormData = {



        address: userdata?.address ?? "",
        city: userdata?.city ?? "",
        house_no: userdata?.house_number ?? "",
        street: userdata?.street ?? "",
        zip_code: userdata?.zip_code ?? "",

    };

    const [formData, setFormData] = useState(initialFormData);
    const [address, setAddress] = useState({
        address: userdata?.address ?? "",
        city: userdata?.city ?? "",
        house_no: userdata?.house_number ?? "",
        street: userdata?.street ?? "",
        zip_code: userdata?.zip_code ?? "",
    });

    const [hasChanged, setHasChanged] = useState(false)
    const [errors, setErrors] = useState<{ address?: string, city?: string, house_no?: string, street?: string, zip_code?: string }>({});
    const [loading, setLoading] = useState<boolean>(false);


    const validate = async (fieldValues = formData) => {

        // Explicitly define tempErrors as a dynamic object
        const tempErrors: Record<string, string> = { ...errors };

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




        setErrors(tempErrors);
        return Object.values(tempErrors).every((error) => !error);
    };


    const validateField = async (name: string, value: string) => {
        switch (name) {


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
                kyc_user_profile: {
                    address: formData.address,
                    city: formData.city,
                    house_no: formData.house_no,
                    street: formData.street,
                    zip_code: formData.zip_code
                },
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

                {/* //address  */}
                <div className='my-8'>
                    <h2 className="text-2xl font-bold mb-2 flex items-center"><PinIcon className="mr-2" /> Address Information</h2>
                    <p className='text-muted-foreground '>Your address helps us provide location-based services and ensure accurate delivery or support when needed. Please keep this information current</p>

                    <div className='my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 space-y-4'>

                        <div>
                            <label htmlFor="address" className="flex items-center gap-2 mb-2 text-sm font-medium">
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
                            <label htmlFor="city" className="flex items-center gap-2 mb-1 text-sm font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64">
                                    <path fill="currentColor" d="M58.25 19.813v-4.688a1.874 1.874 0 0 0-1.875-1.875h-2.813V2.938a.937.937 0 1 0-1.875 0V9.07a5.6 5.6 0 0 0-5.474-1.17a6.57 6.57 0 0 0-4.839-2.149A6.52 6.52 0 0 0 35.45 9.51a4.694 4.694 0 0 0-4.389 4.678a4.693 4.693 0 0 0 4.688 4.688H47v.938a3.76 3.76 0 0 0-3.75 3.75v6.563h-7.5c-1.664 0-2.813.829-2.813 2.567v-10.71c0-1.046-.597-2.505-1.326-3.243l-6.723-6.812a1.856 1.856 0 0 0-2.57-.067a7.45 7.45 0 0 0-4.381-1.425a7.52 7.52 0 0 0-5.132 2.039a6.3 6.3 0 0 0-1.431-.164a6.59 6.59 0 0 0-6.016 3.942A4.7 4.7 0 0 0 2 20.75a4.693 4.693 0 0 0 4.688 4.688h7.5v8.438H5.75A3.76 3.76 0 0 0 2 37.626V62h32.813V35.719c0-.498.339-.906.751-.906h.375c.412 0 .749.408.749.906V62H39.5V35.719c0-.498.339-.906.751-.906h.375c.412 0 .749.408.749.906V62H62V23.563a3.76 3.76 0 0 0-3.75-3.75M10.906 56.375a.94.94 0 0 1-.938.938H7.156a.94.94 0 0 1-.938-.938V54.5a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938H7.156a.94.94 0 0 1-.938-.938V47a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938H7.156a.94.94 0 0 1-.938-.938V39.5a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zM6.688 23.563a2.814 2.814 0 0 1 0-5.626h.096a4.686 4.686 0 0 1 4.592-3.75c.72 0 1.394.176 2.003.465a5.61 5.61 0 0 1 4.56-2.34c1.121 0 2.161.331 3.038.896l-5.462 5.533c-.729.738-1.326 2.197-1.326 3.243v1.578H6.688zm23.437 32.812a.94.94 0 0 1-.938.938h-11.25a.94.94 0 0 1-.938-.938V54.5a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938h-11.25a.94.94 0 0 1-.938-.938V47a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938h-11.25a.94.94 0 0 1-.938-.938V39.5a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938h-11.25a.94.94 0 0 1-.938-.938V32a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938h-11.25a.94.94 0 0 1-.938-.938V24.5a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938zM35.75 17a2.814 2.814 0 0 1 0-5.626c.359 0 .697.073 1.013.196c.356-2.234 2.279-3.946 4.612-3.946a4.68 4.68 0 0 1 4.235 2.706a3.7 3.7 0 0 1 2.328-.83a3.75 3.75 0 0 1 3.75 3.75h-2.813A1.876 1.876 0 0 0 47 15.125V17zm15.469 41.25a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.563a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938V43.25a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.563a.94.94 0 0 1-.938.938h-2.813A.94.94 0 0 1 46.53 32v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm7.5 32.812a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.563a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938V43.25a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.563a.94.94 0 0 1-.938.938h-2.813A.94.94 0 0 1 54.03 32v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938z" />
                                </svg>
                                City</label>
                            <Input type="text" id="city" placeholder="City" value={formData.city} onChange={handleManualInputChange} />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                        </div>

                        <div>
                            <label htmlFor="street" className="flex items-center gap-2 mb-2  text-sm font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                    <path fill="currentColor" fill-rule="evenodd" d="M6.25 0H3.5a.5.5 0 0 0-.487.388l-3 13A.5.5 0 0 0 .5 14h5.75v-2.154a.75.75 0 0 1 1.5 0V14h5.75a.5.5 0 0 0 .487-.612l-3-13A.5.5 0 0 0 10.5 0H7.75v2.154a.75.75 0 0 1-1.5 0zM7 5.173a.75.75 0 0 1 .75.75v2.154a.75.75 0 0 1-1.5 0V5.923a.75.75 0 0 1 .75-.75" clip-rule="evenodd" />
                                </svg>
                                Street</label>
                            <Input type="text" id="street" placeholder="Street" value={formData.street} onChange={handleManualInputChange} />
                            {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
                        </div>

                        <div>
                            <label htmlFor="zip_code" className="flex items-center gap-2 mb-2 text-sm font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M3.77 21q-.31 0-.54-.23T3 20.23v-6.46q0-.31.23-.54t.54-.23H7V8q0-2.083 1.458-3.542Q9.917 3 12 3h4q2.083 0 3.542 1.458Q21 5.917 21 8v12.5q0 .213-.144.356t-.357.144t-.356-.144T20 20.5V18h-5v2.23q0 .31-.23.54t-.54.23zM9 16.85l-4.336-2.47q-.222-.128-.443.004q-.221.133-.221.383q0 .118.059.222t.162.159l4.375 2.504q.18.106.401.106q.22 0 .407-.106l4.375-2.504q.103-.057.162-.164t.059-.222q0-.248-.221-.379t-.442-.002zm6 .15h5V8q0-1.65-1.175-2.825T16 4h-4q-1.65 0-2.825 1.175T8 8v5h6.23q.31 0 .54.23t.23.54zm-4-7.5q-.213 0-.356-.144t-.144-.357t.144-.356T11 8.5h6q.213 0 .356.144t.144.357t-.144.356T17 9.5z" />
                                </svg>

                                ZIP Code</label>
                            <Input type="text" id="zip_code" placeholder="ZIP Code" value={formData.zip_code} onChange={handleManualInputChange} />
                            {errors.zip_code && <p className="text-red-500 text-sm">{errors.zip_code}</p>}
                        </div>

                        <div>
                            <label htmlFor="house_no" className="flex items-center gap-2 mb-2 text-sm font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M5 20v-9.15L2.2 13L1 11.4L12 3l4 3.05V4h3v4.35l4 3.05l-1.2 1.6l-2.8-2.15V20h-6v-6h-2v6zm2-2h2v-6h6v6h2V9.325l-5-3.8l-5 3.8zm3-7.975h4q0-.8-.6-1.313T12 8.2t-1.4.513t-.6 1.312M9 18v-6h6v6v-6H9z" />
                                </svg>

                                House No (optional)</label>
                            <Input type="text" id="house_no" placeholder="House No" value={formData.house_no} onChange={handleManualInputChange} />
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

        </>
    )
}

export default Addressupdate
