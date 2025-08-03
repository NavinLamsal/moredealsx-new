import axios from "axios";
import MoreClubApiClient from "../axios/moreclub/MoreClubApiClient";
import MorefoodApiClientWithoutAccess from "../axios/morefood/MorefoodApiClientWithoutAccess";
import { MetaData } from "../type/CommonType";
import { ResturantListType } from "../type/morefood/restaurant";
import MoreFoodApiClient from "../axios/morefood/MoreFoodApiClient";

export interface Offer {
  banner: string;
  discount_amount: string;
  discount_percentage: string;
  is_banner_only: boolean;
  id: number;
  final_price: number;
  original_price: number;
  slug: string;
  title: string;
  short_description: string;
  url: string | null;
  from_date: string;
  to_date: string;
  is_active: string;
  currency_symbol: string;
  is_all_time: boolean;
  platform: string;
}

export interface OfferDealType {
  id: string;
  banner: string;
  start_date: string;
  end_date: string;
  currency_code: string;
  description: string;
  is_hot_deal: boolean;
  name: string;
  price: number;
  original_price: number;
  restro_url: string;
}

export interface OfferFoodItem {
  id: string;
  name: string;
  image: string;
  price: string;
  discount_price: string;
}

export interface OfferType {
  id: string;
  banner: string;
  start_date: string;
  end_date: string;
  food_item: OfferFoodItem[];
  description: string;
  currency_code: string;
  is_hot_deal: boolean;
  orginal_price: number;
  timezone: string;
  restro_slug: string;
  domain_name: string;
  name: string;
  price: number;
  repeat_sunday: boolean;
  repeat_monday: boolean;
  repeat_tuesday: boolean;
  repeat_wednesday: boolean;
  repeat_thursday: boolean;
  repeat_friday: boolean;
  repeat_saturday: boolean;
  restro_url: string;
}

export interface FoodType {
  id: string;
  name: string;
  image: string;
  price: string;
  discount_price: string;
}

export interface OfferDetails {
  id: number; // 1;
  currency_symbol: string; // "Rs";
  price: number; // 90.0;
  title: string; // "KICK AeroWatch Sigma";
  slug: string; // "kick-aerowatch-sigma1";
  description: string; // "2.01″ HD Fluid Display Smart Watch with Bluetooth Calling 5.4, AI Voice Assistance, Multiple Sports Modes | IP67 Rating";
  short_description: string; // "Black friday discount upto 10 %";
  discount_percentage: string; // "10.00";
  discount_amount: string; // "0.00";
  from_date: string; // "2025-04-10";
  to_date: string; // "2025-05-11";
  is_active: boolean; // true;
  is_banner_only: boolean; // true;
  banner: string; // "https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/offers/ear_nxcqqp";
  platform: string | null; // null;
  address: string; // "Lakeside 16th street Pokhara ,Nepal";
  location: string; // "SRID=4326;POINT (83.98204 28.19986)";
  created_at: string; // "2025-04-11T10:17:01";
  updated_at: string; // "2025-04-11T10:41:30";
  url: string; // "https://kick.com.np/product/kick-aero-watch-sigma/";
  currency: string; // 1;
  created_by: string; // "39ba6fe1-68a5-44a9-93f6-428f5bcd20ca";
  updated_by: string; // "39ba6fe1-68a5-44a9-93f6-428f5bcd20ca";
  applicable_countries: string[]; // [1];
}

// export const fetchOfferList = async (
//   category: string | null,
//   country: string | null
// ): Promise<Offer[]> => {
//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//     const endpoint = `${baseUrl}moreoffers/list/`;
//     const response = await MoreClubApiClient.get(endpoint, {
//       params: {
//         country_code: country,
//         ...(category !== "All" && {platform: category}),
//       },
//     });
//     return response.data.data || [];
//   } catch (error: any) {
//     console.error("Error fetching offers:", error);
//     return [];
//   }
// };

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// export const fetchOfferList = async (
//   category: string | null,
//   country: string | null
// ): Promise<Offer[] | OfferDealType[]> => {
//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//     const isMoreFood = category === "morefood";

//     const endpoint = isMoreFood
//       ? `${process.env.NEXT_PUBLIC_MOREFOOD_BASE_URL}public/offers/list/`
//       : `${baseUrl}moreoffers/list/`;

//     const config = isMoreFood
//       ? {} // No params for morefood
//       : {
//           params: {
//             country_code: country,
//             ...(category !== "All" && { platform: category }),
//           },
//         };

//     const response = isMoreFood
//       ? await MorefoodApiClientWithoutAccess.get(endpoint, config)
//       : await MoreClubApiClient.get(endpoint, config);
//     return response.data.data || [];
//   } catch (error: any) {
//     console.error("Error fetching offers:", error);
//     return [];
//   }
// };

