import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


// Types
interface Currency {
    code: string;
    symbol: string;
    default: boolean;
}

interface CurrencyState {
    currencyList: Currency[];
    conversionRates: { [key: string]: number };  // Cached conversion rates
    loading: boolean;
    error: string | null;
    selectedCurrency: Currency | null;
}

// Initial state
const initialState: CurrencyState = {
    currencyList: [],
    conversionRates: {},
    loading: false,
    error: null,
    selectedCurrency: null,
};

// Fetch currency list
export const fetchCurrencyList = createAsyncThunk("currency/fetchList", async () => {
    const response = await MoreClubApiClient.get(`user/currency/`);
    return response.data.data.currency as Currency[];
});

// Fetch conversion rates and cache them
export const fetchConversionRates = createAsyncThunk(
    "currency/fetchRates",
    async (_, { getState }) => {
        const state = getState() as { currency: CurrencyState };

        // Avoid refetching if rates are already cached
        if (Object.keys(state.currency.conversionRates).length > 0) return state.currency.conversionRates;

        const response = await MoreClubApiClient.get(`meta/currencies/rate/list/`);
        return response.data.data.conversion_rates;
    }
);

// Currency slice
const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        setCurrency: (state, action: PayloadAction<Currency>) => {
            state.selectedCurrency = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrencyList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrencyList.fulfilled, (state, action: PayloadAction<Currency[]>) => {
                state.currencyList = action.payload;
                state.loading = false;
            })
            .addCase(fetchCurrencyList.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch currencies.";
            })
            .addCase(fetchConversionRates.fulfilled, (state, action: PayloadAction<{ [key: string]: number }>) => {
                state.conversionRates = action.payload;
            });
    },
});

export const { setCurrency, setLoading } = currencySlice.actions;
export default currencySlice.reducer;
