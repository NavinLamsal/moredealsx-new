import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Contact = () => {
  return (
    <section className="bg-yellow-400 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-black mb-4 sm:mb-6">
          Ready to Transform Your Restaurant?
        </h2>
        <p className="text-base sm:text-lg text-black mb-4 sm:mb-8">
          Book a demo today and discover how MoreDealsX can help your business
          thrive.
        </p>
        <Link
          href={"/auth/register"}
          className="bg-black text-white font-semibold px-8 py-4 rounded-full hover:bg-gray-800"
        >
          Book a Demo
        </Link>
      </div>
    </section>
  );
};

export default Contact;
