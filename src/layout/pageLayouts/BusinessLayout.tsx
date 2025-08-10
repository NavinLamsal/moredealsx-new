"use client"

import React, { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next/client"

interface BusinessLayoutProps {
  children: ReactNode
}

export default function BusinessLayout({ children }: BusinessLayoutProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = getCookie("access_token")

    if (!token) {
      router.replace("/auth/login")
    } else {
      setIsAuthenticated(true)
    }

    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <>
      {/* {BlogCardSkeleton({ count: 10 })} */}
      </>

    )
  }
  if (!isAuthenticated) {
    return null // Don't show anything while redirecting
  }

  return <>{children}</>
}