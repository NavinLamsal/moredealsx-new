// // This one is for those api which may or may not depend on the country code and need to fetch on client side 

// "use client";

// import axios, { AxiosInstance } from "axios";
// import cookie from "cookie";
// import { getSession, useSession } from "next-auth/react";
// import { platformUrls } from "../utils";


// const getClientApiUrl = (platform: string): string => {
 

//   const urls = platformUrls[platform];

//   if (!urls) {
//     return "https://moretrek.com/api/";
//   }

//   let countryCode = "SE"; // Default country code

//   // Retrieve country code from cookies
//   if (typeof document !== "undefined") {
//     const cookies = document.cookie;
//     const parsedCookies = cookie.parse(cookies);
//     countryCode = parsedCookies.countryCode || "default";
//   }

//   return urls[countryCode] || urls["default"];
// };


// const createAxiosInstance = (platform: string, includeCountryCode: boolean): AxiosInstance => {
//   const baseURL = getClientApiUrl(platform);

//   const instance = axios.create({
//     baseURL,
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });

//   if (includeCountryCode) {
//     instance.interceptors.request.use(
//       (config) => {
//         const cookies = document.cookie;
//         const parsedCookies = cookie.parse(cookies);
//         const countryCode = parsedCookies.countryCode || "SE";

//         if (countryCode) {
//           config.headers["x-country-code"] = countryCode;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );
//   }

//   return instance;
// };

// export const  useAxiosClient = (platform: string, includeCountryCode: boolean): AxiosInstance => {
//   const { data: session , status} = useSession();

//   const axiosInstance = createAxiosInstance(platform, includeCountryCode);

//   if(status === "loading"){

//     const sessiondata = getSession();
//     console.log("sessiondata",sessiondata)
//   }
  
//   if (session?.accessToken) {
//     axiosInstance.defaults.headers["Authorization"] = `Bearer ${session.accessToken}`;
//   }

//   return axiosInstance;
// };


"use client";

import axios, { AxiosInstance } from "axios";
import cookie from "cookie";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { platformUrls } from "../utils";

export const getClientApiUrl = (platform: string): string => {
  const urls = platformUrls[platform];

  if (!urls) {
    return "https://moretrek.com/api/";
  }

  let countryCode = "SE"; // Default country code

  // Retrieve country code from cookies
  if (typeof document !== "undefined") {
    const cookies = document.cookie;
    const parsedCookies = cookie.parse(cookies);
    countryCode = parsedCookies.countryCode || "default";
  }
  return urls[countryCode] || urls["default"];
};

const createAxiosInstance = (platform: string, includeCountryCode: boolean): AxiosInstance => {
  const baseURL = getClientApiUrl(platform);

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (includeCountryCode) {
    instance.interceptors.request.use(
      (config) => {
        const cookies = document.cookie;
        const parsedCookies = cookie.parse(cookies);
        const countryCode = parsedCookies.countryCode || "SE";

        if (countryCode) {
          config.headers["x-country-code"] = countryCode;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  return instance;
};

export const useAxiosClient = (platform: string, includeCountryCode: boolean): AxiosInstance => {

  const { data: session, status } = useSession();
  const axiosInstance = createAxiosInstance(platform, includeCountryCode);

  useEffect(() => {
    if (status === "loading") {
      getSession().then((sessionData) => {
        if (sessionData?.accessToken) {
           axiosInstance.defaults.headers["Authorization"] = `Bearer ${sessionData.accessToken}`;
        }
      }).catch((error) => {
        console.error("Error fetching session:", error);
      });
    }
  }, [status]);

  // If session is available, set the Authorization header
  useEffect(() => {
    if(status !== "loading"){
      if (session?.accessToken) {
        axiosInstance.defaults.headers["Authorization"] = `Bearer ${session.accessToken}`;
      }
    }
  }, [session]);

  return axiosInstance;
};
