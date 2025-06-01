import React from "react";

const ticketOptions = [
  {
    id: "family-dinner",
    label: "Free Family Dinner",
    image: "/images/png/restro/salad_bowl.png",
    badge: "HOT",
    details: [
      "5-course meal for family of 4",
      "Valued at $250",
      "1 in 50 chance to win",
    ],
    price: 5,
    type: "per ticket",
    button: "BUY TICKETS",
  },
  {
    id: "italian-getaway",
    label: "Luxury Italian Getaway",
    image: "/images/png/restro/airport.png",
    badge: "PREMIUM",
    details: [
      "All-expenses paid trip to Rome",
      "5-star hotel for 3 nights",
      "1 in 500 chance to win",
    ],
    price: 20,
    type: "per ticket",
    button: "BUY TICKETS",
  },
  {
    id: "dining-pass",
    label: "Monthly Dining Pass",
    image: "/images/png/restro/food_court.png",
    badge: "NEW",
    details: [
      "12 dinners for the price of 8",
      "Save $400+",
      "Guaranteed value",
    ],
    price: 199,
    type: "one-time",
    button: "GET YOURS",
  },
];

const PrizeCard = ({ item }: { item: (typeof ticketOptions)[number] }) => {
  return (
    <div
      className={`${
        item.id === "italian-getaway"
          ? "border-2 border-yellow-300 shadow shadow-yellow-400"
          : ""
      } group dark:bg-gray-800 bg-yellow-50 text-black dark:text-white rounded-xl overflow-hidden shadow-lg flex flex-col items-center w-full max-w-sm mx-auto transform transition duration-300 hover:-translate-y-2`}
    >
      <div className="relative w-full">
        <img
          src={item.image}
          alt={item.label}
          className="w-full h-64 object-cover"
        />
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          {item.badge}
        </span>
      </div>
      <div className="p-4 text-center flex flex-col items-center">
        <h2 className="text-lg font-bold dark:text-yellow-400 text-gray-900 mb-2">
          {item.label}
        </h2>
        <ul className="text-sm mb-4 space-y-1 place-self-start flex flex-col items-start gap-2">
          {item.details.map((d, i) => (
            <li key={i}>🍽️ {d}</li>
          ))}
        </ul>
        <div className="text-2xl font-bold dark:text-yellow-400">
          ${item.price.toFixed(2)}
        </div>
        <div className="text-xs dark:text-gray-400 text-gray-800 mb-2">
          {item.type}
        </div>
        <div className="flex items-center justify-center space-x-4 my-2">
          <button className="bg-yellow-400 text-black rounded-full w-8 h-8">
            -
          </button>
          <span>1</span>
          <button className="bg-yellow-400 text-black rounded-full w-8 h-8">
            +
          </button>
        </div>
        <button className="mt-2 bg-yellow-400 text-black px-6 py-2 rounded font-bold">
          {item.button}
        </button>
      </div>
    </div>
  );
};

export default function Ticket() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white sm:py-12 py-6 px-6 max-w-7xl mx-auto">
      <div className="">
        <h2 className="sm:text-3xl text-xl font-bold dark:text-white text-gray-800 mb-2 uppercase  tracking-wider">
          CHANCE TO WIN BIG!
        </h2>
        <div className="w-16 h-1 bg-yellow-400 mb-8"></div>
      </div>
      <p className="text-left dark:text-gray-300 mb-10">
        Participate in our exclusive draws for incredible experiences! Every
        ticket gives you a chance to win.
      </p>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
        {ticketOptions.map((item) => (
          <PrizeCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
