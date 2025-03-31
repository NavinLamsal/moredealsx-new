"use client";
import MapboxNavigationComponent from "@/components/MapBox/MapboxNavigationComponent";
import Heading from "@/components/ui/heading";
import { Restaurant } from "@/lib/type/morefood/restaurant";
// import MapboxComponent from "@/components/MapNavigationComponent";
// import Heading from "@/components/ui/Heading";
// import { Resturant } from "@/lib/Type";
import { MapPin } from "lucide-react";
import { Suspense, useEffect, useState } from "react";


const AddressSection = ({ details }: { details: Restaurant }) => {
   

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
    <div className="bg-slate-200 dark:bg-card p-2 ">
      <Heading title="Address Information" />
      <ul className="my-4 flex items-start gap-2">
        <MapPin />
        <li className="dark:text-white text-black">
          <span className="text-green-800 dark:text-dark-P_text font-semibold">
            Address:
          </span>
          &nbsp; {details.address}
        </li>
      </ul>
      <Suspense
        fallback={
          <div className="w-full h-64 bg-gray-200 animate-pulse rounded-md"></div>
        }
      >
        {details.lat && details.lng && (
          <MapboxNavigationComponent lat={`${details.lat}`} lng={`${details.lng}`}  />
        )}
        {!details.lat || !details.lng ? (
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
      </Suspense>
      
    </div>
  );
 };

 export default AddressSection;