import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BusinessRegistrationState {
  step: number;
  BusinessName: string;
  BusinessRegistration: string;
  BusinessLocation: string;
  lat: string;
  lng: string;
  BusinessEmail: string;
  BusinessPhone: string;
}

const loadInitialState = (): BusinessRegistrationState => {
  if (typeof window !== "undefined") {
    const savedData = sessionStorage.getItem("BusinessRegistrationData");
    const parseData =savedData ? JSON.parse(savedData): {}

  return {    
  step: parseData?.step ? parseInt(parseData.step) : 1,
  BusinessName: parseData?.BusinessName ?? "",
  BusinessRegistration: parseData?.BusinessRegistration ?? "",
  BusinessEmail: parseData?.BusinessEmail ?? "",
  BusinessPhone: parseData?.BusinessPhone ?? "",
  BusinessLocation: parseData?.BusinessLocation ?? "",
  lat: parseData?.lat ?? "0",
  lng: parseData?.lng ?? "0",
    };
  }
  return {
    step: 1,
  BusinessName: "",
  BusinessRegistration: "",
  BusinessEmail: "",
  BusinessPhone: "",
  BusinessLocation: "",
  lat: "0",
  lng: "0",
  };
};

const initialState: BusinessRegistrationState = loadInitialState()




const businessRegistrationSlice = createSlice({
  name: "businessRegistration",
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: string; value: string | boolean }>) => {
      state[action.payload.field as keyof BusinessRegistrationState] = action.payload.value as never;
      sessionStorage.setItem("BusinessRegistrationData", JSON.stringify(state));
    },

    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    loadFromStorage: (state) => {
      const savedData = sessionStorage.getItem("BusinessRegistrationData");
      if (savedData) {
        return JSON.parse(savedData);
      }
    },
  },
});

export const { updateField, nextStep, prevStep, loadFromStorage, } = businessRegistrationSlice.actions;
export default businessRegistrationSlice.reducer;
