"use client"

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  type FC,
} from "react"

interface SignInProviderProps {
  children: React.ReactNode
}

const SignInContext = createContext<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  redirect?: boolean
  setRedirect: Dispatch<SetStateAction<boolean>>
}>({
  open: false,
  setOpen: () => {},
  redirect: true,
  setRedirect: () => {},
})

export const useSignInContext = () => {
  const context = useContext(SignInContext)
  if (context === undefined) {
    throw new Error("useSignInContext must be used within a SignInProvider")
  }
  return context
}

const SignInProvider: FC<SignInProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(true)
  return (
    <SignInContext.Provider
      value={{
        open,
        setOpen,
        redirect,
        setRedirect,
      }}
    >
      {children}
    </SignInContext.Provider>
  )
}
export default SignInProvider
