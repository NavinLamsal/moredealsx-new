"use client";
import MapboxNavigationComponent from '@/components/MapBox/MapboxNavigationComponent';
import MapboxLocation from '@/components/MapBox/MapView';
import MapboxComponent from '@/components/ui/customInputs/AddressInput';
// import MapboxComponent from '@/components/MapNavigationComponent';
// import MapboxFindPathComponent from '@/components/MapNavigationWithPoint';
import { MapPin } from 'lucide-react';
import React, { Suspense, useEffect, useState } from 'react'

const MapView = ({ lat, lng , deliveryOption , address}: { lat: number; lng: number; deliveryOption: string , address: string}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
      // Simulate an API call or a delay
      const timer = setTimeout(() => {
        setLoading(false);
        setError(true); // Simulate error after loading
      }, 3000); // Adjust the delay time as needed

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, []);
  
  
    return (
      <div className="my-4">
        <ul className="my-4 flex items-start gap-2">
          <MapPin />
          <li className="dark:text-white text-black">
            <span className="text-green-800 dark:text-dark-P_text font-semibold">
              Address:
            </span>
            &nbsp; {address}
          </li>
        </ul>
        <Suspense
          fallback={
            <div className="w-full h-64 bg-gray-200 animate-pulse rounded-md"></div>
          }
        >
          {deliveryOption === "delivery" ? 
          
          <>
          {lat && lng && <MapboxLocation  lat={lat} lng={lng} />}
          {!lat || !lng ? (
            <>
              {loading && (
                <div className="w-full h-64 bg-gray-200 animate-pulse rounded-md"></div>
              )}
              {error && (
                <p className="text-xs text-red-600">
                  Oop&apos;s! Error getting location of restaurant
                </p>
              )}
            </>
          ) : null}
          </>
        
        :

          <>
          {lat && lng && <MapboxNavigationComponent lat={`${lat}`} lng={`${lng}`} />}
          {!lat || !lng ? (
            <>
              {loading && (
                <div className="w-full h-64 bg-gray-200 animate-pulse rounded-md"></div>
              )}
              {error && (
                <p className="text-xs text-red-600">
                  Oop&apos;s! Error getting location of restaurant
                </p>
              )}
            </>
          ) : null}
          </>
        
        }

        </Suspense>
      </div>
    );
};

export default MapView;