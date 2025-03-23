import { InfoItem } from "@/lib/type/CommonType";
import React from "react";



interface InfoDescriptionProps {
  item: InfoItem;
}

const InfoDescription: React.FC<InfoDescriptionProps> = ({ item }) => {
  return (
    <div className="space-y-4">
      {/* Heading */}
      {item.heading && <h2 className="text-2xl font-bold mb-4">{item.heading}</h2>}

      {/* Subheadings */}
      {item.subheadings &&
        item.subheadings.map((sub, subIndex) => (
          <div key={subIndex} className="space-y-2">
            <h5 className="text-lg font-semibold">{sub.title}</h5>
            <p className="text-gray-500" style={{ wordSpacing: "0.25rem", lineHeight: "1.75rem" }}>
              {sub.description}
            </p>
          </div>
        ))}

      {/* Testimonial */}
      {/* {item.testimonial && (
        <div className="bg-blue-500 p-4 rounded-md text-white space-y-2">
          <div className="flex items-center space-x-4">
            <img
              src={item.testimonial.image}
              alt={item.testimonial.author}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm italic">"{item.testimonial.text}"</p>
              <p className="mt-1 font-bold">{item.testimonial.author}</p>
              <p className="text-sm">{item.testimonial.position}</p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default InfoDescription;
