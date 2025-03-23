"use client"
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading'
import { LocationDialog } from '@/layout/Setloaction';
import React, { useEffect, useState } from 'react'

const LocationChange = () => {
  
  const [fullAddress, setFullAddress] = useState<string | null>(null);

  const fetchLocation = () => {
    if (typeof window !== "undefined") {
      const location = localStorage.getItem("location");
      if (location) {
        setFullAddress(location);
      }
    }
  };

  useEffect(() => {
    fetchLocation();
    // Listen for changes in localStorage (from LocationDialog)
    const handleStorageChange = () => fetchLocation();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="mt-4 border-b pb-4">
     <h3 className="font-medium">Delivery options</h3>
      {/* <Heading title="Delivery Address"/> */}
      <div className="flex justify-between items-center mt-1">
        <p className="text-gray-700 font-medium">{fullAddress ?? "Set Your Location"}</p>
        <LocationDialog>
          <Button variant="outline" size={"sm"} className="text-xs px-2 py-1">Change</Button>
        </LocationDialog>
      </div>
      
    </div>
  )
}

export default LocationChange;


