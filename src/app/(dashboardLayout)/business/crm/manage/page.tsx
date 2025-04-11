"use client"
import CRMDetailList from '@/components/moreclub/Crm/CRMDetailList'
import React, { Suspense } from 'react'

const Page = () => {


  return (
    <Suspense fallback={<div>Loading...</div>}>
    <CRMDetailList />
    </Suspense>
  )
}

export default Page