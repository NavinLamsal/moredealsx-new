import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegistrationState {
  step: number;
  firstName: string;
  lastName: string;
  gender: string;
  userType: string;
  email: string;
  phone: string;
  phoneOnly:string;
  country:string;
  countryCode:string;
  prefix:string;
  password: string;
  confirmPassword:string;
  agreeToTerms: boolean;
  registerMethod: string;
  currency: string;
}


const loadInitialState = (): RegistrationState => {
  if (typeof window !== "undefined") {
    const savedData = sessionStorage.getItem("registrationData");
    const parseData =savedData ? JSON.parse(savedData): {}

    return {
      
  step: parseData?.step ? parseInt(parseData.step) : 1,
  firstName: parseData?.firstName ?? "",
  lastName: parseData?.lastName?? "",
  gender: parseData?.gender ?? "",
  userType: parseData?.userType ?? "",
  email: parseData?.email ?? "",
  phone: parseData?.phone ?? "",
  phoneOnly:parseData?.phoneonly ?? "",
  country: parseData?.country?? "",
  countryCode:parseData?.countryCode ?? "",
  prefix:parseData?.prefix ?? "",
  password: parseData?.password ?? "",
  confirmPassword: parseData?.confirmPassword ?? "",
  agreeToTerms: parseData?.agreeToTerms ?? false,
  registerMethod: parseData?.registerMethod ?? "",
  currency: parseData?.currency ?? "",
    };
  }
  return {
    step: 1,
  firstName: "",
  lastName: "",
  gender: "",
  userType: "",
  email: "",
  phone: "",
  phoneOnly:"",
  country:"",
  countryCode:"",
  prefix:"",
  password: "",
  confirmPassword:"",
  registerMethod: "",
  agreeToTerms: false,
  currency: "",
  };
};

const initialState: RegistrationState = loadInitialState()

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: string; value: string | boolean }>) => {
      state[action.payload.field as keyof RegistrationState] = action.payload.value as never;
      sessionStorage.setItem("registrationData", JSON.stringify(state));
    },
    nextStep: (state) => {
      state.step += 1;
      sessionStorage.setItem("registrationData", JSON.stringify(state));
    },
    prevStep: (state) => {
      state.step -= 1;
      sessionStorage.setItem("registrationData", JSON.stringify(state));
    },
    loadFromStorage: (state) => {
      const savedData = sessionStorage.getItem("registrationData");
      if (savedData) {
        return JSON.parse(savedData);
      }
    },
  },
});

export const { updateField, nextStep, prevStep, loadFromStorage } = registrationSlice.actions;
export default registrationSlice.reducer;
