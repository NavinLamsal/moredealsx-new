import React from "react";
import { Utensils, ChefHat, Pizza, Wine } from "lucide-react";

const cateringServices = [
  {
    icon: <Utensils className="w-5 h-5 text-yellow-400" />,
    title: "Full-Service Catering",
    description: "From appetizers to desserts, we handle everything",
  },
  {
    icon: <ChefHat className="w-5 h-5 text-yellow-400" />,
    title: "Personal Chef Service",
    description: "Our chefs prepare food live at your venue",
  },
  {
    icon: <Pizza className="w-5 h-5 text-yellow-400" />,
    title: "Wood-Fired Pizza Station",
    description: "Freshly made pizzas cooked before your guests",
  },
  {
    icon: <Wine className="w-5 h-5 text-yellow-400" />,
    title: "Wine Pairing Options",
    description: "Premium Italian wines selected by our sommelier",
  },
];

const CateringSection = () => {
  return (
    <section className="dark:bg-black bg-white text-black dark:text-white sm:py-12 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="sm:text-3xl text-xl font-bold dark:text-white text-gray-800 mb-2">
          PREMIUM CATERING SERVICES
        </h2>
        <div className="w-16 h-1 bg-yellow-400 mb-8"></div>
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Left Image */}
          <div className="flex-1">
            <img
              src="/images/png/restro/catering_bg.png"
              alt="Catering"
              className="w-full rounded-lg"
            />
          </div>

          {/* Right Text */}
          <div className="flex-1">
            <h3 className="text-gray-900 dark:text-yellow-400 sm:text-2xl text-lg font-bold mb-4">
              BRING ITALY TO YOUR EVENT
            </h3>
            <p className="dark:text-gray-300 mb-6">
              Our professional catering team will create an unforgettable
              Italian dining experience at your special occasion. Perfect for
              weddings, corporate events, and private parties.
            </p>

            {/* Services List */}
            <ul className="space-y-4 mb-6">
              {cateringServices.map((service, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div>{service.icon}</div>
                  <div>
                    <p className=" font-semibold">{service.title}</p>
                    <p className="dark:text-gray-400">{service.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button className="bg-yellow-400 text-black font-bold px-6 py-3 rounded hover:bg-yellow-500 transition">
              REQUEST CATERING QUOTE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CateringSection;
