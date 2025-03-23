// "use client";
// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
// import LocationMapbox from "@/components/MapBox/LocationMapbox";



// export function LocationDialog({children}: {children: React.ReactNode}) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
//   const [newaddress, seNewAddress] = useState("");

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const location = localStorage.getItem("location");
//       setSelectedAddress(location);
//       if (!location) {
//         setIsOpen(true);
//       }
//     }
//   }, [newaddress]);

//   const closeDialog = () => setIsOpen(false);

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//           {children}
//       </DialogTrigger>
//       <DialogContent className="border-none p-0">
//         <div className="flex items-center justify-center">
//           <div className="w-full max-w-xl  rounded-xl p-6 shadow-lg">
//             <div className="text-xl font-semibold">
//               What is your exact location?
//             </div>
//             <p className="mt-2 text-gray-600">
//               Specifying your location enables more accurate search results,
//               seamless order tracking, and personalized recommendations.
//             </p>
//             <LocationMapbox setNewAddress={seNewAddress} />
//         <DialogFooter className="my-4 mx-4">
//           <DialogClose>
//             <Button>Save</Button>
//           </DialogClose>
//         </DialogFooter>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import LocationMapbox from "@/components/MapBox/LocationMapbox";

export function LocationDialog({ children }: { children: React.ReactNode }) {
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
            <div className="text-xl font-semibold">What is your exact location?</div>
            <p className="mt-2 text-gray-600">
              Specifying your location enables more accurate search results, seamless order tracking, and personalized recommendations.
            </p>
            <LocationMapbox setNewAddress={handleSave} />
            <DialogFooter className="my-4 mx-4">
              <DialogClose>
                <Button onClick={() => handleSave(selectedAddress || "")}>Save</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

