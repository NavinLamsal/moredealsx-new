import { NetworkUser } from "@/lib/type/moreclub/Network";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface NetworkState {
  selectedList: NetworkUser[]; // Using Set for better performance
  emailList: string[];
  phoneList: string[];
}

const initialState: NetworkState = {
  selectedList: [],
  emailList: [],
  phoneList: [],
};

export const networkSlice = createSlice({
  name: "networks",
  initialState,
  reducers: {
    updateSelectionData: (state, action: PayloadAction<NetworkUser[]>) => {
        state.selectedList = action.payload

      // Extract emails and phone numbers from the selected list
      state.emailList = action.payload
        .map((user) => user.email)

      state.phoneList = action.payload
        .map((user) => user.phone_number)
    },

    toggleUserSelection: (state, action: PayloadAction<NetworkUser>) => {
        const existingIndex = state.selectedList.findIndex(
          (user) => user.username === action.payload.username
        );
  
        if (existingIndex !== -1) {
          state.selectedList.splice(existingIndex, 1); // Remove if exists
        } else {
          state.selectedList.push(action.payload); // Add if not selected
        }
  
        // Update email and phone lists
        state.emailList = state.selectedList.map((user) => user.email || "").filter(Boolean);
        state.phoneList = state.selectedList.map((user) => user.phone_number || "").filter(Boolean);
      },


    clearSelection: (state) => {
      state.selectedList = [];
      state.emailList = [];
      state.phoneList = [];
    },
  },
});

export const { updateSelectionData,toggleUserSelection, clearSelection } = networkSlice.actions;
export default networkSlice.reducer;
