"use client";

import { useAxiosClient } from "@/lib/axios/axiosClient";
import MoreFoodApiClient from "@/lib/axios/morefood/MoreFoodApiClient";
import { MetaData } from "@/lib/type/CommonType";
import {
  CategoryListType,
  FoodListType,
  FoodtypeswithMenu,
  OfferType,
  OpeningHours,
  ResturantListType,
  Review,
} from "@/lib/type/morefood/restaurant";
// import { CuisineTypes, MetaData, ResturantListType, StationListType } from "../Type";

export const menuCategories = [
  {
    id: 1,
    category_name: "Fast food",
    display_name: "Quick Bites",
    image:
      "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/FastFood.png",
    slug: "quick-bites",
  },
  {
    id: 2,
    category_name: "International",
    display_name: "Global Flavors",
    image:
      "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Mexican.png",
    slug: "global-flavors",
  },
  {
    id: 3,
    category_name: "Vegetarian",
    display_name: "Fresh & Fit",
    image:
      "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Breakfast.png",
    slug: "fresh-fit",
  },
  {
    id: 4,
    category_name: "Desserts",
    display_name: "Sweet Tooth",
    image:
      "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Breakfast.png",
    slug: "sweet-tooth",
  },
  {
    id: 5,
    category_name: "Drinks",
    display_name: "Sip & Savor",
    image:
      "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Breakfast.png",
    slug: "sip-savor",
  },
  {
    id: 6,
    category_name: "Breakfast",
    display_name: "Rise & Dine",
    image:
      "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Breakfast.png",
    slug: "rise-dine",
  },
  {
    id: 7,
    category_name: "Street Food",
    display_name: "Street Eats",
    image:
      "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Mexican.png",
    slug: "street-eats",
  },
  {
    id: 8,
    category_name: "Soups",
    display_name: "Warm Bowls",
    image:
      "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Mexican.png",
    slug: "warm-bowls",
  },
  {
    id: 9,
    category_name: "Continental",
    display_name: "Continental Classics",
    image:
      "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Mexican.png",
    slug: "continental-classics",
  },
  {
    id: 10,
    category_name: "local",
    display_name: "Hometown Favorites",
    image:
      "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Mexican.png",
    slug: "hometown-favorites",
  },
];

