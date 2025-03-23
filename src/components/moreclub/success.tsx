"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CheckCircle } from "lucide-react";
import Image from "next/image";



export default function PaymentSuccessPage({children}:{children:React.ReactElement}) {
 


  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);



  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {children}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {/* <Link href={`/${params.id}/menu?table=${tableId}`}>
            <button className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105">
              Add More
            </button>
          </Link> */}
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8"
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
              <Image
                src="/images/Primarylogo.png"
                alt="Logo"
                width={100}
                height={100}
                className="w-8 h-8"
              />
            </div>
            <p className="text-xl font-semibold text-red-500">MORE DEALS CLUB</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
