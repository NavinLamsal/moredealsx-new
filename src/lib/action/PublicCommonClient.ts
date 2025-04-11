import MoreClubApiClient from "../axios/moreclub/MoreClubApiClient";

export interface Offer {
    banner: string
    discount_amount: string 
    discount_percentage: string 
    is_banner_only: boolean 
    id:number
    price: number 
    slug:string
    title: string 
    short_description: string 
    url: string | null 
    from_date: string
    to_date: string;
    is_active:string;
    currency_symbol: string;
    is_all_time: boolean
}

export const fetchOfferList = async (
  country: string | null,
): Promise<Offer[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; 
    const endpoint = `${baseUrl}offers/list/?country=${country}`;
    const response = await MoreClubApiClient.get(endpoint);
    return response.data.data || [];
  } catch (error: any) {
    console.error("Error fetching offers:", error);
    return [];
  }
};
