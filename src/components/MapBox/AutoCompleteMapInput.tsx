"use client";

import axios from "axios";
import { useState, useEffect, ChangeEvent, useMemo, useRef } from "react";
import { Input } from "@/components/ui/input";

// Define Address Type (Only Required Fields)
interface Address {
  address: string;
  region?: string;
  city: string;
  house_no: string;
  street: string;
  zip_code: string;
}

interface AutoCompleteInputProps {
  handleManualInputChange: (
    event: ChangeEvent<HTMLInputElement>,
    field: keyof Address
  ) => void;
  setAddress: (address: Address) => void;
  streetAndNumber: string;
}

// Fetch places from Mapbox API
export async function getPlaces(query: string) {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
        },
      }
    );

    return response.data.features;
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
}

export default function AutoCompleteInput({
  handleManualInputChange,
  setAddress,
  streetAndNumber,
}: AutoCompleteInputProps) {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [query, setQuery] = useState<string>(streetAndNumber);

  const userInteracted = useRef(false);

  useEffect(() => {
    if (!userInteracted.current || query.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = setTimeout(async () => {
      const results = await getPlaces(query);
      setSuggestions(results);
    }, 300);

    return () => clearTimeout(fetchSuggestions);
  }, [query]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    userInteracted.current = true;
    setQuery(event.target.value);
    handleManualInputChange(event, "address");
  };

  const handleSuggestionClick = (suggestion: any) => {
    const address = suggestion.place_name;
    let city = "";
    let region = "";
    let street = "";
    let zip_code = "";
    let house_no = "";
    // ✅ Determine city or street based on `place_type`
    switch (true) {
      case suggestion.place_type.includes("locality"):
      case suggestion.place_type.includes("address"):
        street = suggestion.text;
        break;
      case suggestion.place_type.includes("place"):
        city = suggestion.text;
        break;
    }

    // ✅ Extract additional details from `context`
    suggestion.context?.forEach((element: any) => {
      const idType = element.id.split(".")[0];

      if (idType === "place" && city === "") city = element.text; // Only set city if not already set
      if (idType === "postcode") zip_code = element.text;
      if (idType === "address") street = element.text;
      if (idType === "houseno") house_no = element.text;
      if (idType === "region") region = element.text;
    });

    // ✅ Update address state
    const newAddress: Address = {
      address,
      city,
      street,
      zip_code,
      region,
      house_no,
    };
    setAddress(newAddress);
    setQuery(address);
    userInteracted.current = false;
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <Input
        id="address"
        type="text"
        placeholder="Enter your address"
        value={query}
        onChange={handleChange}
        className="border rounded-md p-2 w-full"
      />
      {userInteracted.current && suggestions.length > 0 && (
        <ul className="absolute w-full bg-card text-card-foreground border border-gray-300 shadow-md rounded-md mt-1 z-10 max-h-48 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
