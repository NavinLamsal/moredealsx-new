"use client";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react"; // Icon for location
import UserLocationModal from "@/components/form/moredealsclub/CityForm";

export default function CityChooser() {
  const [userCity, setUserCity] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if a city is stored
    const storedCity = localStorage.getItem("city");
    if (storedCity) {
      setUserCity(storedCity);
    } else {
      setShowModal(true); // Show modal if no city is stored
    }
  }, []);

  const handleCityChange = (city: string) => {
    setUserCity(city); 
  };

  const handleModalClose = () => {
    // If the user closes the modal, don't show it again
    localStorage.setItem("hideLocationModal", "true");
    setShowModal(false);
  };

  return (
    <>
     

      {/* Location Button */}
      <button onClick={() => setShowModal(true)} className="flex items-start gap-1 text-sm">
        <MapPin size={18} className="text-blue-400" />
        <span className="text-left">City {userCity || "choose"}</span>
      </button>

      {/* Location Modal */}
      {showModal && <UserLocationModal onCitySelect={handleCityChange} onClose={handleModalClose} />}
    </>
  );
}
