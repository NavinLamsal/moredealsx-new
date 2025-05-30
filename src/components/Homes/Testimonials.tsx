import React from "react";

const Testimonials = () => {
  return (
    <section className="bg-cream dark:bg-neutral-800 sm:py-16 py-8">
      <div className="max-w-5xl mx-auto sm:px-8 px-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-12 text-neutral-700 dark:text-yellow-100">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Emma, Café Owner",
              quote:
                "MoreDealsX transformed the way we manage customers. Our repeat visits went up by 35%!",
            },
            {
              name: "Liam, Restaurant Manager",
              quote:
                "The loyalty features are incredible! It's a must-have for any restaurant serious about growth.",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-md hover:shadow-xl transition-shadow"
            >
              <p className="italic mb-4 text-black dark:text-white">
                “{testimonial.quote}”
              </p>
              <p className="font-semibold text-yellow-600">
                - {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
