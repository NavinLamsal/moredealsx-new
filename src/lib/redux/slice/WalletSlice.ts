import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Transaction {
  transaction_data: {
    outgoing_transaction:number // 3400.0,
    incoming_transaction:number // 524.95
  },
  chart_data: {
    bill_sharing_transaction_sums: number // 1000.0,
    family_expenses_transaction_sums: number // 0,
    lend_borrow_transaction_sums: number // 0,
    personal_use_transaction_sums: number // 0,
    others_transaction_sums: number // 2400.0
  }
}

const initialData ={
  transaction_data: {
    outgoing_transaction:0 ,
    incoming_transaction:0 
  },
  chart_data: {
    bill_sharing_transaction_sums: 0, 
    family_expenses_transaction_sums: 0, 
    lend_borrow_transaction_sums: 0,
    personal_use_transaction_sums: 0, 
    others_transaction_sums: 0 
  }
}

interface TransactionState {
  selectedtime: "today" | "week" | "month" | "year"; 
  transactions: {
    today: Transaction;
    week: Transaction;
    month: Transaction;
    year: Transaction;
  };
  lastFetched: {
    today: number | null;
    week: number | null;
    month: number | null;
    year: number | null;
  };
  loading: boolean;
  error: string | null;
}

const CACHE_DURATION = 5 * 60 * 1000; // **5 minutes cache duration**

const initialState: TransactionState = {
  selectedtime: "month",  
  transactions: {
    today: initialData,
    week: initialData,
    month: initialData,
    year: initialData,
  },
  lastFetched: {
    today: null,
    week: null,
    month: null,
    year: null,
  },
  loading: false,
  error: null,
};

// **📌 Fetch Transactions with Caching**
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (
    { timeFrame, forceRefresh }: { timeFrame: "today" | "week" | "month" | "year"; forceRefresh?: boolean },
    { getState, rejectWithValue }
  ) => {
    
    const state = getState() as any;
    const lastFetchedTime = state.wallet.lastFetched[timeFrame];
    const now = Date.now();
    // **Avoid frequent fetching (cache for 5 minutes)**
    if (!forceRefresh && lastFetchedTime && now - lastFetchedTime < CACHE_DURATION) {
      return { timeFrame, transactions: state.wallet.transactions[timeFrame] };
    }
    try {
      let url = `wallets/transaction/summary/?filter=${timeFrame}`;
      const response = await MoreClubApiClient.get(url);
      return { timeFrame, transactions: response.data.data, fetchedAt: now };
    } catch (error) {
      return rejectWithValue("Failed to fetch transactions");
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    UpdateSelectedtime: (state, action: PayloadAction<"today" | "week" | "month" | "year" >) => {
      state.selectedtime = action.payload as never;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        const { timeFrame, transactions, fetchedAt } = action.payload;
        console.log(timeFrame, transactions, fetchedAt )
        state.transactions[timeFrame] = transactions;
        state.lastFetched[timeFrame] = fetchedAt ?? Date.now(); // ✅ Ensure it's never undefined
        state.loading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { UpdateSelectedtime } = walletSlice.actions;

export default walletSlice.reducer;
