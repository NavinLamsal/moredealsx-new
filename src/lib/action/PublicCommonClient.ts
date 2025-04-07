import MoreClubApiClient from "../axios/moreclub/MoreClubApiClient";

export interface Offer {
    banner: string //"https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/offers/Red_And_Blue_Simple_New_Year_Sale_A4_Landscape_glj64n"
    discount_amount: string //"0.00"
    discount_percentage: string //"50.00"
    id:number
    price: number 
    slug:string// "new-year-offer1"
    title: string //"New Year Offer"
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
