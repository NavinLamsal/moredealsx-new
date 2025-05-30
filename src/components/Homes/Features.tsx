import React from "react";

const Features = () => {
  const features = [
    {
      title: "Lead Management",
      description:
        "Capture, organize, and manage leads effortlessly, tailored for restaurant sales teams.",
      features: [
        "Lead capture forms",
        "Customizable pipelines",
        "Lead scoring",
      ],
    },
    {
      title: "Reservation CRM",
      description:
        "Track and manage reservations to convert diners into loyal customers.",
      features: [
        "Reservation tracking",
        "Customer profiles",
        "Table status overview",
      ],
    },
    {
      title: "Customer Engagement",
      description:
        "Enhance guest experience with targeted offers and personalized follow-ups.",
      features: [
        "Email and SMS marketing",
        "Loyalty program integration",
        "Feedback surveys",
      ],
    },
    {
      title: "Analytics & Reporting",
      description:
        "Gain insights into restaurant performance and customer behavior.",
      features: [
        "Sales reports",
        "Customer insights",
        "Performance dashboards",
      ],
    },
    {
      title: "Menu Personalization",
      description:
        "Create and manage dynamic menus that adapt to customer preferences and seasonal trends.",
      features: [
        "Flexible menu templates",
        "Dietary filters",
        "Dynamic pricing",
      ],
    },
    {
      title: "Integrated Payments",
      description:
        "Streamline transactions and manage payments seamlessly within your CRM.",
      features: [
        "Secure payment gateway",
        "Split bills support",
        "Real-time transaction reports",
      ],
    },
  ];
  return (
    <div className="pb-6 sm:pb-12">
      <section className="max-w-6xl mx-auto text-center sm:my-12 my-6">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-yellow-100 mb-4">
          Elevate Your Restaurant’s Sales
        </h1>
        <p className="sm:text-lg text-base text-gray-600 dark:text-white max-w-2xl mx-auto">
          Our CRM helps restaurants capture leads, nurture them, and turn every
          diner into a loyal customer.
        </p>
      </section>

      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-sm sm:text-base flex flex-col items-start"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-orange-600 mb-2">
              {feature.title}
            </h2>
            <div className="grow">
              <p className="text-gray-700 dark:text-white mb-4">
                {feature.description}
              </p>
              <ul className="text-left space-y-2">
                {feature.features.map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-green-500 mr-2">✔</span>
                    <span className="text-gray-700 dark:text-yellow-100">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors">
              Learn more
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Features;
