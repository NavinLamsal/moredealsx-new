"use client";

import { useAxiosClient } from "@/lib/axios/axiosClient";
import { MetaData } from "@/lib/type/CommonType";
import { SaloonTypes } from "@/lib/type/moresalons/salon";
import axios from "axios";


export const useFetchSalon = () => {
  // const axios = useAxiosClient("moreSalon", true);

  const fetchPopularSalonList = async (
    page?: number
  ): Promise<{
    data: SaloonTypes[];
    meta: MetaData;
  }> => {
    try {
      const pages = page ?? 1;
      const response = await axios.get(
        `https://api.moresalons.com/api/saloons/popular/?page=${pages}`,
         {
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "x-country-code": "NP"
          }
         }
      );
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Salon", error);
      return { data: [] as SaloonTypes[], meta: {} as MetaData };
    }
  };




  return {
    
    fetchPopularSalonList,
    
  };
};
