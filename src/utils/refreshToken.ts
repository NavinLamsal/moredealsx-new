import { setTokenCookie } from "@/lib/utils/access";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

export const refreshAccessToken = async (): Promise<string | null> => {
  if (isRefreshing && refreshPromise) {
    // If already refreshing, wait for it
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const res = await axios.post(
        `${baseURL}/auth/refresh`,
        {},
        { withCredentials: true }
      );
      const newToken = res.data.access_token;
      if (newToken) {
        setTokenCookie("xaccess_token", res?.data.access_token);
        setTokenCookie("xrefresh_token", res?.data.refresh_token);
        return newToken;
      }
      return null;
    } catch (err) {
      console.error("Token refresh failed:", err);
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};
