"use client"

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  type FC,
} from "react"

interface SignUpProviderProps {
  children: React.ReactNode
}

const SignUpContext = createContext<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}>({
  open: false,
  setOpen: () => {},
})

export const useSignUpContext = () => {
  const context = useContext(SignUpContext)
  if (context === undefined) {
    throw new Error("useSignUpContext must be used within a SignUpProvider")
  }
  return context
}

const SignUpProvider: FC<SignUpProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false)
  return (
    <SignUpContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </SignUpContext.Provider>
  )
}
export default SignUpProvider
