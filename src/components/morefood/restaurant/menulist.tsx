"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { FoodListType } from "@/lib/type/morefood/restaurant";

const categories = [
  { name: "Get 1 Free", id: "get1free" },
  { name: "Breakfast Meals", id: "breakfast-meals" },
  { name: "Breakfast Sandwiches", id: "breakfast-sandwiches" },
  { name: "Burritos", id: "burritos" },
  { name: "Limited Time Only", id: "limited-time" },
  { name: "Meals", id: "meals" },
  { name: "Flame Grilled Burgers", id: "burgers" },
  { name: "Chicken & Fish", id: "chicken-fish" },
  { name: "Sides", id: "sides" },
];

export default function MenuSection({menulist }: {menulist:FoodListType[]}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [activeCategory, setActiveCategory] = useState(menulist[0].id);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
      }
    };

    if (scrollRef.current) {
      checkScroll();
      scrollRef.current.addEventListener("scroll", checkScroll);
    }

    return () => {
      scrollRef.current?.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = menulist[0].id;
      for (const category of menulist) {
        const section = document.getElementById(category.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = category.id;
            break;
          }
        }
      }
      if (currentSection !== activeCategory) {
        setActiveCategory(currentSection);
        scrollMenuToActive(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeCategory]);

  // ✅ Ensures the active menu item remains visible while scrolling
  const scrollMenuToActive = (id: string) => {
    const activeItem = document.getElementById(`menu-item-${id}`);
    if (activeItem && scrollRef.current) {
      const menuContainer = scrollRef.current;
      const itemRect = activeItem.getBoundingClientRect();
      const containerRect = menuContainer.getBoundingClientRect();

      // ✅ Auto-scroll only when the active item is out of visible area
      if (itemRect.left < containerRect.left || itemRect.right > containerRect.right) {
        activeItem.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  };

  return (
    <div className="w-full bg-white shadow-md py-2 px-4 sticky top-20 z-50">
      {/* Title and Search */}
      <div className="flex flex-wrap justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Main Menu</h2>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder={`Search Menu...`}
            className="bg-gray-100 text-sm px-4 pl-8 py-2 rounded-full w-full sm:w-72 focus:outline-none relative"
          />
          <Search className="absolute top-1 left-1 text-gray-500" />
        </div>
      </div>

      {/* Scrollable Menu */}
      <div className="relative">
        {/* Left Scroll Button (only visible when needed) */}
        {showLeftArrow && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
            onClick={() => scroll("left")}
          >
            <ArrowLeft className="text-gray-600" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide flex-nowrap px-8 scroll-smooth w-full"
        >
          {menulist.map((category) => (
            <button
              key={category.id}
              id={`menu-item-${category.id}`}
              onClick={() => scrollToSection(category.id)}
              className={`text-gray-700 font-medium hover:text-black transition-all whitespace-nowrap px-4 py-2 ${
                activeCategory === category.id ? "border-b-2 border-black text-black" : ""
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Right Scroll Button (only visible when needed) */}
        {showRightArrow && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
            onClick={() => scroll("right")}
          >
            <ArrowRight className="text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
}
