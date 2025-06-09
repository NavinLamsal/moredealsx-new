import React from "react";
import SectionTitle from "./sectionTiltle";

const TicketSection = () => {
  const ticketCode = "X7B9-42A6-R8Y3";
  const stamps = [1, 2, 3, 4, 5];
  const collected = 2; // You can change this based on user progress

  return (
    <section className="py-20 bg-black text-center">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle title="YOUR TICKET TO SAVINGS" white={true} />
        <p className="mb-8">Collect 5 stamps, get a free hotel stay</p>

        <div className="max-w-xl mx-auto bg-neutral-900 p-8 rounded-lg border border-yellow-400">
          {/* Stamp Row */}
          <div className="flex justify-between mb-6">
            {stamps.map((num) => {
              const isCollected = num <= collected;
              return (
                <div
                  key={num}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-lg ${
                    isCollected
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-800 text-gray-500"
                  }`}
                >
                  {num}
                </div>
              );
            })}
          </div>

          {/* Code Box */}
          <div className="bg-neutral-800 p-6 rounded-lg">
            <p className="mb-4 text-white">Your unique ticket code:</p>
            <div className="font-mono text-xl tracking-widest text-yellow-400 mb-6">
              {ticketCode}
            </div>
            <a
              href="#"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded transition"
            >
              Redeem Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TicketSection;
