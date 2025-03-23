// This is not for the platform that need country code if country code needed then use axiosClient. 
// This one is for those api which doesnt depend on the country code and need to fetch on server side 

import axios, { AxiosInstance } from "axios";

import { getServerApiUrl } from "../utils";
import { axiosServerAuth, axiosServerPublic } from "./axiosServer";



export const createServerPlatformAxiosInstance = (
  platform: string,
  includeAuth = false,
): AxiosInstance => {
  

  const baseURL = getServerApiUrl(platform);
  // Choose the base Axios instance
  const baseInstance = includeAuth ? axiosServerAuth : axiosServerPublic;

  // Clone and customize the base instance
  // const instance = axios.create({
  //   ...baseInstance.defaults,
  //   baseURL,
  // });

  return baseInstance;
};
