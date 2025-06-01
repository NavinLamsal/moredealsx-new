import React from "react";
import { Button } from "@/components/ui/button";

const events = [
  {
    date: "JUN 15",
    title: "Wine Tasting Night",
    location: "Margherita Italiano",
    description: "Sample 10 premium Italian wines with expert sommelier",
    image: "/images/png/restro/wine.png",
  },
  {
    date: "JUN 22",
    title: "Pasta Making Class",
    location: "Margherita Italiano",
    description: "Learn authentic pasta making from our master chef",
    image: "/images/png/restro/food.png",
  },
  {
    date: "JUN 29",
    title: "Live Jazz Dinner",
    location: "Margherita Italiano",
    description: "5-course meal with live jazz performance",
    image: "/images/png/restro/dinner.png",
  },
];

const EventsSection: React.FC = () => {
  return (
    <div className="dark:bg-black bg-white text-white px-6 sm:py-12 py-6 max-w-7xl mx-auto">
      <div className="">
        <h2 className="sm:text-3xl text-xl font-bold dark:text-white text-gray-800 mb-2 uppercase  tracking-wider">
          OUR EVENTS
        </h2>
        <div className="w-16 h-1 bg-yellow-400 mb-8"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event, idx) => (
          <div
            key={idx}
            className="dark:bg-gray-900 bg-yellow-50 rounded-xl shadow-lg overflow-hidden border dark:border-gray-700"
          >
            <div className="relative">
              <div className="bg-yellow-400 text-black font-bold text-center py-2 uppercase">
                {event.date}
              </div>
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-56 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="dark:text-yellow-500 text-gray-800 font-bold text-lg">
                {event.title}
              </h3>
              <p className="dark:text-gray-400 text-gray-900 text-sm mb-1">
                📍 {event.location}
              </p>
              <p className="text-sm text-white mb-4">{event.description}</p>
              <Button className="bg-yellow-500 text-black w-full py-2 font-bold rounded hover:bg-yellow-600">
                BOOK TICKETS
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;
