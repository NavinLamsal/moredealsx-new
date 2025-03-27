
// "use client";
// import React, { useState, useEffect } from "react";
// import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import CountrySelect from "@/components/ui/customInputs/CountrySelect";
// import CitySelect from "@/components/ui/customInputs/CitySelectInput";
// import { getCityList, getCountryList } from "@/lib/action/PubilcCommon";


// export default function UserLocationModal({
//     onCitySelect,
//     onClose,
// }: {
//     onCitySelect: (city: string) => void;
//     onClose: () => void;
// }) {
//     const [selectedCity, setSelectedCity] = useState<string>("");
//     const [selectedCountry , setSelectedCountry] = useState<string>("");
//     const [selectedCountryId , setSelectedCountryId] = useState<number>();
//     const [isLocating, setIsLocating] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");


//     // ✅ Check localStorage for an existing city when component mounts
//     useEffect(() => {
//         if( typeof window === "undefined") return;

//         const savedCity = localStorage.getItem("city");
//         const savedCountry = localStorage.getItem("countryId");
//         const savedCountryName = localStorage.getItem("country");
//         if(savedCity){
//             setSelectedCity(savedCity);
//         }
//         if(savedCountry){
//             setSelectedCountryId(parseInt(savedCountry));
//         }
//         if(savedCountryName){
//             setSelectedCountry(savedCountryName);
//         }
//     }, []);

//     const handleLocateMe = async () => {
//         if (!("geolocation" in navigator)) {
//             setErrorMessage("Geolocation is not supported by your browser.");
//             return;
//         }
    
//         setIsLocating(true);
    
//         navigator.geolocation.getCurrentPosition(
//             async (position) => {
//                 const { latitude, longitude } = position.coords;
//                 try {
//                     const response = await fetch(
//                         `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//                     );
//                     const data = await response.json();
//                     const detectedCountry = data.address?.country;
//                     const detectedCity = data.address?.city || data.address?.town || data.address?.village;
    

//                     if (!detectedCountry) {
//                         setErrorMessage("Could not detect country. Please select manually.");
//                         return;
//                     }

//                     const countries = await getCountryList();
                    
//                     // Ensure detected country is in available countries
//                     const country = countries.find(
//                         (c) => c.name.toLowerCase() === detectedCountry.toLowerCase()
//                     );

//                     if (!country) {
//                         setErrorMessage("We are not available in your country.");
//                         return;
//                     }
                    
//                     setSelectedCountry(country.name);
//                     setSelectedCountryId(country.id);
//                     localStorage.setItem("country", country.name);
//                     localStorage.setItem("countryId", `${country.id}`);
//                     // Fetch cities for the detected country
//                     const cities = await getCityList(`${country.id}`);
                   

    
//                     // Ensure detected city is in available cities
//                     if (detectedCity && cities.find(
//                         (c) => c.name.toLowerCase() === detectedCity.toLowerCase()
//                     )) {
//                         setSelectedCity(detectedCity);
//                         localStorage.setItem("city", detectedCity);
//                         onCitySelect(detectedCity);
//                     } else {
//                         setErrorMessage("Your city is not available. Please select manually.");
//                     }
//                 } catch (error) {
//                     setErrorMessage("Failed to fetch location. Please select manually.");
//                 } finally {
//                     setIsLocating(false);
//                 }
//             },
//             (error) => {
//                 setIsLocating(false);
//                 setErrorMessage("Failed to get location. Please select manually.");
//             }
//         );
//     };
    

//         const handleSelection = (option: any) => {
//             setSelectedCity(option.label);
//             localStorage.setItem("city", option.label);
//             onCitySelect(option.label);
//         };
    
    
//         const handleCountrySelection = (option: any) => {
//            setSelectedCountry(option.label);
//            setSelectedCountryId(parseInt(option.value));
//            localStorage.setItem("country", option.label);
//            localStorage.setItem("countryId", option.value);
//         };

//     return (
//         <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
//             <DialogContent className="max-w-md">
//                 <DialogHeader>
//                     <DialogTitle>Select Your Location</DialogTitle>
//                 </DialogHeader>

//                 {isLocating ? (
//                     <p className="text-center">Detecting your location...</p>
//                 )  :
//                 <>
//                 {errorMessage ? (
//                     <p className="text-red-500 text-center">{errorMessage}</p>
//                 ) : (
//                     <p className="text-center">Would you like us to detect your location or select manually?</p>
//                 )}

//                 {/* Locate Me Button */}
//                 {!errorMessage && !isLocating && (
//                     <div className="flex flex-col gap-4">
//                         <Button onClick={handleLocateMe} className="w-full" disabled={isLocating}>
//                             {isLocating ? "Detecting..." : "Locate Me"}
//                         </Button>
//                     </div>
//                 )}
//                 </> 
//                 }
//                 <div className="text-center">or</div>
                
//                 <div>
//                     <label>Country</label>
//                     <div className="relative">
//                         <CountrySelect onChange={handleCountrySelection} initialValue={`${selectedCountryId}`} />
//                     </div>
                  
