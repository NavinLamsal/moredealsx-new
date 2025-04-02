"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BadgeDollarSign, Download, SendHorizonal } from 'lucide-react'
import React from 'react'
import { Overview } from './overview'
import { Button } from '@/components/ui/button'
import { RecentSales } from '../Transaction/recentTransactions'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux/store'
import Link from 'next/link'

const WalletPageContent = () => {

    const { balance, loading, error } = useSelector((state: RootState) => state.balance);
    return (
        <>
            <div className="grid gap-4 max-[500px]:grid-cols-1 grid-cols-2 xl:grid-cols-3  2xl:grid-cols-4">
                <Card className="bg-primary text-primary-foreground">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Balance
                        </CardTitle>
                        {balance?.currency.symbol ? balance.currency.symbol :
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        }
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {loading && !balance &&
                                <div className='flex items-center'>
                                    <span className="h-2 w-4 bg-gray-200"></span>&nbsp;
                                    <span className="h-2 w-12 bg-gray-200"></span></div>
                            }
                            {error &&
                                error
                            }
                            {balance?.currency.symbol ?? ""} {balance?.balance ?? ""}

                        </div>
                        <p className="text-xs text-muted-foreground">

                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-destructive text-destructive-foreground">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            OUTGOING
                        </CardTitle>
                        <SendHorizonal />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2350</div>
                    </CardContent>
                </Card>
                <Card className="bg-success text-success-foreground">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">INCOMING</CardTitle>
                        <Download />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,234</div>
                    </CardContent>
                </Card>
                <Card className="bg-primary text-primary-foreground block xl:hidden 2xl:block">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            CASH BACK
                        </CardTitle>
                        <BadgeDollarSign />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">573</div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-7">

                <Overview />
                <Card className="col-span-3">
                    <CardHeader>
                        <div className="flex flex-row justify-between">
                            <div>
                                <CardTitle>Recent Transactions</CardTitle>
                                <CardDescription>
                                    Your transaction this month.
                                </CardDescription>

                            </div>

                            <Link href={'/transaction/user'}>
                            <Button variant={"link"}>View All</Button>
                            </Link>

                        </div>
                    </CardHeader>
                    <CardContent>
                        <RecentSales />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default WalletPageContent
