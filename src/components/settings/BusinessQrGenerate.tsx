"use client"
import { fetchBusinessData } from '@/lib/action/moreClub/Business'
import MoreClubApiClient from '@/lib/axios/moreclub/MoreClubApiClient'
import { AppDispatch } from '@/lib/redux/store'
import { showToast } from '@/lib/utilities/toastService'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const BusinessQrGenerate = () => {
    // const axios = useMoredealsClient()
      const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
   
    const generateBusinessQr = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            setLoading(true);
            const response = await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}business/profile/generate/qr-code/`);
            toast.success("QR Code generated successfully");
            dispatch(fetchBusinessData({ fetchForce: true }));
        } catch (err: any) {
            if(err?.response?.data?.detail === "You do not have permission to perform this action."){
                showToast("You need to verified to perform this action", "error");
                return;
            }else{
                showToast(err?.response?.data?.message || "Something went wrong", "error");
            }
        }finally {
            setLoading(false);
        }
    }

    return (
        <button onClick={generateBusinessQr} className="w-24 h-24 flex flex-col items-center justify-center bg-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-300">
            {loading && <Loader2 className="animate-spin" />}
            "Generate QR" 
        </button>
    )
}

export default BusinessQrGenerate
