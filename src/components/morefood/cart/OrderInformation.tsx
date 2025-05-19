"use client"
import React from 'react'
import UserInformation from './UserInformation'
import Paymentinformation from './Paymentinformation'
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';

const OrderInformation = () => {

    const step = useSelector((state: RootState) => state.delivery.step);
    return (
        <>{step === 1 ? <UserInformation /> : 
        
       " Paymentinfomration"
        // <Paymentinformation />
        }

        </>
    )
}

export default OrderInformation
