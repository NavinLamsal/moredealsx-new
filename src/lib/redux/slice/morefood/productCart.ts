import { CartFoodItemsTypes, CartFoodOfferTypes } from "@/lib/type/morefood/restaurant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface CartState {
  restaurant_id: string;
  restaurant_slug: string;
  exclusiveOffers: CartFoodOfferTypes[];
  items: CartFoodItemsTypes[];
}

const loadInitialState = (): CartState => {
  if (typeof window !== "undefined") {
    return {
      restaurant_id: localStorage.getItem("Restaurant_id") || "",
      restaurant_slug: localStorage.getItem("Restaurant_slug") || "",
      exclusiveOffers: JSON.parse(localStorage.getItem("Offers") || "[]") as CartFoodOfferTypes[],
      items: JSON.parse(localStorage.getItem("Products") || "[]") as CartFoodItemsTypes[],
    };
  }
  return { restaurant_id: "", restaurant_slug: "", exclusiveOffers: [], items: [] };
};

const initialState: CartState = loadInitialState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOffer: (state, action: PayloadAction<CartFoodOfferTypes>) => {
      state.restaurant_slug = action.payload.restaurant_slug;
      state.exclusiveOffers = state.exclusiveOffers.filter(
        (offer: CartFoodOfferTypes) => offer.restaurant_slug === action.payload.restaurant_slug
      );
      
      const existingOffer = state.exclusiveOffers.find(
        (offer: CartFoodOfferTypes) => offer.name === action.payload.name
      );
      if (existingOffer) {
        existingOffer.quantity = (existingOffer.quantity || 0) + 1;
      } else {
        state.exclusiveOffers.push({ ...action.payload, quantity: 1 });
      }
      
      localStorage.setItem("Restaurant_slug", state.restaurant_slug);
      localStorage.setItem("Offers", JSON.stringify(state.exclusiveOffers));
      sessionStorage.setItem("orderStep", "1");
    },

    addProduct: (state, action: PayloadAction<CartFoodItemsTypes>) => {
      state.restaurant_id = action.payload.restaurant_id;
      state.restaurant_slug = action.payload.restaurant_slug;
      state.items = state.items.filter(
        (item: CartFoodItemsTypes) => item.restaurant_id === action.payload.restaurant_id
      );
      
      const existingItem = state.items.find((item: CartFoodItemsTypes) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      localStorage.setItem("Restaurant_id", state.restaurant_id);
      localStorage.setItem("Restaurant_slug", state.restaurant_slug);
      localStorage.setItem("Products", JSON.stringify(state.items));
      sessionStorage.setItem("orderStep", "1");
    },

    removeOffer: (state, action: PayloadAction<string>) => {
      state.exclusiveOffers = state.exclusiveOffers.filter((offer: CartFoodOfferTypes) => offer.id !== action.payload);
      if(state.items.length === 0 || state.exclusiveOffers.length === 0){
        sessionStorage.setItem("orderStep" ,"1");
      }
      localStorage.setItem("Offers", JSON.stringify(state.exclusiveOffers));

    },
    removeProduct: (state, action: PayloadAction<CartFoodItemsTypes>) => {
     
      // Find the existing item based on the product id
      const existingItem = state.items.find((item) => {
        if (item.id === action.payload.id) {
          // Compare related_food_item arrays after sorting
          const existingRelatedIds = item.related_food_item.map((related) => related.id).sort();
          const newRelatedIds = action.payload.related_food_item.map((related) => related.id).sort();
          
          // Compare the sorted related food item IDs
          return JSON.stringify(existingRelatedIds) === JSON.stringify(newRelatedIds);
        }
        return false;
      });
    
      // If an existing item was found, filter it out of the state
      if (existingItem) {
        state.items = state.items.filter((item) => item !== existingItem);
      }
       

    
      // Optionally store the updated items in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("Products", JSON.stringify(state.items));
      }
    },
    
    

    incrementOffer: (state, action: PayloadAction<string>) => {
      const offer = state.exclusiveOffers.find((o: CartFoodOfferTypes) => o.id === action.payload);
      if (offer) offer.quantity = (offer.quantity || 0) + 1;
      localStorage.setItem("Offers", JSON.stringify(state.exclusiveOffers));
    },

    decrementOffer: (state, action: PayloadAction<string>) => {
      const offer = state.exclusiveOffers.find((o: CartFoodOfferTypes) => o.id === action.payload);
      if (offer && (offer.quantity || 0) > 1) offer.quantity -= 1;
      localStorage.setItem("Offers", JSON.stringify(state.exclusiveOffers));
    },

    incrementProduct: (state, action: PayloadAction<CartFoodItemsTypes>) => {

      const existingItem = state.items.find((item) => {
        if (item.id === action.payload.id) {
          // Compare related_food_item arrays after sorting
          const existingRelatedIds = item.related_food_item.map((related) => related.id).sort();
          const newRelatedIds = action.payload.related_food_item.map((related) => related.id).sort();
          
          // Compare the sorted related food item IDs
          return JSON.stringify(existingRelatedIds) === JSON.stringify(newRelatedIds);
        }
        return false;
      });
      
      
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
    } else {
        // If item doesn't exist, add it with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
    }
      
      localStorage.setItem("Products", JSON.stringify(state.items));
    },

    // decrementProduct: (state, action: PayloadAction<string>) => {

    //   const existingItem = state.items.find((item) => {
    //     if (item.id === action.payload.id) {
    //       // Compare related_food_item arrays after sorting
    //       const existingRelatedIds = item.related_food_item.map((related) => related.id).sort();
    //       const newRelatedIds = action.payload.related_food_item.map((related) => related.id).sort();
          
    //       // Compare the sorted related food item IDs
    //       return JSON.stringify(existingRelatedIds) === JSON.stringify(newRelatedIds);
    //     }
    //     return false;
    //   });

    //   if (existingItem) {
    //     existingItem.quantity = (existingItem.quantity || 0) + 1;
    // } else {
    //     // If item doesn't exist, add it with quantity 1
    //     state.items.push({ ...action.payload, quantity: 1 });
    // }

    //   const item = state.items.find((i: CartFoodItemsTypes) => i.id === action.payload);
    //   if (item && (item.quantity || 0) > 1) item.quantity -= 1;
    //   localStorage.setItem("Products", JSON.stringify(state.items));
    // },
    decrementProduct: (state, action: PayloadAction<CartFoodItemsTypes>) => {
      const existingItem = state.items.find((item) => {
          if (item.id === action.payload.id) {
              const existingRelatedIds = item.related_food_item.map((related) => related.id).sort();
              const newRelatedIds = action.payload.related_food_item.map((related) => related.id).sort();
              return JSON.stringify(existingRelatedIds) === JSON.stringify(newRelatedIds);
          }
          return false;
      });
  
      if (existingItem) {
          if (existingItem.quantity > 1) {
              existingItem.quantity -= 1;
          }
      }
  
      localStorage.setItem("Products", JSON.stringify(state.items));
  },
  

    clearCart: (state) => {
      state.items = [];
      state.exclusiveOffers = [];
      state.restaurant_id = "";
      localStorage.removeItem("Products");
      localStorage.removeItem("Offers");
      localStorage.removeItem("Restaurant_id");
    },
  },
});

export const {
  addOffer,
  addProduct,
  removeOffer,
  removeProduct,
  incrementOffer,
  decrementOffer,
  incrementProduct,
  decrementProduct,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;