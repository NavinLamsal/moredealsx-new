"use client";

import { useEffect, useState } from "react";
import CustomCombobox from "../combobox";
import { getCityList } from "@/lib/action/PubilcCommon";
import { CityListType, CurrencyListType } from "@/lib/type/CommonType";

interface CityOption {
    value: string;
    label: string;
    icon?: string; // ✅ Allow undefined to prevent TypeScript errors
}

interface CitiesSelectProps {
    onChange: (currency: CityOption) => void;
    initialValue?: string;
    country: string;
}

export default function CitySelect({ onChange, initialValue = "", country = "1" }: CitiesSelectProps) {
    const [cityList, setCity] = useState<CityOption[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const cities: CityListType[] = await getCityList(country);
                const formattedCity: CityOption[] = cities.map((city) => ({
                    value: city.id.toString(),
                    label: `${city.name}`,
                    icon: city.image || undefined, // ✅ Ensures `undefined` if no icon
                }));
                setCity(formattedCity);
            } catch (err) {
                console.error("Failed to load cities:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCities();
    }, [country]); // Re-fetch when country changes

    return (
        <CustomCombobox
            options={cityList}
            onChange={onChange}
            initialValue={initialValue}
            placeholder={loading ? "Loading cities..." : "Choose a City"}
            showIcons={true} // Custom prop to tell combobox to show images
        />
    );
}
