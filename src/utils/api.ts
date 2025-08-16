import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { getCookie, deleteCookie } from "cookies-next"
import { clearStorage } from "@/components/auth/logouts/logoutFunction"
import { refreshAccessToken } from "./refreshToken"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL
const api = axios.create({
  baseURL,
  // timeout: 10000,
  withCredentials: true,
  headers: {
    "X-Platform": "web"
  },
})




export const toDateTime = (secs: number) => {
  var t = new Date("1970-01-01T00:30:00Z") // Unix epoch start.
  t.setSeconds(secs)
  return t
}

api.interceptors.request.use(
  async (config) => {
    let authToken = await getCookie("xaccess_token")

  if (authToken && authToken !== "null" && authToken !== null) {
    console.log(authToken)
    const detail = jwtDecode<{ exp: number }>(authToken);
  
    

    if (detail?.exp && toDateTime(detail.exp) < new Date()) {
      let newToken = await refreshAccessToken();
      if (!newToken) {
        clearStorage();
        window.location.href = "/auth/login";
        return config;
      }
      authToken = newToken;
    }
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
  },
  (error) => {
    Promise.reject(error)
  }
)

export default api
