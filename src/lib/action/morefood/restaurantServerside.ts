import { Restaurant } from "@/lib/type/morefood/restaurant";

export const fetchResturantsIdDetails = async (
    slug: string
  ): Promise<Restaurant> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MOREFOOD_BASE_URL}restaurants/${slug}/details/`,
      );
      const data =await  response.json();

      return data.data;
    } catch (error: any) {
      console.error(
        `Error in fetching Resturant details for ${slug}`,
        error.response
      );
      return {} as Restaurant;
    }
  };