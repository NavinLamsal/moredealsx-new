// redux/balanceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BalanceTypes {
  balance: string;
  currency:{
    id:number;
    name:string;
    symbol:string;
    code:string;
  }
  id:number;
}



interface BalanceState {
  balance: BalanceTypes | null;
  loading: boolean;
  error: string | null;
}

const initialState: BalanceState = {
  balance: null,
  loading: false,
  error: null,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    updateBalance: (state, action: PayloadAction<BalanceTypes>) => {
      state.balance = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { updateBalance, setLoading, setError } = balanceSlice.actions;

export default balanceSlice.reducer;
