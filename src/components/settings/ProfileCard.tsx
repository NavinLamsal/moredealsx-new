

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { auth } from "@/auth";
import Image from "next/image";
import moment from "moment";

export default async function ProfileCard() {
    const session = await auth();
    return (


        <div className="flex flex-row flex-wrap xl:grid xl:grid-cols-2 gap-4 w-full ">
            {/* -- Membership Card -- */}
            <Card className="max-w-lg flex-1 gradient-background text-white p-2 md:p-4 print:bg-white print:text-black">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base md:text-lg  text-center">Membership card</CardTitle>
                    <CardDescription className="text-sm">
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex justify-between items-center space-y-2 mt-2">
                    <div>
                        <p className="mb-3 whitespace-nowrap text-sm md:text-base">Refer code:{session?.user.userDetails?.reffer_code.referral_code}</p>
                        <Avatar className="w-12 h-12 md:w-16 md:h-16 bg-white mx-auto mb-4">
                            <AvatarImage src={session?.user.userDetails?.display_picture} className="w-12 h-12 md:w-16 md:h-16" />
                            <AvatarFallback className="w-12 h-12 md:w-16 md:h-16 text-black font-bold bg-inherit">NL</AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-semibold truncate uppercase w-[11rem] ">{session?.user?.userDetails?.last_name}, {session?.user?.userDetails?.first_name}</p>
                    </div>
                    <div className="space-y-2 text-sm md:text-base">
                        <p className="text-right whitespace-nowrap ">{session?.user?.userDetails?.membership.membership_code}&nbsp;<strong>Membership Code</strong></p>
                        <p className="text-right whitespace-nowrap ">{session?.user?.userDetails?.email === '' ?
                            session?.user?.userDetails?.phone_prefix + ' ' + session?.user?.userDetails?.phone_number :
                            session?.user?.userDetails?.email
                        } <strong>EMAIL</strong></p>
                        <p className="text-right whitespace-nowrap ">
                            {session?.user?.userDetails?.user_profile?.street}, {session?.user?.userDetails?.user_profile?.city} <strong>ADDRESS</strong></p>
                        <p className="text-right whitespace-nowrap "> {moment(session?.user?.userDetails?.date_joined).format("MMM DD,YYYY")}  <strong>ISSUE</strong></p>
                    </div>
                </CardContent>
            </Card>

            {/* -- Discount QR Card -- */}
            <Card className="max-w-lg flex-1 gradient-background text-white p-2 md:p-4 print:bg-white print:text-black">
                <CardContent className="flex flex-row gap-3 justify-between items-center text-center space-y-2 mt-2">
                    {/* Replace the src with your actual QR code image path */}
                    <div className="flex flex-col items-center ">
                        <Image
                            src="/images/png/MembersClubWhite.png"
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
                            src="/logo.png"
                            alt="Discount QR"
                            className="w-24 h-24 object-cover"
                            width={250}
                            height={250}
                            quality={100}
                        />
                        <p className="text-right whitespace-nowrap  font-bold">More Deals Club</p>
                        <p className="text-right whitespace-nowrap ">info@moredealsclub.com</p>
                        <p className="text-right whitespace-nowrap ">+46 76 327 76 40</p>

                    </div>
                </CardContent>
                <CardFooter className="text-center flex flex-col">

                    <p className="text-sm text-yellow-500">Please do not share this QR code.</p>
                    <p className="text-xs mt-2">6fa99462-2d28-46fe-8316-850b3c3f8a</p>
                </CardFooter>
            </Card>

        </div>

    );
}
