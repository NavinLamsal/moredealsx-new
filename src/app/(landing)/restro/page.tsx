// pages/margherita-italiano.tsx
import React from "react";
import Intro from "./sections/Intro";
import CateringSection from "./sections/Catering";
import Ticket from "./sections/Ticket";
import MembershipPage from "./sections/Member";
import HotDealsSection from "./sections/HotDeals";
import EventsSection from "./sections/Events";
import Products from "./sections/Products";

const Page: React.FC = () => {
  return (
    <div className="min-h-screen dark:bg-black bg-white text-white font-sans">
      {/* Header
      <header className="bg-black border-b-2 border-yellow-400 px-4 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-yellow-400">MOREDEALSX</h1>
          <button className="bg-red-600 px-4 py-2 rounded text-sm font-semibold hover:bg-red-700">
            EXCLUSIVE
          </button>
        </div>
      </header> */}

      {/* Main Content */}
      <Intro />
      <MembershipPage />
      <CateringSection />
      <HotDealsSection />
      <EventsSection />
      <Ticket />
      <Products />
    </div>
  );
};

export default Page;
