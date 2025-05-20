
"use client";
import React, { Suspense, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import BusinessQrGenerate from "./BusinessQrGenerate";
import { RootState } from "@/lib/redux/store";
import { useAppSelector } from "@/lib/redux/hooks";
import { getMetadata } from "@/lib/action/PubilcCommon";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

export default function BusinessProfileCard() {
    const business = useAppSelector((state: RootState) => state.business);
   
    const { data: metadatas, isLoading:metaloading, isError:metaerror } = useQuery({
        queryKey: ["Meta data "],
        queryFn: async () => await getMetadata(),
        staleTime: 360000,
    
      });

    return (
        <div className="flex flex-col flex-wrap gap-4 w-full max-w-xl">
            <Card className="flex-1 bg-primary text-primary-foreground  p-2 md:p-4 print:bg-white print:text-black">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base md:text-lg text-center ">Business Membership Card</CardTitle>
                    <CardDescription className="text-sm">
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex justify-between items-center space-y-2 mt-2">
                    <div>
                        <Avatar className=" size-12  md:size-16 lg:size-20 xl:size-24 2xl:size-28 bg-white mx-auto mb-4">
                            <AvatarImage src={business?.businessProfile?.business_logo} className="size-12  md:size-16 lg:size-20 xl:size-24 2xl:size-28  " />
                            <AvatarFallback className="size-12  md:size-16 lg:size-20 xl:size-24 2xl:size-28 text-black font-bold bg-inherit">{business?.businessProfile?.business_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className=" text-base md:text-lg font-semibold uppercase text-center">{business?.businessProfile?.business_name}</p>
                    </div>
                    <div className="space-y-2 lg:space-y-4 2xl:space-y-6 text-sm md:text-base">
                        <p className="text-right whitespace-nowrap ">{business?.businessProfile?.business_phone}&nbsp;<strong>Phone</strong></p>
                        <p className="text-right whitespace-nowrap ">{business?.businessProfile?.business_email}&nbsp;<strong>EMAIL</strong></p>
                        <p className="text-right ">{business?.businessProfile?.business_address} &nbsp;<strong>ADDRESS</strong></p>
                        <p className="text-right whitespace-nowrap ">{business?.businessProfile?.business_registration_number}&nbsp;<strong>REG No</strong></p>
                    </div>
                </CardContent>
            </Card>

            {/* -- Discount QR Card -- */}
            <Card className="flex-1 bg-primary text-primary-foreground  p-2 md:p-4 print:bg-white print:text-black">
                <CardContent className="grid grid-cols-12 gap-3 justify-between items-center text-center space-y-2 mt-2">
                    {/* Replace the src with your actual QR code image path */}
                    <div className="col-span-6  flex flex-col items-start space-y-2 lg:space-y-4 2xl:space-y-6">
                        {business.businessProfile?.qr_code ?
                            <Image
                                src={business.businessProfile?.qr_code}
                                alt="Discount QR"
                                className="w-24 h-24 object-cover"
                                width={250}
                                height={250}
                                quality={100}
                            /> :
                            <Suspense fallback={<div>Loading...</div>}>
                                <BusinessQrGenerate />
                            </Suspense>
                        }
                        <p className="text-xs font-medium text-red-500 whitespace-nowrap">Referal QR code</p>
                    </div>
                    {metaloading &&
                    <div className="col-span-6 lg:space-y-4 2xl:space-y-6 flex flex-col items-end">
                        <Skeleton className="w-24 h-24 bg-gray-200" />
                        <Skeleton className=" w-36 h-2 bg-gray-200" />
                        <Skeleton className=" w-36 h-2 bg-gray-200" />
                        <Skeleton className=" w-36 h-2 bg-gray-200" />
                    </div>
                    }
                    {metadatas && 
                    <div className="col-span-6 lg:space-y-2 2xl:space-y-2 flex flex-col items-end">
                        {metadatas?.white_logo ?
                        <Image
                            src={metadatas?.white_logo}
                            alt="Discount QR"
                            className="w-auto h-24   object-cover"
                            width={250}
                            height={250}
                            quality={100}
                        />
                        
                        :
                        <Image
                            src="/images/png/MembersClubWhite.png"
                            alt="Discount QR"
                            className="w-auto h-24  object-cover"
                            width={250}
                            height={250}
                            quality={100}
                        />
                        
                        }
                        <p className="text-right whitespace-nowrap text-sm md:text-base lg:text-lg font-bold">{metadatas?.name ?? "More Deals Club"}</p>
                        <p className="text-right whitespace-nowrap text-xs md:text-sm lg:text-base">{metadatas?.phone}</p>
                        <p className="text-right whitespace-nowrap text-xs  md:text-sm lg:text-base">{metadatas?.email}</p>
                    </div>
                    }
                </CardContent>
                <CardFooter className="text-center flex flex-col">

                    <p className="text-sm text-red-500">Please do not share this QR code.</p>
                    <p className="text-xs mt-2">6fa99462-2d28-46fe-8316-850b3c3f8a</p>
                </CardFooter>
            </Card>

        </div>

    );
}
