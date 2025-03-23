"use client";

import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
// import useMoredealsClient from "@/lib/axios/moredealsClient";
import { MetaData } from "@/lib/type/CommonType";
import { NetworkList } from "@/lib/type/moreclub/Network";


export const useFetchNetworks = () => {

  // const axiosInstance = useMoredealsClient()

  const fetchNetworkList = async (params: Record<string, string | number>
  ): Promise<{
    data: NetworkList[];
    meta: MetaData;
  }> => {
    try {
      const response = await MoreClubApiClient.get(`networks/list/`, { params });
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      return { data: [] as NetworkList[], meta: {} as MetaData };
    }
  };

  return {
    fetchNetworkList,
  };
};
