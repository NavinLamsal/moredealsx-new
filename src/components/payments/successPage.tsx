"use client"
import MoreClubApiClient from '@/lib/axios/moreclub/MoreClubApiClient';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import PaymentVerifyingPage from '../moreclub/Verifying';
import AutoTypingText from '../loaders/AutoTypingLoading';
import PaymentSuccessPage from '../moreclub/success';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfMaker from '../pdf/PdfMaker';
import TransactionBody from '../pdf/Transaction';
import PaymentFaliedPage from '../moreclub/Failed';

const SuccessPageContent = () => {
    const searchParams = useSearchParams();
    const {
        pidx,
        transaction_id,
        tidx,
        amount,
        total_amount: totalAmount,
        mobile,
        status,
        purchase_order_id,
        purchase_order_name,
    } = Object.fromEntries(searchParams.entries());
    

    const amounts = totalAmount ? parseInt(totalAmount) / 100 : 0;
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState("");

    const transactionData = {
        amount,
        recipient: mobile,
        date: "28 FEB, 2025 08:16 AM",
    };

    const handleCompletion = useCallback(async (body: any) => {
        setIsLoading(true);
       const token= localStorage.getItem("token")

        try {
           const res = await MoreClubApiClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}payments/verify/khalti/${token}/khalti/?pidx=${pidx}&transaction_id=${transaction_id}&tidx=${tidx}&amount=${amount}&total_amount=${totalAmount}&mobile=${mobile}&status=${status}&purchase_order_id=${purchase_order_id}&purchase_order_name=${purchase_order_name}`);
        } catch (err:any) {
            setIsError(err.response.data.message);
            console.error("Error:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (pidx && transaction_id && tidx && totalAmount) {
            handleCompletion({ pidx, transaction_id, tidx, totalAmount });
        }
    }, [pidx, transaction_id, tidx, totalAmount, handleCompletion]);

    return (
        <div className="flex justify-center items-start min-h-screen">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex items-center border-b border-primary dark:border-gray-200">
                        <Image src="/images/svg/send.svg" alt="send" className="h-8 w-auto mb-3 rounded-full object-cover" width={100} height={100} />
                        Load Money
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 text-center">
                        {isLoading && (
                            <PaymentVerifyingPage>
                                <>
                                <h3 className="text-4xl font-bold">{amounts}</h3>
                                <AutoTypingText messages={["Verifying Payment", "Almost finishing Up...", "Finishing Up..."]} className="text-center" />
                                
                                </>
                            </PaymentVerifyingPage>
                        )}

                        {(!isLoading && !isError) ? (
                            <PaymentSuccessPage>
                                <>
                                <h3 className="text-4xl font-bold">{amounts}</h3>
                                <p>Fund loaded to your account from {mobile}</p>
                                <p>28 Feb, 2025 01:26 PM</p>
                                <PDFDownloadLink
                                    document={<PdfMaker title="Transaction Receipt"><TransactionBody transaction={transactionData} /></PdfMaker>}
                                    fileName="transaction-receipt.pdf"
                                >
                                    {({ loading }) => (
                                        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                                            {loading ? "Generating PDF..." : "Download PDF"}
                                        </button>
                                    )}
                                </PDFDownloadLink>
                                
                                </>
                            </PaymentSuccessPage>
                        ) : (
                            !isLoading && (
                                <PaymentFaliedPage>
                                    <>
                                    <h3 className="text-2xl font-bold">Oops! </h3>
                                    <p>{isError}</p>
                                    <p>If you have any queries, please contact us.</p>   
                                    </>
                                </PaymentFaliedPage>
                            )
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default SuccessPageContent
