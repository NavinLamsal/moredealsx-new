import React from "react";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import RestaurantTab from "./RestaurantTab";
import { Restaurant } from "@/lib/type/morefood/restaurant";
import Image from "next/image";

const RestaurantDetail = ({details}:{details:Restaurant}) => {
  return (
    <div className="max-w-5xl mx-auto bg-card shadow-lg rounded-t-lg overflow-hidden">
      {/* Header Image */}
      <div className="relative w-full h-64">
        <Image
          src={details.banner}
          alt={`${details.name}-"banner`}
          width="1024"
          height="1024"
          quality={90}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute -bottom-6 left-4">
            <Avatar className="rounded-full h-24 w-24 bg-morefoodPrimary flex items-center justify-center">
                <AvatarImage src={details.logo} alt={`${details.name}-logo`} className="h-20 w-20 items-center justify-center rounded-full"/>
                <AvatarFallback className="h-20 w-20 items-center justify-center rounded-full bg-white uppercase text-bold text-2xl">
                    {details.name[0]}
                </AvatarFallback>
                
            </Avatar>
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="p-6">
        <h1 className="text-3xl font-bold">{details.name}</h1>
        <div className="flex items-center text-gray-600 mt-2">
          <span className="flex items-center gap-1 text-yellow-500">
            <Star className="w-5 h-5" /> 4.6
          </span>
          <span className="ml-2">({details.restaurant_rating}+ ratings) • Wings • Chicken • American</span>
        </div>
        <p className="text-gray-500 mt-2">
          {details.short_description}
        </p>
      </div>

    </div>
  );
};

export default RestaurantDetail;
