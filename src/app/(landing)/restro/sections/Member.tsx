import React from "react";
import { Button } from "@/components/ui/button";

const membershipData = {
  title: "Become Our Member",
  benefitsTitle: "Members Benefits",
  benefits: [
    {
      icon: "💰",
      title: "Extra 15% Discount",
      description: "On all food and drinks at this restaurant",
    },
    {
      icon: "🎁",
      title: "Free Welcome Gift",
      description: "Complimentary appetizer on your first visit",
    },
    {
      icon: "⭐",
      title: "Priority Reservations",
      description: "Skip the wait during peak hours",
    },
    {
      icon: "📦",
      title: "Exclusive Offers",
      description: "Special deals only for Premium members",
    },
  ],
  price: "$9.99/month",
  buttonText: "Join Now",
};

const MembershipPage: React.FC = () => {
  return (
    <div className=" bg-white  dark:bg-black dark:text-white  text-black px-6 sm:py-12 py-6 flex flex-col items-center">
      <div className="">
        <h2 className="sm:text-3xl text-xl font-bold dark:text-white text-gray-800 mb-2 uppercase  tracking-wider">
          {membershipData.title}
        </h2>
        <div className="w-16 h-1 bg-yellow-400 mb-8"></div>
      </div>
      <div className="w-full max-w-2xl border-2 border-yellow-500 p-6 rounded-xl dark:bg-gray-900 bg-yellow-50 shadow-xl">
        <h2 className="dark:text-yellow-500 text-gray-900 sm:text-2xl text-lg font-bold mb-6 text-center uppercase tracking-wider">
          {membershipData.benefitsTitle}
        </h2>
        <p className="text-center mb-6 dark:text-gray-300">
          Unlock exclusive benefits and save more at Margherita Italiano and
          100+ premium partners
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {membershipData.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-2xl">{benefit.icon}</span>
              <div>
                <p className="font-bold ">{benefit.title}</p>
                <p className="dark:text-gray-400 text-sm">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button className="bg-yellow-500 text-black text-lg font-bold px-8 py-3 rounded-md shadow-lg hover:bg-yellow-600">
            {membershipData.buttonText} - {membershipData.price}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
