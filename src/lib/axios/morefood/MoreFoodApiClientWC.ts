import axios from "axios";
import { getSession } from "next-auth/react";
// import { getClientApiUrl } from "./axiosClient";

const baseURL = process.env.NEXT_PUBLIC_MOREFOOD_BASE_URL;

const MoreFoodApiClient = () => {
  const defaultOptions = {
    baseURL,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  };

  const instance = axios.create(defaultOptions);

  // instance.interceptors.request.use(async (request) => {
  //   const session = await getSession();
  //   if (session) {
  //     request.headers.Authorization = `Bearer ${session.accessToken}`;
  //   }
  //   return request;
  // });

  return instance;
};

export default MoreFoodApiClient();
