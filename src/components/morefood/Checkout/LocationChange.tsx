"use client"
import { Button } from '@/components/ui/button';
import { LocationDialog } from '@/layout/Setloaction';
import { RootState } from '@/lib/redux/store';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RestroLocationDialog } from './RestroLocation';
import { MapPin } from 'lucide-react';
import { updateFormData } from '@/lib/redux/slice/morefood/CheckoutSlice';

const LocationChange = () => {
  const dispatch = useDispatch();
  const [fullAddress, setFullAddress] = useState<string | null>(null);
  const formData = useSelector((state: RootState) => state.delivery);

  const fetchLocation = () => {
    if (typeof window !== "undefined") {
      const location = localStorage.getItem("location");
      const lat = localStorage.getItem("latitude");
      const lon = localStorage.getItem("longitude");
      if (location) {
        setFullAddress(location);
        dispatch(updateFormData({ location: location,
          lat: lat ? parseFloat(lat) : 0,
          lon: lon ? parseFloat(lon) : 0,
        }))
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
      <h3 className="font-medium flex items-center gap-2">
        <MapPin />
        {formData.deliverytype === "delivery"
          ? "Delivery Location"
          : formData.deliverytype === "packed"
            ? "Pick-Up Location"
            : formData.deliverytype === "dine-here"
              ? "Dine-In Location"
              : <span className='text-muted-foreground'>Select a Delivery Option</span>}
      </h3>
      {/* <Heading title="Delivery Address"/> */}
      <div className="flex justify-between items-center mt-1 ml-3">
        {formData.deliverytype === "delivery" &&
          <>
            <p className="text-muted-foreground font-medium">{fullAddress ?? <span className='text-muted-foreground'>Set Your Location</span>}</p>
            <LocationDialog>
              <Button  variant="morefoodOutline" size={"sm"} className="text-xs px-2 py-1">Change</Button>
            </LocationDialog>
            {formData.errors.location && <p className="text-red-500">{formData.errors.location}</p>}
          </>
        }
        
        {formData.deliverytype !== "delivery" &&
          <>
            <p className="text-muted-foreground font-medium">{fullAddress ?? <span className='text-muted-foreground'>Set Your Location</span>}</p>
            <RestroLocationDialog location={formData.deliverytype === "packed" ? "Pick Up" : formData.deliverytype === "dine-here" ? "Dine In" : "Delivery"} details={{ lat: "28.208887051121366", lng: "83.97276146596613" }}>
              <Button variant="morefoodOutline" size={"sm"} className="text-xs px-2 py-1">View</Button>
            </RestroLocationDialog>
          </>
        }

      </div>

    </div>
  )
}

export default LocationChange;


