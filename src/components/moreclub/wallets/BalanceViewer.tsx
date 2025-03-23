"use client";

import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RootState } from "@/lib/redux/store";
import { fetchUserBalance } from "@/lib/action/moreClub/wallet/balance";

const BalanceViewer: React.FC = () => {
    const dispatch = useDispatch();
    const { balance, loading, error } = useSelector((state: RootState) => state.balance);

    // ✅ useCallback prevents re-creation of fetchBalance
    const fetchBalance = useCallback(async () => {
        await fetchUserBalance(dispatch)
    }, [dispatch]);

    useEffect(() => {
        fetchBalance(); // Fetch immediately on component mount
        const interval = setInterval(fetchBalance, 60000); // Refresh balance every 60 sec
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [fetchBalance]);

    // ✅ Centralized error message display
    if (error) return <Button variant="default" className="rounded-full lg:hidden flex text-xs font-thin">
        {error}
    </Button>

    if (loading && !balance)
        return (
            <Button variant="default" className="rounded-full flex items-center lg:hidden ">
                {/* <strong className="text-white">Balance:&nbsp;</strong> */}
                <span className="h-2 w-4 bg-gray-200"></span>&nbsp;
                <span className="h-2 w-12 bg-gray-200"></span>
            </Button>
        );

    return (
        <Button variant="default" className="rounded-full  lg:hidden flex">
            {balance?.currency.symbol ?? ""} {balance?.balance ?? ""}
        </Button>
    );
};

export default BalanceViewer;
