"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import { fetchConversionRates, fetchCurrencyList, setCurrency } from "@/lib/redux/slice/CurrencySlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { currencyConvertor } from "@/lib/utils";
import React, { useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";




// Define props for the component
interface CurrencyInputProps {
    amount: string;
    setAmount: (value: string) => void;
    convertedRate: number;
    setConvertedRate: (value: number) => void;
    error: string;
    setError: (value: string) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
    amount,
    setAmount,
    convertedRate,
    setConvertedRate,
    error,
    setError,
}) => {
    const dispatch: AppDispatch = useDispatch();
    const { currencyList, conversionRates, selectedCurrency, loading } = useSelector((state: RootState) => state.currency);
    const Rootstates= useAppSelector((state: RootState) => state);

    // Fetch currency list and rates on component mount
    useEffect(() => {
        dispatch(fetchCurrencyList());
        dispatch(fetchConversionRates());
    }, [dispatch]);

 

    // Handle currency change
    // const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    //     const newCurrency = currencyList.find((c) => c.code === e.target.value);
    //     if (newCurrency) {
    //         dispatch(setCurrency(newCurrency));
    //     }
    // };

    const handleCurrencyChange = (value: string) => {
        const newCurrency = currencyList.find((c) => c.code === value);
        if (newCurrency) {
            dispatch(setCurrency(newCurrency));
        }
    };

    // Update conversion rate when amount changes
    useEffect(() => {
        if (amount && selectedCurrency) {
            const rate = currencyConvertor(selectedCurrency.code, "USD", Rootstates);
            if (rate !== null) {
                setConvertedRate(parseFloat(amount) * rate);
                setError("");
            }
        } else {
            setConvertedRate(0);
        }
    }, [amount, selectedCurrency, setConvertedRate, setError]);

    return (
        <div className="flex items-center gap-2">
            {/* Currency Selector */}
            <Select name='occupation' onValueChange={(value)=>handleCurrencyChange(value)} defaultValue={selectedCurrency?.code || ""}
            disabled={loading}
            
            >

                            <SelectTrigger className="w-20">
                                <SelectValue placeholder="Currency" />
                            </SelectTrigger>

                            <SelectContent className="w-20">
                            {currencyList.map((c :any) => (
                                <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
            {/* <select
                value={selectedCurrency?.code || ""}
                onChange={handleCurrencyChange}
                className="p-2 border border-gray-300 rounded-md bg-white text-sm"
                disabled={loading}
                required
            >
                <option value="" disabled>
                    Select currency
                </option>
                {currencyList.map((c :any) => (
                    <option key={c.code} value={c.code}>
                        {c.code}
                    </option>
                ))}
            </select> */}

            {/* Amount Input */}
            <Input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                required
            />

            {/* Conversion Display */}
            {convertedRate > 0 && (
                <div className="text-sm text-gray-600">
                    {"="} {convertedRate.toFixed(2)} USD
                </div>
            )}

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default CurrencyInput;
