"use client";
import axios from "axios";
import { getApiUrl } from "../utils";
import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";


const BaseURL = getApiUrl();

const axiosClient = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export const useMoredealsClient = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      getSession().then((sessionData) => {
        if (sessionData?.accessToken) {
            axiosClient.defaults.headers["Authorization"] = `Bearer ${sessionData.accessToken}`;
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
        axiosClient.defaults.headers["Authorization"] = `Bearer ${session.accessToken}`;
      }
    }
  }, [session]);

  return axiosClient;
};


// const useMoredealsClient = () => {
//   console.log("useAxiosClient called. Setting country code header...");
// useEffect(() => {
//     if (status === "loading") {
//       console.log("session loading");
//       getSession().then((sessionData) => {
//         if (sessionData?.accessToken) {
//             axiosClient.defaults.headers["Authorization"] = `Bearer ${sessionData.accessToken}`;
//         }
//       }).catch((error) => {
//         console.error("Error fetching session:", error);
//       });
//     }
//   }, [status]);

//   // If session is available, set the Authorization header
//   useEffect(() => {
//     if(status !== "loading"){
//       if (session?.accessToken) {
//         axiosInstance.defaults.headers["Authorization"] = `Bearer ${session.accessToken}`;
//       }
//     }
//   }, [session]);
//   return axiosClient;
// };

export default useMoredealsClient;
