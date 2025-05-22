"use client"
import React, { useRef } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Heading from '../ui/heading'
import { useAppSelector } from '@/lib/redux/hooks'
import { RootState } from '@/lib/redux/store'
import { Clipboard, Edit2 } from 'lucide-react'
import { toast } from 'react-toastify'
import QRDownload from '../pdf/QrDownload'

const BusinessQuickLinks = () => {


    const business = useAppSelector((state: RootState) => state.business);
   

    if (business.isLoading) {
        return (
            <p>Loading...</p>
        )
    }

    const linkInputRef = useRef<HTMLInputElement | null>(null);

    const copyLink = () => {
        const linkInput = linkInputRef.current;
        if (linkInput) {
            navigator.clipboard
                .writeText(linkInput.value)
                .then(() => {
                    toast.success("Link copied to clipboard");
                })
                .catch((err) => toast.error("Failed to copy link"));
        }
    };


    return (
        <Card className='max-w-xl'>
            <CardTitle className='pt-3 px-3'>
                <Heading title="Quick Links" />
            </CardTitle>
            <CardContent className='flex flex-col gap-2 divide-y-2  divide-primary-foreground '>
                
                <Link href={"/business/profile/update"} >
                    <Button variant={"ghost"} className=' justify-start text-lg w-full text-left hover:bg-primary hover:text-primary-foreground '>
                    <Avatar className="flex items-center h-7 w-7">
                        <AvatarImage src={"/images/png/update.png"} className="h-7 w-7 block dark:hidden" />
                        <AvatarImage src={"/images/png/update.png"} className="h-7 w-7 hidden dark:block" />
                        <AvatarFallback >{"U"}</AvatarFallback>
                    </Avatar>
                        Update Business Profile</Button>
                </Link>
                <Link href={"/business/transaction"} className='pt-1'>
                    <Button variant={"ghost"} className=' justify-start text-lg w-full text-left hover:bg-primary hover:text-primary-foreground '>
                        <Avatar className="flex items-center h-7 w-7">
                            <AvatarImage src={"/images/svg/Transaction.svg"} className="h-7 w-7 block dark:hidden" />
                            <AvatarImage src={"/images/svg/Transaction.svg"} className="h-7 w-7 hidden dark:block" />
                            <AvatarFallback >{"B"}</AvatarFallback>
                        </Avatar>
                        Business Transaction</Button>
                </Link>
                
                <div className="text-base mt-2 mb-2 border-b pb-2 p-2">

                    <p className='my-2 text-lg'>Reffer</p>

                    <div className="flex items-center">
                        <input
                            type="text"
                            defaultValue={
                                business?.businessProfile?.id
                                    ? `${process.env.NEXT_PUBLIC_HOST_URL}/auth/register/?bpms=${business?.businessProfile?.id}`
                                    : ""
                            }
                            className="bg-black text-white border-0 p-1 w-4/5 outline-none"
                            ref={linkInputRef}
                            readOnly
                        />
                        <span
                            className="p-1 ms-2 px-2 cursor-pointer bg-gray-800 text-white rounded"
                            onClick={copyLink}
                        >
                            <Clipboard size={16} />
                        </span>
                    </div>
                </div>
                <div className='flex py-2'>
                {business.businessProfile?.qr_code && (
                    <QRDownload
                        imageUrl={business.businessProfile?.qr_code}
                        name={business.businessProfile?.business_name}
                        link=""
                    />
                )}

                </div>


            </CardContent>
        </Card>
    )
}

export default BusinessQuickLinks

