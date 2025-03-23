import { Restaurant } from "@/lib/type/morefood/restaurant";

export const fetchResturantsIdDetails = async (
    slug: string
  ): Promise<Restaurant> => {
    try {
        console.log("slug",`${process.env.NEXT_PUBLIC_MOREFOOD_BASE_URL}restaurants/${slug}/details/`)
      // const sanitizedUuid = uuid.replace(/['"\s]/g, "");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MOREFOOD_BASE_URL}restaurants/${slug}/details/`,
      );
      console.log("response", response);
      const data =await  response.json();
      console.log("data", data);
    //   console.log("data",data);

      return data.data;
    } catch (error: any) {
      console.error(
        `Error in fetching Resturant details for ${slug}`,
        error.response
      );
      return {} as Restaurant;
    }
  };