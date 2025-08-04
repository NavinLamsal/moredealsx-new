import { combineReducers, configureStore } from "@reduxjs/toolkit";

// import productReducer from "@/lib/redux/slice/productSlice";
import currencyReducer from "@/lib/redux/slice/CurrencySlice";
import registrationReducer from "@/lib/redux/slice/RegistrationSlice";
import businessRegistrationReducer from "@/lib/redux/slice/BusinessRegistrationSlice";
import networkReducer from "./slice/NetworkSlice";
import commentsReducer from "./slice/CommentSlice";

import businessReducer from "./slice/moreclub/BusinessSlice";
import productReducer from "./slice/morefood/productCart";
import deliveryReducer from "./slice/morefood/CheckoutSlice";
import packageReducer from "./slice/moreclub/Pricing";
import notificationsReducer from "./slice/notificationSlice";

import userReducer from "./slice/moreclub/UserSlice";
import authReducer from "./slice/moreclub/authStore";
import leadDetailReducer from "./slice/moreclub/network";


const rootReducer = combineReducers({
  auth: authReducer,
  notification:notificationsReducer,

  // products: productReducer,
  comments:commentsReducer,
  currency: currencyReducer,
  registration: registrationReducer,
  businessRegistration: businessRegistrationReducer,
  network: networkReducer,
  leadDetail: leadDetailReducer,

  business: businessReducer,
  user:userReducer,
  pricing: packageReducer, 


  foodCart: productReducer,
  delivery:deliveryReducer



});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false, // ✅ Ensures async thunks work properly
  }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const store = makeStore();
