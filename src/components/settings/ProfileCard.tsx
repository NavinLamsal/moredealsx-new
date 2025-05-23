

"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import moment from "moment";
import { useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { getMetadata } from "@/lib/action/PubilcCommon";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

export default function ProfileCard() {
    const user = useAppSelector((state: RootState) => state.user.profile);

    const { data: metadatas, isLoading: metaloading, isError: metaerror } = useQuery({
        queryKey: ["Meta data "],
        queryFn: async () => await getMetadata(),
        staleTime: 360000,
    });

    return (
        <div className="flex flex-col flex-wrap  gap-4 w-full mt-4 ">
            {/* -- Membership Card -- */}
            {/* gradient-background */}
            <Card className="max-w-lg flex-1 bg-primary text-primary-foreground  p-2 md:p-4 print:bg-white print:text-black">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base md:text-lg  text-center">Membership card</CardTitle>
                    <CardDescription className="text-sm">
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex justify-between items-center space-y-2 mt-2">
                    <div>
                        <p className="mb-3 whitespace-nowrap text-sm md:text-base">Refer code:{user?.reffer_code.referral_code}</p>
                        <Avatar className="w-12 h-12 md:w-16 md:h-16 bg-white mr-auto mb-4">
                            <AvatarImage src={user?.display_picture ?? ""} className="w-12 h-12 md:w-16 md:h-16" />
                            <AvatarFallback className="w-12 h-12 md:w-16 md:h-16 text-black font-bold bg-inherit">NL</AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-semibold truncate uppercase w-[11rem] ">{user?.last_name}, {user?.first_name}</p>
                    </div>
                    <div className="space-y-2 text-sm md:text-base">
                        <p className="text-right whitespace-nowrap ">{user?.membership?.membership_code ?? "Free"}&nbsp;<strong>Membership Code</strong></p>
                        <p className="text-right whitespace-nowrap ">{user?.email === '' ?
                            user?.phone_prefix + ' ' + user?.phone_number :
                            user?.email
                        } <strong>EMAIL</strong></p>

                        {(user?.user_profile?.street || user?.user_profile?.city) && (
                            <p className="text-right whitespace-nowrap">
                                {user?.user_profile?.street ?? ''} {user?.user_profile?.city ?? ''} <strong>ADDRESS</strong>
                            </p>
                        )}
                        <p className="text-right whitespace-nowrap "> {moment(user?.date_joined).format("MMM DD,YYYY")}  <strong>ISSUE</strong></p>
                    </div>
                </CardContent>
            </Card>

        </div>

    );
}
