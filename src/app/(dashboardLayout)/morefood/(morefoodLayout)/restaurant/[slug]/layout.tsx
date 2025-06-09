import { fetchResturantsIdDetails } from "@/lib/action/morefood/restaurantServerside";
import { Restaurant } from "@/lib/type/morefood/restaurant";
import RestaurantDetail from "@/components/morefood/restaurant/detail";
import { Metadata } from "next";
import React from "react";

// 🔹 Pre-generate static restaurant pages at build time
// export async function generateStaticParams() {
//   const slugs = await fetchAllRestaurantSlugs();
//   return slugs.map((slug: string) => ({ slug }));
// }

// 🔹 Generate dynamic metadata for each restaurant
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const details: Restaurant = await fetchResturantsIdDetails(slug);

  return {
    title: `${details.name} | MoreFood`,
    description:
      details.short_description || `Explore delicious food at ${details.name}.`,
    openGraph: {
      title: `${details.name} | MoreFood`,
      description:
        details.short_description ||
        `Explore delicious food at ${details.name}.`,
      url: `https://yourwebsite.com/restaurant/${slug}`,
      images: [
        {
          url: details.banner || details.logo || "/default-restaurant.jpg",
          width: 1200,
          height: 630,
          alt: details.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${details.name} | MoreFood`,
      description:
        details.short_description ||
        `Explore delicious food at ${details.name}.`,
      images: [details.banner || details.logo || "/default-restaurant.jpg"],
    },
  };
}

// 🔹 Layout Component
const RestaurantLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const details: Restaurant = await fetchResturantsIdDetails(slug);

  return (
    <div>
      {/* Restaurant Details (Persistent Across Restaurant Pages) */}
      <RestaurantDetail details={details} />

      {/* Dynamic Page Content (FoodList, Offers, etc.) */}
      <div>{children}</div>
    </div>
  );
};

export default RestaurantLayout;
