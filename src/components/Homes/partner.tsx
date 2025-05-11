import React from "react";
import SectionTitle from "./sectionTiltle";

const partnerLogos = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", alt: "Netflix" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png", alt: "Apple" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", alt: "IBM" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Google_2015_logo.svg", alt: "Google" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/0/02/PayPal_logo.svg", alt: "PayPal" },
  ];

const PartnersSection = () => {
  return (
    <section className="py-20 text-cente">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title="OUR PARTNERS" />
        <p className="text-gray-600 text-center mb-10">Trusted by the Elite</p>

        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-center">
          {partnerLogos.map((logo, index) => (
            <div
              key={index}
              className="h-20 flex items-center justify-center filter grayscale hover:grayscale-0 transition duration-300 ease-in-out"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
