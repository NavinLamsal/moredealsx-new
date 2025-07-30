



import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import axios from "axios";



export const fetchPartnerList = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}partners/list/`);
   

    const data = response?.data?.data || [];

    return data; 
  } catch (error) {
    console.error("Error fetching partner list:", error);
    return []; // Return empty array on failure
  }
};
