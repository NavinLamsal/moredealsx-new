// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { CartFoodItemsTypes, Offer } from "@/lib/type";

// // Define ProductState without restaurant_id or station_id
// export interface ProductState {
//   exclusiveOffers: Offer[];
//   items: CartFoodItemsTypes[];
//   totalAmount: number;
// }

// // Function to load the initial state from local storage
// const loadInitialState = (): ProductState => {
//   if (typeof window !== "undefined") {
//     const itemsFromStorage = localStorage.getItem("Products");
//     const offersFromStorage = localStorage.getItem("Offers");
//     return {
//       exclusiveOffers: offersFromStorage ? JSON.parse(offersFromStorage) : [],
//       items: itemsFromStorage ? JSON.parse(itemsFromStorage) : [],
//       totalAmount: 0,
//     };
//   }
//   return {
//     exclusiveOffers: [],
//     items: [],
//     totalAmount: 0,
//   };
// };

// const initialState: ProductState = loadInitialState();

// const productSlice = createSlice({
//   name: "Products",
//   initialState,
//   reducers: {
//     addOffers: (state, action: PayloadAction<Offer>) => {
//       const existingOffer = state.exclusiveOffers.find(
//         (offer) => offer.name === action.payload.name
//       );

//       if (existingOffer) {
//         existingOffer.quantity = existingOffer.quantity
//           ? existingOffer.quantity + 1
//           : 1;
//       } else {
//         const newOffer = { ...action.payload, quantity: 1 };
//         state.exclusiveOffers.push(newOffer);
//       }

//       if (typeof window !== "undefined") {
//         localStorage.setItem("Offers", JSON.stringify(state.exclusiveOffers));
//       }
//     },

//     addProducts: (state, action: PayloadAction<CartFoodItemsTypes>) => {
//       const existingItem = state.items.find((item) => {
//         if (item.id === action.payload.id) {
//           const existingRelatedIds = item.related_food_item
//             .map((related) => related.id)
//             .sort();
//           const newRelatedIds = action.payload.related_food_item
//             .map((related) => related.id)
//             .sort();
//           return JSON.stringify(existingRelatedIds) === JSON.stringify(newRelatedIds);
//         }
//         return false;
//       });

//       if (existingItem) {
//         existingItem.quantity = existingItem.quantity
//           ? existingItem.quantity + 1
//           : 1;
//       } else {
//         sessionStorage.setItem("cartFormState", "1");
//         const newItem = { ...action.payload, quantity: 1 };
//         state.items.push(newItem);
//       }

//       if (typeof window !== "undefined") {
//         localStorage.setItem("Products", JSON.stringify(state.items));
//       }
//     },

//     removeProducts: (state, action: PayloadAction<CartFoodItemsTypes>) => {
//       const existingItem = state.items.find((item) => {
//         if (item.id === action.payload.id) {
//           const existingRelatedIds = item.related_food_item
//             .map((related) => related.id)
//             .sort();
//           const newRelatedIds = action.payload.related_food_item
//             .map((related) => related.id)
//             .sort();
//           return JSON.stringify(existingRelatedIds) === JSON.stringify(newRelatedIds);
//         }
//         return false;
//       });

//       if (existingItem) {
//         state.items = state.items.filter((item) => item !== existingItem);
//       }

//       if (typeof window !== "undefined") {
//         localStorage.setItem("Products", JSON.stringify(state.items));
//       }
//     },

//     increment: (state, action: PayloadAction<{ id: string; related_food_item: string[] }>) => {
//       const { id, related_food_item } = action.payload;

//       const item = state.items.find((item) => {
//         if (item.id === id) {
//           const existingRelatedIds = item.related_food_item
//             .map((rel) => rel.id)
//             .sort();
//           const payloadRelatedIds = related_food_item.sort();
//           return JSON.stringify(existingRelatedIds) === JSON.stringify(payloadRelatedIds);
//         }
//         return false;
//       });

//       if (item && item.quantity) {
//         item.quantity += 1;
//       }

//       if (typeof window !== "undefined") {
//         localStorage.setItem("Products", JSON.stringify(state.items));
//       }
//     },

//     decrement: (state, action: PayloadAction<{ id: string; related_food_item: string[] }>) => {
//       const { id, related_food_item } = action.payload;

//       const item = state.items.find((item) => {
//         if (item.id === id) {
//           const existingRelatedIds = item.related_food_item
//             .map((rel) => rel.id)
//             .sort();
//           const payloadRelatedIds = related_food_item.sort();
//           return JSON.stringify(existingRelatedIds) === JSON.stringify(payloadRelatedIds);
//         }
//         return false;
//       });

//       if (item && item.quantity && item.quantity > 1) {
//         item.quantity -= 1;
//       }

//       if (typeof window !== "undefined") {
//         localStorage.setItem("Products", JSON.stringify(state.items));
//       }
//     },

//     removeOffers: (state, action: PayloadAction<string>) => {
//       state.exclusiveOffers = state.exclusiveOffers.filter(
//         (item) => item.id !== action.payload
//       );

//       if (typeof window !== "undefined") {
//         localStorage.setItem("Offers", JSON.stringify(state.exclusiveOffers));
//       }
//     },

//     incrementOffer: (state, action: PayloadAction<string>) => {
//       const exclusiveOffers = state.exclusiveOffers.find(
//         (item) => item.id === action.payload
//       );

//       if (exclusiveOffers && exclusiveOffers.quantity) {
//         exclusiveOffers.quantity += 1;
//       }

//       if (typeof window !== "undefined") {
//         localStorage.setItem("Offers", JSON.stringify(state.exclusiveOffers));
//       }
//     },

//     decrementOffer: (state, action: PayloadAction<string>) => {
//       const exclusiveOffers = state.exclusiveOffers.find(
//         (item) => item.id === action.payload
//       );

//       if (exclusiveOffers && exclusiveOffers.quantity && exclusiveOffers.quantity > 1) {
//         exclusiveOffers.quantity -= 1;
//       }

//       if (typeof window !== "undefined") {
//         localStorage.setItem("Offers", JSON.stringify(state.exclusiveOffers));
//       }
//     },

//     setTotalAmount: (state, action: PayloadAction<number>) => {
//       state.totalAmount = action.payload;
//     },

//     clearCart: (state) => {
//       state.items = [];
//       state.exclusiveOffers = [];
//       state.totalAmount = 0;

//       if (typeof window !== "undefined") {
//         localStorage.removeItem("Products");
//         localStorage.removeItem("Offers");
//       }
//     },
//   },
// });

// export const {
//   addOffers,
//   addProducts,
//   removeProducts,
//   increment,
//   decrement,
//   removeOffers,
//   incrementOffer,
//   decrementOffer,
//   setTotalAmount,
//   clearCart,
// } = productSlice.actions;

// export default productSlice.reducer;
