import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchBusinessTypes } from '@/lib/action/moreClub/Business';
import MoreClubApiClient from '@/lib/axios/moreclub/MoreClubApiClient';
import { businessQrinfoUpdate } from '@/lib/redux/slice/moreclub/BusinessSlice';

const BusinessTypes: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const businessTypes = useSelector((state: RootState) => state.business.businessTypeList);
    const isLoading = useSelector((state: RootState) => state.business.isLoading);
    const error = useSelector((state: RootState) => state.business.error);
    const businessQRInfo = useSelector((state: RootState) => state.business.businessQRInfo);

    const [businessData, setBusinessData] = useState(
        businessQRInfo.length > 0
            ? businessQRInfo.map(({ business_type, discount }) => ({ business_type, discount }))
            : [{ business_type: "", discount: "" }]
    );

    // Fetch Business Types on Mount
    useEffect(() => {
        dispatch(fetchBusinessTypes());
    }, [dispatch]);


    const handleBusinessTypeChange = (index: number, value: string) => {
        const selected = businessTypes.find(b => b.id === value);
        if (selected) {
            const updatedBusinessData = [...businessData];
            updatedBusinessData[index] = { business_type: selected.id, discount: "" };
            setBusinessData(updatedBusinessData);
        }
    };

    const handleDiscountChange = (index: number, value: string) => {
        const updatedBusinessData = [...businessData];
        updatedBusinessData[index] = { ...updatedBusinessData[index], discount: value };
        setBusinessData(updatedBusinessData);
    };

    const addMoreBusiness = () => {
        setBusinessData([...businessData, { business_type: "", discount: "" }]);
    };

    // const handleSubmit = async (index: number) => {
    //     const businessEntry = businessData[index];
    //     // console.log("Submitting Form:", businessData);
    //     try {
    //         const res = await MoreClubApiClient.post("business/types/add/discount/",
    //             businessEntry
    //         )
    //         console.log("res", res)
    //         dispatch(businessQrinfoUpdate(res.data.data));
    //     } catch (err: any) {
    //         console.log("error", err)
    //     }
    // };


    const handleSubmit = async (index: number) => {
        const businessEntry = businessData[index];
        const isExisting = businessQRInfo.some((qr) => qr.business_type === businessEntry.business_type);

        try {
            let response;
            if (isExisting) {
                // ✅ PATCH request to update existing business type
                response = await MoreClubApiClient.patch(`business/types/update/${businessEntry.business_type}/`, businessEntry);
            } else {
                // ✅ POST request to create a new business type
                response = await MoreClubApiClient.post("business/types/add/discount/", businessEntry);
            }

            console.log("Success:", response.data);
            dispatch(businessQrinfoUpdate(businessEntry)); // ✅ Update Redux Store
        } catch (err: any) {
            console.log("Error:", err);
        }
    };

    return (
        <div className="grid grid-cols-1 w-full max-w-lg lg:max-w-2xl xl:max-w-3xl">
            <div>
                <Heading title={"Manage Business Types"} />
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Let's wrap up the registration process. Fill in your Business details and make your business profile.
                </p>
            </div>

            {/* <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-2'>
                {businessData.map((business, index) => (
                    <div key={index} className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                        <div>
                            <label className="block font-medium mb-1">Business Types</label>
                            <Select value={business.business_type} onValueChange={(value) => handleBusinessTypeChange(index, value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder={isLoading ? "Loading..." : "Select business type"} />
                                </SelectTrigger>
                                <SelectContent>
                                   
                                    {businessTypes
                                        .filter((type) => !businessData.some((data, idx) => data.business_type === type.id && idx !== index)) // ✅ Omit already selected
                                        .map((type) => (
                                            <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Business Discount (%)</label>
                            <Input type="text" value={business.discount} className="p-2 border rounded w-full" onChange={(e) => handleDiscountChange(index, e.target.value)} />
                        </div>
                    </div>
                ))}

                <Button type='submit' className='w-full'>Save Changes</Button>
            </form> */}

            <form className='flex flex-col gap-4 p-2'>
                {businessData.map((business, index) => {
                    const isExisting = businessQRInfo.some((qr) => qr.business_type === business.business_type);

                    return (
                        <div key={index} className='grid grid-cols-1 sm:grid-cols-2 gap-2 items-center'>
                            {/* Business Type Selection */}
                            <div>
                                <label className="block font-medium mb-1">Business Types</label>
                                <Select value={business.business_type} onValueChange={(value) => handleBusinessTypeChange(index, value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select business type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {businessTypes
                                            .filter((type) => !businessData.some((data, idx) => data.business_type === type.id && idx !== index))
                                            .map((type) => (
                                                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Business Discount Input */}
                            <div>
                                <label className="block font-medium mb-1">Business Discount (%)</label>
                                <Input
                                    type="text"
                                    value={business.discount}
                                    className="p-2 border rounded w-full"
                                    onChange={(e) => handleDiscountChange(index, e.target.value)}
                                />
                            </div>

                            {/* Individual Submit Button */}
                            <div className="flex w-full gap-2 col-span-1 sm:col-span-2 justify-end">
                                {isExisting &&
                                    <Button
                                        type="button"
                                        variant={"destructive"}
                                        onClick={(e) => { e.preventDefault(); handleSubmit(index) }}
                                    >
                                        Remove
                                    </Button>
                                }
                                <Button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); handleSubmit(index) }}
                                >
                                    {isExisting ? "Update" : "Save"}
                                </Button>
                            </div>
                        </div>
                    );
                })}

                { !(businessTypes.length === businessData.length) &&

                <Button
                    type="button"
                    variant={"destructive"}
                    onClick={(e) => { e.preventDefault(); addMoreBusiness() }}
                >
                    Add New
                </Button>
                }
            </form>
        </div>
    );
};

export default BusinessTypes;
