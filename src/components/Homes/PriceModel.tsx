import Link from "next/link";
import React from "react";

const PriceModel = () => {
  return (
    <section className="bg-[#fffaf5] dark:bg-neutral-900 py-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-yellow-100 mb-6">
          Choose Your Plan
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-white mb-12 max-w-2xl mx-auto">
          Flexible pricing to fit your restaurant’s needs. No hidden fees,
          cancel anytime.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Starter",
              price: "$49/mo",
              features: [
                "Basic CRM features",
                "Loyalty management",
                "Email support",
              ],
            },
            {
              name: "Pro",
              price: "$99/mo",
              features: [
                "All Starter features",
                "Reservations & table management",
                "POS integration",
                "Priority support",
              ],
            },
            {
              name: "Enterprise",
              price: "Contact Us",
              features: [
                "Full feature suite",
                "Dedicated account manager",
                "Custom integrations",
                "Advanced analytics",
              ],
            },
          ].map((plan, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-neutral-800 rounded-3xl border border-yellow-300 shadow-lg hover:shadow-2xl transition-shadow duration-300 sm:p-8 p-6 overflow-hidden"
            >
              {/* Decorative Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 opacity-30 pointer-events-none rounded-3xl"></div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold mb-2 text-yellow-600 relative z-10">
                {plan.name}
              </h3>

              {/* Price */}
              <p className="text-2xl sm:text-4xl font-extrabold mb-4 text-gray-800 dark:text-white relative z-10">
                {plan.price}
              </p>

              {/* Divider */}
              <div className="border-t border-yellow-200 dark:border-yellow-600 mb-4 relative z-10"></div>

              {/* Feature List */}
              <ul className="mb-6 space-y-2 text-left relative z-10 sm:text-base text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="text-yellow-400 text-base sm:text-lg">
                      ✔️
                    </span>
                    <span className="text-gray-700 dark:text-white">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={"/auth/register"}
                className="w-full bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-300 transition-colors duration-300 relative z-10"
              >
                Get Started
              </Link>

              {/* Subtle Ring Effect */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-yellow-300/30 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PriceModel;
