// import axios from 'axios';
// import { getSession, signOut } from 'next-auth/react';

// const baseURL = process.env.NEXT_PUBLIC_API_URL 

// let abortController = new AbortController();

// const MoreClubApiClient = () => {
//   const defaultOptions = {
//     baseURL,
//     headers: {
//       "Content-Type": "application/json",
//       accept: "application/json",
//     },
//   };

//   const instance = axios.create(defaultOptions);

//   instance.interceptors.request.use(async (request) => {
//     // const session = await getSession();
//     if (session) {
//       if (session?.error) {
//         // Abort all current requests
//         abortController.abort();
  
//         // Create a new AbortController for future requests
//         abortController = new AbortController();
  
//         // Sign out the user
//         await signOut({ callbackUrl: '/auth/login' });
  
//         // Reject the request explicitly
//         return Promise.reject(new axios.Cancel(`Request cancelled due to session error: ${session.error}`));
//       }
//       request.headers.Authorization = `Bearer ${session.accessToken}`;
//     }
//     return request;
//   });

  



//   return instance;
// };

// export default MoreClubApiClient();

import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { getCookie, deleteCookie } from "cookies-next"
import { clearStorage } from "@/components/auth/logouts/logoutFunction"
import { refreshAccessToken } from "@/utils/refreshToken"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL
const MoreClubApiClient = axios.create({
  baseURL,
  // timeout: 10000,
  withCredentials: true,
  headers: {
    "X-Platform": "web"
  },
})




export const toDateTime = (secs: number) => {
  var t = new Date("1970-01-01T00:30:00Z") // Unix epoch start.
  t.setSeconds(secs)
  return t
}

MoreClubApiClient.interceptors.request.use(
  async (config) => {
    let authToken = await getCookie("xaccess_token")
   
     if (authToken && authToken !== "null" && authToken !== null) {
       const detail = jwtDecode<{ exp: number }>(authToken);
   
       if (detail?.exp && toDateTime(detail.exp) < new Date()) {
         let newToken = await refreshAccessToken();
         if (!newToken) {
           clearStorage();
           window.location.href = "/auth/login";
           return config;
         }
         authToken = newToken;
       }
       config.headers.Authorization = `Bearer ${authToken}`;
     }
   
     return config;
  },
  (error) => {
    Promise.reject(error)
  }
)


export default MoreClubApiClient
