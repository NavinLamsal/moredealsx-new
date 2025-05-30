"use client";

import {
  Adamina,
  Gelasio,
  Montserrat,
  Open_Sans,
  Red_Hat_Display,
} from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const gelasio = Gelasio({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const Banner = () => {
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    setSpin(true);
  }, []);
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-8 sm:py-16 py-8 max-w-7xl mx-auto">
      <div className="flex-1 space-y-6 text-black dark:text-white">
        <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold leading-tight">
          Transform Your Restaurant <br />
          with <br />
          <p className={`text-primary-foreground dark:text-white`}>
            MORE<span className="text-primary">DEALS</span>X
          </p>
        </h1>
        <p className="sm:text-lg text-base max-w-md">
          Boost loyalty, drive revenue, and simplify customer management — all
          with our powerful, easy-to-use CRM tailored for restaurants.
        </p>
        <Button
          size="lg"
          onClick={() => {
            window.location.href = "/auth/register";
          }}
          className="bg-yellow-400 text-black hover:bg-yellow-300 font-semibold px-6 py-3 rounded-full"
        >
          Get Started Now <ArrowRight className="ml-2" />
        </Button>
      </div>
      <motion.div
        className="flex-1 mb-8 lg:mb-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/images/jpeg/dashboardUI.jpg"
          alt="CRM Dashboard"
          width={600}
          height={400}
          className="rounded-xl shadow-2xl"
        />
      </motion.div>
    </section>
  );
};

export default Banner;
