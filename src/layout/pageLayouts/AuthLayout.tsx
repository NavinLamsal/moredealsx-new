"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next/client"

interface AuthPageLayoutProps {
  children: React.ReactNode
}

const AuthPageLayout = ({ children }: AuthPageLayoutProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getCookie("xaccess_token") || getCookie("xrefresh_token")

    if (token) {
      router.replace("/dashboard")
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return null // or a loader
  }

  return <>{children}</>
}

export default AuthPageLayout
