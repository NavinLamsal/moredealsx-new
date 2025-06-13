"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

// 🔁 Module-level cache to avoid refetching
let cachedCountries: CountryOption[] | null = null;

export default function CountrySelect({ onChange, initialValue = "", }: CountrySelectProps) {
 
    const [countryList, setCountryList] = useState<CountryOption[]>([]);
    const [loading, setLoading] = useState(true);
  
    // ✅ Memoized fetch function to prevent re-creation
    const fetchCountries = useCallback(async () => {
      if (cachedCountries) {
        setCountryList(cachedCountries);
        setLoading(false);
        return;
      }
  
      try {
        const countries: CountryListType[] = await getCountryList();
        const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL ?? "";
  
        const formatted: CountryOption[] = countries.map(({ code, name, icon }) => ({
          value: code,
          label: name,
          icon: icon ? `${icon}` : undefined,
        }));
  
        cachedCountries = formatted;
        setCountryList(formatted);
      } catch (err) {
        console.error("Failed to load countries:", err);
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchCountries();
    }, [fetchCountries]);
  
    // ✅ Memoize options to avoid recalculating during re-renders
    const memoizedOptions = useMemo(() => countryList, [countryList]);

    return (
        <CustomCombobox
            options={memoizedOptions}
            onChange={onChange}
            initialValue={initialValue}
            placeholder={loading ? "Loading countries..." : "Select a country"}
            showIcons={true} // Custom prop to tell combobox to show images
        />
    );
}
