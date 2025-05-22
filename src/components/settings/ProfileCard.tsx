

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
                        <p className="text-right whitespace-nowrap ">{user?.membership.membership_code}&nbsp;<strong>Membership Code</strong></p>
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

            {/* -- Discount QR Card -- */}
            <Card className="max-w-lg flex-1 bg-primary text-primary-foreground  p-2 md:p-4 print:bg-white print:text-black">
                <CardContent className="flex flex-row gap-3 justify-between items-center text-center space-y-2 mt-2">
                    {/* Replace the src with your actual QR code image path */}
                    {/* <div className="flex flex-col items-center ">
                        <Image
                            src={user?.qr_code}
                            alt="Discount QR"
                            className="w-24 h-24 object-cover"
                            width={250}
                            height={250}
                            quality={100}
                        />
                        <p className="text-xs font-medium text-yellow-500 whitespace-nowrap">Discount QR code</p>
                    </div>
                    <div>
                        <Image
                            src="/images/png/MembersClubWhite.png"
                            alt="Discount QR"
                            className="w-24 h-24 object-cover"
                            width={250}
                            height={250}
                            quality={100}
                        />
                        <p className="text-right whitespace-nowrap  font-bold">More Deals Club</p>
                        <p className="text-right whitespace-nowrap ">info@moredealsclub.com</p>
                        <p className="text-right whitespace-nowrap ">+46 76 327 76 40</p>

                    </div> */}
                    <div className="col-span-6  flex flex-col items-start space-y-2 lg:space-y-4 2xl:space-y-6">
                        <Image
                            src={user?.qr_code ?? ""}
                            alt="Discount QR"
                            className="w-24 h-24 object-cover"
                            width={250}
                            height={250}
                            quality={100}
                        />
                        <p className="text-xs font-medium text-red-500 whitespace-nowrap">Discount QR code</p>
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
