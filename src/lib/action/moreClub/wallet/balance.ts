
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { setLoading , setError, updateBalance } from "@/lib/redux/slice/BalanceSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const fetchUserBalance = async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await MoreClubApiClient.get(`wallets/balance/me/`);
    dispatch(updateBalance(response.data.data));
    dispatch(setError(null));
  } catch (err: any) {
    dispatch(setError(err.response?.data?.message || "Failed to fetch balance"));
  } finally {
    dispatch(setLoading(false));
  }
};
