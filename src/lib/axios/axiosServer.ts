
// this api instance is for server side proxy api and moreclub only 
import axios, { AxiosInstance } from "axios";

const BaseURL = process.env.NEXT_PUBLIC_BASE_URL || "";

/**
 * Public server-side Axios instance.
 */
export const axiosServerPublic: AxiosInstance = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Authenticated server-side Axios instance.
 */
// export const axiosServerAuth: AxiosInstance = axios.create({
//   baseURL: BaseURL,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// /**
//  * Interceptor to add `Authorization` header dynamically for server-side requests.
//  */
// axiosServerAuth.interceptors.request.use(
//   async (config) => {
//     console.log("config",config);
//     const session = await auth(); // Fetch session from NextAuth
//     console.log("session",session);
//     const accessToken = session?.accessToken;
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export const axiosServerAuth: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL, // Ensure BASE_URL is correctly set
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosServerAuth.interceptors.request.use(
  async (config) => {
    const session = await auth(); // Make sure auth() returns a session object with an accessToken
    const accessToken = session?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
