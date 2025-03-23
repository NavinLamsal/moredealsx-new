"use client";

import { useState } from "react";
import { showToast } from "@/lib/utilities/toastService";
import useMoredealsClient from "@/lib/axios/moredealsClient";
import { removeEmptyStrings } from "@/lib/utils";
import AddressForm from "../user/AutomaticAddressInput";


interface Address {
    address: string;
    city: string;
    house_no: string;
    street: string;
    zip_code: string;
}

export default function AddressInfoForm({ userData }: { userData?: any }) {
    const axios = useMoredealsClient();
    // ✅ Set initial state for the address
    const [address, setAddress] = useState<Address>({
        address: userData?.user_profile?.address ?? "",
        city: userData?.user_profile?.city ?? "",
        house_no: userData?.user_profile?.house_no ?? "",
        street: userData?.user_profile?.street ?? "",
        zip_code: userData?.user_profile?.zip_code ?? "",
    });

    // ✅ Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log("Submitted Address:", address);
        try {
            const data = {
                user_profile: {
                    address: address.address,
                    city: address.city,
                    house_no: address.house_no,
                    street: address.street,
                    zip_code: address.zip_code
                }
            }
            const cleanedData = removeEmptyStrings(data)

            const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}users/details/me/`, cleanedData,
            )
            showToast("Your changes are updated", "success");
            return res
        } catch (err: any) {
            showToast("error uploading your changes", "error")
            return err
        }
    };

    return (
        <div className="px-2 pb-2 max-w-lg lg:max-w-2xl xl:max-w-3xl">
            <h1 className="text-2xl font-bold mb-4">Address Information</h1>
            <p className='text-muted-foreground'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat voluptatibus nobis est laborum sed.</p>
            <AddressForm
                address={address}
                setAddress={setAddress}
                onSubmit={handleSubmit}
                loading={false} // Pass true if an API call is in progress
            />
        </div>
    );
}
