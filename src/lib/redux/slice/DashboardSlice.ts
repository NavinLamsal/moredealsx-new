import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { RootState } from "../store";

export interface DashboardStats {
  total_points: number,
  total_points_restaurants: number,
  total_points_saloon: number,
  total_points_hotel:number,
  total_points_marketplace: number,
  active_deals: number;
  total_savings: number;
  membership_list: number;
  network_size: number;
  currency_symbol: string,
  currency_code: string,
}

interface DashboardStatsState {
  data: DashboardStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardStatsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await MoreClubApiClient.get(`rewards/user/points/list/`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard stats"
      );
    }
  }
);

const dashboardStatsSlice = createSlice({
  name: "dashboardStats",
  initialState,
  reducers: {
    clearDashboardStats: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDashboardStats } = dashboardStatsSlice.actions;
export const selectDashboardStats = (state: RootState) => state.dashboardStats;
export default dashboardStatsSlice.reducer;