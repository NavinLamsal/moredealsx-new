import { createAsyncThunk } from "@reduxjs/toolkit";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import {
  setLoading,
  setError,
  setUserProfile,
} from "@/lib/redux/slice/moreclub/UserSlice";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async ({ fetchForce }: { fetchForce?: boolean } = {}, { dispatch, getState }) => {
    const state = getState() as any;
    const lastFetchedAt = state.user.lastFetchedProfileAt;

    // Avoid excessive fetch if recently fetched unless forced
    if (!fetchForce && lastFetchedAt && Date.now() - lastFetchedAt < 5 * 60 * 1000) {
      return;
    }

    dispatch(setLoading(true));

    try {
      const response = await MoreClubApiClient.get("users/details/me/");
      dispatch(setUserProfile(response.data.data));
      dispatch(setError(null));
    } catch (err: any) {
      dispatch(setError(err.response?.data?.message || "Failed to fetch user profile"));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
