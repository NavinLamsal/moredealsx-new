"use client";

import { useEffect, useState } from "react";
import CustomCombobox from "../combobox";
import { getCountryList } from "@/lib/action/PubilcCommon";
import { CountryListType } from "@/lib/type/CommonType";

interface CountryOption {
    value: string;
    label: string;
    icon?: string; // ✅ Allow undefined to prevent TypeScript errors
}

interface CountrySelectProps {
    onChange: (country: CountryOption) => void;
    initialValue?: string;
}

export default function CountrySelect({ onChange, initialValue = "", }: CountrySelectProps) {
    const [countryList, setCountryList] = useState<CountryOption[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const countries: CountryListType[] = await getCountryList();
                const formattedcountries: CountryOption[] = countries.map((country) => ({
                    value: country.id.toString(),
                    label: `${country.name}`,
                    icon: country.icon || undefined,
                }));
                setCountryList(formattedcountries);
            } catch (err) {
                console.error("Failed to load currencies:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrencies();
    }, []); // Re-fetch when country changes

    return (
        <CustomCombobox
            options={countryList}
            onChange={onChange}
            initialValue={initialValue}
            placeholder={loading ? "Loading countries..." : "Select a country"}
            showIcons={true} // Custom prop to tell combobox to show images
        />
    );
}
