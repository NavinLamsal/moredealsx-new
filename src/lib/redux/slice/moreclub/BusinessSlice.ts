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
  id: string // 265294155914468256035831662212092080783,
  business_logo: string // "https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/business/logo/1000000048_rz8re4",
  business_name: string // "Kusal",
  business_address: string // "Gharipatan, Pokhara",
  lng: string // "83.9660283",
  lat: string // "28.1895717",
  business_email: string // "a@gmail.co",
  business_phone: string // "99989899",
  business_registration_number: string // "9289299",
  business_documents: string // "https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/business/documents/1000000048_dyjuix",
  business_tax_documents: string // null,
  is_verified: string // true,
  not_verified: string // false,
  is_automatic_fund: string // false,
  is_active: string // true,
  qr_code: string // "https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/business/qr_code/qr_code_207a6f76-9465-4751-ac5d-6ac651859bd0_oosbeg"

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
