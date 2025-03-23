"use client";

// import React, { useEffect, useRef, useState } from "react";
// import { motion, useInView } from "framer-motion";
// import { cn } from "@/lib/utils";

// const steps = [
//   {
//     title: "Create Account",
//     description: "Register, get verified and login to Khalti",
//     icon: "👤",
//   },
//   {
//     title: "Load Funds",
//     description: "Load funds via our partner modes of payment",
//     icon: "💼",
//   },
//   {
//     title: "Pay Bills",
//     description: "You are all set to Pay, Send or Accept payments online",
//     icon: "🧾",
//   },
// ];

// const HowItWorksSection = () => {
// const sectionRef = useRef<HTMLDivElement | null>(null);
// const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
// const [highlightIndex, setHighlightIndex] = useState<number>(0);
// const isMobile = () => window.innerWidth < 640; // sm breakpoint


// useEffect(() => {
//   const handleScroll = () => {
//     const section = sectionRef.current;
//     if (!section) return;

//     const rect = section.getBoundingClientRect();
//     const sectionTop = rect.top;
//     const sectionHeight = rect.height;
//     const windowHeight = window.innerHeight;

//     const scrollProgress = (windowHeight - sectionTop) / sectionHeight;

//     if (scrollProgress < 1.2) {
//       setHighlightIndex(0);
//     } else if (scrollProgress >= 1.2 && scrollProgress < 1.8) {
//       setHighlightIndex(1);
//     } else {
//       setHighlightIndex(2);
//     }
//   };

//   if(!isMobile()){
      
//       window.addEventListener("scroll", handleScroll);
//   }
  

//   return () => window.removeEventListener("scroll", handleScroll);
// }, []);

// // const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
// // const [highlightIndex, setHighlightIndex] = useState<number>(0);

// useEffect(() => {
//   const handleScroll = () => {
//     const viewportMiddle = window.innerHeight / 2;
//     const distances = stepRefs.current.map((ref) => {
//       if (!ref) return Infinity;
//       const rect = ref.getBoundingClientRect();
//       return Math.abs(rect.top + rect.height / 2 - viewportMiddle);
//     });

//     const closestIndex = distances.indexOf(Math.min(...distances));
//     setHighlightIndex(closestIndex);
//   };

//   window.addEventListener("scroll", handleScroll);
//   if(isMobile()){
//       handleScroll(); // Trigger on mount
//   }
//   return () => window.removeEventListener("scroll", handleScroll);
// }, []);



//   return (
//     <div  className="py-10 px-4 sm:px-6 lg:px-20">
//       <h2 className="text-2xl sm:text-3xl font-bold text-center text-purple-700 mb-10">
//         How More Deals Club Works?
//       </h2>
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-10">
//         {steps.map((step, index) => (
//           <motion.div
//             key={index}
//             ref={(el) => {
//                 stepRefs.current[index] = el;
//               }}
//             className={cn(
//               "flex flex-col items-center text-center transition-all duration-300",
//               highlightIndex === index ? "scale-105" : "opacity-60"
//             )}
//           >
//             <div
//               className={cn(
//                 "w-20 h-20 flex items-center justify-center rounded-full text-3xl mb-4",
//                 highlightIndex === index
//                   ? " text-white shadow-lg bg-primary"
//                   : "bg-white border"
//               )}
//             >
//               {step.icon}
//             </div>
//             <h3 className="text-lg font-semibold">{step.title}</h3>
//             <p className="text-sm text-gray-500 max-w-[200px]">
//               {step.description}
//             </p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HowItWorksSection;


import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Create Account",
    description: "Register, get verified and login to Khalti",
    icon: "👤",
  },
  {
    title: "Load Funds",
    description: "Load funds via our partner banks or offline methods",
    icon: "💼",
  },
  {
    title: "Pay Bills",
    description: "You are all set to Pay, Send or Accept payments online",
    icon: "🧾",
  },
];

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [highlightIndex, setHighlightIndex] = useState<number>(0);

  const isMobile = () => window.innerWidth < 640; // sm breakpoint

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile()) {
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;

        const scrollProgress = (windowHeight - sectionTop) / sectionHeight;

        if (scrollProgress < 1.2) {
          setHighlightIndex(0);
        } else if (scrollProgress >= 1.2 && scrollProgress < 1.8) {
          setHighlightIndex(1);
        } else {
          setHighlightIndex(2);
        }
      } else {
        const viewportMiddle = window.innerHeight / 2;
        const distances = stepRefs.current.map((ref) => {
          if (!ref) return Infinity;
          const rect = ref.getBoundingClientRect();
          return Math.abs(rect.top + rect.height / 2 - viewportMiddle);
        });

        const closestIndex = distances.indexOf(Math.min(...distances));
        setHighlightIndex(closestIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial trigger

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="py-10 px-4 sm:px-6 lg:px-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-purple-700 mb-10">
        How More Deals Club Works?
      </h2>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-10 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            className={cn(
              "flex flex-col items-center text-center transition-all duration-300",
              highlightIndex === index ? "scale-105" : "opacity-60"
            )}
          >
            <div
              className={cn(
                "w-24 h-24 flex items-center justify-center rounded-full text-4xl mb-4",
                highlightIndex === index
                  ? "text-white shadow-lg bg-primary"
                  : "bg-transparent border-2 border-primary border-dashed "
              )}
            >
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="text-sm text-gray-500 max-w-[200px]">
              {step.description}
            </p>
          </motion.div>
        ))}
        
      </div>
    </div>
  );
};

export default HowItWorksSection;