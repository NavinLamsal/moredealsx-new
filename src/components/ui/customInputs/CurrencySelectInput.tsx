"use client";

import { useEffect, useState } from "react";
import CustomCombobox from "../combobox";
import { getCurrencyList } from "@/lib/action/PubilcCommon";
import { CurrencyListType } from "@/lib/type/CommonType";

interface CurrencyOption {
    value: string;
    label: string;
    icon?: string; // ✅ Allow undefined to prevent TypeScript errors
}

interface CurrencySelectProps {
    onChange: (currency: CurrencyOption) => void;
    initialValue?: string;
    country: string;
}

export default function CurrencySelect({ onChange, initialValue = "usd", country = "1" }: CurrencySelectProps) {
    const [currencyList, setCurrencyList] = useState<CurrencyOption[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const currencies: CurrencyListType[] = await getCurrencyList(country);
                const formattedCurrencies: CurrencyOption[] = currencies.map((currency) => ({
                    value: currency.id.toString(),
                    label: `${currency.name} (${currency.symbol})`,
                    icon: currency.icon || undefined, // ✅ Ensures `undefined` if no icon
                }));
                setCurrencyList(formattedCurrencies);
            } catch (err) {
                console.error("Failed to load currencies:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrencies();
    }, [country]); // Re-fetch when country changes

    return (
        <CustomCombobox
            options={currencyList}
            onChange={onChange}
            initialValue={initialValue}
            placeholder={loading ? "Loading currencies..." : "Select a currency"}
            showIcons={true} // Custom prop to tell combobox to show images
        />
    );
}