export const fetchOfferList = async (
  category: string | null,
  country: string | null
): Promise<OfferType[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const isMoreFood = category === "morefood";
    const All = category === "All";

    const endpoint = isMoreFood
      ? `${baseUrl}public/offers/${country}/list/`
      : `${baseUrl}moreoffers/list/`;

    const config =
      isMoreFood || All
        ? {
            params: {
              offer_filter: "normal",
            },
          }
        : {
            params: {
              // country_code: country,
              ...(category !== "All" && { platform: category }),
              offer_filter: "normal",
            },
          };

    const response = isMoreFood
      ? await MorefoodApiClientWithoutAccess.get(endpoint, config)
      : await MoreClubApiClient.get(endpoint, config);
    return response.data.data || [];
  } catch (error: any) {
    console.error("Error fetching offers:", error);
    return [];
  }
};

export const fetchHOTDealsList = async (
  country: string | null,
  city_code: string | null,
  page: number = 1
): Promise<{ data: OfferType[]; meta: MetaData }> => {
  try {
    const endpoint = `${baseUrl}public/offers/${country}/list/`;
    const config = {
      params: {
        city_code: city_code,
        offer_filter: "hotdeals",
      },
    };

    const response = await MorefoodApiClientWithoutAccess.get(endpoint, config);
    return {
      data: response.data.data as OfferType[],
      meta: response.data.meta,
    };
  } catch (error: any) {
    console.error("Error fetching offers:", error);
    return { data: [] as OfferType[], meta: {} as MetaData };
  }
};

export const fetchBusinessOfferList = async (
  page: number
): Promise<{ data: OfferType[]; meta: MetaData }> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = `${baseUrl}public/offers/my-business/offers/`;

    const config = {
      params: {
        page: page,
        offer_filter: "normal",
      },
    };

    const response = await MoreFoodApiClient.get(endpoint, config);
    return response.data || [];
  } catch (error: any) {
    console.error("Error fetching offers:", error);
    return { data: [], meta: {} as MetaData };
  }
};

export const fetchBusinessHOTDealsList = async (
  page: number
): Promise<{ data: OfferType[]; meta: MetaData }> => {
  try {
    const endpoint = `${baseUrl}public/offers/my-business/offers/`;
    const config = {
      params: {
        page: page,
        offer_filter: "hotdeals",
      },
    };

    const response = await MoreFoodApiClient.get(endpoint, config);
    return response.data || [];
  } catch (error: any) {
    console.error("Error fetching offers:", error);
    return { data: [], meta: {} as MetaData };
  }
};

export const fetchNearbyRestaurants = async (
  city_code: string | null
): Promise<ResturantListType[]> => {
  try {
    const endpoint = `${baseUrl}public/restaurants/nearby/list/`;
    const config = {
      params: {
        city_code: city_code,
      },
    };

    const response = await MorefoodApiClientWithoutAccess.get(endpoint, config);
    return response.data.data || [];
  } catch (error: any) {
    console.error("Error fetching popular restaurants:", error);
    return [];
  }
};
export const fetchFeaturedRestaurants = async (
  city_code: string | null
): Promise<ResturantListType[]> => {
  try {
    const endpoint = `${baseUrl}public/restaurants/featured/list/`;
    const config = {
      params: {
        city_code: city_code,
      },
    };

    const response = await MorefoodApiClientWithoutAccess.get(endpoint, config);
    return response.data.data || [];
  } catch (error: any) {
    console.error("Error fetching popular restaurants:", error);
    return [];
  }
};

export interface OfferResponse {
  data: Offer[] | OfferDealType[];
  meta: MetaData;
}

// export const fetchOffer = async (
//   country: string | null,
//   category: string | null,
//   pageParam: number = 1,
//   searchQuery: string = ""
// ): Promise<OfferResponse> => {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   const endpoint = `${baseUrl}moreoffers/list/`;

//   const response = await MoreClubApiClient.get(endpoint, {
//     params: {
//       title: searchQuery || undefined,
//       page: pageParam,
//       country_code: country,
//       ...(category !== "All" && {platform: category}),
//     },
//   });

//   return {
//     data: response.data.data,
//     meta: {
//       links: { next: null, previous: null },
//       count: 10,
//       page_number: pageParam,
//       total_pages: pageParam,
//     }, // ✅ Return pagination metadata
//   };
// };

export const fetchOffer = async (
  country: string | null,
  category: string | null,
  pageParam: number = 1,
  searchQuery: string = ""
): Promise<OfferResponse> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const isMoreFood = category === "morefood";

    const endpoint = isMoreFood
      ? `${baseUrl}public/offers/${country}/list/`
      : `${baseUrl}moreoffers/list/`;

    const config = isMoreFood
      ? {
          page: pageParam,
          offer_filter: "normal",
        } // No query params for morefood
      : {
          params: {
            title: searchQuery || undefined,
            page: pageParam,
            country_code: country,
            ...(category !== "All" && { platform: category }),
          },
        };

    const response = isMoreFood
      ? await axios.get(endpoint, config)
      : await MoreClubApiClient.get(endpoint, config);

    return {
      data: response.data.data,
      meta: {
        links: response.data.links || { next: null, previous: null },
        count: response.data.count || 0,
        page_number: pageParam,
        total_pages: response.data.total_pages || 1,
      },
    };
  } catch (error: any) {
    console.error("Error fetching offer:", error);

    return {
      data: [],
      meta: {
        links: { next: null, previous: null },
        count: 0,
        page_number: pageParam,
        total_pages: 0,
      },
    };
  }
};
