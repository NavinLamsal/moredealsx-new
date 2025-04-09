"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { MapPin } from "lucide-react";
import UserLocationSetMap from "@/components/MapBox/UserLocationSetMap";
import CityForm from "@/components/form/moredealsclub/CityForm";

export function LocationDialog({dashboard}:{dashboard?:boolean}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState("");
  const [city, setCity] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [manualField, setManualField] = useState(false);
  const [chooseField, setChooseField] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const location = localStorage.getItem("location");
      const cityname = localStorage.getItem("city");
      const countryName = localStorage.getItem("country");
      setSelectedAddress(location);
      setCity(cityname);
      setCountry(countryName);

      if (!cityname || !countryName) {
        setIsOpen(true);
      }
    }
  }, [newAddress]);



  const handleCityChange = (city: string , country: string) => {
        setCountry(country);
        setCity(city); 

  };
    

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className="items-center hidden md:flex flex-grow hover:bg-pink-100/40 rounded-xl"
          onClick={() => setIsOpen(true)}
        >
          <Button variant="ghost" size={"icon"}  className="hover:scale-105 ">
            <MapPin size={20} />
          </Button>
          {(city || country)?
          <input
            name="address"
            id="address"
            type="text"
            placeholder="Your address (e.g., Tulegatan 1)"
            className={ ` ${dashboard ? "text-black dark:text-white" : "text-white"} text-sm w-full rounded p-2 bg-transparent`}
            value={`${city || ""}, ${country || ""}`}
            readOnly
          />:

          <input
           name="address"
           id="address"
           type="text"
           placeholder="Your address (e.g., Tulegatan 1)"
           className={ ` ${dashboard ? "text-black dark:text-white" : "text-white"} text-sm w-full rounded p-2 bg-transparent`}
           value={`Select your location`}
           readOnly
         />
          
        }
        </div>
      </DialogTrigger>

      <DialogContent className="border-none p-0">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl rounded-xl p-6 shadow-lg">
            <div className="text-xl font-semibold">What is your exact location?</div>
            <p className="mt-2 text-gray-600">
              Specifying your location enables more accurate search results, partners, and services for you.
            </p>

            {manualField ? (
              <CityForm onCitySelect={handleCityChange} onClose={() => {setIsOpen(false);setManualField(false); setChooseField(false);}}  onMapChoose={()=> {setManualField(false); setChooseField(false)}}/>
            ) : (
              <UserLocationSetMap setNewAddress={setNewAddress} setChoosefield={setChooseField} />
            )}

            {!manualField &&
            <DialogFooter className="my-4 mx-4">
              {!chooseField ? (
                <Button onClick={() => {setIsOpen(false); window.location.reload();}}>Save</Button>
              ) : (
                <div className="flex gap-4">
                  {manualField &&
                  <Button variant="outline" onClick={() => setManualField(false)}>
                    Set From Map
                  </Button>
                  }
                  <Button onClick={() => setManualField(true)}>Choose Manually</Button>
                </div>
              )}
            </DialogFooter>
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
