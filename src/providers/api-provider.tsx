"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { FC } from "react"

interface ApiProviderProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()
const ApiProvider: FC<ApiProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default ApiProvider
