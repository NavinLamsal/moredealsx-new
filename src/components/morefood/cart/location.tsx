
"use client";
import { Button } from "@/components/ui/button";
import { LocationDialog } from "@/layout/Setloaction";
import React, { useEffect, useState } from "react";

const Location = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [fullAddress, setFullAddress] = useState<string | null>(null);

  const fetchLocation = () => {
    if (typeof window !== "undefined") {
      const location = localStorage.getItem("location");
      if (location) {
        const parts = location.split(",").map((part) => part.trim());
        if (parts.length > 2) {
          setSelectedAddress(parts.slice(0, 2).join(", "));
        } else {
          setSelectedAddress(location);
        }
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
    <div className="mt-4">
      <p className="text-sm font-semibold">Your Address</p>
      <div className="flex justify-between items-center mt-1">
        <p className="text-foreground font-medium">{selectedAddress ?? "Set Your Location"}</p>
        <LocationDialog>
          <Button variant="outline" className="text-xs px-2 py-1">Change</Button>
        </LocationDialog>
      </div>
      <p className="text-xs text-muted-foreground">{fullAddress ?? ""}</p>
    </div>
  );
};

export default Location;

