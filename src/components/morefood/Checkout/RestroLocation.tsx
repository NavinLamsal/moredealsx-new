"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import MapboxNavigationComponent from "@/components/MapBox/MapboxNavigationComponent";

export function RestroLocationDialog({ children , location , details }: { children: React.ReactNode, location: string , details:{ lat: string; lng: string; } }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const location = localStorage.getItem("location");
      setSelectedAddress(location);
      if (!location) {
        setIsOpen(true);
      }
    }
  }, []);

  const handleSave = (address: string) => {
    localStorage.setItem("location", address);
    setSelectedAddress(address);
    // setIsOpen(false);
    window.dispatchEvent(new Event("storage")); // 🔥 Notify other components
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="border-none p-0">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl rounded-xl p-6 shadow-lg">
            <div className="text-xl font-semibold">Your {location} Location</div>
            {/* <p className="mt-2 text-gray-600">
              Specifying your location enables more accurate search results, seamless order tracking, and personalized recommendations.
            </p> */}
            {details.lat && details.lng && (
          <MapboxNavigationComponent lat={`${details.lat}`} lng={`${details.lng}`} height="200px" />
        )}
            <DialogFooter className="my-4 mx-4">
              <DialogClose>
                <Button onClick={() => handleSave(selectedAddress || "")}>Close</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

