"use client";

import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { KYCDetails } from "@/lib/type/moreclub/User";



export const useFetchUserDetails = () => {

  // const axiosInstance = useMoredealsClient()

  const fetchKYCDetail = async (): Promise<{
    data: KYCDetails;
  }> => {
    try {
      const response = await MoreClubApiClient.get(`kyc/details/`,);
      return { data: response.data.data};
    } catch (error:any) {
      if(error?.response?.data?.errors?.non_field_errors[0] === "User has no kyc."){
        return { data: {} as KYCDetails};
      }else{
        throw new Error(error?.response?.data?.errors?.non_field_errors[0] || error.response?.data?.message || "Failed to fetch KYC details");
      }
    }
  };

  return {
    fetchKYCDetail,
  };
};
