"use client"
// import { User, UserDetails, UserPreferences } from "@/lib/types"
import api from "@/utils/api"
import { getCookie, deleteCookie } from "cookies-next/client"


import {
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, type FC } from "react"
import { Button } from "@/components/ui/button"
import { showToast } from "@/lib/utilities/toastService"
import { UserProfile } from "@/lib/type/user"

type AuthContextType = {
  token: string | null
  user: UserProfile | null
  isLoading: boolean
  logout: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    void,
    unknown
  > | null

}


const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  isLoading: false,
  logout: null,

})

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await api.get("users/details/me/"),
    enabled: getCookie("access_token") !== null,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const queryClient = useQueryClient()
  const pathname = usePathname()
  const router = useRouter()

  const logout = useMutation({
    mutationFn: async () => await api.post("/api/auth/logout"),
    onSuccess: async () => {
      queryClient.resetQueries({
        queryKey: ["user"],
      })

      // await signOut()

      showToast("Logout successful!", "warning")

      router.push("/")

      // if (checkPattern(pathname, routes.privateRoutes)) {
      //   router.push("/")
      // }
    },
    onError: (error) => {
      const errorData = error
      console.error(errorData)
      const errorMessage =
        (errorData as { message?: string }).message ||
        "An error occurred while logging out."

        showToast("Logout failed!", "error")
    },
  })

  return (
    <AuthContext.Provider
      value={{
        token: getCookie("access_token")  || null,
        user: data?.data.data,
        logout: logout,
        isLoading,
      }}
    >
      {data && data?.data?.data?.user && data?.data?.data?.user.blocked_at ? (
        <div className='fixed z-[10000] inset-0 bg-gray-100 '>
          <div className='flex justify-center items-center h-screen'>
            <div className='text-center'>
              <h3 className='text-xl font-bold'>
                Your account has been blocked
              </h3>
              <p className='text-sm'>
                Please &nbsp;
                <Link href='/contact' className='text-primary'>
                  contact support
                </Link>
                &nbsp; to unblock your account
              </p>
              <Button className='mt-5 w-full' onClick={() => logout.mutate()}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export default AuthProvider
