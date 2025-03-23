"use client"
import useMoredealsClient from '@/lib/axios/moredealsClient'
import React from 'react'
import { toast } from 'react-toastify'

const BusinessQrGenerate = () => {
    const axios = useMoredealsClient()

    const generateBusinessQr = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}business/profile/generate/qr-code/`);
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
