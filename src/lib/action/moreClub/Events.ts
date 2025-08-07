"use client";

import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { MetaData } from "@/lib/type/CommonType";
import { BookedEventList, EventList } from "@/lib/type/moreclub/Event";
import api from "@/utils/api";

export const useFetchEvents = () => {
  // const axios = useAxiosClient("moredealsclub", false);

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

  const fetchRestroEventsList = async (
    country: string,
    page?: number
  ): Promise<{
    data: EventList[];
    meta: MetaData;
  }> => {
    try {
      const pages = page ?? 1;
      const response = await api.get(
        `public/events/${country}/list/?page=${pages}`
      );
      return { data: response.data.data, meta: response.data.meta };
    } catch (error) {
      return { data: [] as EventList[], meta: {} as MetaData };
    }
  };

  const fetchRestroBusinessEventsList = async (
    country: string,
    page?: number
  ): Promise<{
    data: EventList[];
    meta: MetaData;
  }> => {
    try {
      const pages = page ?? 1;
      const response = await MoreClubApiClient.get(
        `public/events/my-business/events/?page=${pages}`
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
    seat_available: number;
    max_limit: number;
    event_booked: boolean;
    can_book_by_country: string[];
  }> => {
    try {
      const response = await MoreClubApiClient.get(`events/${slug}/details/`);
      const formatteddata = {
        seat_available: response.data.data.seat_available,
        max_limit: response.data.data.max_limit,
        event_booked: response.data.data.event_booked,
        can_book_by_country: response.data.data.can_book_by_country,
      };

      return formatteddata;
    } catch (error) {
      return {} as {
        seat_available: number;
        max_limit: number;
        event_booked: boolean;
        can_book_by_country: string[];
      };
    }
  };

  return {
    fetchPopularEventsList,
    fetchEventsList,
    fetchRestroBusinessEventsList,
    fetchRestroEventsList,
    fetchEventsSeatAndStatus,
    fetchBookedEventsList,
  };
};
