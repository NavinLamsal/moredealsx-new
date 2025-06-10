import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Define Package Type
export type PackageType = "BUSINESS" | "NORMAL";
export type BillingCycle = "monthly" | "yearly";


  export interface Package {
    id: string;
    code: string;
    name: string;
    price: number;
    yearly_price: number;
    free_trial?:{
      is_free_trial: boolean, 
      free_trial_period: string |null
    }
    currency_symbol: string;
    currency_code: string;
    morefood_business_discount: number;
    morefood_referral_precentage: number;
    salon_business_discount: number;
    salon_referral_precentage: number;
    hotel_business_discount: number;
    hotel_referral_precentage: number;
    marketplace_business_discount: number;
    marketplace_referral_precentage: number;
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