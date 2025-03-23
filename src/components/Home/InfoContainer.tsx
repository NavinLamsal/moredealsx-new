import React from "react";
import InfoDescription from "./InfoDescription";
import FreeButton from "./FreeButton";
import { InfoItem } from "@/lib/type/CommonType";
// import FreeButton from "./FreeButton";
// import InfoDescription from "./InfoDescription";

// interface InfoItem {
//   title: string;
//   description: string;
//   image: string;
// }

interface InfoContainerProps {
  data: InfoItem[];
}

const InfoContainer: React.FC<InfoContainerProps> = ({ data }) => {
  return (
    <div className="container mx-auto px-4">
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col lg:flex-row items-center my-6 py-4 relative">
            {index % 2 !== 0 ? (
              <>
                <div className="lg:w-1/2 mt-4">
                  <InfoDescription item={item} />
                </div>
                <div className="lg:w-1/2 mt-4 relative z-10 text-center">
                  <img src={item.image} alt={item.heading} className="max-w-full h-auto" />
                  <div className="mt-4">
                    <FreeButton />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="lg:w-1/2 mt-4 order-2 lg:order-1 relative z-10 text-center">
                  <img src={item.image} alt={item.heading} className="max-w-full h-auto" />
                  <div className="mt-4">
                    <FreeButton />
                  </div>
                </div>
                <div className="lg:w-1/2 mt-4 order-1 lg:order-2">
                  <InfoDescription item={item} />
                </div>
              </>
            )}
          </div>

          {/* SVG Connector */}
          <div className="hidden lg:block">
            {index < data.length - 1 && (
              <div className="connector-container">
                <div
                  className={
                    index % 2 === 0
                      ? "connector connector-left"
                      : "connector connector-right"
                  }
                >

                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      d="M0,50 C15,0 85,100 100,50"
                      stroke="#ccc"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            )}

          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default InfoContainer;
