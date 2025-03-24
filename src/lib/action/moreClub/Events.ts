"use client";

import { useAxiosClient } from "@/lib/axios/axiosClient";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { MetaData } from "@/lib/type/CommonType";
import { BookedEventList, EventList } from "@/lib/type/moreclub/Event";
import { max } from "lodash";


export const useFetchEvents = () => {
  const axios = useAxiosClient("moredealsclub", false);

  const fetchEventsList = async (
    page?: number
  ): Promise<{
    data: EventList[];
    meta: MetaData;
  }> => {
    try {
      const pages = page ?? 1;
      const response = await MoreClubApiClient.get(
        `events/list/?page=${pages}`
      );
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      return { data: [] as EventList[], meta: {} as MetaData };
    }
  };

  const fetchPopularEventsList = async (
    page?: number
  ): Promise<{
    data: EventList[];
    meta: MetaData;
  }> => {
    try {
      const pages = page ?? 1;
      const response = await MoreClubApiClient.get(
        `events/list/?page=${pages}`
      );
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      return { data: [] as EventList[], meta: {} as MetaData };
    }
  };


  const fetchBookedEventsList = async (
    type: string,
    page?: number
  ): Promise<{
    data: BookedEventList[];
    meta: MetaData;
  }> => {
    try {
      const pages = page ?? 1;
      const response = await MoreClubApiClient.get(
        `events/booked/by/user/list/?${type}=true&page=${pages}`
      );
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      return { data: [] as BookedEventList[], meta: {} as MetaData };
    }
  };


  const fetchEventsSeatAndStatus = async (
    slug: string
  ): Promise<{
    
      seat_available: number,
      max_limit: number,
      event_booked: boolean

  }> => {
    try {
      const response = await MoreClubApiClient.get(
        `events/${slug}/details/`
      );
      const formatteddata = {
        seat_available: response.data.data.seat_available,
        max_limit: response.data.data.max_limit,
        event_booked: response.data.data.event_booked
      }

      return formatteddata ;
    } catch (error) {
      return {} as {
        seat_available: number,
        max_limit: number,
        event_booked: boolean
      };
    }
  };


  return {
    fetchPopularEventsList,
    fetchEventsList,
    fetchEventsSeatAndStatus,
    fetchBookedEventsList

  };
};
