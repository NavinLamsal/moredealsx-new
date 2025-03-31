"use client";

import { useAxiosClient } from "@/lib/axios/axiosClient";
import MoreFoodApiClient from "@/lib/axios/morefood/MoreFoodApiClient";
import { MetaData } from "@/lib/type/CommonType";
import {
  CategoryListType,
  FoodListType,
  ImagesList,
  OfferType,
  OpeningHours,
  Order,
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
    const limit = limitvalue ?? 10;
    const offset = (page - 1) * limit;

    // Convert params object to query string
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      page: page.toString(),
    });
    try {
      const response = await MoreFoodApiClient.get(`reviews/restaurant/${slug}/reviews/?${queryParams.toString()}`);

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
      const response = await MoreFoodApiClient.get(`restaurants/${slug}/gallery/?${queryParams.toString()}`);
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Restaurants", error);
      return { data: [] as ImagesList[], meta: {} as MetaData};
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
      const response = await MoreFoodApiClient.get(`restaurants/${slug}/user-upload-gallery/?${queryParams.toString()}`);
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error in fetching popular Restaurants", error);
      return { data: [] as ImagesList[], meta: {} as MetaData};
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

     
  
      const response = await MoreFoodApiClient.get(`orders/user/list/?${queryParams.toString()}`);
  
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      return { data: [] as Order[], meta: {} as MetaData };
    }
  };

  const fetchOrderDetails = async (
   id: string
  ): Promise<Order> => {
    try {
      const response = await MoreFoodApiClient.get(`orders/order/${id}/`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      return {} as Order;
    }
  };


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

    fetchRestaurantGallery,
    fetchRestaurantUserGallery,

    fetchOrderList,
    fetchOrderDetails
  };
};
