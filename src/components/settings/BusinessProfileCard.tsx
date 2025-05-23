
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
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Montserrat } from "next/font/google";


const montserrat = Montserrat({ subsets: ["latin"] });

export default function BusinessProfileCard() {
    const business = useAppSelector((state: RootState) => state.business);

    const user = useAppSelector((state: RootState) => state.user.profile);
   
    // const { data: metadatas, isLoading:metaloading, isError:metaerror } = useQuery({
    //     queryKey: ["Meta data "],
    //     queryFn: async () => await getMetadata(),
    //     staleTime: 360000,
    
    //   });

      

    return (
        <div className="flex flex-col flex-wrap gap-4 w-full max-w-xl">
                        <Card className=" max-w-lg flex-1 gradient-background text-primary-foreground p-2 md:p-4 print:bg-white print:text-black ">
                <CardContent className={`grid grid-cols-12 gap-2 items-center mt-2 ${montserrat.className}`}>
                    {/* Left side: Avatar and Referral Code */}
                    <div className="col-span-4 flex flex-col items-start">
                        <div className="relative w-28 h-28">
                            {/* Outer base ring */}
                            <div className="absolute inset-0 rounded-full border-[3px] border-white z-0" />

                            {/* Extended arc ring (top-right to bottom-left) */}
                            <div className="absolute w-36 h-36 border-[3px] border-white rounded-full z-0"
                                style={{
                                    top: "-16px",
                                    left: "-16px",
                                    clipPath: "inset(0 0 40% 0)",
                                    transform: "rotate(30deg)"
                                }}
                            />

                            {/* Avatar */}
                            <Avatar className="w-full h-full bg-white relative z-10">
                                <AvatarImage
                                    src={business?.businessProfile?.business_logo ?? ""}
                                    className="w-full h-full rounded-full object-cover"
                                />
                                <AvatarFallback className="w-full h-full text-black font-bold bg-inherit flex items-center justify-center">
                                {business?.businessProfile?.business_name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                    </div>

                    {/* Right side: User Info */}
                    <div className="col-span-8 space-y-1 text-sm md:text-base">
                        <p className={`text-xl font-extrabold uppercase truncate `}>
                        {business?.businessProfile?.business_name}
                        </p>


                        <div className="flex items-center mb-4">
                            <p className="relative pl-10 text-primary-foreground uppercase z-10">
                                {user?.membership?.membership_code ?? "Free"}
                                <span className="absolute left-0 top-1/2 w-8 border-t border-black -translate-y-1/2"></span>
                            </p>
                        </div>

                        <p className="my-3">
                            <strong>Reg No:</strong>{" "} {business?.businessProfile?.business_registration_number ?? "N/A"}
                        </p>



                        <p className="flex items-center">
                            <Mail className="mr-2 w-4 h-4" />
                            
                            {business?.businessProfile?.business_email ?? "................................."}
                        </p>
                        <p className="flex items-center">
                            <Phone className="mr-2 w-4 h-4" />
                            {business?.businessProfile?.business_phone ?? "................................."}
                                
                        </p>
                        <p className="flex items-center">
                            <MapPin className="mr-2 w-4 h-4" />
                            {business?.businessProfile?.business_address ?? "................................."}
                        </p>
                    
                    </div>
                </CardContent>
            </Card>
        </div>

    );
}
