import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { setPackages } from "@/lib/redux/slice/moreclub/Pricing";
import { RootState } from "@/lib/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchPackages = createAsyncThunk(
  "packages/fetchPackages",
  async ({ type, cycle ,country_code }: { type: "BUSINESS" | "NORMAL"; cycle: "monthly" | "yearly", country_code: string }, { dispatch, getState }) => {
    const state = getState() as RootState;
    const lastFetchedAt = state.pricing.lastFetched[type][cycle];
    // Avoid excessive API calls (fetch only if older than 5 minutes)
    if (lastFetchedAt && Date.now() - lastFetchedAt < 5 * 60 * 1000) {
      return;
    }

    try {
      const response = await MoreClubApiClient.get(`subscriptions/list/?plan_type=${type}&plan_time=${cycle}&country_code=${country_code}`);
      const data = response.data.data;
      dispatch(setPackages({ type, cycle, data})); // ✅ Store fetched data in Redux
    } catch (error: any) {
      console.error("Failed to fetch packages:", error);
    }
  }
);
