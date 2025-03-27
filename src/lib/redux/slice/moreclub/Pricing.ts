import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Define Package Type
export type PackageType = "BUSINESS" | "NORMAL";
export type BillingCycle = "monthly" | "yearly";

export interface Package {
  id: string;
  name: string;
  price: number;
  currency_symbol: string;
  description: string;
  icon: string;
  morefood_business_discount: number;
  referal_percentage: number;
  salon_business_discount: number;
  hotel_business_discount: number;
  marketplace_business_discount: number;
  project_access: string[];
  max_networks_list: number;
  max_networks_bulk_mail_month: number;
  max_networks_bulk_sms_month: number;
}

interface PackageState {
  packages: {
    BUSINESS: {
      monthly: Package[];
      yearly: Package[];
    };
    NORMAL: {
      monthly: Package[];
      yearly: Package[];
    };
  };
  lastFetched: {
    BUSINESS: {
      monthly: number | null;
      yearly: number | null;
    };
    NORMAL: {
      monthly: number | null;
      yearly: number | null;
    };
  };
}

const initialState: PackageState = {
  packages: {
    BUSINESS: { monthly: [], yearly: [] },
    NORMAL: { monthly: [], yearly: [] },
  },
  lastFetched: {
    BUSINESS: { monthly: null, yearly: null },
    NORMAL: { monthly: null, yearly: null },
  },
};

const packageSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    setPackages: (state, action: PayloadAction<{ type: PackageType; cycle: BillingCycle; data: Package[] }>) => {
        const { type, cycle, data } = action.payload;

        // Update only the fetched package type & cycle
        state.packages[type][cycle] = data;
        
        // Update lastFetched timestamp for that type & cycle
        state.lastFetched[type][cycle] = Date.now();
      },

    clearPackages: (state) => {
      state.packages = {
        BUSINESS: { monthly: [], yearly: [] },
        NORMAL: { monthly: [], yearly: [] },
      };
      state.lastFetched = {
        BUSINESS: { monthly: null, yearly: null },
        NORMAL: { monthly: null, yearly: null },
      };
    },
  },
});



export const { setPackages, clearPackages } = packageSlice.actions;

export default packageSlice.reducer;