"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import BasicInfoForm from './BasicInfoForm'

import PasswordForm from './PasswordForm'
import Heading from '@/components/ui/heading'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux/store'
import CurrencyForm from './CurrencyCredentials'


const RegistrationMainForm = () => {
    const { step} = useSelector((state: RootState) => state.registration);

    const stepDesc = [
        {   step: 1,
            title: "Join Our Thriving Community – A Smooth & Secure Start!",
            description: "Let's make this journey smooth and secure. Fill in your details and become a part of MoreDealsClub like never before! Your secure and personalized experience begins here.",
            forms: <BasicInfoForm />
        },
        {   step: 2,
            title: "Secure Your Account",
            description: "Choose an account type and create a password that meets our security standards.To ensure the security of your account, please set up a strong password. Confirm your password to proceed with the registration process.",
            forms: <PasswordForm />
        },
        {   step: 3,
            title: "Set Up Your Country",
            description: "Please select your country. This will help us tailor your experience and suggest relevant currency and services.",
            forms: <CurrencyForm/>
        },
    ]

    const currentStep = stepDesc.find((s) => s.step === step);
    return (

        <div className="w-full flex flex-col justify-center items-center  sm:p-6 relative">
            <Card className="w-full max-w-4xl sm:shadow-lg  rounded-xl bg-inherit shadow-none border-0 sm:border sm:bg-card">
                {/* <div className='flex justify-center w-full items-center'><AuthHeaders /></div> */}

                {currentStep && (
                    <div className="grid md:grid-cols-2 grid-cols-1 w-full">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                                <Heading title={currentStep.title} />
                            </CardTitle>
                            <p className="text-gray-600 dark:text-gray-300">{currentStep.description}</p>
                        </CardHeader>

                        <CardContent>{currentStep.forms}</CardContent>
                    </div>
                )}

                <CardFooter className='flex w-full justify-center'>
                    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                        By clicking continue, you agree to our <a href="/terms-and-condition" target='_blank'>Terms of Service</a>{" "}
                        and <a href="/privacy-policy" target='_blank'>Privacy Policy</a>.
                    </div>
                </CardFooter>
            </Card>

        </div>





    )
}

export default RegistrationMainForm

