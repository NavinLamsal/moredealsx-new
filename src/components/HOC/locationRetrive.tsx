"use client";
import React from "react";
import { useEffect } from "react";
import cookie from "cookie";
import { fetchLiveLocation } from "@/lib/utils";


const Locationretrive = () => {
 
    const checkAndUpdateLocation = async() => {     
      
        const cookies = document.cookie;
        const parsedCookies = cookie.parse(cookies);
        const countryCode = parsedCookies.countryCode;
        if (!countryCode) {
          // Cookie doesn't exist, fetch and set it
          fetchLiveLocation();
        } else {
          // Cookie is valid, no need to fetch
          console.log("");
        }
      
    
    };

   useEffect(() => {
     checkAndUpdateLocation();

     // Optionally set an interval to check at regular intervals
     const intervalId = setInterval(() => {
       checkAndUpdateLocation();
     }, 60000); // Check every 60 seconds (adjust as needed)

     // Cleanup interval on unmount
     return () => clearInterval(intervalId);
   }, []);

  return <div></div>;
};

export default Locationretrive;
