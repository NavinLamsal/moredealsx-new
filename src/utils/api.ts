import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { getCookie, deleteCookie } from "cookies-next"

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
    const authToken = await getCookie("access_token")

    if (authToken && authToken !== null && authToken !== "null") {
      const detail = jwtDecode(authToken)
      if (detail?.exp) {
        if (toDateTime(detail?.exp) < new Date()) {
          // handle logout here 
          // await signOut();
          config.headers.Authorization = null
          return config
        }
        config.headers.Authorization = `Bearer ${authToken}`
      }
      config.headers.Authorization = `Bearer ${authToken}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)


export default api
