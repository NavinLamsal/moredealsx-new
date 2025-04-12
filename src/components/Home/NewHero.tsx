"use client";

import React from "react";
import {ChevronDown } from "lucide-react";
import Offers from "../Dashboard/Offers";
import Navbar from "@/layout/navbar";
import SmallOffers from "../Dashboard/VerticalOfferCarousel";

const ESewaLayout = () => {
  return (
    <>
     {/* <Navbar/> */}
      <div className="bg-primary text-white py-2 px-6  gap-6">
        <div className="max-w-8xl flex flex-wrap gap-6 mx-auto  justify-start">

        <span className="cursor-pointer hover:underline">Load Fund</span>
        <span className="cursor-pointer hover:underline">Morefood</span>
        <span className="cursor-pointer hover:underline">Moresalon</span>
        <span className="cursor-pointer hover:underline">Moreliving</span>
        <span className="cursor-pointer hover:underline">Marketplace</span>
        </div>
      </div>
    <div className="max-w-8xl mx-auto">
      {/* Top Navigation Bar */}

      {/* Green Secondary Navbar */}

      <div className="grid grid-cols-12">
        {/* Sidebar Menu */}
        

        {/* Main Content */}
        <div className="flex col-span-12 min-[960px]:col-span-8 ">
        <div className="w-full p-6">
         <Offers/>
        </div>
        </div>
        <div className="col-span-4 hidden min-[960px]:block ">
          {/* <ul className="space-y-3 text-gray-700">
            <li className="flex justify-between items-center cursor-pointer divide-y-2  hover:text-green-500">
              Topup & Recharge <ChevronDown className="-rotate-90" size={16} />
            </li>
            <li className="flex justify-between items-center cursor-pointer hover:text-green-500">
              Electricity & Water <ChevronDown className="-rotate-90" size={16} />
            </li>
            <li className="flex justify-between items-center cursor-pointer hover:text-green-500">
              TV Payment <ChevronDown className="-rotate-90" size={16} />
            </li>
            <li className="flex justify-between items-center cursor-pointer hover:text-green-500">
              Bus Ticket/Tours and Travels <ChevronDown className="-rotate-90" size={16} />
            </li>
            <li className="flex justify-between items-center cursor-pointer hover:text-green-500">
              Education Payment <ChevronDown className="-rotate-90" size={16} />
            </li>
            <li className="flex justify-between items-center cursor-pointer hover:text-green-500">
              DOFE/Insurance Payment <ChevronDown className="-rotate-90" size={16} />
            </li>
            <li className="flex justify-between items-center cursor-pointer hover:text-green-500">
              Financial Services <ChevronDown className="-rotate-90" size={16} />
            </li>
            <li className="flex justify-between items-center cursor-pointer hover:text-green-500">
              Movies & Entertainment <ChevronDown className="-rotate-90" size={16} />
            </li>
          </ul> */}
          <div className="w-full p-6">
          <SmallOffers/>
          </div>
        </div>

      
      </div>
    </div>
    
    </>
  );
};

export default ESewaLayout;
