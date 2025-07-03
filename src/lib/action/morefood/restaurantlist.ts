"use client";

import { useAxiosClient } from "@/lib/axios/axiosClient";
import MoreFoodApiClient from "@/lib/axios/morefood/MoreFoodApiClient";
import MoreFoodApiClientWC from "@/lib/axios/morefood/MoreFoodApiClientWC";
import MorefoodApiClientWithoutAccess from "@/lib/axios/morefood/MorefoodApiClientWithoutAccess";
import { MetaData } from "@/lib/type/CommonType";
import {
  CategoryListType,
  FoodListType,
  ImagesList,
  OfferType,
  OpeningHours,
  Order,
  OrderDetail,
  Restaurant,
  ResturantListType,
  Review,
} from "@/lib/type/morefood/restaurant";

export const useFetchRestaurant = () => {
  const axios = useAxiosClient("morefood", true);

  const fetchPopularRestaurantsList = async (
    city: string,
    page?: number
  ): Promise<{
    data: ResturantListType[];
    meta: MetaData;
  }> => {
    try {
      const pages = page ?? 1;
      const response = await MoreFoodApiClient.get(
        `restaurants/popular/?city_name=${city}`
      );
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
      const response = await MoreFoodApiClient.get(
        `restaurants/featured-restaurants/?city_name=${city}`
      );

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
      const response = await MoreFoodApiClientWC.get(`public/offers/list/`);
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
      const response = await MoreFoodApiClient.get(
        `offers/restaurant/${slug}/list/?page=${pages}`
      );
      console.log("response", response.data);
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Restaurants", error);
      return { data: [] as OfferType[], meta: {} as MetaData };
    }
  };

  const fetchCategoryList = async (
    time: string
  ): Promise<CategoryListType[]> => {
    try {
      const response = await MoreFoodApiClient.get(
        `menus/global-menu/lists/?time_rule=${time}`
      );
      return response.data.data;
    } catch (error) {
      return [] as CategoryListType[];
    }
  };

  const fetchAllOfferList = async (
    type: string,
    params: Record<string, any> = {}, // Flexible search parameters
    page: number = 1
  ): Promise<{ data: OfferType[]; meta: MetaData }> => {
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

      const response = await MoreFoodApiClient.get(
        `offers/${type}/?${queryParams.toString()}`
      );

      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      return { data: [] as OfferType[], meta: {} as MetaData };
    }
  };

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

      const response = await MorefoodApiClientWithoutAccess.get(
        `public/restaurants/${type}/?${queryParams.toString()}`
      );

      if (type === "featured-restaurants") {
        const extractedData = response.data.data.map(
          (item: { restaurant: ResturantListType }) => item.restaurant
        );
        return { data: extractedData, meta: response.data.meta };
      } else {
        return { data: response.data.data, meta: response.data.meta };
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      return { data: [] as ResturantListType[], meta: {} as MetaData };
    }
  };

  const fetchRestaurantOpeningHours = async (
    slug: string
  ): Promise<OpeningHours[]> => {
    try {
      const response = await MoreFoodApiClient.get(
        `restaurants/${slug}/working-hour/`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      return [] as OpeningHours[];
    }
  };

  const fetchRestaurantsFooditems = async (
    slug: string,
    searchParam: string
  ): Promise<{
    data: FoodListType[];
    meta: MetaData;
  }> => {
    const url = searchParam
      ? `menus/restaurant/${slug}/foods/?query=${encodeURIComponent(
          searchParam
        )}`
      : `menus/restaurant/${slug}/foods/`;

    try {
      const response = await MoreFoodApiClient.get(url);

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
    const limit = limitvalue ?? 10;
    const offset = (page - 1) * limit;

    // Convert params object to query string
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      page: page.toString(),
    });
    try {
      const response = await MoreFoodApiClient.get(
        `reviews/restaurant/${slug}/reviews/?${queryParams.toString()}`
      );

      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Restaurants", error);
      return { data: [] as Review[], meta: {} as MetaData };
    }
  };

  const fetchRestaurantUserReview = async (slug: string): Promise<Review> => {
    try {
      const response = await MoreFoodApiClient.get(
        `reviews/restaurant/${slug}/user-review/`
      );

      return response.data.data;
    } catch (error) {
      console.error("Error in fetching popular Restaurants", error);
      return {} as Review;
    }
  };

  const fetchUserReview = async (
    page: number,
    limitvalue?: number
  ): Promise<{
    data: Review[];
    meta: MetaData;
  }> => {
    const limit = limitvalue ?? 10;
    const offset = (page - 1) * limit;

    // Convert params object to query string
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      page: page.toString(),
    });
    try {
      const response = await MoreFoodApiClient.get(
        `reviews/user-reviews/?${queryParams.toString()}`
      );

      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Restaurants", error);
      return { data: [] as Review[], meta: {} as MetaData };
    }
  };

  const fetchRestaurantGallery = async (
    slug: string,
    page: number,
    limitvalue?: number
  ): Promise<{
    data: ImagesList[];
    meta: MetaData;
  }> => {
    const limit = limitvalue ?? 10;
    const offset = (page - 1) * limit;

    // Convert params object to query string
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      page: page.toString(),
    });
    try {
      const response = await MoreFoodApiClient.get(
        `restaurants/${slug}/gallery/?${queryParams.toString()}`
      );
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Restaurants", error);
      return { data: [] as ImagesList[], meta: {} as MetaData };
    }
  };

  const fetchRestaurantUserGallery = async (
    slug: string,
    page: number,
    limitvalue?: number
  ): Promise<{
    data: ImagesList[];
    meta: MetaData;
  }> => {
    const limit = limitvalue ?? 10;
    const offset = (page - 1) * limit;

    // Convert params object to query string
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      page: page.toString(),
    });
    try {
      const response = await MoreFoodApiClient.get(
        `restaurants/${slug}/user-upload-gallery/?${queryParams.toString()}`
      );
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Restaurants", error);
      return { data: [] as ImagesList[], meta: {} as MetaData };
    }
  };

  const fetchOrderList = async (
    type: string,
    params: Record<string, any> = {}, // Flexible search parameters
    page: number = 1
  ): Promise<{ data: Order[]; meta: MetaData }> => {
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

      const response = await MoreFoodApiClient.get(
        `orders/user/list/?${queryParams.toString()}`
      );

      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      return { data: [] as Order[], meta: {} as MetaData };
    }
  };

  const fetchOrderDetails = async (id: string): Promise<OrderDetail> => {
    try {
      const response = await MoreFoodApiClient.get(`orders/${id}/details/`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      return {} as OrderDetail;
    }
  };

  const fetchResturantDetails = async (slug: string): Promise<Restaurant> => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_MOREFOOD_BASE_URL}restaurants/details/${slug}`
      );
      const data = response.data.data;

      return data;
    } catch (error: any) {
      console.error(
        `Error in fetching Resturant details for ${slug}`,
        error.response
      );
      return {} as Restaurant;
    }
  };

  return {
    fetchPopularRestaurantsList,
    fetchRestaurantList,
    fetchCategoryList,
    fetchRestaurantOpeningHours,
    fetchRestaurantsFooditems,
    fetchResturantDetails,

    fetchOffersList,
    fetchcomboList,
    fetchRestroOffersList,
    fetchAllOfferList,

    fetchRestaurantReview,
    fetchRestaurantUserReview,
    fetchUserReview,

    fetchRestaurantGallery,
    fetchRestaurantUserGallery,

    fetchOrderList,
    fetchOrderDetails,
  };
};
