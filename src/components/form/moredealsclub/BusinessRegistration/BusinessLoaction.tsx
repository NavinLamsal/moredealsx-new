"use client"
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MapboxComponent from '@/components/ui/customInputs/AddressInput'
import Heading from '@/components/ui/heading';
import { nextStep, prevStep, updateField } from '@/lib/redux/slice/BusinessRegistrationSlice';
import { RootState } from '@/lib/redux/store';
import { validateRequired } from '@/lib/validation/common';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const BusinessLoaction = () => {


    const dispatch = useDispatch();
    const { BusinessLocation, lat, lng } = useSelector((state: RootState) => state.businessRegistration);
    const [errors, setErrors] = useState<{ BusinessLocation?: string; }>({});




    const handleChange = (field: string, value: string) => {
        dispatch(updateField({ field, value }));
        setErrors({ ...errors, [field]: validateField(field, value) });
    };


    const handlePlaceSelected = async (coordinates: {
        lat: number;
        lon: number;
    }, placeName: string) => {

        dispatch(updateField({ field: "BusinessLocation", value: placeName }));
        dispatch(updateField({ field: "lat", value: coordinates.lat.toString() }));
        dispatch(updateField({ field: "lng", value: coordinates.lon.toString() }));
        setErrors({
            ...errors,
            BusinessLocation: validateField("BusinessLocation", placeName),
        });
    };

    const validate = async (fieldValues: Partial<{
        BusinessLocation: string; BusinessRegistration: string
    }> = { BusinessLocation, }) => {

        // Explicitly define tempErrors as a dynamic object
        const tempErrors: Record<string, string> = { ...errors };

        if ("BusinessLocation" in fieldValues) {

            tempErrors.BusinesstName = validateRequired(fieldValues.BusinessLocation || "", "BusinesstName");
        }



        setErrors(tempErrors);
        return Object.values(tempErrors).every((error) => !error);
    };


    const validateField = (name: string, value: string) => {
        switch (name) {
            case "BusinessLocation":
                return validateRequired(value, "Business Location",);
            default:
                return "";
        }
    };

    const handleBack = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(prevStep());
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!(await validate())) {

            //   showToast("Please fix the errors in the form.", "error");
            return;
        }

        dispatch(nextStep());
    };


    return (

        <div className="grid md:grid-cols-2 grid-cols-1 w-full">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                    <Heading title={"Where You Located at ?"} />
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300">{"Search for the Location of your Business."}</p>
            </CardHeader>

            <CardContent> <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-2'>

                <div>
                    <label className="block font-medium mb-1">Location</label>
                    <MapboxComponent
                        onPlaceSelected={handlePlaceSelected}
                        initialLat={parseFloat(lat)}
                        initialLng={parseFloat(lng)}
                        initialAddress={BusinessLocation}
                        height="200px"
                    />
                    {errors.BusinessLocation && <p className="text-red-500 text-sm">{errors.BusinessLocation}</p>}
                </div>


                <div className='grid grid-cols-2 gap-2'>
                    <Button variant={"outline"} onClick={handleBack} className='w-full'>Back</Button>
                    <Button type='submit' className='w-full'>Continue</Button>
                </div>
            </form></CardContent>
        </div>





    )
}

export default BusinessLoaction
