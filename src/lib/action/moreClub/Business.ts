import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import {
  businessProfileSuccess,
  businessQRInfoSuccess,
  businessTypeSuccess,
  setError,
  setLoading,
} from "@/lib/redux/slice/moreclub/BusinessSlice";
import { RootState } from "@/lib/redux/store";
import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";

// export const fetchBusinessTypes = async (dispatch: Dispatch, getState: () => RootState, fetchForce = false) => {
//   const state = getState(); 
//   const lastFetchedAt = state.business.lastFetchedBusinessTypeAt;

//   if (!fetchForce && lastFetchedAt && Date.now() - lastFetchedAt < 5 * 60 * 1000) {
//     return;
//   }

//   dispatch(setLoading(true));

//   try {
//     const response = await MoreClubApiClient.get(`business/all/types/`);
//     dispatch(businessTypeSuccess(response.data.data));

//     // Update the last fetched timestamp
//     dispatch({
//       type: "business/updateLastFetchedBusinessTypeAt",
//       payload: Date.now(),
//     });

//     dispatch(setError(null));
//   } catch (err: any) {
//     dispatch(setError(err.response?.data?.message || "Failed to fetch business types"));
//   } finally {
//     dispatch(setLoading(false));
//   }
// };




// Function to Fetch Business Profile with Tracking & Force Fetch Option

export const fetchBusinessTypes = createAsyncThunk(
    "business/fetchBusinessTypes",
    async (_, { dispatch, getState }) => {
      const state = getState() as any;
      const lastFetchedAt = state.business.lastFetchedBusinessTypeAt;
  
      // Avoid excessive API calls (fetch only if older than 5 mins)
      if (lastFetchedAt && Date.now() - lastFetchedAt < 5 * 60 * 1000) {
        return;
      }
  
      dispatch(setLoading(true));
  
      try {
        const response = await MoreClubApiClient.get("business/types/list/");
        dispatch(businessTypeSuccess(response.data.data)); // ✅ Store in Redux
        dispatch(setError(null));
      } catch (err: any) {
        dispatch(setError(err.response?.data?.message || "Failed to fetch business types"));
      } finally {
        dispatch(setLoading(false));
      }
    }
  );

export const fetchBusinessData = async (dispatch: Dispatch, getState: () => RootState, fetchForce = false) => {
  const state = getState();
  const lastFetchedProfileAt = state.business.lastFetchedProfileAt;

  // Skip fetching if data is fresh (5-minute threshold) unless force fetch is enabled
  if (!fetchForce && lastFetchedProfileAt && Date.now() - lastFetchedProfileAt < 5 * 60 * 1000) {
    return;
  }

  dispatch(setLoading(true));

  try {
    const response = await MoreClubApiClient.get(`business/profile/`);
    dispatch(businessProfileSuccess(response.data.data));

    // Update last fetched timestamp
    dispatch({
      type: "business/updateLastFetchedProfileAt",
      payload: Date.now(),
    });

    dispatch(setError(null));
  } catch (err: any) {
    dispatch(setError(err.response?.data?.message || "Failed to fetch business profile"));
  } finally {
    dispatch(setLoading(false));
  }
};


// Function to Fetch Business QR Info with Tracking & Force Fetch Option

export const fetchBusinessQRInfo = createAsyncThunk(
  "business/fetchBusinessQRInfo",
  async ({ fetchForce }: { fetchForce?: boolean }, { dispatch, getState }) => {
    const state = getState() as any;
    const lastFetchedQRInfoAt = state.business.lastFetchedQRInfoAt;

  // Skip fetching if data is fresh (5-minute threshold) unless force fetch is enabled
  if (!fetchForce && lastFetchedQRInfoAt && Date.now() - lastFetchedQRInfoAt < 5 * 60 * 1000) {
    return;
  }

  dispatch(setLoading(true));

  try {
    const response = await MoreClubApiClient.get(`business/types/discount/`);
    dispatch(businessQRInfoSuccess(response.data.data));

    // Update last fetched timestamp
    dispatch({
      type: "business/updateLastFetchedQRInfoAt",
      payload: Date.now(),
    });

    dispatch(setError(null));
  } catch (err: any) {
    dispatch(setError(err.response?.data?.message || "Failed to fetch business QR info"));
  } finally {
    dispatch(setLoading(false));
  }
});


