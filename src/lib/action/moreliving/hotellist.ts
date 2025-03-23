"use client";

import { useAxiosClient } from "@/lib/axios/axiosClient";
import { MetaData } from "@/lib/type/CommonType";
import { HotelTypes } from "@/lib/type/moreliving/hotel";


export const useFetchHotel = () => {
  const axios = useAxiosClient("moreliving", true);

  const fetchPopularHotelList = async (
    page?: number
  ): Promise<{
    data: HotelTypes[];
    meta: MetaData;
  }> => {
    try {
      const pages = page ?? 1;
      const response = await axios.get(
        `property/popular-properties/?page=${pages}`
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
