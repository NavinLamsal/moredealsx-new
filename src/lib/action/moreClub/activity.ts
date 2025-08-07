"use client";

import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { MetaData } from "@/lib/type/CommonType";
import { NetworkList } from "@/lib/type/moreclub/Network";
import api from "@/utils/api";


export const useFetchActivity = () => {


    const fetchActivityList = async (
      
     
      page: number = 1
    ): Promise<{ data: NetworkList[]; meta: MetaData }> => {
      try {
  
      const limit = 10;
      const offset = (page - 1) * limit;
  
      // Convert params object to query string
      const queryParams = new URLSearchParams({
        offset: offset.toString(),
        limit: limit.toString(),
        page: page.toString(),
      });
  
        const response = await api.get(`logactivity/list/?${queryParams.toString()}`);   
          return { data: response.data.data, meta: response.data.meta };
    
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        return { data: [] as NetworkList[], meta: {} as MetaData };
      }
    };

  return {
    fetchActivityList,
  };
};
