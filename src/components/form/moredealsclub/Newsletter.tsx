"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";


export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const unsubscribeEmail = searchParams.get("unsubscribe");

  useEffect(() => {
    const unsubscribe = async () => {
      if (unsubscribeEmail && unsubscribeEmail.trim() !== "") {
        handleUnsubscribed(unsubscribeEmail);
      }
    };
    unsubscribe();
  }, [unsubscribeEmail]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUnsubscribed = async (email: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}subscription/added/`, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            action: "unSubscribe",
          }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
    //   message.success(res.data.message);
    } catch (err) {
        console.log(err);
    //   message.error(err?.response?.data?.email[0]);
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic email validation
    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    setError(""); // Clear error if validation passes

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}subscription/added/`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            action: "subscribe",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data.non_field_errors) {
        setError(data.non_field_errors);
      } else if (data.success) {
        // toast.success(
        //   "Thank you for your Subscription",
        // );
        setEmail(""); // Clear the input field after successful submission
      }
    } catch (err) {
      console.error("Error:", err);
    //   toast({
    //     title: "Oop's, Error subscribing",
    //     variant: "destructive",
    //     description: "Please Try again",
    //   });
    }
  };

  return (
    <div className="w-full my-3 max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="space-y-2 flex flex-col sm:flex-row justify-start items-center gap-2"
      >
        <div className="flex flex-col w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 text-white bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
            placeholder="Email Address"
          />
          {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
        <Button variant={"secondary"} type="submit" className="m-0 mt-0 h-11">
          Subscribe
        </Button>
      </form>
    </div>
  );
}
