// components/RestaurantsLink.tsx
"use client";

import { useRouter } from "next/navigation";

export default function RestaurantsLink({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAuthenticated) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/morefood");
    }
  };

  return (
    <a
      href="/morefood"
      onClick={handleClick}
      className="text-gray-400 hover:text-yellow-400 transition"
    >
      Restaurants
    </a>
  );
}
