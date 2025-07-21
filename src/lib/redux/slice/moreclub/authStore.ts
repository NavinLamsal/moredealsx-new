// store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  sessionError: string | null;
  showSessionErrorDialog: boolean;
}

const initialState: AuthState = {
  sessionError: null,
  showSessionErrorDialog: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    triggerSessionErrorDialog(state, action: PayloadAction<string>) {
      state.sessionError = action.payload;
      state.showSessionErrorDialog = true;
    },
    resetSessionErrorDialog(state) {
      state.sessionError = null;
      state.showSessionErrorDialog = false;
    },
  },
});

export const {
  triggerSessionErrorDialog,
  resetSessionErrorDialog,
} = authSlice.actions;

export default authSlice.reducer;
