import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define TypeScript Interfaces
interface BusinessType {
  id:string,
    name: string,
    image : string,
    banner : string,
}



interface BusinessQRInfo {
  business_type: string;
  discount: string;
  business_type_name?: string;
  business_type_icon?: string;
  qr_code?: string;
}

interface BusinessProfile {
  id?: number;
  name?: string;
  registration_number?: string;
  email?: string;
  phone?: string;
  address?: string;
  lat?: number;
  lng?: number;
}

// Define State
interface BusinessState {
  isLoading: boolean;
  error: string | null;
  businessTypeList: BusinessType[];
  businessProfile: BusinessProfile | null;
  businessQRInfo: BusinessQRInfo[];

  // Track API Fetch Timestamps
  lastFetchedProfileAt: number | null;
  lastFetchedQRInfoAt: number | null;
  lastFetchedBusinessTypeAt: number | null;
}

// Initial State
const initialState: BusinessState = {
  isLoading: false,
  error: null,
  businessTypeList: [],
  businessProfile: null,
  businessQRInfo: [],

  lastFetchedProfileAt: null,
  lastFetchedQRInfoAt: null,
  lastFetchedBusinessTypeAt: null,
};

// Create Slice
export const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    // Set Loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) state.error = null;
    },

    // Set API Error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Fetch Business Type
    businessTypeSuccess: (state, action: PayloadAction<BusinessType[]>) => {
      state.businessTypeList = action.payload;
      state.lastFetchedBusinessTypeAt = Date.now(); // Update timestamp
      state.isLoading = false;
    },

    // Fetch Business Profile
    businessProfileSuccess: (state, action: PayloadAction<BusinessProfile>) => {
      state.businessProfile = action.payload;
      state.lastFetchedProfileAt = Date.now(); // Update timestamp
      state.isLoading = false;
    },

    // Fetch Business QR Info
    businessQRInfoSuccess: (state, action: PayloadAction<BusinessQRInfo[]>) => {
      state.businessQRInfo = action.payload;
      state.lastFetchedQRInfoAt = Date.now(); // Update timestamp
      state.isLoading = false;
    },

    // Update Business QR Info & Refetch
    businessQrinfoUpdate: (state, action: PayloadAction<BusinessQRInfo>) => {
      const existingIndex = state.businessQRInfo.findIndex(
        (item) => item.business_type_name === action.payload.business_type_name
      );

      if (existingIndex !== -1) {
        state.businessQRInfo[existingIndex] = action.payload;
      } else {
        state.businessQRInfo.push(action.payload);
      }

      // Trigger refetch after update
      state.lastFetchedQRInfoAt = null;
    },
  },
});

// Export Actions
export const {
  setLoading,
  setError,
  businessTypeSuccess,
  businessProfileSuccess,
  businessQRInfoSuccess,
  businessQrinfoUpdate,
} = businessSlice.actions;

// Export Reducer
export default businessSlice.reducer;
