import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// Define types for menu data
interface MenuItem {
  name: string;
  description: string;
  image: string;
  link: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    category: "Club",
    items: [
      { name: "Profile", description: "Manage your profile and settings.", image: "/images/png/user.png", link: "/profile" },
      { name: "Kyc", description: "Update and manage your Kyc Details", image: "/images/png/user.png", link: "/kyc" },
      { name: "Activity Log", description: "See Your Activity across the platform", image: "/images/png/user.png", link: "/activity-log" },
    ],
  },
  {
    category: "MoreFood",
    items: [
      { name: "Order", description: "See your Order History.", image: "/images/png/restaurant.png", link: "/morefood/order" },
      { name: "Reviews", description: "Manage and View your Reviews at the restaurant", image: "/images/png/restaurant.png", link: "/morefood/reviews" },
    ],
  },
  {
    category: "More Living",
    items: [
      { name: "Bookings", description: "See and Manage your Bookings", image: "/images/png/restaurant.png", link: "/moreliving/bookings" },
      { name: "Reviews", description: "Manage and View your Reviews at the Hotel", image: "/images/png/restaurant.png", link: "/moreliving/reviews" },
    ],
  },
];

export default function Menu() {
  const [search, setSearch] = useState<string>("");

  // Filter the menu data based on the search query
  const filteredMenu: MenuCategory[] = menuData
    .map((section) => {
      const filteredItems = section.items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      return filteredItems.length > 0 ? { ...section, items: filteredItems } : null;
    })
    .filter(Boolean) as MenuCategory[]; // Type assertion to remove `null` values

  return (
    <div className="w-full space-y-4 mt-2">
      <Input
        placeholder="Search menu"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredMenu.length > 0 ? (
        <div className="space-y-5">
          {filteredMenu.map((section) => (
            <div key={section.category}>
              <h3 className="text-sm font-bold text-gray-400">{section.category}</h3>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <Link key={item.name} href={item.link} className="block">
                    <div className="flex items-center space-x-2 p-2 rounded hover:bg-white dark:hover:bg-gray-800">
                      <img src={item.image} alt={item.name} className="w-6 h-6 rounded" />
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm mt-4">No results found.</p>
      )}
    </div>
  );
}
