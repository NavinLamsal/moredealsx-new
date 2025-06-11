"use client";

import { useEffect, useState } from "react";
import CustomCombobox from "../combobox";
import { getCityList } from "@/lib/action/PubilcCommon";
import { CityListType } from "@/lib/type/CommonType";

interface CityOption {
    value: string;
    label: string;
    icon?: string;
}

interface CitiesSelectProps {
    onChange: (city: CityOption) => void;
    initialValue?: string;
    country: string;
}

export default function CitySelect({ onChange, initialValue = "", country }: CitiesSelectProps) {
    const [cityList, setCityList] = useState<CityOption[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCities = async () => {
            setLoading(true); // Ensure UI updates when loading new cities
            try {
                const cities: CityListType[] = await getCityList(country);
                const formattedCity: CityOption[] = cities.map((city) => ({
                    value: city.code,
                    label: city.name,
                    icon: city.image || undefined,
                }));
                setCityList([...formattedCity]); // ✅ Ensure state updates correctly
            } catch (err) {
                console.error("Failed to load cities:", err);
            } finally {
                setLoading(false);
            }
        };

        if (country) {
            fetchCities();
        }
    }, [country]); // ✅ Re-fetch when `country` changes

    return (
        <CustomCombobox
            options={cityList} // ✅ Ensures updated city list is passed
            onChange={onChange}
            initialValue={initialValue}
            placeholder={loading ? "Loading cities..." : "Choose a City"}
            showIcons={true}
        />
    );
}
