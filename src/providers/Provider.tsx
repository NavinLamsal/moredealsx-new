"use client"

import ApiProvider from "@/providers/api-provider"
import type { FC } from "react"
import StoreProvider from "./storeProvider"
import { ThemeProvider } from "./theme-provider"

interface ProviderProps {
    children: React.ReactNode
}
const Provider: FC<ProviderProps> = ({ children }) => {
    return (
        <ApiProvider>
            <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            >
                <StoreProvider>
                    {/* <AuthenticationModal> */}
                    {/* <UpgradeProvider>
                <NotificationProvider>
                  <SignUpProvider>
                    <SignInProvider>
                      <AuthProvider>
                        <Navbar />
                      </AuthProvider> */}
                    {children}
                    {/* <ProgressBar
                        color='#f50057'
                        options={{
                          showSpinner: false,
                        }}
                      />
                    </SignInProvider>
                  </SignUpProvider>
                </NotificationProvider>
              </UpgradeProvider> */}
                    {/* </AuthenticationModal> */}

                </StoreProvider>
            </ThemeProvider>
        </ApiProvider>
    )
}
export default Provider
