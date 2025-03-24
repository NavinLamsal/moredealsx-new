import { CheckoutFormTypes } from "@/lib/type/morefood/restaurant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Helper function to retrieve and parse session storage data safely
const getSessionStorageItem = <T,>(key: string, defaultValue: T): T => {
  if (typeof window !== "undefined") {
    const item = sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  }
  return defaultValue;
};

// Load initial state from session storage
const loadInitialState = (): CheckoutFormTypes => ({
  step: getSessionStorageItem("orderStep", 1),
  deliverytype: getSessionStorageItem("deliverytype", ""),
  receiverName: getSessionStorageItem("receiverName", ""),
  mobileNumber: getSessionStorageItem("mobileNumber", ""),
  receiverEmail: getSessionStorageItem("receiverEmail", ""),
  note: getSessionStorageItem("note", ""),
  arrivalTime: getSessionStorageItem("arrivalTime", ""),
  location: getSessionStorageItem("location", ""),
  lat: getSessionStorageItem("lat", 0),
  lon: getSessionStorageItem("lon", 0),
});

const initialState: CheckoutFormTypes = loadInitialState();

const checkoutSlice = createSlice({
  name: "deliveryForm",
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<CheckoutFormTypes>>) => {
      if (typeof window !== "undefined") {
        Object.entries(action.payload).forEach(([key, value]) => {
          sessionStorage.setItem(key, JSON.stringify(value));
        });
      }
      return { ...state, ...action.payload };
    },

    nextStep: (state) => {
      if (state.step < 2) {
        state.step += 1;
        sessionStorage.setItem("orderStep", String(state.step)); // Store in sessionStorage
      }
    },
    prevStep: (state) => {
      if (state.step > 1) {
        state.step -= 1;
        sessionStorage.setItem("orderStep", String(state.step)); // Store in sessionStorage
      }
    },
  },
});

export const { updateFormData, nextStep, prevStep } = checkoutSlice.actions;
export default checkoutSlice.reducer;
