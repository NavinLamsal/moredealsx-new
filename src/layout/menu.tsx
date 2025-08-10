// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import menuData from "@/data.json"; 

// // Define types for menu data
// interface MenuItem {
//   title: string;
//   description: string;
//   icon: string;
//   url: string;
// }

// interface MenuCategory {
//  title: string;
//   items: MenuItem[];
//   horizontal?: boolean;
// }



// export default function Menu() {
//   const [search, setSearch] = useState<string>("");

//   // Filter the menu data based on the search query
//   const filteredMenu: MenuCategory[] = menuData.menuData
//     .map((section: MenuCategory) => {
//       const filteredItems = section.items.filter((item: MenuItem) =>
//         item.title.toLowerCase().includes(search.toLowerCase())
//       );
//       return filteredItems.length > 0 ? { ...section, items: filteredItems } : null;
//     })
//     .filter(Boolean) as MenuCategory[]; // Type assertion to remove `null` values

//   return (
//     <div className="w-full space-y-4 mt-2">
//       <Input
//         placeholder="Search menu"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {filteredMenu.length > 0 ? (
//         <div className="space-y-5">
//           {filteredMenu.map((section) => (
//             <div key={section.title}>
//               <h3 className="text-sm font-bold text-gray-400">{section.title}</h3>
//               <div className="space-y-2">
//                 {section.items.map((item) => (
//                   <Link key={item.title} href={item.url} className="block">
//                     <div className="flex items-center space-x-2 p-2 rounded hover:bg-white dark:hover:bg-gray-800">
//                       <img src={item.icon} alt={item.title} className="w-6 h-6 rounded" />
//                       <div>
//                         <p className="text-sm font-semibold">{item.title}</p>
//                         <p className="text-xs text-gray-400">{item.description}</p>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-400 text-sm mt-4">No results found.</p>
//       )}
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import menuData from "@/data.json"; 
import LogoutTrigger from "@/components/auth/logouts/logouttrigger";
import { useAuth } from "@/providers/auth-provider";

// Define types for menu data
interface MenuItem {
  title: string;
  description: string;
  icon: string;
  url: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
  horizontal?: boolean;
}

// Example: replace this with actual session logic or pass as prop


const exclusions = {
  BUSINESS: [],
  NORMAL: ["Business Profile"], // add any you want to exclude for NORMAL
  DELIVERY: ["Business Profile"],
};

export default function Menu() {
  const [search, setSearch] = useState<string>("");
  const {user, }= useAuth()
  // Safely extract and narrow user type
  const userType = (user?.user_type ?? 'NORMAL') as 'BUSINESS' | 'NORMAL' | 'DELIVERY';

  const userExclusions = userType ? exclusions[userType] : [];

  const filteredMenu: MenuCategory[] = menuData.menuData
    .map((section: MenuCategory) => {
      const filteredItems = section.items.filter((item: MenuItem) => {
        const isExcluded = userExclusions.includes(item.title);
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        return !isExcluded && matchesSearch;
      });
      return filteredItems.length > 0 ? { ...section, items: filteredItems } : null;
    })
    .filter(Boolean) as MenuCategory[];

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
            <div key={section.title}>
              <h3 className="text-sm font-bold text-gray-400">{section.title}</h3>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <Link key={item.title} href={item.url} className="block">
                    <div className="flex items-center space-x-2 p-2 rounded hover:bg-white dark:hover:bg-gray-800">
                      <img src={item.icon} alt={item.title} className="w-6 h-6 rounded" />
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-xs text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="space-y-2">
               
                  <div className="block">
                    <div className="flex items-center space-x-2 p-2 rounded hover:bg-white dark:hover:bg-gray-800">
                      {/* <img src={'/images/png/user.png'} alt={"Log Out"} className="w-6 h-6 rounded" />
                      <div>
                        <p className="text-sm font-semibold">Log Out</p>
                        <p className="text-xs text-gray-400"></p>
                      </div> */}
                      <LogoutTrigger triggerType="dropdown" />
                    </div>
                  </div>
               
              </div>
        </div>
      ) : (
        <p className="text-gray-400 text-sm mt-4">No results found.</p>
      )}
    </div>
  );
}
