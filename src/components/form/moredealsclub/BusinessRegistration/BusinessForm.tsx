"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

import Heading from '@/components/ui/heading'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux/store'
import BasicInfoForm from './BasicInfoForm'
import BusinessLoaction from './BusinessLoaction'
import BusinessDocumentForm from './BusinessDocumentForm'


const BusinessForm = ({onFinish}:{onFinish: () => void}) => {
    const { step } = useSelector((state: RootState) => state.businessRegistration);

    const stepDesc = [
        {
            step: 1,
            forms: <BasicInfoForm />
        },
        {
            step: 2,
            forms: <BusinessLoaction />
        },
        {
            step: 3,
            forms: <BusinessDocumentForm onFinish={onFinish}/>
        },
    ]

    const currentStep = stepDesc.find((s) => s.step === step);
    return (

        <div className="w-full min-h-svh flex flex-col justify-center items-center  sm:p-6 relative">
            <Card className="w-full max-w-4xl max-h-[80vh] sm:shadow-lg  rounded-xl  shadow-none border-0 sm:border bg-card p-4 overflow-y-auto">
                
                {currentStep && (
                    <>
                        {currentStep.forms}
                    </>
                )}
            </Card>

        </div>





    )
}

export default BusinessForm

