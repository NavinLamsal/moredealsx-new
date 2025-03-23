"use client";
import { EventList } from "@/lib/type/moreclub/Event";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Event {
  title: string;
  image: string;
}

export default function EventCarousel({list} :{list?: EventList[]}) {
  const { data: session, update } = useSession();
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);



  useEffect(() => {
    const checkOverflow = () => {
      const el = carouselRef.current;
      if (el) {
        setIsOverflowing(el.scrollWidth > el.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };


  const events: Event[] = [
    {
      title: "Ed Sheeran: India Tour 2025",
      image: "https://res.cloudinary.com/generative-ai-demos/image/upload/c_auto,w_1000,ar_9:16,g_auto/v1709925707/samples/c_auto/woman_car_srgx4k.jpg",
    },
    {
      title: "Shreya Ghoshal: All Hearts Tour",
      image: "https://res.cloudinary.com/generative-ai-demos/image/upload/c_auto,w_1000,ar_9:16,g_auto/v1709925707/samples/c_auto/woman_car_srgx4k.jpg",
    },
    {
      title: "HUMARE RAM: Live Theater",
      image: "https://res.cloudinary.com/generative-ai-demos/image/upload/c_auto,w_1000,ar_9:16,g_auto/v1709925707/samples/c_auto/woman_car_srgx4k.jpg",
    },
    {
      title: "Valentine's Day: Armaan Malik",
      image: "https://res.cloudinary.com/generative-ai-demos/image/upload/c_auto,w_1000,ar_9:16,g_auto/v1709925707/samples/c_auto/woman_car_srgx4k.jpg",
    },
    {
      title: "Arijit Singh: Live in Concert",
      image: "https://res.cloudinary.com/generative-ai-demos/image/upload/c_auto,w_1000,ar_9:16,g_auto/v1709925707/samples/c_auto/woman_car_srgx4k.jpg",
    },
    {
        title: "Arijit Singh: Live in Concert",
        image: "https://res.cloudinary.com/generative-ai-demos/image/upload/c_auto,w_1000,ar_9:16,g_auto/v1709925707/samples/c_auto/woman_car_srgx4k.jpg",
      },
      {
        title: "Arijit Singh: Live in Concert",
        image: "https://res.cloudinary.com/generative-ai-demos/image/upload/c_auto,w_1000,ar_9:16,g_auto/v1709925707/samples/c_auto/woman_car_srgx4k.jpg",
      },
  ];

  return (
    <div className="relative w-full overflow-hidden">
        <div className="flex items-center justify-between">

      <h2 className="text-lg font-bold mb-4">Trending Upcoming Events</h2>
      
      <div className="flex items-center gap-2">
      <Link href={"/event"} className="text-blue-600 hover:underline">View All</Link>
      {isOverflowing && (
        <>
            <Button
            size={"icon"}
              onClick={scrollLeft}
              className=" text-2xl font-bold   rounded-full shadow-md"
            >
              &larr;
            </Button>
            <Button
            size={"icon"}
              onClick={scrollRight}
              className=" text-2xl font-bold    rounded-full shadow-md"
            >
              &rarr;
            </Button>
            </>
        )}
       
        </div>
        </div>
      <div className="relative">
        {/* Scroll Buttons */}
        

        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto hide-scroll-bar scroll-smooth"
        >
          {events.map((event, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] bg-inherit rounded-lg shadow-md"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full aspect-[3/4] object-cover rounded-t-lg"
              />
              <div className="p-2 text-center">
                <h3 className="text-sm font-semibold">{event.title}</h3>
              </div>
            </div>
          ))}

{/* {list.map((event, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] bg-white rounded-lg shadow-md"
            >
              <img
                src={event.event_photo[0].image}
                alt={event.name}
                className="w-full aspect-[9/16] object-cover rounded-t-lg"
              />
              <div className="p-2 text-center">
                <h3 className="text-sm font-semibold">{event.name}</h3>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
