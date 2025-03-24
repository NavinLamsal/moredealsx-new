"use client";

// import { useAxiosClient } from "@/lib/axios/axiosClient";
import { MetaData } from "@/lib/type/CommonType";
import { HotelTypes } from "@/lib/type/moreliving/hotel";
import axios from "axios";


export const useFetchHotel = () => {
  // const axios = useAxiosClient("moreliving", true);

  const fetchPopularHotelList = async (
    page?: number
  ): Promise<{
    data: HotelTypes[];
    meta: MetaData;
  }> => {
    try {
      const pages = page ?? 1;
      const response = await axios.get(
        `https://api.morelivingglobal.com/api/property/popular-properties/?page=${pages}`,{
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "x-country-code": "NP"
          }}
      );
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Salon", error);
      return { data: [] as HotelTypes[], meta: {} as MetaData };
    }
  };




  return {
    
    fetchPopularHotelList,
    
  };
};
