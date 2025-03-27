"use client"
import { fetchBusinessData } from '@/lib/action/moreClub/Business'
import MoreClubApiClient from '@/lib/axios/moreclub/MoreClubApiClient'
import { AppDispatch } from '@/lib/redux/store'
// import useMoredealsClient from '@/lib/axios/moredealsClient'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const BusinessQrGenerate = () => {
    // const axios = useMoredealsClient()
      const dispatch = useDispatch<AppDispatch>();
   
    const generateBusinessQr = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}business/profile/generate/qr-code/`);
            dispatch(fetchBusinessData({ fetchForce: true }));
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <button onClick={generateBusinessQr} className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-300">
            Generate QR
        </button>
    )
}

export default BusinessQrGenerate
