import { combineReducers, configureStore } from "@reduxjs/toolkit";

// import productReducer from "@/lib/redux/slice/productSlice";
import currencyReducer from "@/lib/redux/slice/CurrencySlice";
import registrationReducer from "@/lib/redux/slice/RegistrationSlice";
import businessRegistrationReducer from "@/lib/redux/slice/BusinessRegistrationSlice";
import networkReducer from "./slice/NetworkSlice";
import commentsReducer from "./slice/CommentSlice";
import balanceReducer from "./slice/BalanceSlice";
import businessReducer from "./slice/moreclub/BusinessSlice";
import productReducer from "./slice/morefood/productCart";
import deliveryReducer from "./slice/morefood/CheckoutSlice";
import packageReducer from "./slice/moreclub/Pricing";
import notificationsReducer from "./slice/notificationSlice";
import walletReducer from "./slice/WalletSlice";


const rootReducer = combineReducers({
  notification:notificationsReducer,

  // products: productReducer,
  comments:commentsReducer,
  currency: currencyReducer,
  registration: registrationReducer,
  businessRegistration: businessRegistrationReducer,
  network: networkReducer,
  balance: balanceReducer,
  wallet: walletReducer,
  business: businessReducer,
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
