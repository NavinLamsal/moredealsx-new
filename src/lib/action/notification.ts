import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNewNotifications, fetchNextPageSuccess, fetchNotificationsSuccess, markAllAsRead, setError, setLoading } from "../redux/slice/notificationSlice";
import MoreClubApiClient from "../axios/moreclub/MoreClubApiClient";


export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await MoreClubApiClient.get(`notifications/list/?page=1`);
      const notifications = response.data.data;
      const hasNextPage = !!response.data?.meta?.links?.next;

      dispatch(fetchNotificationsSuccess({ notifications, hasNextPage }));
    } catch (error: any) {
      dispatch(setError(error.message || "Failed to fetch notifications"));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchNextPage = createAsyncThunk(
  "notifications/fetchNextPage",
  async (currentPage: number, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const nextPage = currentPage + 1;
      const response = await MoreClubApiClient.get(
        `notifications/list/?page=${nextPage}`
      );
      const notifications = response.data.data;
      const hasNextPage = !!response.data.meta.links.next;

      dispatch(fetchNextPageSuccess({ notifications, hasNextPage }));
    } catch (error: any) {
      dispatch(setError(error.message || "Failed to fetch next page of notifications"));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchNewNotifications = createAsyncThunk(
  "notifications/fetchNewNotifications",
  async (_, { dispatch }) => {
    try {
      const response = await MoreClubApiClient.get(`notifications/list/?page=1`);
      const notifications = response.data.data;
      dispatch(addNewNotifications({ notifications }));
    } catch (error) {
      console.error("Failed to fetch new notifications:", error);
    }
  }
);

export const markAllAsReadApi = createAsyncThunk(
  "notifications/markAllAsReadApi",
  async (_, { dispatch }) => {
    try {
      const response = await MoreClubApiClient.get(
        `notifications/mark_as_read/`
      );
      if (response.status === 200) {
        dispatch(markAllAsRead());
      }
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  }
);
