import React from "react";
import { LocationDialog } from "./location/LocationDialog";
import AuthNavbarContent from "./AuthNavbarContent";

const NewNav = () => {
  return (
    <div>
      <header className="bg-black text-white flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-widest">
            <span className="text-yellow-400">✕</span> MORE
            <span className="text-yellow-400">DEALSX</span>
          </span>
          <div>
            <LocationDialog dashboard={false} />
          </div>
        </div>
        <div>
          <AuthNavbarContent header={true} />
        </div>
      </header>
    </div>
  );
};

export default NewNav;
