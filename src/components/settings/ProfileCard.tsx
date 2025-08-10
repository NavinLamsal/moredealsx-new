"use client";
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

import moment from "moment";
import { useAppSelector } from "@/lib/redux/hooks";
import { AppDispatch, RootState } from "@/lib/redux/store";

import { Clipboard, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Montserrat } from "next/font/google";
import { toast } from "react-toastify";
import { fetchBusinessData } from "@/lib/action/moreClub/Business";
import { useDispatch } from "react-redux";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function ProfileCard() {
  const dispatch = useDispatch<AppDispatch>();

  const user = useAppSelector((state: RootState) => state.user.profile);



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

 

  useEffect(() => {
    dispatch(fetchBusinessData({ fetchForce: false }));
  }, [dispatch]);

  return (
    <div className="flex flex-col flex-wrap  gap-4 w-full mt-4 ">
      <Card className="max-w-lg flex-1 gradient-background text-primary-foreground p-2 md:p-4 print:bg-white print:text-black ">
        <CardContent
          className={`grid grid-cols-12 gap-2 items-center mt-2 ${montserrat.className}`}
        >
          {/* Left side: Avatar and Referral Code */}
          <div className="col-span-4 flex flex-col items-start">
            <div className="relative w-28 h-28">
              {/* Outer base ring */}
              <div className="absolute inset-0 rounded-full border-[3px] border-white z-0" />

              {/* Extended arc ring (top-right to bottom-left) */}
              <div
                className="absolute w-36 h-36 border-[3px] border-white rounded-full z-0"
                style={{
                  top: "-16px",
                  left: "-16px",
                  clipPath: "inset(0 0 40% 0)",
                  transform: "rotate(30deg)",
                }}
              />

              {/* Avatar */}
              <Avatar className="w-full h-full bg-white relative z-10">
                <AvatarImage
                  src={user?.display_picture ?? ""}
                  className="w-full h-full rounded-full object-cover"
                />
                <AvatarFallback className="w-full h-full text-black font-bold bg-inherit flex items-center justify-center">
                  {user?.first_name?.[0] ?? "N"}
                  {user?.last_name?.[0] ?? "L"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Right side: User Info */}
          <div className="col-span-8 space-y-1 text-sm md:text-base">
            <p className={`text-xl font-extrabold uppercase truncate `}>
              {user?.first_name} {user?.last_name}
            </p>

            <div className="flex items-center mb-4">
              <p className="relative pl-10 text-primary-foreground uppercase z-10">
                {user?.membership?.membership_code ?? "Free"}
                <span className="absolute left-0 top-1/2 w-8 border-t border-black -translate-y-1/2"></span>
              </p>
            </div>

            <p className="my-3">
              <strong>Refer Code:</strong>{" "}
              {user?.reffer_code?.referral_code ?? "N/A"}
            </p>

            <p className="flex items-center">
              <Mail className="mr-2 w-4 h-4" />
              {user?.email && user?.email !== ""
                ? user.email
                : `${
                    user?.user_profile.secondary_email ??
                    "................................."
                  }`}
            </p>
            <p className="flex items-center">
              <Phone className="mr-2 w-4 h-4" />
              {user?.phone_number && user?.phone_number !== ""
                ? `${user?.phone_prefix ?? ""} ${user?.phone_number ?? ""}`
                : `${
                    user?.user_profile.secondary_phone_number ??
                    "................................."
                  }`}
            </p>
            <p className="flex items-center">
              <MapPin className="mr-2 w-4 h-4" />
              {[user?.user_profile?.street, user?.user_profile?.city]
                .filter(Boolean)
                .join(", ") || "................................."}
            </p>
            <p className="flex items-center">
              <Clock className="mr-2 w-4 h-4" />
              {moment(user?.date_joined).format("MMM DD, YYYY")}
            </p>

            {/* {(user?.user_profile?.street || user?.user_profile?.city) && (
            <p className="flex items-center">
              <MapPin className="mr-2 w-4 h-4" />
              {[user?.user_profile?.street, user?.user_profile?.city]
                .filter(Boolean)
                .join(", ")}
            </p>
          )} */}
          </div>
        </CardContent>
      </Card>
      {!user ? (
        <p>Loading referral code...</p>
      ) : (
        <div className="max-w-lg bg-primary shadow shadow-primary rounded text-base mt-2 mb-2 border-b pb-2 p-2">
          <p className="my-2 text-lg font-medium">Reffer</p>

          <div className="flex items-center">
            <input
              type="text"
              // defaultValue={
              //   business?.businessProfile?.id
              //     ? `${process.env.NEXT_PUBLIC_HOST_URL}/auth/register/?bpms=${business?.businessProfile?.id}`
              //     : ""
              // }
              defaultValue={`${
                process.env.NEXT_PUBLIC_HOST_URL
              }/auth/register/?referral=${
                user?.reffer_code?.referral_code ?? "N/A"
              }`}
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
      )}
    </div>
  );
}
