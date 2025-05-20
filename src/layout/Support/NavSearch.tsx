"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { X } from "lucide-react"; // Clear icon

const NavSearch = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract current search query from URL
  const currentSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  // Capitalize last segment for the page title
  const pathSegments = pathname.split("/").filter(Boolean);
  let lastSegment = pathSegments[pathSegments.length - 1] || "";
  lastSegment = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, " ");

  // Update URL when search term changes
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`${pathname}?search=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push(pathname); // Remove search query if empty
    }
  };

  // Clear search input and remove `?search` from URL
  const handleClear = () => {
    setSearchTerm("");
    router.push(pathname);
  };

  // Sync search input with URL when query changes
  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  return (
    <>
      {/* Page Header */}
      <header className="bg-navbar text-white text-center pt-16 pb-28 relative">
        <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-green-400 absolute -top-5 left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90 h-32 md:h-auto"></span>
        <h1 className="text-2xl lg:text-4xl font-semibold mt-5 md:mt-6">{lastSegment}</h1>
      </header>

      {/* Navigation Bar with Search */}
      <nav className="flex justify-center mt-[-40px] px-4">
        <div className="bg-white shadow-lg rounded-2xl px-6 py-4 flex flex-wrap justify-center md:flex md:space-x-8 md:p-4 transition-all duration-300 z-10">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 items-center relative">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 text-gray-700 outline-none md:w-80 sm:w-72 w-48 bg-gray-100 focus:bg-white rounded-md border border-gray-300"
            />
            
            {/* Clear Button (Visible only when search term exists) */}
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-24 text-gray-500 hover:text-gray-700 transition"
              >
                <X size={18} />
              </button>
            )}

            <Button type="submit" variant={"default"}>
              Search
            </Button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default NavSearch;
