"use client";

// import { useAxiosClient } from "@/lib/axios/axiosClient";
import { MetaData } from "@/lib/type/CommonType";
import { ProductTypes } from "@/lib/type/moremarket/market";
import axios from "axios";


export const useFetchProduct = () => {
  // const axios = useAxiosClient("moreliving", true);

  const fetchPopularproductList = async (
    page?: number
  ): Promise<{
    data: ProductTypes[];
    meta: MetaData;
  }> => {
    try {
      const pages = page ?? 1;
      const response = await axios.get(
        `https://api.moremaarket.com/api/products/random-products/?page=${pages}`,{
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            // "x-country-code": "NP"
          }}
      );
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Salon", error);
      return { data: [] as ProductTypes[], meta: {} as MetaData };
    }
  };




  return {
    
    fetchPopularproductList,
    
  };
};
