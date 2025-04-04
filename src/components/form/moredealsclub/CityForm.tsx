// "use client";
// import React, { useState, useEffect } from "react";
// import CountrySelect from "@/components/ui/customInputs/CountrySelect";
// import CitySelect from "@/components/ui/customInputs/CitySelectInput";
// import { Button } from "@/components/ui/button";

// export default function CityForm({
//     onCitySelect,
//     onClose,
//     onMapChoose,
// }: {
//     onCitySelect: (city: string) => void;
//     onClose: () => void;
//     onMapChoose: () => void;
// }) {
//     const [selectedCity, setSelectedCity] = useState<string | null>(null);
//     const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
//     const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);


//     // ✅ Load saved location from localStorage on mount
//     useEffect(() => {
//         if (typeof window === "undefined") return;

//         const savedCity = localStorage.getItem("city");
//         const savedCountryId = localStorage.getItem("countryId");
//         const savedCountry = localStorage.getItem("country");

//         if (savedCity) setSelectedCity(savedCity);
//         if (savedCountry) setSelectedCountry(savedCountry);
//         if (savedCountryId) setSelectedCountryId(parseInt(savedCountryId));
//     }, []);


//     const handleCitySelection = (option: any) => {
//         setSelectedCity(option.label);
//         localStorage.setItem("city", option.label);
//         onCitySelect(option.label);
//     };

//     const handleCountrySelection = (option: any) => {
//         setSelectedCountry(option.label);
//         setSelectedCountryId(parseInt(option.value));
//         localStorage.setItem("country", option.label);
//         localStorage.setItem("countryId", option.value);
//     };

//     return (
//         <div className="flex flex-col gap-4 my-2">
//             <div>
//                 <label>Country</label>
//                 <CountrySelect onChange={handleCountrySelection} initialValue={`${selectedCountryId}`} />
//             </div>

//             <div>
//                 <label>City</label>
//                 <CitySelect onChange={handleCitySelection} initialValue={selectedCity || ""} country={`${selectedCountryId}`} />
//             </div>
//             <div className="flex gap-4 justify-end">

//                 <Button variant="outline" onClick={() => onMapChoose()}>
//                     Set From Map
//                 </Button>

//                 <Button onClick={() => onClose()}>Save</Button>
//             </div>

//         </div>
//     );
// }


"use client";
import React, { useState, useEffect } from "react";
import CountrySelect from "@/components/ui/customInputs/CountrySelect";
import CitySelect from "@/components/ui/customInputs/CitySelectInput";
import { Button } from "@/components/ui/button";

export default function CityForm({
    onCitySelect,
    onClose,
    onMapChoose,
}: {
    onCitySelect: (city: string, country: string) => void;
    onClose: () => void;
    onMapChoose: () => void;
}) {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);

    // ✅ Load saved location from localStorage on mount
    useEffect(() => {
        if (typeof window === "undefined") return;

        const savedCity = localStorage.getItem("city");
        const savedCountryId = localStorage.getItem("countryId");
        const savedCountry = localStorage.getItem("country");

        if (savedCity) setSelectedCity(savedCity);
        if (savedCountry) setSelectedCountry(savedCountry);
        if (savedCountryId && !isNaN(parseInt(savedCountryId))) {
            setSelectedCountryId(parseInt(savedCountryId));
        }
    }, []);

    const handleCitySelection = (option: any) => {
        setSelectedCity(option.label);
        localStorage.setItem("city", option.label);
        onCitySelect(option.label , selectedCountry!);
    };

    const handleCountrySelection = (option: any) => {
        setSelectedCountry(option.label);
        const countryId = parseInt(option.value);
        if (!isNaN(countryId)) {
            setSelectedCountryId(countryId);
            localStorage.setItem("countryId", option.value);
        }
        localStorage.setItem("country", option.label);
    };

    return (
        <div className="flex flex-col gap-4 my-2">
            <div>
                <label>Country</label>
                <CountrySelect 
                    onChange={handleCountrySelection} 
                    initialValue={selectedCountryId ? selectedCountryId.toString() : ""}
                />
            </div>

            <div>
                <label>City</label>
                {selectedCountryId ? (
                    <CitySelect 
                        onChange={handleCitySelection} 
                        initialValue={selectedCity || ""} 
                        country={selectedCountryId.toString()} 
                    />
                ) : (
                    <p className="text-gray-500">Please select a country first</p>
                )}
            </div>

            <div className="flex gap-4 justify-end">
                <Button variant="outline" onClick={onMapChoose}>
                    Set From Map
                </Button>
                <Button onClick={onClose}>Save</Button>
            </div>
        </div>
    );
}