//                 </div>

//                 <div>
//                     <label>Currency</label>
//                     <div className="relative">
//                         <CitySelect onChange={handleSelection} initialValue={selectedCity} country={`${selectedCountryId}`} />
//                     </div>
//                 </div>

//                 <DialogClose className="bg-primary text-primary-foreground w-full p-2 rounded-md">
//                     Save
//                 </DialogClose>
//             </DialogContent>
//         </Dialog>
//     );
// }


"use client";
import React, { useState, useEffect } from "react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CountrySelect from "@/components/ui/customInputs/CountrySelect";
import CitySelect from "@/components/ui/customInputs/CitySelectInput";
import { getCityList, getCountryList } from "@/lib/action/PubilcCommon";

export default function UserLocationModal({
    onCitySelect,
    onClose,
}: {
    onCitySelect: (city: string) => void;
    onClose: () => void;
}) {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
    const [isLocating, setIsLocating] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    // ✅ Load saved location from localStorage on mount
    useEffect(() => {
        if (typeof window === "undefined") return;

        const savedCity = localStorage.getItem("city");
        const savedCountryId = localStorage.getItem("countryId");
        const savedCountry = localStorage.getItem("country");

        if (savedCity) setSelectedCity(savedCity);
        if (savedCountry) setSelectedCountry(savedCountry);
        if (savedCountryId) setSelectedCountryId(parseInt(savedCountryId));
    }, []);

    const handleLocateMe = async () => {
        if (!("geolocation" in navigator)) {
            setErrorMessage("Geolocation is not supported by your browser.");
            return;
        }

        setIsLocating(true);
        setErrorMessage("");

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    );
                    const data = await response.json();
                    const detectedCountry = data.address?.country;
                    const detectedCity = data.address?.city || data.address?.town || data.address?.village;

                    if (!detectedCountry) {
                        setErrorMessage("Could not detect country. Please select manually.");
                        return;
                    }

                    const countries = await getCountryList();
                    const country = countries.find(
                        (c) => c.name.toLowerCase() === detectedCountry.toLowerCase()
                    );

                    if (!country) {
                        setErrorMessage("We are not available in your country.");
                        return;
                    }

                    setSelectedCountry(country.name);
                    setSelectedCountryId(country.id);
                    localStorage.setItem("country", country.name);
                    localStorage.setItem("countryId", `${country.id}`);

                    const cities = await getCityList(`${country.id}`);

                    if (detectedCity && cities.some((c) => c.name.toLowerCase() === detectedCity.toLowerCase())) {
                        setSelectedCity(detectedCity);
                        localStorage.setItem("city", detectedCity);
                        onCitySelect(detectedCity);
                    } else {
                        setErrorMessage("Your city is not available. Please select manually.");
                    }
                } catch (error) {
                    setErrorMessage("Failed to fetch location. Please select manually.");
                } finally {
                    setIsLocating(false);
                }
            },
            () => {
                setIsLocating(false);
                setErrorMessage("Failed to get location. Please select manually.");
            }
        );
    };

    const handleCitySelection = (option: any) => {
        setSelectedCity(option.label);
        localStorage.setItem("city", option.label);
        onCitySelect(option.label);
    };

    const handleCountrySelection = (option: any) => {
        setSelectedCountry(option.label);
        setSelectedCountryId(parseInt(option.value));
        localStorage.setItem("country", option.label);
        localStorage.setItem("countryId", option.value);
    };

    return (
        <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        {selectedCity && !isEditing ? "Your Location" : "Select Your Location"}</DialogTitle>
                </DialogHeader>

                {selectedCity && !isEditing ? (
                    <div className="text-center p-6">
                        <p className="text-lg font-semibold">{selectedCity}, {selectedCountry}</p>
                        <Button variant="outline" className="mt-6" onClick={() => setIsEditing(true)}>
                            Change Location
                        </Button>
                    </div>
                ) : (
                    <>
                        {isLocating ? (
                            <p className="text-center">Detecting your location...</p>
                        ) : (
                            <>
                                {errorMessage ? (
                                    <p className="text-red-500 text-center">{errorMessage}</p>
                                ) : (
                                    <p className="text-center">
                                        Would you like us to detect your location or select manually?
                                    </p>
                                )}

                                {!errorMessage && !isLocating && (
                                    <Button onClick={handleLocateMe} className="w-full" disabled={isLocating}>
                                        {isLocating ? "Detecting..." : "Locate Me"}
                                    </Button>
                                )}
                            </>
                        )}

                        <div className="text-center my-3">or</div>

                        <div>
                            <label>Country</label>
                            <CountrySelect onChange={handleCountrySelection} initialValue={`${selectedCountryId}`} />
                        </div>

                        <div>
                            <label>City</label>
                            <CitySelect onChange={handleCitySelection} initialValue={selectedCity || ""} country={`${selectedCountryId}`} />
                        </div>

                        <DialogClose className="bg-primary text-primary-foreground w-full p-2 rounded-md">
                            Save
                        </DialogClose>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
