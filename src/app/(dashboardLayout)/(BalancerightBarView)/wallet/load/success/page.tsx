
import SuccessPageContent from '@/components/payments/successPage'

import React,{ Suspense } from 'react'

const Page = () => {
  return(
    <>
    <Suspense fallback={<div>Loading...</div>}>
    <SuccessPageContent/>
    </Suspense>
    </>
  )
};

export default Page;
