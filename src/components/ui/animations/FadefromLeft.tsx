"use client";

import { motion } from "framer-motion";
import React from "react";

interface FadeFromLeftProps {
  children: React.ReactNode; // The child component to animate
  index: number; // Index for delay calculation
}

const FadeFromLeft: React.FC<FadeFromLeftProps> = ({
  children,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }} // Start faded and below
      whileInView={{
        opacity: 1,
        y: 0, // Animate to visible and aligned
        transition: {
          type: "spring",
          stiffness: 50,
          duration: 0.5,
          delay: index * 0.1, // Stagger based on index
        },
      }}
      viewport={{ once: true }} // Animate only once when visible
    >
      {children}
    </motion.div>
  );
};

export default FadeFromLeft;
