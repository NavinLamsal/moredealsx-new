"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { MapPin } from "lucide-react";
import UserLocationSetMap from "@/components/MapBox/UserLocationSetMap";

export function LocationDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [newaddress, seNewAddress] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const location = localStorage.getItem("location");
      setSelectedAddress(location);
      if (!location) {
        setIsOpen(true);
      }
    }
  }, [newaddress]);

  const closeDialog = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <>
          <div
            className="items-center ml-14 hidden md:flex  flex-grow hover:bg-pink-100/40 rounded-xl"
            onClick={() => setIsOpen(true)}
          >
            <Button
              variant="default"
              className="hover:scale-105 bg-S_btn text-white"
            >
              <MapPin size={20} />
              <p className="ml-2 text-xs ">Address</p>
            </Button>
            <input
              name="address"
              id="address"
              type="text"
              placeholder="Your address (e.g., Tulegatan 1)"
              className="text-black dark:text-white text-sm w-full rounded p-2 bg-transparent"
              value={selectedAddress || ""}
              readOnly
            />
          </div>
          <div
            className="items-center justify-end flex md:hidden flex-grow rounded-xl"
            onClick={() => setIsOpen(true)}
          >
            <Button
              variant="default"
              className="hover:scale-105 bg-S_btn"
            >
              <MapPin size={20} />
            </Button>
          </div>
        </>
      </DialogTrigger>
      <DialogContent className="border-none p-0">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl  rounded-xl p-6 shadow-lg">
            <div className="text-xl font-semibold">
              What is your exact location?
            </div>
            <p className="mt-2 text-gray-600">
              Specifying your location enables more accurate search results, partners, and services for you.
            </p>
            <UserLocationSetMap setNewAddress={seNewAddress} />
        <DialogFooter className="my-4 mx-4">
          <DialogClose>
            <Button>Save</Button>
          </DialogClose>
        </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
