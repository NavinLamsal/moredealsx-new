import React from "react";
import { Clock, MapPin, Phone, Star } from "lucide-react";

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  location: string;
  openingHours: string;
  phone: string;
  description: string;
  imageUrl: string;
}

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Margherita Italiano",
    cuisine: "Italian Cuisine",
    rating: 4.8,
    reviews: 420,
    location: "Downtown District",
    openingHours: "11AM - 11PM",
    phone: "+1 555-123-4567",
    description:
      "Authentic Italian dining experience with recipes passed down through generations. Our wood-fired pizzas and handmade pastas are crafted with the finest ingredients imported directly from Italy. Family-owned since 1985.",
    imageUrl: "/restaurant-background.jpg",
  },
];

const Intro = () => {
  const restaurant = restaurants[0];
  const restaurantInfo = [
    {
      icon: <MapPin className="text-pink-400" size={20} />,
      label: restaurant.location,
    },
    {
      icon: <Clock className="text-pink-400" size={20} />,
      label: `Open Now: ${restaurant.openingHours}`,
    },
    {
      icon: <Phone className="text-pink-400" size={20} />,
      label: restaurant.phone,
    },
  ];

  const actionButtons = [
    {
      label: "BOOK A TABLE",
      bgColor: "bg-yellow-400",
      textColor: "text-black",
      hoverColor: "hover:bg-yellow-500",
    },
    {
      label: "VIEW MENU",
      bgColor: "bg-red-600",
      textColor: "text-white",
      hoverColor: "hover:bg-red-700",
    },
    {
      label: "BOOK CATERING",
      bgColor: "bg-yellow-400",
      textColor: "text-black",
      hoverColor: "hover:bg-yellow-500",
    },
  ];

  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url('/images/png/restro/bg.png')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Content */}
      <main className="relative max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-4xl font-bold text-yellow-400 mb-4">
          {restaurant.name.toUpperCase()}
        </h2>
        <div className="inline-block bg-yellow-400 text-black font-semibold px-3 py-1 rounded mb-4">
          {restaurant.cuisine}
        </div>
        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center space-x-1 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} fill="yellow" stroke="yellow" />
            ))}
          </div>
          <span className="ml-2 text-white font-semibold">
            {restaurant.rating}{" "}
            <span className="text-gray-400">
              ({restaurant.reviews} reviews)
            </span>
          </span>
        </div>
        {/* Info Rows */}
        <div className="flex flex-wrap gap-4 mb-4">
          {restaurantInfo.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        {/* Description */}
        <p className="text-gray-300 mb-6">{restaurant.description}</p>
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {actionButtons.map((button, index) => (
            <button
              key={index}
              className={`${button.bgColor} ${button.textColor} font-semibold px-6 py-3 rounded ${button.hoverColor}`}
            >
              {button.label}
            </button>
          ))}
        </div>
        {/* Image */}
        <div className="mt-8">
          <div
            className="w-full h-96 bg-cover bg-center rounded-lg border-4 border-yellow-400"
            style={{ backgroundImage: `url('${"/images/png/restro/bg.png"}')` }}
          ></div>
        </div>
      </main>
    </div>
  );
};

export default Intro;
