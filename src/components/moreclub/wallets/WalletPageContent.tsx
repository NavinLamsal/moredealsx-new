"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BadgeDollarSign,
  Download,
  SendHorizonal,
} from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RecentSales } from "../Transaction/recentTransactions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import Link from "next/link";
import { fetchTransactions } from "@/lib/redux/slice/WalletSlice";
import { Overview } from "./overview";

const WalletPageContent = () => {
  const { transactions, selectedtime } = useSelector(
    (state: RootState) => state.wallet
  );
  const { balance, loading, error } = useSelector(
    (state: RootState) => state.balance
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTransactions({ timeFrame: selectedtime, forceRefresh: false }));
  }, [selectedtime, dispatch]);
  


  // Extract the current transaction object
  const currentTransaction = transactions[selectedtime];
  const outgoing = currentTransaction?.transaction_data?.outgoing_transaction;
  const incoming = currentTransaction?.transaction_data?.incoming_transaction;
  const cashback = currentTransaction?.chart_data?.others_transaction_sums;

  return (
    <>
      <div className="grid gap-4 max-[500px]:grid-cols-1 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {/* Total Balance */}
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            {balance?.currency.symbol ? (
              balance.currency.symbol
            ) : (
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
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading && !balance && (
                <div className="flex items-center">
                  <span className="h-2 w-4 bg-gray-200"></span>&nbsp;
                  <span className="h-2 w-12 bg-gray-200"></span>
                </div>
              )}
              {error && error}
              {balance?.currency.symbol ?? ""} {balance?.balance ?? ""}
            </div>
          </CardContent>
        </Card>

        {/* Outgoing Transactions */}
        <Card className="bg-destructive text-destructive-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">OUTGOING</CardTitle>
            <SendHorizonal />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              - {balance?.currency.symbol ?? ""} {outgoing ?? "0.00"}
            </div>
          </CardContent>
        </Card>

        {/* Incoming Transactions */}
        <Card className="bg-success text-success-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">INCOMING</CardTitle>
            <Download />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              + {balance?.currency.symbol ?? ""} {incoming ?? "0.00"}
            </div>
          </CardContent>
        </Card>

        {/* Cashback Transactions */}
        <Card className="bg-primary text-primary-foreground block xl:hidden 2xl:block">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CASHBACK</CardTitle>
            <BadgeDollarSign />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              + {balance?.currency.symbol ?? ""} {cashback ?? "0.00"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overview & Recent Transactions */}
      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-7">
      <Overview />
        <Card className="col-span-3">
          <CardHeader>
            <div className="flex flex-row justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your transactions this month.</CardDescription>
              </div>
              <Link href={"/transaction/user"}>
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
  );
};

export default WalletPageContent;