export const useFetchRestaurant = () => {
  const axios = useAxiosClient("morefood", true);

  //    const fetchStation = async (
  //     page?: number
  //   ): Promise<{
  //     data: StationListType[];
  //     meta: MetaData;
  //   }> => {
  //     const pages = page ?? 1;
  //     try {
  //       const response = await axios.get(
  //         `${baseURL}stations/list/?page=${pages}`
  //       );

  //       return { data: response.data.data, meta: response.data.meta };
  //     } catch (error) {
  //       console.error("Error in fetching Stations ", error);
  //       return { data: [] as StationListType[], meta: {} as MetaData };
  //     }
  //   };

  //   const fetchRestaurant = async (
  //     page: number = 1
  //   ): Promise<{ data: ResturantListType[]; meta: MetaData }> => {
  //     try {
  //       const response = await axios.get(
  //         `${baseURL}restaurants/list/?page=${page}`
  //       );
  //       return { data: response.data.data, meta: response.data.meta };
  //     } catch (error) {
  //       console.error("Error in fetching Restaurants ", error);
  //       return { data: [] as ResturantListType[], meta: {} as MetaData };
  //     }
  //   };

  const fetchPopularRestaurantsList = async (
    city: string,
    page?: number
  ): Promise<{
    data: ResturantListType[];
    meta: MetaData;
  }> => {
    try {
      const pages = page ?? 1;
      const response = await MoreFoodApiClient.get(`restaurants/popular/?city_name=${city}`);
      console.log("response", response.data);
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Restaurants", error);
      return { data: [] as ResturantListType[], meta: {} as MetaData };
    }
  };

  const fetchfeatiesRestaurantsList = async (
    city: string,
    page?: number
  ): Promise<{
    data: ResturantListType[];
    meta: MetaData;
  }> => {
    try {
      const pages = page ?? 1;
      const response = await MoreFoodApiClient.get(`restaurants/featured-restaurants/?city_name=${city}`);
      console.log("response", response.data);
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Restaurants", error);
      return { data: [] as ResturantListType[], meta: {} as MetaData };
    }
  };


  const fetchOffersList = async (
    page?: number
  ): Promise<{
    data: OfferType[];
    meta: MetaData;
  }> => {
    try {
      const pages = page ?? 1;
      const response = await MoreFoodApiClient.get(`offers/list/`);
      console.log("response", response.data);
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Restaurants", error);
      return { data: [] as OfferType[], meta: {} as MetaData };
    }
  };

  const fetchcomboList = async (
    page?: number
  ): Promise<{
    data: OfferType[];
    meta: MetaData;
  }> => {
    try {
      const pages = page ?? 1;
      const response = await MoreFoodApiClient.get(`offers/combo/list/`);
      console.log("response", response.data);
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Restaurants", error);
      return { data: [] as OfferType[], meta: {} as MetaData };
    }
  };


  const fetchRestroOffersList = async (
    slug: string,
    page?: number
  ): Promise<{
    data: OfferType[];
    meta: MetaData;
  }> => {
    try {
      const pages = page ?? 1;
      const response = await MoreFoodApiClient.get(`offers/restaurant/${slug}/list/?page=${pages}`);
      console.log("response", response.data);
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Restaurants", error);
      return { data: [] as OfferType[], meta: {} as MetaData };
    }
  };




  const fetchCategoryList = async (time: string): Promise<CategoryListType[]> => {
    try {
      const response = await MoreFoodApiClient.get(`menus/global-menu/lists/?time_rule=${time}`);
      return response.data.data;
    } catch (error) {
      return [] as CategoryListType[];
    }
  };

  // const fetchRestaurantsList = async (
  //   page?: number
  // ): Promise<{
  //   data: ResturantListType[];
  //   meta: MetaData;
  // }> => {
  //   try {
  //     const pages = page ?? 1;
  //     const response = await axios.get(
  //       `restaurants/popular-restaurants/?page=${pages}`
  //     );
  //     return { data: response.data.data, meta: response.data.meta };
  //   } catch (error) {
  //     console.error("Error in fetching popular Restaurants", error);
  //     return { data: [] as ResturantListType[], meta: {} as MetaData };
  //   }
  // };


  const fetchRestaurantList = async (
    type: string,
    params: Record<string, any> = {}, // Flexible search parameters
    page: number = 1
  ): Promise<{ data: ResturantListType[]; meta: MetaData }> => {
    try {

    const limit = 10;
    const offset = (page - 1) * limit;

    // Convert params object to query string
    const queryParams = new URLSearchParams({
      ...params,
      offset: offset.toString(),
      limit: limit.toString(),
      page: page.toString(),
    });

      // // Convert params object to query string
      // const queryParams = new URLSearchParams({ ...params, offset:"0", limit:"10", page: page.toString() });
  
      const response = await MoreFoodApiClient.get(`restaurants/${type}/?${queryParams.toString()}`);
  
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      return { data: [] as ResturantListType[], meta: {} as MetaData };
    }
  };


  const fetchRestaurantOpeningHours = async (
    slug: string,
  ): Promise<OpeningHours[]> => {
    try {
      const response = await MoreFoodApiClient.get(`restaurants/${slug}/working-hour/`);
      return  response.data.data;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      return  [] as OpeningHours[];
    }
  };


  const fetchRestaurantsFooditems = async (
    slug: string,
  ): Promise<{
    data: FoodListType[];
    meta: MetaData;
  }> => {

    

    try {
      const response = await MoreFoodApiClient.get(`menus/restaurant/${slug}/foods/`);

      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Restaurants", error);
      return { data: [] as FoodListType[], meta: {} as MetaData };
    }
  };



  const fetchRestaurantReview = async (
    slug: string,
    page: number,
    limitvalue?: number
  ): Promise<{
    data: Review[];
    meta: MetaData;
  }> => {
    const limit = 10;
    const offset = (page - 1) * limit;

    // Convert params object to query string
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      page: page.toString(),
    });
    try {
      const response = await MoreFoodApiClient.get(`reviews/restaurant/${slug}/reviews/`);

      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Restaurants", error);
      return { data: [] as Review[], meta: {} as MetaData };
    }
  };

  const fetchRestaurantUserReview = async (
    slug: string,
  ): Promise<Review
   
  > => {
    try {
      const response = await MoreFoodApiClient.get(`reviews/restaurant/${slug}/user-review/`);

      return response.data.data;
    } catch (error) {
      console.error("Error in fetching popular Restaurants", error);
      return {} as Review;
    }
  };


  // const fetchRestaurantFeatures = async (
  //   slug: string,
  // ): Promise<Features> => {
  //   try {
  //     // Convert params object to query string
     
  //     const response = await MoreFoodApiClient.get(`restaurants/${slug}/working-hour/`);
  
  //     return  response.data.data;
  //   } catch (error) {
  //     console.error("Error fetching restaurants:", error);
  //     return  {} as Features;
  //   }
  // };
  

  // const fetchEventsList = async (
  //     type: string,
  //     params:string,
  //     page?: number
  //   ): Promise<{
  //     data: ResturantListType[];
  //     meta: MetaData;
  //   }> => {
  //     try {
  //       const pages = page ?? 1;
  //       const response = await axios.get(
  //         `restaurant/list/?page=${pages}`
  //       );
  //       return { data: response.data.data, meta: response.data.meta };
  //     } catch (error) {
  //       return { data: [] as ResturantListType[], meta: {} as MetaData };
  //     }
  //   };

  //  const fetchCuisine = async (): Promise<CuisineTypes[]> => {
  //     try {
  //       const response = await axios.get(
  //         `${baseURL}menus/cuisines/`
  //       );

  //       return response.data.data || [];
  //     } catch (error: any) {
  //       console.error("Error in fetching cuisines list", error.response);
  //       return [] as CuisineTypes[];
  //     }
  //  };

  //   const fetchExclusiveDeals = async () => {
  //      try {
  //        const res = await axios.get(
  //          `${baseURL}offers/list/`
  //        );
  //        const response = await res.data;
  //        return response.data;
  //      } catch (error) {
  //        console.error("Error in fetching all offers ", error);
  //      }
  //   };

  //   const fetchNearByResturant = async (lat: number, lng: number , page?: number):Promise<{
  //     data: ResturantListType[];
  //     meta: MetaData;
  //   }> => {
  //     try {
  //       const res = await axios.get(
  //         `${baseURL}restaurants/nearby/?lat=${lat}&lng=${lng}&page=${page ?? 1}`
  //       );
  //       const response = await res.data;

  //       return { data: response.data, meta: response.meta };
  //     } catch (error) {
  //       console.error("Error in fetching Resturants ", error);
  //       return { data: [] as ResturantListType[], meta: {} as MetaData };
  //     }
  //   };

  //   const fetchCuisineDetail = async (name:string): Promise<ResturantListType[]> => {
  //     try {
  //       const response = await axios.get(
  //         `menus/cuisine/${name}/`
  //       );

  //       return response.data.data || [];
  //     } catch (error) {
  //       return [] as ResturantListType[];
  //     }
  //   };

  return {
    fetchPopularRestaurantsList,
    fetchRestaurantList,
    fetchCategoryList,
    fetchRestaurantOpeningHours,
    fetchRestaurantsFooditems,


    fetchOffersList,
    fetchcomboList,
    fetchRestroOffersList,

    fetchRestaurantReview,
    fetchRestaurantUserReview,
  };
};
